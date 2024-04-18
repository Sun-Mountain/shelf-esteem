import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { db } from "@db/lib";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out'
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email }
        })

        if (!existingUser) {
          return null
        }

        const passwordValid = await compare(credentials.password, existingUser.password);

        if (!passwordValid) {
          return null
        }

        const { id, username, email, role } = existingUser;

        return {
          id,
          username,
          email,
          role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.id = user.id;
        token.role = user.role;
      }
      return token
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          id: token.id,
          role: token.role
        }
      }
      return session
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
  
      return isAuthenticated;
    },
  } as any
};