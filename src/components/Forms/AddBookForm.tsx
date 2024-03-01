'use client';

import { useState } from "react";
import TextInput from "@/components/UI/TextInput";
import { audit } from "isbn3";


const AddBookForm = () => {
  const [isError, setIsError] = useState(false);
  const errorText = 'Please enter a valid ISBN';

  const handleChange = (value: string) => {
    setIsError(false);
    // Validate the ISBN
    if (value >= 10 && audit(value).validIsbn) {
      const isbn = audit(value).validIsbn;
      console.log(isbn);
    } else if (value === '') {
      setIsError(false);
    } else {
      setIsError(true);
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