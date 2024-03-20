'use client';

import Link from 'next/link';
import { Role } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Drawer, IconButton } from '@mui/material';
import { AutoStoriesTwoTone } from '@mui/icons-material';
import NavLinks from './MainNavLinks';
import MainNavDrawer from './MainNavDrawer';
import AdminNavigation from './Admin';

const MainNavigation = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const isUser = user?.role === Role.USER;
  const isAdmin = user?.role === Role.ADMIN;

  return (
    <>
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
            <NavLinks user={user} />
          </div>
        </div>
      </nav>

      {isAdmin && (
        <AdminNavigation />
      )}
    </>
  )
};

export default MainNavigation;