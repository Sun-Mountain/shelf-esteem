import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import type Role from "@prisma/client";

declare module "next-auth" {
  interface Session {
    username: string;
    id: string;
    role: Role;
  }

  interface User {
    username: string;
    id: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    id: string;
    role: Role;
  }
}
