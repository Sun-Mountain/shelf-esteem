'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CircularProgress } from '@mui/material';
import { Check, DoNotDisturb } from '@mui/icons-material';

interface BookListItemProps {
  isbn: string;
}

const BookListItem = ({
  isbn
}: BookListItemProps) => {
  const [bookStatus, setBookStatus] = useState('' as string);
  const [bookData, setBookData] = useState({} as any);
  const { data: session } = useSession();
  const userId = session?.user.id;

  const fetchBookData = async () => {
    const response = await fetch(`/api/userLibraryBooks?isbn=${isbn}&&userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log("Getting book....", data)
    const bookFound = data.bookFound;
    const book = data.book;

    if (bookFound) {
      setBookStatus('inLibrary');
      setBookData(book);
    } else {
      setBookStatus('notInLibrary');
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchBookData()
        .catch((error) => { console.error('Error:', error) });
    }, 1000)
  }, [isbn, userId]);


  const bookStatusDisplay = () => {
    switch (bookStatus) {
      case 'inLibrary':
        return <Check className="icon icon-success" />;
      case 'notInLibrary':
        return <DoNotDisturb className="icon icon-error" />;
      default:
        return <CircularProgress disableShrink />;
    }
  };

  return (
    <div className="book-list-item">
      <div className="book-info">
        { bookData ? (
          <>
           { bookData.thumbnail && (
              <div className="thumbnail-container">
                <img
                  src={bookData.thumbnail}
                  alt={bookData.title}
                  className="book-thumbnail"
                />
              </div>
           )}
            { bookData.title || isbn }
          </>
        ) : ( isbn )}
      </div>
      <div className="status">
        { bookStatusDisplay() }
      </div>
    </div>
  )
}

export default BookListItem;