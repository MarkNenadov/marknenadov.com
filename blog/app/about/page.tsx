import type { Metadata } from 'next';
import { getAboutHtml } from '@/lib/posts';
import { BackToPostsLink } from '../Components/BackToPostsLink';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <article className="card-surface p-6 md:p-10">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">About</h1>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: getAboutHtml() }} />
      </article>
      <div><BackToPostsLink /></div>
    </div>
  );
}
