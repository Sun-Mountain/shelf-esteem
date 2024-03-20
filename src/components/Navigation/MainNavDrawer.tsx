'use client';

import { useState } from 'react';
import { Drawer, IconButton } from '@mui/material';
import {
  Close,
  Menu
} from '@mui/icons-material';
import NavLinks from './MainNavLinks';
import { Session } from 'next-auth';

const MainNavDrawer = ({
  session
}: {
  session: Session | null
}) => {
  const [open, setOpen] = useState(false);

  return (
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
          <NavLinks user={session?.user} />
        </div>
      </Drawer>
    </div>
  )
}

export default MainNavDrawer