'use client';

import { useEffect, useState } from "react";
import TheBookForm from "./TheBookForm";
import RecentlyAdded from "./RecentlyAdded";

const AddBookForm = ({
  userId
}: {
  userId: string;
}) => {
  const [isbnList, setIsbnList] = useState<string[]>([]);

  return (
    <>
      <TheBookForm
        isbnList={isbnList}
        setIsbnList={setIsbnList}
      />
      <RecentlyAdded isbnList={isbnList} />
    </>
  )
}

export default AddBookForm;