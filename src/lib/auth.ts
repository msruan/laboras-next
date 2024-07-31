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
      if (account?.provider === "github") {
        const members = purgeChar(" ", process.env.MEMBERS_ID).split(",");
        let isMember = members.includes(String(profile?.id));
        if (isMember) {
          console.log("sim, eh membro");

          return (await api.post("/sign", profile!))?.data?.response;
        }

        console.log("nao eh membro");
        return false;
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
