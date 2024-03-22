'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const AdminDash = () => {
  const [userNum, setUserNum] = useState();
  const [booksNum, setBooksNum] = useState();

  const fetchStats = async () => {
    const userRes = await fetch(`/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const userData = await userRes.json();
    if (userData) setUserNum(userData.length);

    const bookRes = await fetch(`/api/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const bookData = await bookRes.json();
    if (bookData) setBooksNum(bookData.length);
  }

  useEffect(() => {
    fetchStats()
      .catch((error) => { console.error('Error:', error) });
  }, []);

  return (
    <section>
      <h1>Admin Dashboard</h1>
      <div className="">
        <Link href="/admin/users">
          Users {userNum && (
            <span>({userNum})</span>
          )}
        </Link>
        <Link href="/admin/books">
          Books {booksNum && (
            <span>({booksNum})</span>
          )}
        </Link>
      </div>
    </section>
  )
}

export default AdminDash;