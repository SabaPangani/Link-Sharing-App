import { DefaultUser } from "next-auth";
import { Adapter, AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id?: string;
      name: string;
      lastName: string;
      email: string;
      image?: string;
    };
  }
  interface User extends DefaultUser {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    image: string;
  }
}
