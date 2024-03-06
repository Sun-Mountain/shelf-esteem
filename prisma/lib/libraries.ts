import { db } from '@/db/lib';
import { UserLibraryBook, Prisma } from '@prisma/client';
import { getLogger } from '@/lib/logger';

const logger = getLogger();

export type UserLibraryBookCreateInput = Prisma.UserLibraryBookCreateInput;

export type UserLibraryBookGetFullPayload = Prisma.UserLibraryBookGetPayload<{}>;

export async function findUserLibraryBook({ bookId, userId }): Promise<UserLibraryBookGetFullPayload[]> {
  try {
    const foundUserLibraryBooks = await db.userLibraryBook.findFirst({
      where: {
        AND: [
          { bookId: bookId },
          { userId: userId }
        ]
      },
    });

    if (!foundUserLibraryBooks) {
      return;
    }

    return foundUserLibraryBooks;
  } catch (error) {
    logger.error(error);
    return error;
  }
}

export async function createUserLibraryBook(values: UserLibraryBookCreateInput): Promise<UserLibraryBookGetFullPayload> {
  try {
    const createdUserLibraryBook = await db.book.update({
      where: { id: values.bookId },
      data: {
        libraries: {
          create: {
            userId: values.userId,
          }
        }
      }
    });

    const foundUserLibraryBook = await findUserLibraryBook({ bookId: values.bookId, userId: values.userId });

    return foundUserLibraryBook;
  } catch (error) {
    logger.error(error);
    return error;
  }
}

export async function getUserLibraryBooks(userId: string) {
  try {
    const userLibraryBooks = await db.userLibraryBook.findMany({
      where: {
        userId: userId
      },
      include: {
        book: {
          include: {
            authors: true,
            industryIdentifiers: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return userLibraryBooks;
  } catch (error) {
    logger.error(error);
    return error;
  }
}