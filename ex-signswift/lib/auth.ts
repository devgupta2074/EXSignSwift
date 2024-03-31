import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";

import { SupabaseAdapter } from "@auth/supabase-adapter";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  secret:
    "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMDc1NDg0NywiaWF0IjoxNzEwNzU0ODQ3fQ.9n-x_Zw4syq4hv_IqtQE8S1KhxdNoRfwLUj7kA_Ublo",
  providers: [
    GoogleProvider({
      clientId:
        "56946012782-4fos0hcshm0n4jrfs9h3e5ril1hma1up.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  adapter: SupabaseAdapter({
    url: "https://bxmmvowyynlggzhyuhid.supabase.co",
    secret:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bW12b3d5eW5sZ2d6aHl1aGlkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTcxODIzNSwiZXhwIjoyMDI1Mjk0MjM1fQ.rOfF5lgXV-AcTr_jGzX-oFhtsqFkh380w-kA6I1cmWE",
  }) as Adapter,
  callbacks: {
    session: async ({ session, token }) => {
      console.log(token);
      if (session?.user) {
        session.user.id = token.sub;
        session.user.token = token;
      }

      return session;
    },
    jwt: async ({ user, token, account }) => {
      if (user) {
        token.jti = account?.access_token;
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
