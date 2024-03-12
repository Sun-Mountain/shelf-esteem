'use client';

import Link from "next/link";
import { signOut } from 'next-auth/react';
import { Home } from "@mui/icons-material";
import Button from "@components/UI/Button";

const NavLinks = ({
  user
}) => {

  function handleSignOut () {
    console.log('Signing out...')
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`
    })
  };

  return (
    <>
      <Link className="link-w-icon" href="/">
        Home <Home />
      </Link>
      {user ? (
        <Button className='nav-link' buttonAction={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Link href="/sign-in">
          Sign In
        </Link>
      )}
    </>
  )
}

export default NavLinks;