// import { createCandidate, findCandidates } from '@/db/lib/candidates';
import { withAuth } from '@/lib/auth';
// import { getLocationFromString, trimString } from '@/lib/formatting';
import { getLogger } from '@/lib/logger';
import {
  // CandidateStatus,
  // Degree,
  // EmploymentType,
  // LevelOfExperience,
  Prisma,
} from '@prisma/client';
import type { Permission } from 'accesscontrol';
import { NextRequest, NextResponse } from 'next/server';

import { Session } from 'next-auth';

const logger = getLogger();

export async function POST(req: NextRequest) {
  return withAuth({
    resource: 'library',
    action: 'read:own',
    authErrorMessage: 'User does not have permissions to view this library'
  })(async (permission: Permission) => {
    const session = req.locals.session as Session;
    const { user } = session;
    const { id } = user;

    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const libraryBooks = await findCandidates({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(candidates);
  })
};