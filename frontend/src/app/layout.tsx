import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { getServerSession } from 'next-auth'
import NextAuthProvider from '@/providers/NextAuthProvider'
import { authOptions } from './api/auth/[...nextauth]/route'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CEDT CoWorking Space',
  description: 'CoWorking Space for CEDT students',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={raleway.className}>
        <NextAuthProvider session={session}>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
