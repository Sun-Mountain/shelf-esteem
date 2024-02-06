'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { BookSearchProps } from "@/types/booktypes";
import { createBook } from '@/db/lib/books';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { fetchBookData } from "@/lib/queries";
import { Dispatch, SetStateAction } from 'react';

const FormSchema = z.object({
  isbn: z.string().min(1, 'ISBN is required'),
});

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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isbn: '',
    },
  });

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
      addBookData({ isbn, found: false });
    } else {
      const res = await fetch(`/api/books`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          thumbnail: response.imageLinks?.thumbnail,
          id: isbn,
          ...response
        }),
      });

      addBook({ enteredIsbn: isbn, ...response });
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
                    <Input
                      placeholder='ex. 0544003415 or 978-0544003415'
                      {...field}
                    />
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
