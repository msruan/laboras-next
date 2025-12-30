import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { api } from "@/config/api";
import { env } from "@/env/server";

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
      console.debug(user);
      // console.log(account);
      // console.log(profile);
      const privacyMode = env.APP_PRIVACY_MODE;

      if (account?.provider === "github") {
        if (privacyMode === "private") {
          const allowedUsers = env.APP_PRIVATE_GITHUB_USERS;

          const isMember = allowedUsers.includes(String(profile?.id));

          if (isMember) {
            console.info("Yes, it's private member");
            return (await api.post("/sign", profile!))?.data?.response;
          }

          console.log("No, it's unauthorized user");
          return false;
        }
        return (await api.post("/sign", profile!))?.data?.response;
      }
      return true;
    },
  },
});
