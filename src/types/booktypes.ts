export interface BookProps {
  isbn: string;
  found: boolean;
  enteredIsbn?: string;
  authors?: string[];
  categories?: string[];
  description?: string;
  industryIdentifiers: industryIdentifier[];
  language?: string;
  maturityRating?: string;
  pageCount?: number;
  publishedDate?: string;
  publisher?: string;
  thumbnail?: string;
  title?: string;
}