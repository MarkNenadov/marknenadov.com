import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  estimateReadingMinutes,
  formatPublishedDate,
  getAboutHtml,
  getAllPosts,
  getAllTags,
  getPostBody,
  getPostBySlug,
  getPostsWithTag,
} from './posts';

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
