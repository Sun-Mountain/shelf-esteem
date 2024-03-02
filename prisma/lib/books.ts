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
  console.log(industryIdentifiers)

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

export async function findCategories(
  categories: (Prisma.BookCategoryCreateNestedManyWithoutBookInput & string[]) | undefined
): Promise<{name: string}[] | undefined> {
  if (!categories) return;

  try {
    const foundCategories = await db.category.findMany({
      where: {
        name: {
          in: categories.map((c) => c)
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

export async function createCategories(subjects: string[]): Promise<CategoryCreateInput[]> {
  let categoryList = subjects.map(subject => subject.name.toLowerCase());

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
    number_of_pages,
    identifiers,
    language,
    publishers,
    publish_date,
    subjects,
    cover,
    addedBy
  } = values;
  try {
    let categoryList;
    let industryIdentifiers;

    if (subjects.length > 0) {
      categoryList = await createCategories(subjects);
    }

    if (identifiers) {
      const keys = Object.keys(identifiers);
      industryIdentifiers = keys.map((key) => ({
        identifier: identifiers[key][0],
        type: key,
      }));
    }

    const newBook = await db.book.create({
      data: {
        authors: authors.map(a => a.name),
        categories: {
          create: categoryList?.map((c) => ({ categoryName: c })),
        },
        industryIdentifiers: {
          create: industryIdentifiers,
        },
        language,
        pageCount: number_of_pages,
        publishedDate: publish_date,
        publishers: publishers.map(p => p.name),
        thumbnail: cover.medium,
        title,
        addedBy
      }
    })

    const findBook = await findBookById(newBook);
    return findBook;
  } catch (error) {
    logger.error(error);
    return;
  }
};
