import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  estimateReadingMinutes,
  formatPublishedDate,
  getAdjacentPosts,
  getAllPosts,
  getPostBody,
  getPostBySlug,
  splitTitle,
} from '@/lib/posts';
import { SITE } from '@/lib/site';
import { AuthorCard } from '../Components/AuthorCard';
import { PostNavigation } from '../Components/PostNavigation';
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
  const { text } = splitTitle(title);
  return {
    title: text,
    description: excerpt,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: text,
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
  const { emoji, text } = splitTitle(title);
  const body = getPostBody(slug);

  return (
    <div className="page-narrow pt-6 md:pt-12">
      <Link href="/" className="meta-text inline-block py-2 transition-colors hover:text-accent">← All posts</Link>
      <article className="mt-6 md:mt-10">
        <header className="border-b border-hairline pb-7 md:pb-9">
          {emoji && <div aria-hidden="true" className="mb-4 text-[1.75rem] leading-none md:mb-5 md:text-4xl">{emoji}</div>}
          <h1 className="text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.032em] text-balance md:text-[3.25rem]">
            {text}
          </h1>
          <div className="mt-6 flex items-center gap-3 md:mt-8">
            <Image
              src="/images/markn.png"
              alt=""
              width={72}
              height={72}
              className="size-9 rounded-full object-cover object-top"
            />
            <div>
              <p className="text-sm font-medium leading-5">{SITE.author}</p>
              <p className="meta-text">
                <time dateTime={publishedAt}>{formatPublishedDate(publishedAt)}</time>
                {' · '}{estimateReadingMinutes(body)} min read
              </p>
            </div>
          </div>
        </header>
        <div className="post-body mt-7 md:mt-9" dangerouslySetInnerHTML={{ __html: body }} />
        <ul aria-label="Post tags" className="mt-10 flex flex-wrap gap-2">
          {tags.map((tag) => <li key={tag}><TagPill name={tag} /></li>)}
        </ul>
      </article>
      <div className="mt-10 border-t border-hairline pt-8"><AuthorCard /></div>
      <div className="mt-8"><PostNavigation {...getAdjacentPosts(slug)} /></div>
    </div>
  );
}
