import Link from 'next/link';
import { SITE } from '@/lib/site';
import { SocialMediaLinks } from './SocialMediaLinks';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-hairline pb-[env(safe-area-inset-bottom)] md:mt-24">
      <div className="page-wide flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold tracking-[-0.015em]">{SITE.name}</p>
          <p className="mt-1 text-sm text-muted">Built with Next.js and Tailwind CSS.</p>
        </div>
        <div className="-ml-3 flex items-center md:ml-0 md:-mr-3">
          <SocialMediaLinks />
          <Link
            href="/subscribe"
            className="ml-3 rounded-full border border-hairline px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-hairline-strong hover:bg-surface"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </footer>
  );
}
