
'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Notification from '@/components/Notification';

const UserAccountNav = () => {

  const handleSignOut = async (e: any) => {
    Notification({
      message: 'Signing Out...',
      toastId: 'sign-out-loading',
    })
    const response = await signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`
    })

    Notification({ type: 'dismiss' });
    if (response) {
      Notification({
        type: 'success',
        message: 'You have been successfully signed out.',
        toastId: 'sign-out-toast',
      });
    } else {
      Notification({
        type: 'error',
        message: 'Error signing out',
        toastId: 'sign-out-toast'
      });
    }
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