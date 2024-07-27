import { AuthOptions } from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import LinkedInProvider from 'next-auth/providers/linkedin';
import TwitterProvider from 'next-auth/providers/twitter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyVcNVp } from '../_actions/did';
import { domainURL } from '../utils/helpers';
import {
  modifyUserJWTToken,
  modifyUserSession,
  signInModification,
} from '../_actions/did';

const page = domainURL('/auth/did/verify');

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    LinkedInProvider({
      clientId: '785w9aeglfa4xd',
      clientSecret: 'PFzA8tgXGMEJakUh',
      authorization: {
        params: { scope: 'openid profile email' },
      },
      wellKnown: `https://www.linkedin.com/oauth/.well-known/openid-configuration`,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    TwitterProvider({
      clientId: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        jwtVc: { label: 'jwtVc', type: 'text' },
        jwtVp: { label: 'jwtVp', type: 'text' },
        etx: { label: 'etx', type: 'text' },
      },
      async authorize(credentials) {
        // console.log('credentials: ', credentials);
        const jwtVc = credentials?.jwtVc;
        const jwtVp = credentials?.jwtVp;
        const etx = credentials?.etx;
        if (!jwtVp || !jwtVc || !etx) return null;
        const user = await verifyVcNVp(jwtVc, jwtVp, etx);
        // console.log({ credentials: user });
        if (user !== null) return user;
        else return null;
      },
    }),
  ],
  pages: {
    signIn: page,
    error: page,
    signOut: page,
  },
  callbacks: {
    async signIn({ user, profile, account }) {
      return await signInModification(user, profile, account);
    },
    async jwt({ token, account, user }) {
      return await modifyUserJWTToken(account, token, user);
    },
    async redirect({ url }) {
      return url;
    },
    async session({ session, token }) {
      return await modifyUserSession(session, token);
    },
  },
};
