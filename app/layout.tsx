import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mark Nenadov - Software Engineer & Technical Leader',
  description: 'Software engineer with 24 years of experience in full-stack development, currently working in Fintech. Sharing knowledge, solving problems, building things.',
  keywords: ['software engineer', 'technical leader', 'full-stack development', 'fintech'],
  authors: [{ name: 'Mark Nenadov' }],
  openGraph: {
    title: 'Mark Nenadov - Software Engineer & Technical Leader',
    description: 'Software engineer with 24 years of experience in full-stack development, currently working in Fintech.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mark Nenadov - Software Engineer & Technical Leader',
    description: 'Software engineer with 24 years of experience in full-stack development, currently working in Fintech.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
