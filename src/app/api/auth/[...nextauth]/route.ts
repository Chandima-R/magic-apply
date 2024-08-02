import * as process from "process";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          if (!credentials.email || !credentials.password) {
            return null;
          }

          // find the specific user from the database from the email
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          // if no user available return null
          if (!user) {
            return null;
          }

          // compare the hash of the given password with the database hash
          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.hashedPassword || ""
          );

          // if hashed passwords are not matching return null
          if (!passwordsMatch) {
            return null;
          }
          // if they match, return the user
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
