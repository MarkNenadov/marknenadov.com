import type { Metadata } from 'next';
import { getAboutHtml } from '@/lib/posts';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <article className="page-narrow pt-12 md:pt-20">
      <h1 className="border-b border-hairline pb-7 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] md:pb-9 md:text-[3.25rem]">
        About
      </h1>
      <div className="post-body mt-7 md:mt-9" dangerouslySetInnerHTML={{ __html: getAboutHtml() }} />
    </article>
  );
}
