import { CircularProgress } from '@mui/material';
import { Check, DoNotDisturb } from '@mui/icons-material';

interface CatalogItemProps {
  isbn: string;
  isbnIndex: number;
  bookData: any[];
}

const CatalogItem = ({
  isbn,
  isbnIndex,
  bookData
}: CatalogItemProps) => {

  let book

  if (bookData.length > 0) {
    if (!!bookData.find((book) => book.isbn === isbn)) {
      book = bookData.find((book) => book.isbn === isbn);
    }
  }

  return (
    <div className="catalog-item">
      <div className="item-label">
        {book ? (
          book.title ? book.title : isbn
        ) : (
          isbn
        )}
      </div>

      <div className='icon-container'>
        { book ? (
          book.found ? (
            <Check className="icon success" />
          ) : (
            <DoNotDisturb className="icon error" />
          )
        ) : (
          <CircularProgress disableShrink />
        )}
      </div>
    </div>
  )
}

export default CatalogItem