import BookItemProps from '@/types';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const BookListItem = ({
  book
}: {
  book: BookItemProps
}) => {
  const authors = book.authors.map((author) => author.authorName).join(', ');
  return (
    <div className="library-book-item" key={book.id}>
      <div className="item-info">
        <div className="thumbnail-container">
          <img src={book.thumbnail} alt={book.title} />
        </div>
        <div className="book-info">
          <div>{book.title}</div>
          <div className="isbn-container">{book.isbn}</div>
          <div>{authors}</div>
        </div>
      </div>
      <div className="item-actions">
        <IconButton>
          <Close />
        </IconButton>
      </div>
    </div>
  );
}

export default BookListItem