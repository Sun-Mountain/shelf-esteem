'use client';

import { useState } from "react";
import { parse } from "isbn3";
import TextInput from "@/components/UI/TextInput";


const AddBookForm = ({
  userId
}: {
  userId: string;
}) => {
  const [isbn, setIsbn] = useState('');

  const handleChange = (value: string) => {
    setIsbn(value);
    // Validate the ISBN
    if (value >= 10 && parse(value).isValid) {
      const response = fetch('/api/books', {
        method: 'POST',
        body: JSON.stringify({ isbn: value.trim(), addedBy: userId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setIsbn('');
      }
    } else if (value > 9) {
      // setIsError(true);
    } else {
      return;
    }
  };

  return (
    <div className='form-container'>
      <div>
        <TextInput
          id='isbn'
          label='ISBN'
          onChange={(e) => handleChange(e.target.value)}
          value={isbn}
        />
      </div>
    </div>
  )
}

export default AddBookForm