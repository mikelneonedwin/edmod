import { Inter } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
// import { AuthProvider } from '@/context/auth-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Edmod - Interactive Learning Platform',
  description: 'Challenge yourself with timed quizzes and compete on the leaderboard',
  openGraph: {
    title: 'Edmod - Interactive Learning Platform',
    description: 'Challenge yourself with timed quizzes and compete on the leaderboard',
    url: 'https://edmod.vercel.app',
    siteName: 'Edmod',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edmod - Interactive Learning Platform',
    description: 'Challenge yourself with timed quizzes and compete on the leaderboard',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
          {children}
        {/* </AuthProvider> */}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}

