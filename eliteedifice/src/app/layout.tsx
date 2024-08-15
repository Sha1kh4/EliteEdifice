'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/apolloClient'
import { ThemeProvider } from '../components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ApolloProvider client={client}>
        <ThemeProvider>
          <body className={`${inter.className} transition-colors duration-300`}>{children}</body>
        </ThemeProvider>
      </ApolloProvider>
    </html>
  )
}