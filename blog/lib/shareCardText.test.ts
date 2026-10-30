import { describe, expect, test } from 'bun:test';
import { getAllPosts, splitTitle } from './posts';
import { shareCardTitleSize } from './shareCardText';

describe('shareCardTitleSize', () => {
  test.each([
    ['People-ware', 96],
    ['A'.repeat(30), 96],
    ['A'.repeat(31), 76],
    ['A'.repeat(50), 76],
    ['A'.repeat(51), 64],
    ['A'.repeat(90), 64],
  ])('sizes %s to %i', (title, size) => {
    expect(shareCardTitleSize(title)).toBe(size);
  });

  test('longer titles never get bigger type', () => {
    const sizes = getAllPosts()
      .map(({ title }) => splitTitle(title).text)
      .sort((first, second) => first.length - second.length)
      .map(shareCardTitleSize);
    expect(sizes).toEqual([...sizes].sort((first, second) => second - first));
  });
});
