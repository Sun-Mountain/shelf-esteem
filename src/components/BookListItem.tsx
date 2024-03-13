import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

interface BookListItemProps {
  isbn: string;
}

const BookListItem = ({
  isbn
}: BookListItemProps) => {

  // useEffect(() => {
  //   // fetchBookStatus(isbn);
  //   fetch('/api/userLibraryBooks', {
  //     method: 'POST',
  //     body: JSON.stringify({ isbn }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then(response => console.log(response.json()))
    
  // }, [isbn]);

  return (
    <div className="book-list-item">
      <div className="book-info">
        {isbn}
      </div>
      <div className="status">
        <CircularProgress disableShrink />
      </div>
    </div>
  )
}

export default BookListItem;