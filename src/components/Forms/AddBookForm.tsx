'use client';

import { useEffect, useState } from "react";
import { parse } from "isbn3";
import TextInput from "@/components/UI/TextInput";
import RecentlyAddedBooks from "@/components/Lists/RecentlyAddedBooks";


const AddBookForm = ({
  userId
}: {
  userId: string;
}) => {
  const [isbn, setIsbn] = useState('');
  const [recentlyAdded, setRecentlyAdded] = useState([]);

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

  useEffect(() => {
    // Fetch userlibrary
    fetch(`/api/userLibraryBooks`)
      .then((response) => response.json())
      .then((data) => {
        const books = data.map((item) => ({
          id: item.bookId,
          title: item.book.title,
          isbn: item.book.industryIdentifiers[0].identifier,
          thumbnail: item.book.thumbnail,
          authors: item.book.authors,
        }));
        console.log(books);

        setRecentlyAdded(books)
      });
  }, [])

  return (
    <>
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
      <RecentlyAddedBooks recentlyAdded={recentlyAdded} />
    </>
  )
}

export default AddBookForm