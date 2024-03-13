import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import type { Permission } from 'accesscontrol';
import { ac } from '@/lib/accessControl';
import { authOptions } from '@/lib/authOptions';

export const loggedIn = async (next: (session: Session) => void) => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: 'User must be logged in' },
      { status: 401 },
    );
  }
  return next(session);
};

export const withAuth =
  ({
    resource,
    action,
    authErrorMessage,
  }: {
    resource: string;
    action: string;
    authErrorMessage?: string;
  }) =>
  async (next: (permissionCB: Permission, sessionCB: Session) => void) => {
    return loggedIn((session: Session) => {
      const permission = ac.permission({
        role: session?.user?.role,
        resource,
        action,
      });
      if (!permission.granted) {
        return NextResponse.json(
          {
            message:
              authErrorMessage ||
              'User does not have permissions to perform this action',
          },
          { status: 403 },
        );
      }
      return next(permission, session);
    });
  };
