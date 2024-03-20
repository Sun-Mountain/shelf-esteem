import { db } from '@db/lib';
import {
  Book,
  Prisma
} from '@prisma/client';
import type { AuthorBook as AuthorBookProps } from '@prisma/client';

import { getLogger } from '@lib/logger';

interface IndustryIdentifierProps {
  id: string;
  identifier: string;
  type: string;
  bookId: string;
}

interface AuthorProps {
  id: string;
  authorName: string;
  bookId: string;
}

const logger = getLogger();

export type AuthorCreateInput = Prisma.AuthorBookCreateOrConnectWithoutBookInput;

export type CategoryCreateInput = Prisma.CategoryCreateInput;

export type IndustryIdentifierCreateInput = Prisma.IndustryIdentifierCreateInput;

export type BookCategoryCreateInput = Prisma.BookCategoryCreateInput;

export type BookCreateInput = Prisma.BookCreateInput&{
  addedBy: string;
  authors: string[] | undefined;
  categories: string[] | undefined;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  industryIdentifiers: IndustryIdentifierCreateInput;
}

export type BookGetFullPayload = Prisma.BookGetPayload<{}>;

export type BookFull = BookGetFullPayload& {
  authors: { id: string; authorName: string; }[];
  categories: string[] | undefined;
  industryIdentifiers: { identifier: string; type: string; }[];
};

export async function findIndustryIdentifiers(industryIdentifiers: IndustryIdentifierCreateInput[]): Promise<IndustryIdentifierCreateInput[]> {
  try {
    const foundIndustryIdentifiers = await db.industryIdentifier.findMany({
      where: {
        OR: industryIdentifiers.map((ii) => ({
          identifier: ii.identifier.trim(),
          type: ii.type,
        })),
      },
    });

    return foundIndustryIdentifiers;
  } catch (error) {
    logger.error(error);
    return [];
  }
}

export async function findAuthors(
  authors: string[] | undefined
): Promise<{ id: string; name: string; }[] | undefined> {
  if (!authors) return;

  try {
    const foundAuthors = await db.author.findMany({
      where: {
        name: {
          in: authors.map((a) => a)
        }
      }
    });

    return foundAuthors;
  } catch (error) {
    logger.error(error);
    return;
  }
}

export async function findCategories(
  categories: (Prisma.BookCategoryCreateNestedManyWithoutBookInput & string[]) | undefined
): Promise<{name: string}[] | undefined> {
  if (!categories) return;

  try {
    const foundCategories = await db.category.findMany({
      where: {
        name: {
          in: categories.map((c) => c.toUpperCase())
        }
      }
    });

    return foundCategories;
  } catch (error) {
    logger.error(error);
    return;
  }
}

export async function findBookById(id: string): Promise<BookFull | undefined> {
  const book = await db.book.findUnique({
    where: { id },
    include: {
      authors: true,
      categories: true,
      industryIdentifiers: true,
    },
  });

  if (!book) return;

  const authors = book?.authors.map((a) => ({
    id: a.id,
    authorName: a.authorName
  }));

  const categories = book?.categories.map((c) => ({
    categoryId: c.id,
    category: c.categoryName
  }));

  const industryIdentifiers = book?.industryIdentifiers.map((ii) => ({
    identifier: ii.identifier,
    type: ii.type,
  }));

  return {
    ...book,
    authors,
    categories: categories.map((c) => c.category),
    industryIdentifiers
  };
};

export async function createBook(
  values: BookCreateInput
): Promise<BookFull | undefined> {
  const {
    title,
    subtitle,
    authors,
    description,
    categories,
    pageCount,
    industryIdentifiers,
    language,
    maturityRating,
    publisher,
    publishedDate,
    imageLinks,
    addedBy
  } = values;

  try {
    const newBook = await db.book.create({
      data: {
        title,
        subtitle,
        description,
        pageCount,
        language,
        maturityRating,
        publisher,
        publishedDate,
        thumbnail: imageLinks?.thumbnail,
        addedBy,
        industryIdentifiers: {
          create: industryIdentifiers,
        },
      }
    });

    if (!!categories && newBook) {
      const bookCategories = await findCategories(categories);
      if (bookCategories && bookCategories.length < categories.length) {
        const newCategories = categories.filter((c) => !bookCategories.some((ec) => ec.name === c));
        await db.category.createMany({
          data: newCategories.map((c) => ({ name: c.toUpperCase() }))
        });
      }
  
      if (categories?.length > 0) {
        const bookCategoryMatches = categories.map((c) => ({ categoryName: c.toUpperCase(), bookId: newBook.id }));
        await db.bookCategory.createMany({
          data: bookCategoryMatches,
          skipDuplicates: true,
        });
      }
    }

    if (authors && newBook) {
      const existingAuthors = await findAuthors(authors);
      if (existingAuthors && existingAuthors.length < authors.length) {
        const newAuthors = authors.filter((a) => !existingAuthors.some((ea) => ea.name === a));
        await db.author.createMany({
          data: newAuthors.map((a) => ({ name: a }))
        });
      }
  
      if (authors?.length > 0) {
        const authorBookMatches = authors.map((a) => ({ authorName: a, bookId: newBook.id }));
        await db.authorBook.createMany({
          data: authorBookMatches,
          skipDuplicates: true,
        });
      }
    }

    const findBook = await findBookById(newBook.id);
    return findBook;
  } catch (error) {
    logger.error(error);
    return;
  }
};
