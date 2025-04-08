import NextAuth from "next-auth";
import { db } from "./db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],

  adapter: DrizzleAdapter(db),

  session: { strategy: "jwt" },
});
