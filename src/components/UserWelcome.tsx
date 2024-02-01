'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { BookmarkAddTwoTone, LocalLibrary } from '@mui/icons-material';

const UserWelcome = () => {
  const { data: session } = useSession();
  const username = session?.user?.username;

  return (
    <section id="user-welcome">
      <h2>
        Hello, {username}!
      </h2>
      <div className="button-container">
        <Button
          startIcon={<LocalLibrary />}
          href="/library"
        >
          Your Library
        </Button>

        <Button
          startIcon={<BookmarkAddTwoTone />}
          href="/books/new"
        >
          Add a Book
        </Button>
      </div>
    </section>
  )
}

export default UserWelcome;