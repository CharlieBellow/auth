import type { NextAuthConfig, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from './lib/prisma'
import * as bcrypt from 'bcryptjs'
import GithubProvider from "next-auth/providers/github"


export default {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: "email", type: "text"},
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("authorize", credentials)
        const { email, password } = credentials
        if (email && password) {
          return null
        }
        let user: User | null = null
        const saltedPasswordToCheck = await bcrypt.hash(password as string, 8)
        user = await prisma.user.findUnique({
          where: { email: email as string, password: saltedPasswordToCheck },
        })
        if (!user) {
          const saltedPassword =await bcrypt.hash(password as string, 8)
          user = await prisma.user.create({data: {email: email as string, password: saltedPassword, }})
        }

      if (!user) {
        throw new Error("User was not found and could not be created.")
      }
        

      return user
      }, 
      
    }),
  ],
  pages: { signIn: '/' },
  


  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      user && (token.user = user)
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      
      return session
    }
  }
} satisfies NextAuthConfig
