import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token, user }) => {
      (session.user.id as unknown) = token.uid || "";
      session.user.name = token.name || "";
      session.user.lastName = token.lastName || "";
      session.user.image = token.image || "/";
      return session;
    },

    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        token.uid = user.id;
        token.lastName = user.lastName;
        token.image = user.image as string;

        user.image && (token.image = user.image);
        user.id && (token.id = user.id);
        user.lastName && (token.lastName = user.lastName);
      }

      if (trigger === "update" && session) {
        token.name = session.name;
        token.lastName = session.lastName;
        token.email = session.email;
        token.image = session.image;
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
              image: user.image,
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
