'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Drawer, IconButton } from '@mui/material';
import { AutoStoriesTwoTone, Menu } from '@mui/icons-material';

const MainNavigation = () => {
  const [open, setOpen] = useState(false);

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
        <div id="drawer-container">
          <IconButton onClick={() => setOpen(true)}>
            <Menu />
          </IconButton>
          <Drawer
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}
          >
            <div className="nav-content">
              <Link href="/about">
                About
              </Link>
              <Link href="/contact">
                Contact
              </Link>
            </div>
          </Drawer>
        </div>
        <div id="nav-link-group">
          <Link href="/about">
            About
          </Link>
          <Link href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
};

export default MainNavigation;