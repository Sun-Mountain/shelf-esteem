'use client';

import { useEffect, useState } from "react";
import TheBookForm from "./TheBookForm";

const AddBookForm = ({
  userId
}: {
  userId: string;
}) => {
  const [isbnList, setIsbnList] = useState<string[]>([]);

  return (
    <TheBookForm isbnList={isbnList} setIsbnList={setIsbnList} />
  )
}

export default AddBookForm;