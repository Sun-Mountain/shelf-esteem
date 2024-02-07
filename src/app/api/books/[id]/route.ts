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
    const failedResponse =  NextResponse.json(
      { error: 'Ouch, GET is not working my friend' },
      { status: 404 }
    );
    return failedResponse;
  }
  return NextResponse.json(book);
}