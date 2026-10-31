import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  assertUniqueSlugs,
  estimateReadingMinutes,
  formatPublishedDate,
  formatShortDate,
  getAboutHtml,
  getAdjacentPosts,
  getAllPosts,
  getAllTags,
  getPostBody,
  getPostBySlug,
  getPostsWithTag,
  sortNewestFirst,
  splitTitle,
} from './posts';

describe('splitTitle', () => {
  test.each([
    ['📕 Books From 2025', '📕', 'Books From 2025'],
    ['😮‍💨 On REST and Its Alternatives', '😮‍💨', 'On REST and Its Alternatives'],
    ['♦️ Ruby Intensifies', '♦️', 'Ruby Intensifies'],
    ['🏛 The Ancient of Datas', '🏛', 'The Ancient of Datas'],
  ])('separates the leading emoji from %s', (title, emoji, text) => {
    expect(splitTitle(title)).toEqual({ emoji, text });
  });

  test('handles titles with no leading emoji', () => {
    expect(splitTitle('2025: Its Perils')).toEqual({ emoji: undefined, text: '2025: Its Perils' });
  });
});

describe('getAdjacentPosts', () => {
  const slugs = getAllPosts().map(({ slug }) => slug);

  test('the newest post has only an older neighbour', () => {
    const { newer, older } = getAdjacentPosts(slugs[0]);
    expect(newer).toBeUndefined();
    expect(older?.slug).toBe(slugs[1]);
  });

  test('a middle post has both neighbours', () => {
    const { newer, older } = getAdjacentPosts(slugs[1]);
    expect(newer?.slug).toBe(slugs[0]);
    expect(older?.slug).toBe(slugs[2]);
  });

  test('the oldest post has only a newer neighbour', () => {
    const { newer, older } = getAdjacentPosts(slugs[slugs.length - 1]);
    expect(newer?.slug).toBe(slugs[slugs.length - 2]);
    expect(older).toBeUndefined();
  });
});

describe('sortNewestFirst', () => {
  const post = (slug: string, publishedAt: string) => ({ slug, publishedAt, title: slug, excerpt: '', tags: [] });

  test('orders by date, newest first, whatever the source order', () => {
    const sorted = sortNewestFirst([post('old', '2025-01-01T12:00:00Z'), post('new', '2026-10-31T12:00:00Z')]);
    expect(sorted.map(({ slug }) => slug)).toEqual(['new', 'old']);
  });

  test('breaks same-day ties by slug so the order is stable', () => {
    const sorted = sortNewestFirst([post('b', '2026-10-31T12:00:00Z'), post('a', '2026-10-31T12:00:00Z')]);
    expect(sorted.map(({ slug }) => slug)).toEqual(['a', 'b']);
  });
});

describe('assertUniqueSlugs', () => {
  test('rejects two posts with the same address', () => {
    const post = { slug: 'same', publishedAt: '2026-10-31T12:00:00Z', title: 'T', excerpt: '', tags: [] };
    expect(() => assertUniqueSlugs([post, post])).toThrow('same');
  });
});

describe('formatShortDate', () => {
  test('uses an abbreviated month without punctuation, in UTC', () => {
    expect(formatShortDate('2025-07-03T04:29:00Z')).toBe('Jul 3, 2025');
  });
});

describe('getAllPosts', () => {
  test('returns every post, newest first', () => {
    const posts = getAllPosts();
    const dates = posts.map(({ publishedAt }) => publishedAt);
    expect(posts.length).toBeGreaterThanOrEqual(19);
    expect(dates).toEqual([...dates].sort().reverse());
  });
});

describe('getPostBySlug', () => {
  test('finds a post and returns undefined for an unknown slug', () => {
    expect(getPostBySlug('people-ware')?.title).toBe('👤 People-ware');
    expect(getPostBySlug('not-a-post')).toBeUndefined();
  });
});

describe('getAllTags', () => {
  test('counts posts per tag and sorts alphabetically', () => {
    const tags = getAllTags();
    expect(tags.map(({ name }) => name)).toEqual(tags.map(({ name }) => name).sort());
    tags.forEach(({ name, count }) => expect(count).toBe(getPostsWithTag(name).length));
  });
});

describe('getPostsWithTag', () => {
  test('returns only posts with that tag', () => {
    const posts = getPostsWithTag('ai');
    expect(posts.map(({ slug }) => slug)).toContain('a-mental-model-for-understanding-llm-limitations');
    posts.forEach(({ tags }) => expect(tags).toContain('ai'));
  });
});

describe('content integrity', () => {
  const pageBodies = [...getAllPosts().map(({ slug }) => getPostBody(slug)), getAboutHtml()];

  test('no body still references the defunct platform or its archive paths', () => {
    pageBodies.forEach((body) => {
      expect(body).not.toMatch(/active_storage|_next\/image|trix-content|wondering\.willow\.camp/);
      expect(body).not.toMatch(/href="(?!https?:)[^"]*\.html/);
    });
  });

  test('every local image in a body exists in public/', () => {
    const imagePaths = pageBodies.flatMap((body) =>
      [...body.matchAll(/<img src="(\/[^"]+)"/g)].map((match) => match[1]),
    );
    expect(imagePaths.length).toBeGreaterThan(0);
    imagePaths.forEach((path) => expect(existsSync(join('public', path))).toBe(true));
  });

  test('every internal link points at a real page and heading', () => {
    const staticPaths = new Set(['/', '/about', '/tags', '/subscribe', '/posts/rss', '/posts/atom', '/posts/json']);
    const tagPaths = getAllTags().map(({ name }) => `/t/${name}`);
    pageBodies.forEach((body) => {
      [...body.matchAll(/href="(\/[^"#]*)(?:#([^"]*))?"/g)].forEach(([, path, anchor]) => {
        const slug = path.slice(1);
        expect(staticPaths.has(path) || tagPaths.includes(path) || getPostBySlug(slug) !== undefined).toBe(true);
        if (anchor) {
          expect(getPostBody(slug)).toContain(`id="${anchor}"`);
        }
      });
    });
  });
});

describe('estimateReadingMinutes', () => {
  test.each([
    ['<p>one two</p>', 1],
    [`<p>${'word '.repeat(400)}</p>`, 2],
    [`<p>${'word '.repeat(401)}</p>`, 3],
  ])('rounds up at 200 words per minute', (html, minutes) => {
    expect(estimateReadingMinutes(html)).toBe(minutes);
  });
});

describe('formatPublishedDate', () => {
  test('formats in UTC so late-evening posts keep their archived date', () => {
    expect(formatPublishedDate('2025-07-03T04:29:00Z')).toBe('July 3, 2025');
  });
});
