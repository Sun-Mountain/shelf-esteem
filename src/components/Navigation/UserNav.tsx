'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Button from '@/components/UI/Button';

const UserNav = () => {

  function handleSignOut () {
    console.log('Signing out...')
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`
    })
  };

  return (
    <>
      <Link className='nav-link' href="/library">
        Library
      </Link>
      <Button className='nav-link' buttonAction={handleSignOut}>
        Sign Out
      </Button>
    </>
  )
}

export default UserNav;