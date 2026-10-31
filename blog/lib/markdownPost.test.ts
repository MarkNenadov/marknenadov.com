import { describe, expect, test } from 'bun:test';
import { parseMarkdownPost, renderMarkdown } from './markdownPost';

const frontmatter = (fields: string, body = 'Body text.') => `---\n${fields}\n---\n\n${body}\n`;
const VALID_FIELDS = 'title: My Post\ndate: 2026-10-31\ntags: [developer-life, ai]\nsummary: One sharp sentence.';

describe('parseMarkdownPost', () => {
  test('reads every field and takes the slug from the filename', () => {
    expect(parseMarkdownPost('my-post', frontmatter(VALID_FIELDS)).post).toEqual({
      slug: 'my-post',
      title: 'My Post',
      publishedAt: '2026-10-31T12:00:00Z',
      tags: ['developer-life', 'ai'],
      excerpt: 'One sharp sentence.',
    });
  });

  test('separates the body from the frontmatter', () => {
    expect(parseMarkdownPost('my-post', frontmatter(VALID_FIELDS, 'Hello **there**.')).markdown).toBe('Hello **there**.');
  });

  test.each([
    ['title: The Ancient: Living In The Past', 'The Ancient: Living In The Past'],
    ['title: "Ten \'Good\' Moments: A List"', "Ten 'Good' Moments: A List"],
    ["title: 'A Quoted Title'", 'A Quoted Title'],
    ['title: 💡 With An Emoji', '💡 With An Emoji'],
  ])('handles the title line %s', (titleLine, title) => {
    const fields = `${titleLine}\ndate: 2026-10-31\nsummary: Sentence.`;
    expect(parseMarkdownPost('my-post', frontmatter(fields)).post.title).toBe(title);
  });

  test('tags are optional', () => {
    const fields = 'title: My Post\ndate: 2026-10-31\nsummary: Sentence.';
    expect(parseMarkdownPost('my-post', frontmatter(fields)).post.tags).toEqual([]);
  });

  test('accepts Windows line endings', () => {
    const source = frontmatter(VALID_FIELDS).replaceAll('\n', '\r\n');
    expect(parseMarkdownPost('my-post', source).post.title).toBe('My Post');
  });

  test.each([
    ['no frontmatter', 'Just a body.', /frontmatter/],
    ['a missing title', frontmatter('date: 2026-10-31\nsummary: Sentence.'), /"title"/],
    ['a missing date', frontmatter('title: T\nsummary: Sentence.'), /"date"/],
    ['a missing summary', frontmatter('title: T\ndate: 2026-10-31'), /"summary"/],
    ['an unknown field', frontmatter(`${VALID_FIELDS}\ntag: typo`), /unknown field "tag"/],
    ['a malformed line', frontmatter(`${VALID_FIELDS}\nnot a field`), /not a field/],
    ['a badly formatted date', frontmatter('title: T\ndate: Oct 31\nsummary: S'), /date/],
    ['an impossible date', frontmatter('title: T\ndate: 2026-02-31\nsummary: S'), /date/],
    ['a tag that is not URL-safe', frontmatter('title: T\ndate: 2026-10-31\nsummary: S\ntags: [Big Ideas]'), /Big Ideas/],
    ['an empty body', frontmatter(VALID_FIELDS, ''), /empty/],
  ])('rejects %s, naming the file', (_description, source, message) => {
    expect(() => parseMarkdownPost('my-post', source)).toThrow(message);
    expect(() => parseMarkdownPost('my-post', source)).toThrow('content/posts/my-post.md');
  });

  test.each(['My Post', 'my_post', 'about', 'tags', 'subscribe', 'posts', 't'])('rejects the filename %s', (slug) => {
    expect(() => parseMarkdownPost(slug, frontmatter(VALID_FIELDS))).toThrow(slug);
  });
});

describe('renderMarkdown', () => {
  test.each([
    ['a quote', '> Quoted.', '<blockquote>\n<p>Quoted.</p>\n</blockquote>\n'],
    ['a quote with a line break', '> One\\\n> Two', '<blockquote>\n<p>One<br>Two</p>\n</blockquote>\n'],
    ['a multi-paragraph quote', '> One\n>\n> Two', '<blockquote>\n<p>One</p>\n<p>Two</p>\n</blockquote>\n'],
    ['a heading', '## Section', '<h2>Section</h2>\n'],
    ['bold and italics', '**b** *i*', '<p><strong>b</strong> <em>i</em></p>\n'],
    ['a link', '[x](https://example.com)', '<p><a href="https://example.com">x</a></p>\n'],
    ['an image', '![Alt](/images/x.png)', '<p><img src="/images/x.png" alt="Alt"></p>\n'],
    ['a list', '- a\n- b', '<ul>\n<li>a</li>\n<li>b</li>\n</ul>\n'],
    ['a divider', '---', '<hr>\n'],
  ])('renders %s', (_description, markdown, html) => {
    expect(renderMarkdown(markdown)).toBe(html);
  });

  test('renders fenced code, escaping it', () => {
    expect(renderMarkdown('```\na <= b\n```')).toBe('<pre><code>a &lt;= b\n</code></pre>\n');
  });
});
