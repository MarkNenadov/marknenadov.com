import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/site';

const NAV_LINKS = [
  { href: '/', label: 'Posts' },
  { href: '/about', label: 'About' },
  { href: '/tags', label: 'Tags' },
  { href: '/subscribe', label: 'Subscribe' },
] as const;

export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Image
          src="/images/markn.png"
          alt=""
          width={28}
          height={28}
          className="size-7 rounded-lg object-cover object-top"
        />
        <span className="text-text-secondary">{SITE.author}</span>
        <span aria-hidden="true" className="text-border-tertiary">/</span>
        <Link className="transition-colors hover:text-primary-700" href="/">{SITE.name}</Link>
      </div>
      <nav aria-label="Main navigation" className="flex gap-4 text-sm font-medium text-text-secondary">
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} className="transition-colors hover:text-primary-700" href={href}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
