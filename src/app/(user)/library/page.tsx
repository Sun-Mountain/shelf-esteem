'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { LibraryBookProps } from '@/types';
import BookListItem from '@/components/BookListItem';

const Library = () => {
  const [loading, setLoading] = useState(true);
  const [bookData, setBookData] = useState([] as LibraryBookProps[]);
  const { data: session } = useSession();
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
    if (data) setLoading(false);
  }

  useEffect(() => {
    if (!userId) return;

    fetchBooks()
      .catch((error) => { console.error('Error:', error) });
  }, [userId])

  return (
    <section>
      <h1>Library</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {bookData.map((data, index) => (
            <BookListItem
              key={index}
              isbn={data.book.industryIdentifiers[0].identifier}
              id={userId}
              libraryBookData={data.book}
              showStatus={false}
              addedOn={data.createdAt}
            />
          ))}
        </>
      )}
    </section>
  )
}

export default Library