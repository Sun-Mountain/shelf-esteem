import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { getBook } from '@/db/lib/books';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  const book = await getBook(id);
  if (!book) {
    return NextResponse.error({
      status: 404,
      message: 'Book not found'
    });
  }
  return NextResponse.json(book);
}