import { db } from '@db/lib'; 
import { createBook, findBookById, findIndustryIdentifiers } from '@db/lib/books';
import { createUserLibraryBook, findUserLibraryBook } from '@db/lib/libraries';
import { withAuth } from '@lib/auth';
import { getLogger } from '@lib/logger';
import {
  Book,
  Prisma,
} from '@prisma/client';
import type { Permission } from 'accesscontrol';
import { NextRequest, NextResponse } from 'next/server';

import { Session } from 'next-auth';

const logger = getLogger();

export async function POST(req: NextRequest) {
  return withAuth({
    resource: 'books',
    action: 'create:any',
    authErrorMessage: 'You are not authorized to create a book',
  })(async () => {
    try {
      const body = await req.json();
      const { isbn, addedBy } = body;
      let book;

      // Check if book already exists
      const bookExists = await findIndustryIdentifiers(isbn.trim());

      if (!bookExists) {
        // Find book in database
        logger.info(`Book with ISBN ${isbn} not found in database. Fetching from Open Library API`);
        const apiBook = await fetch(`${process.env.BOOK_API_URL}?q=isbn:${isbn.trim()}&key=${process.env.BOOK_API_KEY}`)
                              .then(function(response) {
                                  return response.json();
                              });
        const bookData = apiBook.items[0].volumeInfo;
        book = await createBook({ ...bookData, addedBy })
      } else {
        if (!!bookExists.bookId) book = await findBookById(bookExists.bookId);
      }

      if (!book) {
        return NextResponse.json(
          { message: 'Book not found' },
          { status: 404 }
        );
      }

      // Check if book is already in user's library
      const userLibraryBookExists = await findUserLibraryBook(book.id, addedBy);
      console.log(userLibraryBookExists);

      if (!userLibraryBookExists) {
        // Add book to user's library
        const userLibraryBook = await createUserLibraryBook({
          bookId: book.id,
          userId: addedBy
        });
      }

      return NextResponse.json(
        { status: 'ok' }
      );
    } catch (error) {
      logger.error(error);
      return NextResponse.json({ message: `Something went wrong: ${error}`, status: 500});
    }
  });
};

export async function GET(req: NextRequest) {
  return withAuth({
    resource: 'books',
    action: 'read:any',
    authErrorMessage: 'You are not authorized to view books',
  })(async () => {
    try {
      const books = await db.book.findMany();
      return NextResponse.json(books);
    } catch (error) {
      logger.error(error);
      return NextResponse.json({ message: `Something went wrong: ${error}`, status: 500});
    }
  });
};
