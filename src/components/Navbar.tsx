import Link from 'next/link';
import { Button, buttonVariants } from './ui/Button';
import { MenuBookOutlined } from '@mui/icons-material';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import UserAccountNav from './buttons/SignOutButton';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav>
      <div>
        <Link href='/'>
          <MenuBookOutlined />
        </Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link href='/sign-in'>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
