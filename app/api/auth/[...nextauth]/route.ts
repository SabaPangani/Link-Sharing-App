import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      if (user && session?.user) {
        session.user.id = user.id;
        session.user.lastName = user.lastName;
        session.user.image = user.image || null; // Ensure image is not undefined
      }
      return session;
    },

    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
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
              image: user.image || null, // Ensure image is not undefined
            };
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
