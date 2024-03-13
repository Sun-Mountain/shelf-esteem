'use client';

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
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

  const handleChange = async (value: string) => {
    event.preventDefault();
    const isbn = value;

    if (isbnList.includes(isbn)) {
      setError('This ISBN is already in the list');
    }

    if (parse(isbn)) {
      setError('');
      setIsbnList([...isbnList, isbn]);
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
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

export default TheBookForm;