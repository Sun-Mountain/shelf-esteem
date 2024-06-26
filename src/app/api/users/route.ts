import { NextRequest, NextResponse } from "next/server";
import type { Permission } from 'accesscontrol';
import { hash } from "bcrypt";

import { db } from "@db/lib";
import { withAuth } from '@lib/auth';

export async function POST(req: Request){
  try {
    const body = await req.json();
    const { email, username, password } = body;

    // check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email }
    });

    if (existingUserByEmail) {
      return NextResponse.json({
        message: "Email already exists"
      }, {
        status: 409,
      })
    }

    // check if username already exists
    const existingUserByUserName = await db.user.findUnique({
      where: { username }
    });

    if (existingUserByUserName) {
      return NextResponse.json({
        message: "Username already exists"
      }, {
        status: 409,
      })
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword
      }
    });

    const { password: _, ...user } = newUser;
    
    return NextResponse.json(JSON.stringify(
      { status: 200 }
    ))
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: `Something went wrong: ${error}`, status: 500})
  }
}

export async function GET(req: NextRequest) {
  return withAuth({
    resource: 'users',
    action: 'read:any',
    authErrorMessage: 'You are not authorized to read users',
  })(async (permission: Permission) => {
    try {
      const users = await db.user.findMany();

      return NextResponse.json(permission.filter(users), { status: 200 })
    } catch (error) {
      console.error(error)
      return NextResponse.json({ message: `Something went wrong: ${error}`, status: 500})
    }
  })
};
