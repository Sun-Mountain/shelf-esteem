'use client';

import { useState } from "react";
import TextInput from "@/components/UI/TextInput";
import { parse } from "isbn3";


const AddBookForm = ({
  userId
}: {
  userId: string;
}) => {
  const [isError, setIsError] = useState(false);
  const errorText = 'Please enter a valid ISBN';

  const handleChange = (value: string) => {
    setIsError(false);
    // Validate the ISBN
    if (value >= 10 && parse(value).isValid) {
      const response = fetch('/api/books', {
        method: 'POST',
        body: JSON.stringify({ isbn: value, language: parse(value)?.groupname, addedBy: userId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
    } else if (value > 9) {
      setIsError(true);
    } else {
      return;
    }
  };

  return (
    <div className='form-container'>
      <div>
        <TextInput
          error={isError}
          helperText={isError ? errorText : ''}
          id='isbn'
          label='ISBN'
          onChange={e => handleChange(e.target.value)}
          required
        />
      </div>
    </div>
  )
}

export default AddBookForm