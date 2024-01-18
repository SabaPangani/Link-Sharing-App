import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token, user }) => {
      if (user && session?.user && token) {
        session.user.id = user.id;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.lastName = user.lastName;
        console.log(session, user, token, " session user token");
      }
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
            console.log(
              { ...user, lastName: user.lastName, id: user.id },
              " user"
            );

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
