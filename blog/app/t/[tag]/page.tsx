import type { Metadata } from 'next';
import { getAllTags, getPostsWithTag } from '@/lib/posts';
import { BackToPostsLink } from '../../Components/BackToPostsLink';
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

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <h1 className="text-3xl font-bold md:text-4xl">Posts tagged with {tag}</h1>
      <PostList posts={getPostsWithTag(tag)} />
      <div><BackToPostsLink /></div>
    </div>
  );
}
