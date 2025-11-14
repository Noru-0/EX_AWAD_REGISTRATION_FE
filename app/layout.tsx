import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import ClientQueryProvider from '../components/query-client-provider'
import { AnalyticsWrapper } from '../components/analytics-wrapper'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'

const geist = Geist({ subsets: ["latin"] });

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
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <ClientQueryProvider>
          {children}
        </ClientQueryProvider>
        <AnalyticsWrapper />
        <SonnerToaster />
      </body>
    </html>
  )
}
