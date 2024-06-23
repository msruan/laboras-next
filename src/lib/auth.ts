import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { api } from '@/config/api';

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
      console.log(user);
      console.log(account);
      console.log(profile);
      if (account?.provider === "github") {
        if (process.env.MEMBERS?.split(",").includes(profile?.login as string))
          return (await api.post("/sign", profile!))?.data?.response;
        else return false;
      }
      return true;
    },
  },
});
