import { db } from "@db/lib";
import { findBookById, findIndustryIdentifiers } from "@db/lib/books";
import { findUserLibraryBook } from "@db/lib/libraries";
import { withAuth } from "@lib/auth";
import { getLogger } from "@lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";

const logger = getLogger();

export async function GET(req: NextRequest) {
  return withAuth({
    resource: 'userLibraryBooks',
    action: 'read:own',
    authErrorMessage: 'You are not authorized to read this library',
  })(async (session: Session) => {
    try {
      const path = await req.query;
      console.log(path);

      // // find book by isbn
      // const bookExists = await findIndustryIdentifiers([{ identifier: isbn }]);
      
      // console.log(bookExists);

      return NextResponse.json({ status: 200 });
    } catch (error) {
      logger.error(error);
      return NextResponse.error();
    }
  });
}