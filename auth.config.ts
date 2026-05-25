// Edge-safe auth config. JWT session strategy + single-password Credentials.
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME ?? "admin").trim();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

// Constant-time string compare — avoids leaking timing info on the password.
function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!ADMIN_PASSWORD) return null;
        const username = typeof creds?.username === "string" ? creds.username : "";
        const password = typeof creds?.password === "string" ? creds.password : "";
        const ok =
          timingSafeEqual(username, ADMIN_USERNAME) &&
          timingSafeEqual(password, ADMIN_PASSWORD);
        if (!ok) return null;
        return { id: "admin", name: ADMIN_USERNAME, email: `${ADMIN_USERNAME}@local` };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.isAdmin = true;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { isAdmin?: boolean }).isAdmin = Boolean(token.isAdmin);
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
