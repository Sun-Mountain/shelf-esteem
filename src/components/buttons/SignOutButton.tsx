'use client';
import { signOut } from 'next-auth/react';
import { ButtonUI as Button } from '@/src/components/ui/Button';

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