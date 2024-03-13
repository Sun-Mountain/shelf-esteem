import { db } from '@db/lib';
import { Book, Prisma } from '@prisma/client';
import type { AuthorBook as AuthorBookProps } from '@prisma/client';
import { AuthorProps, IndustryIdentifierProps } from '@types/booktypes';
import { getLogger } from '@lib/logger';

const logger = getLogger();

export type AuthorCreateInput = Prisma.AuthorBookCreateOrConnectWithoutBookInput;

export type CategoryCreateInput = Prisma.CategoryCreateInput;

export type IndustryIdentifierCreateInput = Prisma.IndustryIdentifierCreateInput;

export type BookCategoryCreateInput = Prisma.BookCategoryCreateInput;

export type BookCreateInput = Prisma.BookCreateInput&{
  authors: AuthorCreateInput;
  categories: string[] | undefined;
  industryIdentifiers: IndustryIdentifierCreateInput;
}

export type BookGetFullPayload = Prisma.BookGetPayload<{}>;

export type BookFull = BookGetFullPayload& {
  authors: AuthorBookProps[];
  categories: string[] | undefined;
  industryIdentifiers: IndustryIdentifierProps[];
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
  authors: AuthorCreateInput[]
): Promise<AuthorProps[]> {
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
      categories: true,
      industryIdentifiers: true,
    },
  });

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
    categories,
    industryIdentifiers,
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
      if (bookCategories?.length < categories.length) {
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
      if (existingAuthors?.length < authors.length) {
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
