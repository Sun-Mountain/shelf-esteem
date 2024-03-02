import { db } from '@/db/lib'; 
import { createBook } from '@/db/lib/books';
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
      console.log({ isbn, language, addedBy })
      // Find book in database
      const apiBook = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
                            .then(function(response) {
                                return response.json();
                            });
      const isbnObj = 'ISBN:' + isbn;
      const bookData = apiBook[isbnObj];

      const book = await createBook({ ...bookData, language, addedBy })

      return NextResponse.json(
        { status: 'ok' }
      );
    } catch (error) {
      logger.error(error);
      return NextResponse.json({ message: `Something went wrong: ${error}`, status: 500});
    }
  });
};