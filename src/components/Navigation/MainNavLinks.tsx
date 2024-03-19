'use client';

import Link from "next/link";
import { signOut } from 'next-auth/react';
import { BookmarkAdd, Home, LibraryBooks } from "@mui/icons-material";
import Button from "@components/UI/Button";

const NavLinks = ({
  user
}: {
  user: any
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
        <>
          <Link className="link-w-icon" href="/library">
            My Library <LibraryBooks />
          </Link>
          <Link className="link-w-icon" href="/addBook">
            Add Books <BookmarkAdd />
          </Link>
          <div className="sign-out-container">
            <Button className='nav-link' buttonAction={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </>
      ) : (
        <Link href="/sign-in">
          Sign In
        </Link>
      )}
    </>
  )
}

export default NavLinks;