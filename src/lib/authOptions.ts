import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/db/lib";
import { compare } from "bcrypt";

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

        const { id, username, email } = existingUser;

        return {
          id,
          username,
          email
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, username: user.username, id: user.id }
      }
      return token
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: { ...session.user, username: token.username, id: token.id }
      }
      return session
    },
  }
};