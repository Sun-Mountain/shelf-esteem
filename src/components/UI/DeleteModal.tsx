'use client';

import { useState } from 'react';
import { IconButton, Modal } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Button from './Button';

const DeleteModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Delete />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        className="delete-modal"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-container">
          <div className="modal-content">
            <h2 id="modal-modal-title">Delete Book</h2>
            <p id="modal-modal-description">Are you sure you want to delete this book?</p>
            <Button buttonAction={handleClose}>Cancel</Button>
            <Button>Delete</Button>
          </div>
        </div>      
      </Modal>
    </div>
  )
}

export default DeleteModal;