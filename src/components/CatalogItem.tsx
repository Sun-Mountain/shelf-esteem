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
      <div className='item-info'>
        {book?.thumbnail ? (
          <img
            className="item-thumbnail"
            src={book.thumbnail}
            alt={book.title}
          />
        ) : null}
        <div className="item-label">
          <div className='item-title'>
            {book ? (
              book.title ? book.title : isbn
            ) : (
              isbn
            )}
          </div>
          {book?.found ? (
            <div className="item-author">
              {book.authors ? book.authors.join(', ') : 'Author not found'}
            </div>
          ) : null}
          {book?.title && (
            <div className="item-isbn">
              {book.isbn}
            </div>
          )}
        </div>
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