import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
export const authOptions: NextAuthOptions = {
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
          if (typeof user?.password !== "string") {
            throw new Error("User password is not defined");
          }
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password
          );

          if (isPasswordCorrect) {
            console.log(user);
            return user;
          }
          return null;
        } catch (err) {
          console.log(err);
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
