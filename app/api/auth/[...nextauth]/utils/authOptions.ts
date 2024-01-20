import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token, user }) => {
      (session.user.id as unknown) = token.uid;
      session.user.name = token.name;
      session.user.lastName = token.lastName;
      console.log(session, " Session", user, " User", token, " Token");
      return session;
    },

    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.lastName = user.lastName;

        user.id && (token.id = user.id);
        user.lastName && (token.lastName = user.lastName);
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!credentials || !email || !password) {
          return null;
        }
        try {
          const user = await prisma.user.findFirst({
            where: { email },
          });

          if (!user || typeof user.password !== "string") {
            throw new Error("Invalid credentials");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (isPasswordCorrect) {
            return {
              id: user.id,
              name: user.name,
              lastName: user.lastName,
              email: user.email,
            } as User;
          }

          return null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
