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
        const members = process.env.MEMBERS_ID?.split(",");
        console.log("mano os membros sao ", members);
        let isMember = false;
        members?.forEach((id) => {
          console.log("entrei no loop com ",String(id));
          console.log("e bicho, o profile id eh ",String(profile?.id));
          if (String(id) === String(profile?.id)) {
            isMember = true;
          }
        });
        if (isMember) {
          return (await api.post("/sign", profile!))?.data?.response;
        } else {
          console.log();
          console.log("membros : ", process.env.MEMBERS_ID?.split(","));
          console.log("o id eh ", profile?.id);
          console.log("eh membro? ", isMember);
          console.log();
          return false;
        }
      }
      return true;
    },
  },
});
