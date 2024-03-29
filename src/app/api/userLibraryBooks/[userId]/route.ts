import { Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/lib';
import { createUserLibraryBook, findUserLibraryBook } from '@db/lib/libraries';
import { createBook, findBookById, findIndustryIdentifiers } from '@db/lib/books';
import { withAuth } from '@lib/auth';

import type { Permission } from 'accesscontrol';

import { getLogger } from '@lib/logger';

const logger = getLogger();

export async function GET(req: NextRequest) {
  return withAuth({
    resource: 'userLibraryBooks',
    action: 'read:own',
    authErrorMessage: 'You are not authorized to read this library',
  })(async () => {
    try {
      const searchParams = await req.nextUrl.searchParams;
      const pathname = await req.nextUrl.pathname;
      const isbn = searchParams.get('isbn');
      const userId = pathname.replace('/api/userLibraryBooks/', '');

      if (!isbn) {
        return NextResponse.json({
          message: 'ISBN is required'
        }, {
          status: 400
        });
      }

      // find book by isbn
      const bookExists = await findIndustryIdentifiers(isbn);
      
      // find in User Library

      if (!bookExists || !bookExists.bookId) {
        return NextResponse.json({
          bookFound: false,
          message: 'Book not found'
        }, {
          status: 404
        });
      }

      const book = await findBookById(bookExists.bookId);

      if (!book) {
        return NextResponse.json({
          bookFound: false,
          message: 'Book not found'
        }, {
          status: 404
        });
      }

      const userLibraryBookExists = await findUserLibraryBook(book.id, userId);

      if (!userLibraryBookExists) {
        return NextResponse.json({
          bookFound: false,
          message: 'Book not found in your library'
        }, {
          status: 404
        });
      }

      return NextResponse.json({ libraryId: userLibraryBookExists.id, bookFound: true, book }, { status: 200 });
    } catch (error) {
      logger.error(error);
      return NextResponse.error();
    }
  });
}