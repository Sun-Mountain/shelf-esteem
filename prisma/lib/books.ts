import { db } from '@/db/lib';
import { Book, Prisma } from '@prisma/client';
import { FieldRef } from '@prisma/client/runtime/library';
import { IndustryIdentifierProps } from '@/types/booktypes';
import { getLogger } from '@/lib/logger';

const logger = getLogger();

export type CategoryCreateInput = Prisma.CategoryCreateInput;

export type IndustryIdentifierCreateInput = Prisma.IndustryIdentifierCreateInput;

export type BookCategoryCreateInput = Prisma.BookCategoryCreateInput;

export type BookCreateInput = Prisma.BookCreateInput&{
  categories: string[] | undefined;
  industryIdentifiers: IndustryIdentifierCreateInput;
};

export type BookGetFullPayload = Prisma.BookGetPayload<{}>;

export type BookFull = BookGetFullPayload&{
  categories: string[] | undefined;
  industryIdentifiers: IndustryIdentifierProps[];
}

export async function getIndustryIdentifiers(industryIdentifiers: IndustryIdentifierCreateInput[]): Promise<Prisma.IndustryIdentifierCreateInput[]> {
  const result = await db.industryIdentifier.findMany({
    where: {
      identifier: {
        in: industryIdentifiers.map((ii) => ii.identifier)
      }
    }
  });
  return result;
}

export async function getCategories(
  categories: (Prisma.BookCategoryCreateNestedManyWithoutBookInput & string[]) | undefined
): Promise<{name: string}[] | undefined> {
  if (!categories) {
    return;
  }
  const result = await db.category.findMany({
    where: {
      name: {
        in: categories.map((c) => c)
      }
    }
  });
  return result;
};

export async function getBook(id: string): Promise<BookFull | undefined> {
  const book = await db.book.findUnique({
    where: {
      id
    },
    include: {
      industryIdentifiers: true,
      categories: true
    }
  });

  if (!book) {
    return;
  }

  const categories = book.categories.map((c) => c.categoryName);

  return {
    ...book,
    categories: categories,
    industryIdentifiers: book.industryIdentifiers.map((ii) => ({
      type: ii.type,
      identifier: ii.identifier
    }))
  };
}

export async function createBook(values: BookCreateInput): Promise<BookFull | undefined> {
  const {
    categories,
    industryIdentifiers,
    ...book
  } = values;

  try {

    const existingCategories = await getCategories(categories);
    if (existingCategories && categories && existingCategories.length < categories.length) {
      const newCategories = categories.filter((c) => !existingCategories.some((ec) => ec.name === c));
      await db.category.createMany({
        data: newCategories.map((c) => ({ name: c }))
      });
    }
  
    const newBook = await db.book.create({
      data: {
        id: book.id,
        authors: book.authors,
        description: book.description,
        industryIdentifiers: {
          create: industryIdentifiers
        },
        language: book.language,
        maturityRating: book.maturityRating,
        pageCount: book.pageCount,
        publishedDate: book.publishedDate,
        publisher: book.publisher || "Publisher not available",
        thumbnail: book.thumbnail,
        title: book.title,
        addedBy: book.addedBy
      },
      include: {
        industryIdentifiers: true,
      }
    });

    if (newBook && categories && categories.length > 0) {
      const bookCategories = categories.map((c) => ({ categoryName: c, bookId: newBook.id }));
      await db.bookCategory.createMany({
        data: bookCategories,
        skipDuplicates: true,
      });
    }
    
    const findBook = await getBook(newBook.id);
    return findBook;
  } catch (error) {
    logger.error(error);
    return;
  }  
}