import { createBook } from '@/prisma/books';
import { getLogger } from '@/lib/logger';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';

const logger = getLogger();

export async function POST(req: NextRequest) {
  const isbn = req.json();
}