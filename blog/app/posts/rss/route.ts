import { buildRssFeed, getFeedPosts } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildRssFeed(getFeedPosts()), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
