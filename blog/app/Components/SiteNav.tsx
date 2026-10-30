'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Posts stays out of the phone layout: the brand already links home, and this keeps the header to one line.
const NAV_LINKS = [
  { href: '/', label: 'Posts', visibility: 'hidden sm:block' },
  { href: '/about', label: 'About', visibility: 'block' },
  { href: '/tags', label: 'Tags', visibility: 'block' },
  { href: '/subscribe', label: 'Subscribe', visibility: 'block' },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="-mr-2 flex shrink-0 items-center text-sm max-[359px]:-mr-1 max-[359px]:text-[0.8125rem]">
      {NAV_LINKS.map(({ href, label, visibility }) => {
        const isCurrent = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isCurrent ? 'page' : undefined}
            className={`${visibility} px-2 py-3 transition-colors hover:text-ink max-[359px]:px-1 ${isCurrent ? 'font-medium text-ink' : 'text-muted'}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
