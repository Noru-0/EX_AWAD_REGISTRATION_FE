import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ClientQueryProvider from '../components/query-client-provider'

// Import debug utility to suppress console logs
import '../lib/debug'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Registration App',
  description: 'User Registration and Authentication',
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';
  
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <ClientQueryProvider>{children}</ClientQueryProvider>
        {!isDevelopment && <Analytics />}
      </body>
    </html>
  )
}
