import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@lib/authOptions";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  
  return NextResponse.json({ authenticated: !!session })
};