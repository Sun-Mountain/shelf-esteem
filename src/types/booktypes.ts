import type { AuthorBook } from "@prisma/client";

export interface IndustryIdentifierProps {
  type: string;
  identifier: string;
}

export interface AuthorProps {
  id: string;
  name: string;
  books: AuthorBook;
}

export interface BookItemProps {
  id: string,
  authors: AuthorProps[],
  isbn: string,
  thumbnail: string,
  title: string
}

export interface RecentlyAddedBooksProps {
  recentlyAdded: BookItemProps
}
