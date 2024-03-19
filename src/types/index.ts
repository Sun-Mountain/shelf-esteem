export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}

export interface AuthorProps {
  id: string;
  authorName: string;
  bookId: string;
}

export interface CategoryProps {
  id: string;
  categoryName: string;
  bookId: string;
}

export interface IndustryIdentifierProps {
  id: string;
  identifier: string;
  type: string;
  bookId: string;
}

export interface BookProps {
  id: string;
  description?: string;
  language?: string;
  maturityRating?: string;
  pageCount?: number;
  publishedDate?: string;
  publisher?: string;
  subtitle?: string;
  thumbnail?: string;
  title: string;
  addedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  authors: AuthorProps[];
  categories: CategoryProps[];
  industryIdentifiers: IndustryIdentifierProps[];
}

export interface LibraryBookProps {
  id: string;
  userId: string;
  bookId: string;
  createdAt: Date;
  book: BookProps;
}