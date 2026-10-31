import { marked } from 'marked';
import type { Post } from './posts';

// Noon UTC keeps a date-only post on its calendar day in any time zone's date formatting.
const PUBLISH_TIME = 'T12:00:00Z';
const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;
const URL_SAFE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const KNOWN_FIELDS = new Set(['title', 'date', 'tags', 'summary']);
const RESERVED_SLUGS = new Set(['about', 'tags', 'subscribe', 'posts', 't']);

export interface MarkdownPost {
  readonly post: Post;
  readonly markdown: string;
}

function unquote(value: string): string {
  return value.replace(/^(["'])(.*)\1$/, '$2');
}

function parseFields(frontmatter: string, fail: (problem: string) => never): ReadonlyMap<string, string> {
  return new Map(
    frontmatter
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line): [string, string] => {
        const separator = line.indexOf(':');
        if (separator === -1) {
          fail(`could not read the line "${line}"`);
        }
        const field = line.slice(0, separator).trim();
        if (!KNOWN_FIELDS.has(field)) {
          fail(`unknown field "${field}"`);
        }
        return [field, line.slice(separator + 1).trim()];
      }),
  );
}

function parseDate(date: string, fail: (problem: string) => never): string {
  const publishedAt = `${date}${PUBLISH_TIME}`;
  const parsed = new Date(publishedAt);
  const isRealDate = DATE_ONLY.test(date) && !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(date);
  return isRealDate ? publishedAt : fail(`"date" must be a real date like 2026-10-31, not "${date}"`);
}

function parseTags(tags: string | undefined, fail: (problem: string) => never): readonly string[] {
  const names = (tags ?? '').replace(/^\[|\]$/g, '').split(',').map((tag) => unquote(tag.trim())).filter(Boolean);
  const invalidTag = names.find((name) => !URL_SAFE.test(name));
  return invalidTag ? fail(`tag "${invalidTag}" must be lowercase with hyphens, like developer-life`) : names;
}

export function parseMarkdownPost(slug: string, source: string): MarkdownPost {
  const fail = (problem: string): never => {
    throw new Error(`content/posts/${slug}.md: ${problem}`);
  };
  if (!URL_SAFE.test(slug) || RESERVED_SLUGS.has(slug)) {
    fail(`the filename "${slug}" can't be used as an address; use lowercase words with hyphens`);
  }
  const match = source.replaceAll('\r\n', '\n').match(FRONTMATTER);
  if (!match) {
    return fail('must start with a frontmatter block between --- lines');
  }
  const fields = parseFields(match[1], fail);
  const required = (field: string): string => fields.get(field) || fail(`missing "${field}"`);
  const markdown = match[2].trim();
  if (markdown === '') {
    fail('the post body is empty');
  }
  return {
    post: {
      slug,
      title: unquote(required('title')),
      publishedAt: parseDate(required('date'), fail),
      tags: parseTags(fields.get('tags'), fail),
      excerpt: unquote(required('summary')),
    },
    markdown,
  };
}

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false });
}
