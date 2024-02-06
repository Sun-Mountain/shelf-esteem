'use client';

import { useState } from "react";
import { BookProps } from "@/types";
import CatalogItem from "@/components/CatalogItem";
import AddBookForm from "@/components/form/AddBookForm";

interface industryIdentifier {
  type: string;
  identifier: string;
}

const Catalog = () => {
  const [isbnList, setIsbnList] = useState([] as string[]);
  const [bookData, setBookData] = useState([] as BookProps[]);
  const [error, setError] = useState('');

  function addIsbn(isbn: string) {
    // Check if the isbn is already in the list
    if (isbnList.includes(isbn)) {
      setError('This ISBN is already in your library');
      return;
    } else {
      // Add the new isbn to the list of isbns
      setIsbnList([...isbnList, isbn]);
    }
  }

  function addBookData(data: any) {
    setBookData([...bookData, data]);
  }

  return (
    <div className="page-container">
      <h1>Catalog Your Library</h1>
      <div className="books-processing">
        {isbnList.length > 0 ? (
          isbnList.map((isbn, index) => (
            <CatalogItem
              key={index}
              isbn={isbn}
              isbnIndex={isbnList.indexOf(isbn)}
              bookData={bookData}
            />
          ))
        ) : (
          'There are no books in your library'
        )}
      </div>

      <AddBookForm
        addIsbn={addIsbn}
        addBookData={addBookData}
        setError={setError}
        error={error}
      />
    </div>
  )
}

export default Catalog