'use client';

import { useState } from 'react';
import { IconButton, Modal } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Button from './Button';

interface DeleteModalProps {
  title: string;
  libraryId: string;
  removeBook: () => void;
  changeBookCount?: (bookNum: number, type: 'add' | 'sub') => void;
}

const DeleteModal = ({
  title,
  libraryId,
  removeBook,
  changeBookCount
}: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    console.log('Delete book with id:', libraryId);
    const response = await fetch(`/api/userLibraryBooks?id=${libraryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    if (data.status === 200) {
      if (changeBookCount) changeBookCount(1, 'sub');
      removeBook();
      handleClose();
    };
  };

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
            <h3 id="modal-modal-title">Delete Book</h3>
            <p id="modal-modal-description">Are you sure you want to delete <strong>{title}</strong>?</p>
            <div className="button-container">
              <Button
                buttonAction={handleClose}
                variant="text"
              >
                Cancel
              </Button>
              <Button
                buttonAction={handleDelete}
                color="error"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>      
      </Modal>
    </div>
  )
}

export default DeleteModal;