import { SITE } from './site';
import { getAllPosts, getPostBody, type Post } from './posts';

export interface FeedPost extends Post {
  readonly html: string;
}

const postUrl = (slug: string): string => `${SITE.url}/${slug}`;
const feedUrl = (format: string): string => `${SITE.url}/posts/${format}`;

// `path` is for links on the site, so they work on any host; `url` is the public address to share.
export const FEED_LINKS = [
  { label: 'RSS Feed', path: '/posts/rss', url: feedUrl('rss') },
  { label: 'Atom Feed', path: '/posts/atom', url: feedUrl('atom') },
  { label: 'JSON Feed', path: '/posts/json', url: feedUrl('json') },
] as const;

function escapeXml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Feed readers show content away from the site, so relative URLs must become absolute.
export function absolutizeUrls(html: string, url: string): string {
  return html.replace(/(href|src)="\//g, `$1="${SITE.url}/`).replace(/href="#/g, `href="${url}#`);
}

const feedContent = ({ slug, html }: FeedPost): string => absolutizeUrls(html, postUrl(slug));

export function getFeedPosts(): readonly FeedPost[] {
  return getAllPosts().map((post) => ({ ...post, html: getPostBody(post.slug) }));
}

export function buildRssFeed(posts: readonly FeedPost[]): string {
  const items = posts.map((post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl(post.slug)}</link>
      <guid>${postUrl(post.slug)}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(feedContent(post))}</description>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)}</title>
    <description>${escapeXml(SITE.description)}</description>
    <link>${SITE.url}/</link>
    <language>en</language>
    <atom:link href="${feedUrl('rss')}" rel="self" type="application/rss+xml"/>
${items.join('\n')}
  </channel>
</rss>
`;
}

export function buildAtomFeed(posts: readonly FeedPost[]): string {
  const entries = posts.map((post) => `  <entry>
    <id>${postUrl(post.slug)}</id>
    <title>${escapeXml(post.title)}</title>
    <link href="${postUrl(post.slug)}"/>
    <published>${post.publishedAt}</published>
    <updated>${post.publishedAt}</updated>
    <summary>${escapeXml(post.excerpt)}</summary>
    <content type="html">${escapeXml(feedContent(post))}</content>
${post.tags.map((tag) => `    <category term="${escapeXml(tag)}"/>`).join('\n')}
  </entry>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${SITE.url}/</id>
  <title>${escapeXml(SITE.name)}</title>
  <subtitle>${escapeXml(SITE.description)}</subtitle>
  <link href="${SITE.url}/"/>
  <link href="${feedUrl('atom')}" rel="self"/>
  <updated>${posts[0].publishedAt}</updated>
  <author><name>${escapeXml(SITE.author)}</name></author>
${entries.join('\n')}
</feed>
`;
}

export function buildJsonFeed(posts: readonly FeedPost[]): string {
  return JSON.stringify({
    version: 'https://jsonfeed.org/version/1.1',
    title: SITE.name,
    home_page_url: `${SITE.url}/`,
    feed_url: feedUrl('json'),
    description: SITE.description,
    authors: [{ name: SITE.author, url: SITE.authorUrl }],
    items: posts.map((post) => ({
      id: postUrl(post.slug),
      url: postUrl(post.slug),
      title: post.title,
      content_html: feedContent(post),
      summary: post.excerpt,
      date_published: post.publishedAt,
      tags: post.tags,
    })),
  });
}
