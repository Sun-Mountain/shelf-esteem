import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { getBook } from '@/db/lib/books';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  const book = await getBook(id);
  console.log({book});
  if (!book) {
    console.log('Book not found');
    const failedResponse =  NextResponse.json({
      status: 404,
      message: 'Book not found'
    });
    console.log(failedResponse);
    return failedResponse;
  }
  return NextResponse.json(book);
}