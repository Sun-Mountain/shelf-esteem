import { db } from "@/db/lib";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request){
  try {
    const body = await req.json();
    const { email, username, password } = body;

    // check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email }
    });

    console.log({existingUserByEmail})

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
    console.log({user})
    
    return NextResponse.json(JSON.stringify(
      { user: user, message: 'User created successfully',
        status: 200 }
    ))
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: `Something went wrong: ${error}`, status: 500})
  }
}
