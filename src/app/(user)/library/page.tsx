'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { LibraryBookProps } from '@/types';

const Library = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([] as LibraryBookProps[]);
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
    setBooks(data);
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
        <p>Not loading</p>
      )}
    </section>
  )
}

export default Library