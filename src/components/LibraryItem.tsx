import { CircularProgress } from '@mui/material';
import { Check, Close, DoNotDisturb } from '@mui/icons-material';
import { Button } from '@/components/ui/button';

interface LibraryItemProps {
  index: number;
  isbn: string;
  isbnIndex: number;
  bookData: any[];
  removeData: (index: number) => void;
}

const LibraryItem = ({
  index,
  isbn,
  isbnIndex,
  bookData,
  removeData
}: LibraryItemProps) => {

  let book

  if (bookData.length > 0) {
    if (!!bookData.find((book) => book.isbn === isbn)) {
      book = bookData.find((book) => book.isbn === isbn);
    }
  }

  function handleRemoveData() {
    removeData(index);
  }

  return (
    <div className="library-item">
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

      <div>
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
        <Button
          buttonAction={handleRemoveData}
          color="error"
          variant="text"
        >
          <Close className="icon" />
        </Button>
      </div>
    </div>
  )
}

export default LibraryItem