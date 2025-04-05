import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { api } from "@/config/api";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log(user);
      // console.log(account);
      // console.log(profile);
      const privacyMode = process.env.APP_PRIVACY_MODE;
      const allowedUsers = purgeChar(
        " ",
        process.env.APP_PRIVATE_GITHUB_USERS
      ).split(",");

      if (account?.provider === "github") {
        if (privacyMode === "private") {
          const isMember = allowedUsers.includes(String(profile?.id));
          if (isMember) {
            console.log("sim, eh membro");
            return (await api.post("/sign", profile!))?.data?.response;
          }
          console.log("nao eh membro");
          return false;
        }
        return (await api.post("/sign", profile!))?.data?.response;
      }
      return true;
    },
  },
});

function purgeChar(charToRemove: string, str: string | undefined) {
  if (str === undefined) return "";
  let filteredStr = "";
  for (let char of str) {
    if (char !== charToRemove) {
      filteredStr += char;
    }
  }
  return filteredStr;
}
