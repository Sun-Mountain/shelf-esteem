import { db } from '@/db/lib';
import { Book, Prisma } from '@prisma/client';
import { IndustryIdentifierProps } from '@/types/booktypes';
import { getLogger } from '@/lib/logger';

const logger = getLogger();

export type CategoryCreateInput = Prisma.CategoryCreateInput;

export type IndustryIdentifierCreateInput = Prisma.IndustryIdentifierCreateInput;

export type BookCategoryCreateInput = Prisma.BookCategoryCreateInput;

export type BookCreateInput = Prisma.BookCreateInput&{
  categories: string[] | undefined;
  industryIdentifiers: IndustryIdentifierCreateInput;
}

export type BookGetFullPayload = Prisma.BookGetPayload<{}>;

export type BookFull = BookGetFullPayload& {
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

    console.log(foundIndustryIdentifiers)

    return foundIndustryIdentifiers;
  } catch (error) {
    logger.error(error);
    return [];
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

export async function createCategories(categories: string[]): Promise<CategoryCreateInput[]> {
  let categoryList = categories.map(subject => subject.toUpperCase());

  categoryList = categoryList.map((category) => {
    let newCategory;
    newCategory = category.replace('-', ' ');
    if (!category.includes(':') && !category.includes(',')) {
      return newCategory;
    } else {
      return;
    }
  });

  categoryList = categoryList.filter((category) => category !== undefined);

  categoryList = [...new Set(categoryList)];

  const bookCategories = categoryList;

  const existingCategories = await findCategories(categoryList);

  if (existingCategories) {
    categoryList = categoryList.filter((category) => {
      const found = existingCategories.find((c) => c.name === category);
      return !found;
    });
  }

  await db.category.createMany({
    data: categoryList.map((category) => ({ name: category })),
  })

  return bookCategories;
}

export async function createBook(
  values: BookCreateInput
): Promise<BookFull | undefined> {
  const {
    title,
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

    if (categories && !!categories.length) {
      await createCategories(categories);
    }

    const newBook = await db.book.create({
      data: {
        authors,
        description,
        industryIdentifiers: {
          create: industryIdentifiers
        },
        language,
        maturityRating,
        pageCount,
        publishedDate,
        publishers: publisher,
        thumbnail: imageLinks?.thumbnail,
        title,
        addedBy
      }
    });

    const bookCategories = await findCategories(categories);

    if (bookCategories) {
      await db.bookCategory.createMany({
        data: bookCategories.map((category) => ({
          bookId: newBook.id,
          categoryName: category.name
        }))
      });
    }

    // const findBook = await findBookById(newBook.id);
    // return findBook;
  } catch (error) {
    logger.error(error);
    return;
  }
};
