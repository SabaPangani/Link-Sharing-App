import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      image?: string;
      lastName: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    customProperty?: string;
  }
}