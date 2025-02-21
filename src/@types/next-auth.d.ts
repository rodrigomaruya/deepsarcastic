import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      image: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }
}
