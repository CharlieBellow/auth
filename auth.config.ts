import type { NextAuthConfig, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from './lib/prisma'
import * as bcrypt from 'bcryptjs'


export default {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
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
  pages: { signIn: 'auth/login' },
} satisfies NextAuthConfig
