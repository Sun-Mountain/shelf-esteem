'use client';

import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { useSession } from 'next-auth/react';
import { createUserLibraryBook } from "@lib/queries";
import { parse } from "isbn3";
import { TextField } from "@mui/material";

interface BookFormProps {
  isbnList: string[];
  setIsbnList: Dispatch<SetStateAction<string[]>>;
}

const TheBookForm = ({
  isbnList,
  setIsbnList
}: BookFormProps) => {
  const [error, setError] = useState<string>('');
  const [isbn, setIsbn] = useState<string>('');
  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user.id;

  const handleChange = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    const isbn = event.target.value.trim();

    if (isbnList.includes(isbn)) {
      setError('This ISBN is already in the list');
      return;
    }

    if (parse(isbn) && userId) {
      setError('');
      setIsbnList([...isbnList, isbn]);
      await createUserLibraryBook(isbn, userId);
      setTimeout(() => {
        setIsbn('');
      }, 100);
      return;
    }

    if (!parse(isbn)) {
      setError('Invalid ISBN');
    }

    if (isbn === '') {
      setError('');
    }
  };

  return (
    <div className="form-container">
      <TextField
        error={!!error}
        fullWidth
        helperText={error ? error : "Please enter a valid ISBN."}
        id='isbn'
        label='ISBN'
        value={isbn || ""}
        onChange={(e) => {
          handleChange(e)
          setIsbn(e.target.value)
        }}
      />
    </div>
  )
}

export default TheBookForm;