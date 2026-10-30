import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags, getPostsWithTag } from '@/lib/posts';
import { PostList } from '../../Components/PostList';

interface TagPageProps {
  readonly params: Promise<{ tag: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ name }) => ({ tag: name }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Posts tagged with ${tag}` };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsWithTag(tag);

  return (
    <div className="page-narrow pt-6 md:pt-12">
      <Link href="/tags" className="meta-text inline-block py-2 transition-colors hover:text-accent">← All tags</Link>
      <header className="mt-6 border-b border-hairline pb-7 md:mt-10 md:pb-9">
        <h1 className="text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] [overflow-wrap:anywhere] md:text-[3.25rem]">
          {tag}
        </h1>
        <p className="meta-text mt-3">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
