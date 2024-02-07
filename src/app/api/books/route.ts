import { createBook } from '@/db/lib/books';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const book = await createBook(body);
  // return NextResponse.json(book);
}