import { config } from "@/lib/auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const handler = NextAuth(config);

export { handler as GET, handler as POST };
