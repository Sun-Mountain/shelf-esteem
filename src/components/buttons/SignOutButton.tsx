
'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const UserAccountNav = () => {

  function handleSignOut(e: any) {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`
    })
  }

  return (
    <>
      <Button buttonAction={handleSignOut}>
        Sign Out
      </Button>
    </>
  )
};

export default UserAccountNav;