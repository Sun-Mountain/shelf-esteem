import { db } from '@/db/lib'; 
import { createBook, findBookById, findIndustryIdentifiers } from '@/db/lib/books';
import { createUserLibraryBook, findUserLibraryBook } from '@/db/lib/libraries';
import { withAuth } from '@/lib/auth';
import { getLogger } from '@/lib/logger';
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
  })(async (session: Session, permission: Permission) => {
    try {
      const body = await req.json();
      const { isbn, language, addedBy } = body;
      let book;

      // Check if book already exists
      const bookExists = await findIndustryIdentifiers([{ identifier: isbn }]);

      if (!bookExists.length) {
        // Find book in database
        logger.info(`Book with ISBN ${isbn} not found in database. Fetching from Open Library API`);
        const apiBook = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
                              .then(function(response) {
                                  return response.json();
                              });
        const isbnObj = 'ISBN:' + isbn;
        const bookData = apiBook[isbnObj];
  
        book = await createBook({ ...bookData, language, addedBy })
        book = await findBookById(book.id);
      } else {
        book = await findBookById(bookExists[0].bookId);
      }

      // // Check if book is already in user's library
      // const userLibraryBookExists = await findUserLibraryBook({ bookId: book.id, userId: addedBy });

      // if (userLibraryBookExists.length > 0 || userLibraryBookExists[0].bookId) {
      //   return NextResponse.json(
      //     { status: 409, message: 'Book already exists in user library' }
      //   );
      // } else {
      //   // Add book to user's library
      //   const userLibraryBook = await createUserLibraryBook({
      //     bookId: book.id,
      //     userId: addedBy
      //   });
      // }

      return NextResponse.json(
        { status: 'ok' }
      );
    } catch (error) {
      logger.error(error);
      return NextResponse.json({ message: `Something went wrong: ${error}`, status: 500});
    }
  });
};