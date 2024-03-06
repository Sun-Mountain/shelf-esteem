import { db } from "@/db/lib";
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { getLogger } from "@/lib/logger";
import { getUserLibraryBooks } from "@/db/lib/libraries";

const logger = getLogger();

export async function GET(req) {
  return withAuth({
    resource: "userLibraryBooks",
    action: "read:own",
    authErrorMessage: "You are not authorized to read this library",
  })(async (permission, session) => {
    try {
      const { userId } = session;
      const userLibraryBooks = await getUserLibraryBooks(userId);
      return NextResponse.json(userLibraryBooks);
    } catch (error) {
      logger.error(error);
      return NextResponse.error(error);
    }
  });
}
