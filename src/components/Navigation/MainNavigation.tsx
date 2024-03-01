import Link from 'next/link';
import { getServerSession } from "next-auth";
import { AutoStoriesTwoTone } from '@mui/icons-material';
import { authOptions } from "@/lib/authOptions";
import UserNav from '@/components/Navigation/UserNav';

async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

const MainNavigation = async () => {
  const session = await getSession();

  return (
    <nav>
      <div id="main-navigation">
        <div className="icon-container">
          <Link href='/'>
            <AutoStoriesTwoTone className="icon" />
          </Link>
        </div>
        <div className='nav-link-group'>
        {session?.user ? (
          <UserNav />
        ) : (
            <Link href='/sign-in'>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
};

export default MainNavigation;