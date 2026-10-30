import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { SiteNav } from './SiteNav';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-canvas/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl backdrop-saturate-150">
      <div className="page-wide flex h-14 items-center justify-between gap-3">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 py-2 text-[0.9375rem] font-semibold tracking-[-0.015em] max-[359px]:text-sm">
          <Image
            src="/images/markn.png"
            alt=""
            width={48}
            height={48}
            className="size-6 rounded-full object-cover object-top max-[389px]:hidden"
          />
          <span className="hidden text-muted transition-colors group-hover:text-accent sm:inline">{SITE.author}</span>
          <span aria-hidden="true" className="hidden font-normal text-hairline-strong sm:inline">/</span>
          <span data-brand-name className="truncate transition-colors group-hover:text-accent">{SITE.name}</span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
