'use client';

import { useState } from "react";
import { fetchBookData } from "@/lib/queries";
import AddBookForm from "@/components/form/AddBookForm";

const Catalog = () => {
  const [isbnList, setIsbnList] = useState([] as string[]);
  const [bookData, setBookData] = useState([] as any[]);

  const handleAddBook = () => {
    fetchBookData();
  }

  function addIsbn(isbn: string) {
    setIsbnList([...isbnList, isbn]);
  }

  return (
    <div className="page-container">
      <h1>Catalog Your Library</h1>
      <div className="books-processing">
        {isbnList.length > 0 ? (
          isbnList.map((isbn, index) => (
            <div key={index}>
              {isbn}
            </div>
          ))
        ) : (
          'There are no books in your library'
        )}
      </div>

      <AddBookForm addIsbn={addIsbn} />
    </div>
  )
}

export default Catalog