import { buildJsonFeed, getFeedPosts } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildJsonFeed(getFeedPosts()), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
}
