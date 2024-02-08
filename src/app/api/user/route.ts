import { db } from "@/db/lib";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from 'zod';

const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters')
  })

export async function POST(req: Request){
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    // // check if email already exists
    // const existingUserByEmail = await db.user.findUnique({
    //   where: { email }
    // });

    // if (existingUserByEmail) {
    //   return NextResponse.json(
    //     { message: 'Email already exists',
    //       status: 401
    //     }
    //   )
    // }

    // // check if username already exists
    // const existingUserByUserName = await db.user.findUnique({
    //   where: { username }
    // });

    // if (existingUserByUserName) {
    //   return NextResponse.json(
    //     { message: 'Username already exists',
    //       status: 401
    //     }
    //   )
    // }

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
      { user: user, message: 'User created successfully',
        status: 200 }
    ))
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: `Something went wrong: ${error}`, status: 500})
  }
}
