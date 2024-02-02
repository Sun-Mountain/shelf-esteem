'use client';

import { useState } from "react";
import { fetchBookData } from "@/lib/queries";
import CatalogItem from "@/components/CatalogItem";
import AddBookForm from "@/components/form/AddBookForm";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Catalog = () => {
  const [isbnList, setIsbnList] = useState(['0358653037']);
  const [bookData, setBookData] = useState([] as any[]);

  const handleAddBook = () => {
    fetchBookData();
  }

  function addIsbn(isbn: string) {
    setIsbnList([...isbnList, isbn]);
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

      <AddBookForm addIsbn={addIsbn} addBookData={addBookData} />
    </div>
  )
}

export default Catalog