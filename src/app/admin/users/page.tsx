'use client';
import { useEffect, useState } from 'react';
import AdminDashListItem from '@/components/AdminDashListItem';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  const fetchStats = async () => {
    const userRes = await fetch(`/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const userData = await userRes.json();
    if (userData) setUsers(userData);
  }

  useEffect(() => {
    fetchStats()
      .catch((error) => { console.error('Error:', error) });
  }, []);
  return (
    <section>
      <h1>Users</h1>

      <div className="dash-list">
        {users && (
          <>
            {users.map((user) => (
              <AdminDashListItem key={user.id} user={user} />
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default AdminUsersPage;