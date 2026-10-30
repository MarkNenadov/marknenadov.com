import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  estimateReadingMinutes,
  formatPublishedDate,
  getAllPosts,
  getPostBody,
  getPostBySlug,
} from '@/lib/posts';
import { SITE } from '@/lib/site';
import { AuthorCard } from '../Components/AuthorCard';
import { BackToPostsLink } from '../Components/BackToPostsLink';
import { TagPill } from '../Components/TagPill';

interface PostPageProps {
  readonly params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }
  const { title, excerpt, publishedAt, tags } = post;
  return {
    title,
    description: excerpt,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title,
      description: excerpt,
      type: 'article',
      publishedTime: publishedAt,
      authors: [SITE.author],
      tags: [...tags],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  const { title, publishedAt, tags } = post;
  const body = getPostBody(slug);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <article className="card-surface p-6 md:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-text-tertiary">
            {SITE.author} · <time dateTime={publishedAt}>{formatPublishedDate(publishedAt)}</time>
            {' · '}{estimateReadingMinutes(body)} min read
          </p>
        </header>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: body }} />
        <ul aria-label="Post tags" className="mt-8 flex flex-wrap gap-2 border-t border-border-primary pt-6">
          {tags.map((tag) => <li key={tag}><TagPill name={tag} /></li>)}
        </ul>
      </article>
      <AuthorCard />
      <div><BackToPostsLink /></div>
    </div>
  );
}
