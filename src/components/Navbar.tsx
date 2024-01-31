import Link from 'next/link';
import { Button, buttonVariants } from './ui/Button';
import { AutoStoriesTwoTone } from '@mui/icons-material';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import UserAccountNav from './buttons/SignOutButton';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav>
      <div id="main-nav-content">
        <div className="icon-container">
          <Link href='/'>
            <AutoStoriesTwoTone className="icon" />
          </Link>
        </div>
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
