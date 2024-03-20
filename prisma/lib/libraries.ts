import { db } from '@db/lib';
import { UserLibraryBook, Prisma } from '@prisma/client';
import { getLogger } from '@lib/logger';

const logger = getLogger();

export type UserLibraryBookCreateInput = Prisma.UserLibraryBookCreateInput;

export type UserLibraryBookGetFullPayload = Prisma.UserLibraryBookGetPayload<{}>;

export async function findUserLibraryBook(bookId: string, userId: string): Promise<UserLibraryBookGetFullPayload | undefined> {
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
    return;
  }
}

export async function createUserLibraryBook({ bookId, userId }: {
  bookId: string;
  userId: string;
}): Promise<UserLibraryBookGetFullPayload | undefined> {
  try {
    const createdUserLibraryBook = await db.book.update({
      where: { id: bookId },
      data: {
        libraries: {
          create: {
            userId: userId,
          }
        }
      }
    });

    const foundUserLibraryBook = await findUserLibraryBook(bookId, userId);

    return foundUserLibraryBook;
  } catch (error) {
    logger.error(error);
    return;
  }
}

export async function getUserLibraryBooks(userId: string): Promise<UserLibraryBookGetFullPayload[] | undefined> {
  try {
    const userLibraryBooks = await db.userLibraryBook.findMany({
      where: {
        userId: userId
      },
      include: {
        book: {
          include: {
            authors: true,
            categories: true,
            industryIdentifiers: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return userLibraryBooks;
  } catch (error) {
    logger.error(error);
    return;
  }
}

export async function deleteUserLibraryBook(id: string): Promise<UserLibraryBookGetFullPayload | undefined> {
  try {
    const deletedUserLibraryBook = await db.userLibraryBook.delete({
      where: { id }
    });

    return deletedUserLibraryBook;
  } catch (error) {
    logger.error(error);
    return;
  }
};