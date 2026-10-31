import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import manifest from '../content/posts.json';
import { parseMarkdownPost, renderMarkdown, type MarkdownPost } from './markdownPost';

const CONTENT_DIR = join(process.cwd(), 'content');
const POSTS_DIR = join(CONTENT_DIR, 'posts');
const MARKDOWN_EXTENSION = '.md';
const WORDS_PER_MINUTE = 200;

export interface Post {
  readonly slug: string;
  readonly title: string;
  readonly publishedAt: string;
  readonly excerpt: string;
  readonly tags: readonly string[];
}

export interface Tag {
  readonly name: string;
  readonly count: number;
}

export interface SplitTitle {
  readonly emoji: string | undefined;
  readonly text: string;
}

export interface AdjacentPosts {
  readonly newer: Post | undefined;
  readonly older: Post | undefined;
}

export function sortNewestFirst(posts: readonly Post[]): readonly Post[] {
  return [...posts].sort(
    (first, second) => second.publishedAt.localeCompare(first.publishedAt) || first.slug.localeCompare(second.slug),
  );
}

export function assertUniqueSlugs(posts: readonly Post[]): readonly Post[] {
  const duplicate = posts.find(({ slug }, index) => posts.findIndex((post) => post.slug === slug) !== index);
  if (duplicate) {
    throw new Error(`Two posts use the address "${duplicate.slug}"`);
  }
  return posts;
}

function markdownPostPath(slug: string): string {
  return join(POSTS_DIR, `${slug}${MARKDOWN_EXTENSION}`);
}

function readMarkdownPost(slug: string): MarkdownPost {
  return parseMarkdownPost(slug, readFileSync(markdownPostPath(slug), 'utf8'));
}

function readMarkdownPosts(): readonly Post[] {
  return readdirSync(POSTS_DIR)
    .filter((fileName) => fileName.endsWith(MARKDOWN_EXTENSION))
    .map((fileName) => readMarkdownPost(basename(fileName, MARKDOWN_EXTENSION)).post);
}

const POSTS = sortNewestFirst(assertUniqueSlugs([...manifest, ...readMarkdownPosts()]));
const LEADING_EMOJI = /^(\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic})*)\s+(.*)$/su;

export function getAllPosts(): readonly Post[] {
  return POSTS;
}

export function splitTitle(title: string): SplitTitle {
  const match = title.match(LEADING_EMOJI);
  return match ? { emoji: match[1], text: match[2] } : { emoji: undefined, text: title };
}

export function getAdjacentPosts(slug: string): AdjacentPosts {
  const index = POSTS.findIndex((post) => post.slug === slug);
  return { newer: POSTS[index - 1], older: POSTS[index + 1] };
}

export function formatShortDate(publishedAt: string): string {
  return new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function getPostBody(slug: string): string {
  return existsSync(markdownPostPath(slug))
    ? renderMarkdown(readMarkdownPost(slug).markdown)
    : readFileSync(join(POSTS_DIR, `${slug}.html`), 'utf8');
}

export function getAboutHtml(): string {
  return readFileSync(join(CONTENT_DIR, 'pages', 'about.html'), 'utf8');
}

export function getPostsWithTag(tag: string): readonly Post[] {
  return POSTS.filter(({ tags }) => tags.includes(tag));
}

export function getAllTags(): readonly Tag[] {
  return [...new Set(POSTS.flatMap(({ tags }) => tags))]
    .sort()
    .map((name) => ({ name, count: getPostsWithTag(name).length }));
}

export function estimateReadingMinutes(html: string): number {
  const wordCount = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  return Math.ceil(wordCount / WORDS_PER_MINUTE);
}

export function formatPublishedDate(publishedAt: string): string {
  return new Date(publishedAt).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
