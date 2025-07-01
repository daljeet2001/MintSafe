import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    merchant: {
      id: string | number;
      email: string;
      name?: string | null;
    };
  }

  interface User {
    id: string | number;
    email?: string | null;
    name?: string | null;
    number?: string | null;
  }
}

