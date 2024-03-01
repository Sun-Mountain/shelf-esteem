import { createBook } from '@/db/lib/books';
import { withAuth } from '@/lib/auth';
import { getLogger } from '@/lib/logger';
import {
  // CandidateStatus,
  // Degree,
  // EmploymentType,
  // LevelOfExperience,
  Book,
  Prisma,
} from '@prisma/client';
import type { Permission } from 'accesscontrol';
import { NextRequest, NextResponse } from 'next/server';

import { Session } from 'next-auth';

const logger = getLogger();

export async function POST(req: NextRequest) {
  return withAuth({
    resource: 'books',
    action: 'create:any',
    authErrorMessage: 'You are not authorized to create a book',
  })(async (session: Session, permission: Permission) => {
    const body = await req.json();
    console.log('body', body);
  });