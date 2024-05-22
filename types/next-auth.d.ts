import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      updated_at: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    updated_at: string;
  }
  interface JWT {
    sub: string;
    updated_at: string;
  }
}