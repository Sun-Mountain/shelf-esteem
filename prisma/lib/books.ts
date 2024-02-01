import { db } from "@/lib/db";
import { Book, Prisma } from '@prisma/client';

export type BookCreateInput = Prisma.BookCreateInput;

async function createBook(data: BookCreateInput): Promise<Book> {
  try {
    return db.book.create({ data });
  } catch (error) {
    throw new Error(`Could not create book: ${error}`);
  }
}