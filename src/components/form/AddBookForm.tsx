'use client';

import { useForm } from 'react-hook-form';
import { BookSearchProps } from "@/types/booktypes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { fetchBookData } from "@/lib/queries";
import { Dispatch, SetStateAction } from 'react';

// const FormSchema = z.object({
//   isbn: z.custom<string>((value) => {
//     if (value.length === 10 || value.length === 13) {
//       return true;
//     } else {
//       return 'ISBN must be 10 or 13 characters long';
//     }
//   }
// });

interface AddBookFormProps {
  addIsbn: (isbn: string) => void;
  addBookData: (data: any) => void;
  setError: Dispatch<SetStateAction<string>>;
  error?: string;
}

const AddBookForm = ({
  addIsbn,
  addBookData,
  setError,
  error
}: AddBookFormProps) => {

  const form = useForm({
    defaultValues: {
      isbn: '',
    }
  })
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //   },
  // });

  const addBook = ({
    enteredIsbn,
    title,
    authors,
    publisher,
    publishedDate,
    description,
    industryIdentifiers,
    pageCount,
    categories,
    maturityRating,
    imageLinks,
    language,
  }: BookSearchProps) => {
    const book = {
      isbn: enteredIsbn,
      title,
      authors,
      publisher,
      publishedDate,
      description,
      industryIdentifiers,
      pageCount,
      categories,
      maturityRating,
      thumbnail: imageLinks?.thumbnail,
      language,
      found: true,
    }
    
    addBookData(book);
  }

  const onSubmit = async ({ isbn }: {
    isbn: string;
  }) => {
    addIsbn(isbn);
    const response = await fetchBookData(isbn);
    
    if (!response) {
      setError('Book not found');
      addBookData({ isbn, found: false });
    } else {
      console.log('Book added');
      const parsedData = response;
      addBook({ enteredIsbn: isbn, ...parsedData });
    }
  };

  return (
    <Form {...form}>
      <div className="form-container book-form">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='form-wrapper'>
            <FormField
              control={form.control}
              name='isbn'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder='ex. 0544003415 or 978-0544003415' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <div className='error'>{error}</div>}
          <div className='button-container'>
            <Button type='submit'>
              Add Book
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default AddBookForm;
