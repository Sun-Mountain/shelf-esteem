import { db } from '@/db/lib';
import { Book, Prisma } from '@prisma/client';
import { IndustryIdentifierProps } from '@/lib/types';
import { getLogger } from '@/lib/logger';

const logger = getLogger();

export type CategoryCreateInput = Prisma.CategoryCreateInput;

export type IndustryIdentifierCreateInput = Prisma.IndustryIdentifierCreateInput;

export type BookCategoryCreateInput = Prisma.BookCategoryCreateInput;

export type BookCreateInput = Prisma.BookCreateInput&{
  categories: CategoryCreateInput;
  industryIdentifiers: IndustryIdentifierCreateInput;
};

export type BookGetFullPayload = Prisma.BookGetPayload<{
  include: {
    industryIdentifiers: true;
    categories: true;
  }
}>;

export type BookFull = BookGetFullPayload&{
  categories: string[];
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

export async function getCategories(categories: CategoryCreateInput[]): Promise<Prisma.CategoryCreateInput[]> {
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
      OR: [
        { id },
        { industryIdentifiers: { some: { identifier: id } } }
      ]
    },
    include: {
      industryIdentifiers: true,
      categories: true
    }
  });

  if (!book) {
    return;
  }

  return {
    ...book,
    categories: book.categories.map((c) => c.categoryName),
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
  
    if (existingCategories.length < categories.length) {
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
        publisher: book.publisher,
        thumbnail: book.thumbnail,
        title: book.title,
        addedBy: 'test'
      },
      include: {
        industryIdentifiers: true,
      }
    });

    if (newBook && categories.length > 0) {
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
    if (e instanceof Prisma.PrismaClientValidationError) {
      throw e;
    }
  }  
}