import Link from 'next/link';
import { formatShortDate, splitTitle, type Post } from '@/lib/posts';

function PostRow({ post: { slug, title, publishedAt, excerpt, tags } }: { post: Post }) {
  const { emoji, text } = splitTitle(title);

  return (
    <article className="group relative py-7 transition-opacity active:opacity-60 md:py-8 md:active:opacity-100">
      <div className="flex items-center gap-2">
        {emoji && <span aria-hidden="true" className="text-sm leading-none">{emoji}</span>}
        <time dateTime={publishedAt} className="meta-text">{formatShortDate(publishedAt)}</time>
      </div>
      <h2 className="mt-2.5 text-[1.3125rem] font-semibold leading-[1.25] tracking-[-0.022em] text-balance md:text-2xl">
        <Link href={`/${slug}`} className="transition-colors after:absolute after:inset-0 group-hover:text-accent">
          {text}
        </Link>
      </h2>
      <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-soft md:line-clamp-2 md:text-base">{excerpt}</p>
      <ul className="relative z-10 mt-3 hidden w-fit gap-3 md:flex">
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/t/${tag}`} className="meta-text transition-colors hover:text-accent">{tag}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PostList({ posts }: { posts: readonly Post[] }) {
  return (
    <div className="divide-y divide-hairline">
      {posts.map((post) => <PostRow key={post.slug} post={post} />)}
    </div>
  );
}
