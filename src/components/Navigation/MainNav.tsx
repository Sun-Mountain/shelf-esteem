'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Drawer, IconButton } from '@mui/material';
import {
  AutoStoriesTwoTone,
  Close,
  Menu
} from '@mui/icons-material';
import NavLinks from './MainNavLinks';



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
            <div id="main-nav-drawer" className="nav-content">
              <div className="close-btn-container">
                <IconButton onClick={() => setOpen(false)}>
                  <Close />
                </IconButton>
              </div>
              <NavLinks />
            </div>
          </Drawer>
        </div>
        <div id="nav-link-group">
          <NavLinks />
        </div>
      </div>
    </nav>
  )
};

export default MainNavigation;