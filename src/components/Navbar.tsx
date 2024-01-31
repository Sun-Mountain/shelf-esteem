import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import UserAccountNav from './buttons/UserAccountNav';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div>
        <Link href='/'>
          <HandMetal />
        </Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link href='/sign-in'>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
