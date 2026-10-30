import { notFound } from 'next/navigation';
import { formatPublishedDate, getAllPosts, getPostBySlug, splitTitle } from '@/lib/posts';
import { renderShareCard, SHARE_CARD_CONTENT_TYPE, SHARE_CARD_SIZE } from '@/lib/shareCard';
import { SITE } from '@/lib/site';

interface PostShareCardProps {
  readonly params: Promise<{ slug: string }>;
}

export const alt = `Title card for a post on ${SITE.name}`;
export const size = SHARE_CARD_SIZE;
export const contentType = SHARE_CARD_CONTENT_TYPE;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export default async function PostShareCard({ params }: PostShareCardProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  const { title, publishedAt } = post;
  return renderShareCard({ title: splitTitle(title).text, date: formatPublishedDate(publishedAt) });
}
