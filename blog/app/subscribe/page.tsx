import type { Metadata } from 'next';
import { FEED_LINKS } from '@/lib/feeds';
import { SITE } from '@/lib/site';
import { Card } from '../Components/Card';
import { CopyableFeedUrl } from '../Components/CopyableFeedUrl';

const RESOURCES = [
  { label: 'Learn more about feeds', href: 'https://aboutfeeds.com/' },
  { label: 'Everything about RSS', href: 'https://github.com/AboutRSS/ALL-about-RSS' },
  { label: 'Complete list of RSS readers', href: 'https://github.com/AboutRSS/ALL-about-RSS#-rss-readers' },
] as const;

export const metadata: Metadata = { title: 'Subscribe' };

export default function SubscribePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <h1 className="text-3xl font-bold md:text-4xl">Subscribe to {SITE.name}</h1>
      <Card title="Available Feed Formats">
        <div className="flex flex-col gap-4">
          {FEED_LINKS.map(({ label, path, url }) => (
            <CopyableFeedUrl
              key={path}
              label={label}
              path={path}
              url={url}
            />
          ))}
        </div>
      </Card>
      <Card title="What is RSS?">
        <p>
          RSS (Really Simple Syndication) is a way to subscribe to websites and get updates automatically in your feed
          reader. Instead of checking websites manually, you can follow all your favorite sites in one place.
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {RESOURCES.map(({ label, href }) => (
            <li key={href}><a className="link-text" href={href}>{label}</a></li>
          ))}
        </ul>
      </Card>
      <Card title="How to Subscribe">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Choose your preferred feed reader</li>
          <li>Copy a feed URL from above and paste it into your reader</li>
          <li>Your reader will automatically check for new posts and notify you when they&apos;re published</li>
        </ol>
      </Card>
    </div>
  );
}
