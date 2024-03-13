import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { CircularProgress } from '@mui/material';

interface BookListItemProps {
  isbn: string;
}

const BookListItem = ({
  isbn
}: BookListItemProps) => {
  const { data: session } = useSession();
  

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