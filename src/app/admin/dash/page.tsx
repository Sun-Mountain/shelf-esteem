'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Category,
  CollectionsBookmark,
  Group
} from '@mui/icons-material';

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
      <div className="stat-links">
        <Link href="/admin/users">
          <div className="icon-container">
            <Group />
          </div>
          <div className="text-container">
            Users
            {userNum && (
              <div className="number">({userNum})</div>
            )}
          </div>
        </Link>
        <Link href="/admin/books">
          <div className="icon-container">
            <CollectionsBookmark />
          </div>
          <div className="text-container">
            Books
            {booksNum && (
              <div className="number">({booksNum})</div>
            )}
          </div>
        </Link>
        <Link href="/admin/categories">
          <div className="icon-container">
            <Category />
          </div>
          <div className="text-container">
            Categories
          </div>
        </Link>
      </div>
    </section>
  )
}

export default AdminDash;