import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
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

  test('every archived title has its emoji separated', () => {
    getAllPosts().forEach(({ title }) => expect(splitTitle(title).emoji).toBeDefined());
  });
});

describe('getAdjacentPosts', () => {
  test('the newest post has only an older neighbour', () => {
    const { newer, older } = getAdjacentPosts('books-from-2025');
    expect(newer).toBeUndefined();
    expect(older?.slug).toBe('how-to-remember-what-year-you-are-in');
  });

  test('a middle post has both neighbours', () => {
    const { newer, older } = getAdjacentPosts('how-to-remember-what-year-you-are-in');
    expect(newer?.slug).toBe('books-from-2025');
    expect(older?.slug).toBe('on-rest-and-its-alternatives');
  });

  test('the oldest post has only a newer neighbour', () => {
    const { newer, older } = getAdjacentPosts('reading-tips');
    expect(newer?.slug).toBe('people-ware');
    expect(older).toBeUndefined();
  });
});

describe('formatShortDate', () => {
  test('uses an abbreviated month without punctuation, in UTC', () => {
    expect(formatShortDate('2025-07-03T04:29:00Z')).toBe('Jul 3, 2025');
  });
});

describe('getAllPosts', () => {
  test('returns all 19 archived posts, newest first', () => {
    const posts = getAllPosts();
    const dates = posts.map(({ publishedAt }) => publishedAt);
    expect(posts).toHaveLength(19);
    expect(dates).toEqual([...dates].sort().reverse());
    expect(posts[0].slug).toBe('books-from-2025');
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
    expect(tags).toHaveLength(19);
    expect(tags.map(({ name }) => name)).toEqual(tags.map(({ name }) => name).sort());
    expect(tags.find(({ name }) => name === 'developer-life')?.count).toBe(7);
  });
});

describe('getPostsWithTag', () => {
  test('returns only posts with that tag', () => {
    expect(getPostsWithTag('ai').map(({ slug }) => slug)).toEqual([
      'how-to-remember-what-year-you-are-in',
      'a-mental-model-for-understanding-llm-limitations',
      '2025-its-perils-and-prospects',
    ]);
  });
});

describe('content integrity', () => {
  const pageBodies = [...getAllPosts().map(({ slug }) => getPostBody(slug)), getAboutHtml()];

  test('no body still references the defunct platform or its archive paths', () => {
    pageBodies.forEach((body) => {
      expect(body).not.toMatch(/active_storage|_next\/image|trix-content|wondering\.willow\.camp/);
      expect(body).not.toMatch(/href="[^"]*\.html/);
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
    const staticPaths = new Set(['/', '/about', '/tags', '/subscribe']);
    pageBodies.forEach((body) => {
      [...body.matchAll(/href="(\/[^"#]*)(?:#([^"]*))?"/g)].forEach(([, path, anchor]) => {
        const slug = path.slice(1);
        expect(staticPaths.has(path) || getPostBySlug(slug) !== undefined).toBe(true);
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
