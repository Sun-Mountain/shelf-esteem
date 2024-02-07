import { createBook } from '@/db/lib/books';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!!session?.user) {
    const body = await req.json();
    console.log('body before', body);
    body.addedBy = session.user.id;
    console.log('body after', body);
    const book = await createBook(withAddedBy);
    return NextResponse.json(
      { status: 'ok' }
    );
  }
  return NextResponse.json(
    { message: 'You are not authenticated' },
    { status: 401 }
  );
}