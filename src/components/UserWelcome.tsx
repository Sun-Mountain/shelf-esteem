'use client';

import { useSession } from 'next-auth/react';

const UserWelcome = () => {
  const { data: session } = useSession();
  const username = session?.user?.username;

  return (
    <section>
      <h2>
        Hello, {username}!
      </h2>
    </section>
  )
}

export default UserWelcome;