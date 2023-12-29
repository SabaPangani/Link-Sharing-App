import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Prisma } from "@prisma/client";
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
        email: { label: "Email", type: "email", },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        
        return {id: "1", name: "saba", email: "john@gmail.com"}
      },
    }),
  ],
  pages: {
    signIn: "/login",
  }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };