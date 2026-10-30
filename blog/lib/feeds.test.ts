import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { absolutizeUrls, buildAtomFeed, buildJsonFeed, buildRssFeed, FEED_LINKS, type FeedPost } from './feeds';

describe('FEED_LINKS', () => {
  FEED_LINKS.forEach(({ label, path, url }) => {
    test(`${label} links to a same-site path served by a route`, () => {
      expect(path).toStartWith('/posts/');
      expect(existsSync(`app${path}/route.ts`)).toBe(true);
      expect(url).toBe(`https://blog.marknenadov.com${path}`);
    });
  });
});

const feedPosts: readonly FeedPost[] = [
  {
    slug: 'first-post',
    title: 'Fish & "Chips"',
    publishedAt: '2025-07-26T13:50:00Z',
    excerpt: 'Excerpt',
    tags: ['food'],
    html: '<p>a &lt;= b</p><a href="/other#x">o</a><img src="/images/i.png" alt=""><a href="#own">s</a>',
  },
];

describe('absolutizeUrls', () => {
  test('makes root-relative links absolute and anchors point at the post itself', () => {
    expect(absolutizeUrls('<a href="/x#y">a</a><img src="/i.png"><a href="#z">b</a>', 'https://post.url')).toBe(
      `<a href="https://blog.marknenadov.com/x#y">a</a><img src="https://blog.marknenadov.com/i.png"><a href="https://post.url#z">b</a>`,
    );
  });
});

describe('buildRssFeed', () => {
  const rss = buildRssFeed(feedPosts);

  test('escapes titles and content for XML', () => {
    expect(rss).toContain('<title>Fish &amp; &quot;Chips&quot;</title>');
    expect(rss).toContain('&lt;p&gt;a &amp;lt;= b&lt;/p&gt;');
  });

  test('uses RFC 822 dates and absolute links', () => {
    expect(rss).toContain('<pubDate>Sat, 26 Jul 2025 13:50:00 GMT</pubDate>');
    expect(rss).toContain('<link>https://blog.marknenadov.com/first-post</link>');
  });
});

describe('buildAtomFeed', () => {
  test('sets the feed updated date from the newest post', () => {
    const atom = buildAtomFeed(feedPosts);
    expect(atom).toContain('<updated>2025-07-26T13:50:00Z</updated>');
    expect(atom).toContain('<category term="food"/>');
  });
});

describe('buildJsonFeed', () => {
  test('produces a parseable JSON Feed 1.1 document', () => {
    const feed = JSON.parse(buildJsonFeed(feedPosts));
    expect(feed.version).toBe('https://jsonfeed.org/version/1.1');
    expect(feed.feed_url).toBe('https://blog.marknenadov.com/posts/json');
    expect(feed.items[0].url).toBe('https://blog.marknenadov.com/first-post');
    expect(feed.items[0].tags).toEqual(['food']);
  });
});
