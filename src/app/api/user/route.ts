import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request){
  try {
    const { email, username, password } = await req.json()

    // check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email }
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 401 }
      )
    }

    // check if username already exists
    const existingUserByUserName = await db.user.findUnique({
      where: { username }
    });

    if (existingUserByUserName) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 401 }
      )
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword
      }
    });
    
    return NextResponse.json(JSON.stringify(
      { user: newUser, message: 'User created successfully' },
      { status: 200 }
    ))
  } catch (error) {
    console.error(error)
    return NextResponse.error(error)
  }
}