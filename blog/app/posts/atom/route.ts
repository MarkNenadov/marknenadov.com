import { buildAtomFeed, getFeedPosts } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildAtomFeed(getFeedPosts()), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
