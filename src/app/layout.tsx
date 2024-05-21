
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes'
import { ClerkProvider, SignedIn, UserButton } from '@clerk/nextjs'

import { dark } from '@clerk/themes';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Palo',
  description: 'Aplicação para testes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark
    }}>
    <html lang='pt-BR'>
        <body className={`${inter.className}`}>
          <header>
   
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        <Theme >
       {children}
        </Theme>
      </body>
      </html>
      </ClerkProvider>
  )
}
