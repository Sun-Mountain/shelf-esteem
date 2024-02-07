'use client';

import { useState } from "react";
import { BookSearchProps } from "@/types/booktypes";
import CatalogItem from "@/components/CatalogItem";
import AddBookForm from "@/components/form/AddBookForm";

const Catalog = () => {
  const [isbnList, setIsbnList] = useState([] as string[]);
  const [bookData, setBookData] = useState([] as BookSearchProps[]);
  const [error, setError] = useState('');

  function removeData(index: number) {
    // Remove the isbn from the list of isbns
    const newIsbnList = isbnList.filter((isbn, i) => i !== index);
    setIsbnList(newIsbnList);
    // Remove the book data from the list of book data
    const newBookData = bookData.filter((book, i) => i !== index);
    setBookData(newBookData);
  }

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
              index={index}
              isbn={isbn}
              isbnIndex={isbnList.indexOf(isbn)}
              bookData={bookData}
              removeData={removeData}
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