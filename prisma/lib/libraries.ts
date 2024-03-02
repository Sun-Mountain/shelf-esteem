import { db } from '@/db/lib';
import { UserLibraryBook, Prisma } from '@prisma/client';
import { getLogger } from '@/lib/logger';

const logger = getLogger();

export type UserLibraryBookCreateInput = Prisma.UserLibraryBookCreateInput;

export type UserLibraryBookGetFullPayload = Prisma.UserLibraryBookGetPayload<{}>;

export async function findUserLibraryBook({ bookId, userId }): Promise<UserLibraryBookGetFullPayload[]> {
  try {
    const foundUserLibraryBooks = await db.userLibraryBook.findUnique({
      where: {
        AND: [
          bookId,
          userId
        ]
      },
    });

    return foundUserLibraryBooks;
  } catch (error) {
    logger.error(error);
    return [];
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

    console.log(foundUserLibraryBook)

    return foundUserLibraryBook;
  } catch (error) {
    logger.error(error);
    return error;
  }
}