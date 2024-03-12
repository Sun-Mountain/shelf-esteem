import Link from 'next/link';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Drawer, IconButton } from '@mui/material';
import { AutoStoriesTwoTone } from '@mui/icons-material';
import NavLinks from './MainNavLinks';
import MainNavDrawer from './MainNavDrawer';

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
          <Link href="/">
            <div className="home-icon">
              <AutoStoriesTwoTone className="icon" />
            </div>
          </Link>
        </div>
        <div id="nav-link-group">
          <NavLinks user={session?.user} />
        </div>
      </div>
    </nav>
  )
};

export default MainNavigation;