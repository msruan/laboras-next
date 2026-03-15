import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { env } from "@/env";
import { logger } from "@/lib/logger";
import { apiSign } from "@/api/auth.actions";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      logger.trace(String(user));
      logger.trace(String(account));
      logger.trace(String(profile));

      const privacyMode = env.APP_PRIVACY_MODE;

      if (account?.provider === "github" && profile) {
        if (privacyMode === "private") {
          const allowedUsers = env.APP_PRIVATE_GITHUB_USERS;

          const isMember = allowedUsers?.includes(String(profile.id));

          if (!isMember) {
            logger.warn("No, it's unauthorized user");
            return false;
          }
        }
        return await apiSign(profile);
      }
      return false;
    },
  },
});
