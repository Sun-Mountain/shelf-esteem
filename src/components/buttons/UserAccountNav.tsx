'use client';
import { signOut } from 'next-auth/react';
import { ButtonUI as Button } from '@/components/ui/Button';

const UserAccountNav = () => {

  return (
    <>
      <Button onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`
      })}>
        Sign Out
      </Button>
    </>
  )
};

export default UserAccountNav;