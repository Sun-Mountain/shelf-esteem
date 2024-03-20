'use client';

import { useState } from 'react';
import { Drawer, IconButton } from '@mui/material';
import {
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp
} from '@mui/icons-material';
import Link from 'next/link';

const AdminNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <div id="admin-nav">
      <IconButton id="admin-drawer-btn" onClick={() => setOpen(true)}>
        {open ? <KeyboardDoubleArrowUp /> : <KeyboardDoubleArrowDown /> }
      </IconButton>
      <Drawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div id="admin-nav-drawer" className="nav-content">
          <Link href="/adminDash">
            Dashboard 
          </Link>
          <div className="close-btn-container">
            <IconButton onClick={() => setOpen(false)}>
              <KeyboardDoubleArrowUp />
            </IconButton>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default AdminNavigation;