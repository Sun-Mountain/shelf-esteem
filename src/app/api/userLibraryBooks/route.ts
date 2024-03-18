import { Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/lib';
import { createUserLibraryBook, findUserLibraryBook } from '@db/lib/libraries';
import { createBook, findBookById, findIndustryIdentifiers } from '@db/lib/books';
import { withAuth } from '@lib/auth';

import type { Permission } from 'accesscontrol';

import { getLogger } from '@lib/logger';

const logger = getLogger();

export async function POST(req: NextRequest) {
  return withAuth({
    resource: 'userLibraryBooks',
    action: 'create:own',
    authErrorMessage: 'You are not authorized to add a book to this library',
  })(async (permission: Permission, session: Session) => {
    try {
      const body = await req.json();
      const { isbn } = body;
      const userId = session.user.id;

      // Find book in database
      const bookExists = await findIndustryIdentifiers([{ identifier: isbn }]);
      
      let book;

      if (!bookExists.length) {
        // Find book in Open Library API
        const apiBook = await fetch(`${process.env.BOOK_API_URL}?q=isbn:${isbn.trim()}&key=${process.env.BOOK_API_KEY}`)
          .then(function(response) {
            return response.json();
          });
        const bookData = apiBook.items[0].volumeInfo;
        book = await createBook({ ...bookData, addedBy: userId });
      } else {
        book = await findBookById(bookExists[0].bookId);
      }

      // Check if book is already in user's library
      const userLibraryBookExists = await findUserLibraryBook({ bookId: book.id, userId });

      if (!userLibraryBookExists) {
        // Add book to user's library
        await createUserLibraryBook({
          bookId: book.id,
          userId,
        });
      } else {
        return NextResponse.json(
          { message: 'Book is already in your library' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { book },
        { status: 200 }
      )
    } catch (error) {
      logger.error(error);
      return NextResponse.json({
        message: `An error occurred while adding the book to your library: ${error}`,
      }, {
        status: 500,
      });
    }
  })
}

export async function GET(req: NextRequest) {
  return withAuth({
    resource: 'userLibraryBooks',
    action: 'read:own',
    authErrorMessage: 'You are not authorized to read this library',
  })(async (session: Session) => {
    try {
      const searchParams = await req.nextUrl.searchParams;
      const isbn = searchParams.get('isbn');
      const userId = searchParams.get('userId');

      // find book by isbn
      const bookExists = await findIndustryIdentifiers([{ identifier: isbn }]);
      
      // find in User Library

      if (!bookExists.length) {
        return NextResponse.json({
          bookFound: false,
          message: 'Book not found'
        }, {
          status: 404
        });
      }

      const book = await findBookById(bookExists[0].bookId);

      const userLibraryBookExists = await findUserLibraryBook({ bookId: book.id, userId });

      if (!userLibraryBookExists) {
        return NextResponse.json({
          bookFound: false,
          message: 'Book not found in your library'
        }, {
          status: 404
        });
      }

      return NextResponse.json({ bookFound: true, book }, { status: 200 });
    } catch (error) {
      logger.error(error);
      return NextResponse.error();
    }
  });
}
