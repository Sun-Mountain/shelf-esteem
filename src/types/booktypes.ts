export interface IndustryIdentifierProps {
  type: string;
  identifier: string;
}

export interface BookSearchProps {
  isbn: string;
  found: boolean;
  enteredIsbn?: string;
  authors?: string[];
  categories?: string[];
  description?: string;
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  },
  industryIdentifiers: IndustryIdentifierProps[];
  language?: string;
  maturityRating?: string;
  pageCount?: number;
  publishedDate?: string;
  publisher?: string;
  thumbnail?: string;
  title?: string;
}