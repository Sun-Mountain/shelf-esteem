'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { LibraryBookProps } from '@/types';
import BookListItem from '@/components/BookListItem';

const Library = () => {
  const [loading, setLoading] = useState(true);
  const [bookData, setBookData] = useState([] as LibraryBookProps[]);
  const [bookCount, setBookCount] = useState(0);
  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user.id;

  const fetchBooks = async () => {
    const response = await fetch(`/api/userLibraryBooks?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setBookData(data.userLibraryBooks);
    setBookCount(data.userLibraryBooks.length);
    if (data) setLoading(false);
  }

  useEffect(() => {
    if (!userId) return;

    fetchBooks()
      .catch((error) => { console.error('Error:', error) });
  }, [userId]);

  const changeBookCount = (bookNum: number, type: 'add' | 'sub') => {
    if (type === 'add') {
      setBookCount(bookCount + bookNum);
    } else {
      setBookCount(bookCount - bookNum);
    }
  };

  return (
    <section>
      <h1>Library</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="lib-stats-container">
            {bookCount} books in your library.
          </div>
          {bookData.map((data, index) => (
            <BookListItem
              key={index}
              isbn={data.book.industryIdentifiers[0].identifier}
              id={userId}
              libraryBookData={data.book}
              showStatus={false}
              addedOn={data.createdAt}
              defaultLibId={data.id}
              changeBookCount={changeBookCount}
            />
          ))}
        </>
      )}
    </section>
  )
}

export default Library