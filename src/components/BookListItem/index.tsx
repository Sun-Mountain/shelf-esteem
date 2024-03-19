'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CircularProgress } from '@mui/material';
import { Check, DoNotDisturb } from '@mui/icons-material';

import BookData from './BookData';
import { BookProps } from '@/types';

interface BookListItemProps {
  isbn: string;
  id?: string;
  libraryBookData?: BookProps;
  showStatus?: boolean;
  addedOn?: Date;
}

const BookListItem = ({
  isbn,
  id,
  libraryBookData,
  showStatus = true,
  addedOn
}: BookListItemProps) => {
  const [bookStatus, setBookStatus] = useState('' as string);
  const [bookData, setBookData] = useState(libraryBookData || {} as BookProps);
  const [authors, setAuthors] = useState([] as string[]);
  const { data: session } = useSession();
  const userId = session?.user.id;

  const fetchBookData = async () => {
    const response = await fetch(`/api/userLibraryBooks/${userId}?isbn=${isbn}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    const bookFound = data.bookFound;
    const book = data.book;
    
    if (bookFound) {
      const authors = book.authors.map(author => author.authorName)
      setBookStatus('inLibrary');
      setBookData(book);
      setAuthors(authors);
    } else {
      setBookStatus('notInLibrary');
    }
  }

  useEffect(() => {
    if (!!libraryBookData) {
      const authors = libraryBookData.authors.map(author => author.authorName)
      setAuthors(authors);
      setBookData(libraryBookData);
      setBookStatus('inLibrary');
      return;
    };

    if (!userId) return;

    setTimeout(() => {
      fetchBookData()
        .catch((error) => { console.error('Error:', error) });
    }, 1000)
  }, [isbn]);


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
          <BookData
            authors={authors}
            isbn={isbn}
            thumbnail={bookData?.thumbnail}
            title={bookData?.title}
            subtitle={bookData?.subtitle}
            addedOn={addedOn}
          />
        ) : ( isbn )}
      </div>
      <div className="status">
        {showStatus && bookStatusDisplay() }
      </div>
    </div>
  )
}

export default BookListItem;