'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const UserAccountNav = () => {

  return (
    <>
      <Button buttonAction={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`
      })}>
        Sign Out
      </Button>
    </>
  )
};

export default UserAccountNav;