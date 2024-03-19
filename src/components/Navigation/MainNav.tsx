'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Drawer, IconButton } from '@mui/material';
import { AutoStoriesTwoTone } from '@mui/icons-material';
import NavLinks from './MainNavLinks';
import MainNavDrawer from './MainNavDrawer';

const MainNavigation = () => {
  const { data: session, status } = useSession();
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
        <MainNavDrawer session={session} />
        <div id="nav-link-group">
          <NavLinks user={session?.user} />
        </div>
      </div>
    </nav>
  )
};

export default MainNavigation;