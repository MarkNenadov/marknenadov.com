import Link from 'next/link';
import { formatPublishedDate, type Post } from '@/lib/posts';
import { TagPill } from './TagPill';

function PostCard({ post: { slug, title, publishedAt, excerpt, tags } }: { post: Post }) {
  return (
    <article className="card-surface relative p-5 transition-all duration-200 hover:border-border-secondary hover:shadow-elegant">
      <time dateTime={publishedAt} className="text-xs text-text-tertiary">{formatPublishedDate(publishedAt)}</time>
      <h2 className="mt-1 text-xl font-semibold text-text-primary">
        <Link href={`/${slug}`} className="after:absolute after:inset-0 after:rounded-2xl hover:text-primary-700">
          {title}
        </Link>
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{excerpt}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => <li key={tag}><TagPill name={tag} /></li>)}
      </ul>
    </article>
  );
}

export function PostList({ posts }: { posts: readonly Post[] }) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => <PostCard key={post.slug} post={post} />)}
    </div>
  );
}
