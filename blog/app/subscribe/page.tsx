import type { Metadata } from 'next';
import { FEED_LINKS } from '@/lib/feeds';
import { SITE } from '@/lib/site';
import { CopyableFeedUrl } from '../Components/CopyableFeedUrl';

const RESOURCES = [
  { label: 'Learn more about feeds', href: 'https://aboutfeeds.com/' },
  { label: 'Everything about RSS', href: 'https://github.com/AboutRSS/ALL-about-RSS' },
  { label: 'Complete list of RSS readers', href: 'https://github.com/AboutRSS/ALL-about-RSS#-rss-readers' },
] as const;

export const metadata: Metadata = { title: 'Subscribe' };

export default function SubscribePage() {
  return (
    <div className="page-narrow pt-12 md:pt-20">
      <h1 className="text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] text-balance md:text-[3.25rem]">
        Subscribe to {SITE.name}
      </h1>
      <div className="mt-7 divide-y divide-hairline border-y border-hairline md:mt-9">
        {FEED_LINKS.map(({ label, path, url }) => (
          <CopyableFeedUrl
            key={path}
            label={label}
            path={path}
            url={url}
          />
        ))}
      </div>
      <section className="mt-10 md:mt-12">
        <h2 className="text-xl font-semibold tracking-[-0.02em]">What is RSS?</h2>
        <p className="mt-2 leading-relaxed text-ink-soft">
          RSS (Really Simple Syndication) is a way to subscribe to websites and get updates automatically in your feed
          reader. Instead of checking websites manually, you can follow all your favorite sites in one place.
        </p>
        <ul className="mt-3 space-y-1">
          {RESOURCES.map(({ label, href }) => (
            <li key={href}><a className="link-text inline-block py-1" href={href}>{label}</a></li>
          ))}
        </ul>
      </section>
      <section className="mt-10 md:mt-12">
        <h2 className="text-xl font-semibold tracking-[-0.02em]">How to Subscribe</h2>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-muted">
          <li>Choose your preferred feed reader</li>
          <li>Copy a feed URL from above and paste it into your reader</li>
          <li>Your reader will automatically check for new posts and notify you when they&apos;re published</li>
        </ol>
      </section>
    </div>
  );
}
