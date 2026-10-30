import { describe, expect, test } from 'bun:test';
import type { NextConfig } from 'next';
import { getPostBySlug } from './posts';

const DOSTOEVSKY_SLUG = 'what-can-fyodor-dostoevsky-1821-1881-teach-software-engineers';

async function getRedirects() {
  const configPath: string = '../next.config.js';
  const { default: nextConfig }: { default: NextConfig } = await import(configPath);
  return (await nextConfig.redirects?.()) ?? [];
}

describe('Dostoevsky post dates', () => {
  test('the title and slug use his correct death year', () => {
    expect(getPostBySlug(DOSTOEVSKY_SLUG)?.title).toContain('(1821-1881)');
  });

  test('the old address permanently redirects to the post', async () => {
    expect(await getRedirects()).toContainEqual({
      source: '/what-can-fyodor-dostoevsky-1821-1861-teach-software-engineers',
      destination: `/${DOSTOEVSKY_SLUG}`,
      permanent: true,
    });
  });
});

describe('redirects', () => {
  test('every redirect lands on a real post', async () => {
    (await getRedirects()).forEach(({ destination }) => {
      expect(getPostBySlug(destination.slice(1))).toBeDefined();
    });
  });
});
