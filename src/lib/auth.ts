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
        const members = [
          "102762329",
          "127994537",
          "106036280",
          "126991831",
          "108002407",
          "102397299",
          "95635766",
          "40568212",
          "47527261",
        ];
        console.log("profile eh ", profile);
        let isMember = members.includes(profile?.id as string);
        if (isMember) {
          console.log("sim, eh membro");

          return (await api.post("/sign", profile!))?.data?.response;
        }
        return false;
      }
      return true;
    },
  },
});
