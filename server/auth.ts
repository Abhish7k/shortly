import NextAuth from "next-auth";
import { db } from "./db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db),

  session: { strategy: "jwt" },

  ...authConfig,
});
