import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE } from '@/lib/site';
import { SiteFooter } from './Components/SiteFooter';
import { SiteHeader } from './Components/SiteHeader';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en-CA">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-surface-primary to-surface-secondary text-text-primary antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-surface-primary focus:p-2 focus:shadow-elegant"
        >
          Skip to main content
        </a>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 p-4 md:p-6">
          <SiteHeader />
          <main id="main-content" className="flex-1 animate-fade-in-up motion-reduce:animate-none">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
