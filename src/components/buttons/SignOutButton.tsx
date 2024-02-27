
'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const UserAccountNav = () => {

  function handleSignOut(e: any) {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`
    })
  }

  return (
    <div className='nav-link-group'>
      <Link className='nav-link' href="/dashboard">
        Dashboard
      </Link>
      <Link className='nav-link' href="/library">
        My Library
      </Link>
      <Button className='nav-link' buttonAction={handleSignOut}>
        Sign Out
      </Button>
    </div>
  )
};

export default UserAccountNav;