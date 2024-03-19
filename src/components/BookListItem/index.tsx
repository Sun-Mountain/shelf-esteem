'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CircularProgress, IconButton } from '@mui/material';
import { Check, DoNotDisturb } from '@mui/icons-material';

import { BookProps } from '@/types';
import BookData from './BookData';
import Button from '@components/UI/Button';
import DeleteModal from '@components/UI/DeleteModal';

interface BookListItemProps {
  isbn: string;
  id?: string;
  libraryBookData?: BookProps;
  showStatus?: boolean;
  addedOn?: Date;
  defaultLibId?: string;
  changeBookCount?: (bookNum: number, type: 'add' | 'sub') => void;
}

const BookListItem = ({
  isbn,
  id,
  libraryBookData,
  showStatus = true,
  addedOn,
  defaultLibId,
  changeBookCount
}: BookListItemProps) => {
  const [bookStatus, setBookStatus] = useState('' as string);
  const [bookData, setBookData] = useState(libraryBookData || {} as BookProps);
  const [authors, setAuthors] = useState([] as string[]);
  const [libraryId, setLibraryId] = useState(defaultLibId || '' as string);
  const [deleted, setDeleted] = useState(false);
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
      setLibraryId(data.libraryId);
    } else {
      setBookStatus('notInLibrary');
    }
  }

  useEffect(() => {
    if (!!libraryBookData) {
      const authors = libraryBookData.authors.map(author => author.authorName)
      setAuthors(authors);
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

  const removeBook = () => {
    setDeleted(true);
  }

  if (deleted) return null;

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
        {bookStatus === 'inLibrary' && libraryId && (
          <DeleteModal
            title={bookData?.title}
            libraryId={defaultLibId || libraryId}
            removeBook={removeBook}
            changeBookCount={changeBookCount}
          />
        )}
      </div>
    </div>
  )
}

export default BookListItem;