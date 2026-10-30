import './globals.css';
import { Geist_Mono, Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SITE } from '@/lib/site';
import { SiteFooter } from './Components/SiteFooter';
import { SiteHeader } from './Components/SiteHeader';

const inter = Inter({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  authors: [{ name: SITE.author, url: SITE.authorUrl }],
  openGraph: {
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    type: 'website',
    locale: 'en_CA',
  },
  twitter: { card: 'summary_large_image' },
  alternates: {
    types: {
      'application/rss+xml': '/posts/rss',
      'application/atom+xml': '/posts/atom',
      'application/feed+json': '/posts/json',
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-lg focus:bg-canvas focus:p-3"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
