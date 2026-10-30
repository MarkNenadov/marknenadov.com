import type { Metadata } from 'next';
import Image from 'next/image';
import { getAboutHtml } from '@/lib/posts';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <article className="page-narrow pt-10 md:pt-16">
      <Image
        src="/images/mark-thinking.png"
        alt="Illustration of Mark Nenadov deep in thought in front of a bookshelf"
        width={112}
        height={112}
        priority
        className="mb-6 size-24 rounded-2xl md:mb-8 md:size-28"
      />
      <h1 className="border-b border-hairline pb-7 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] md:pb-9 md:text-[3.25rem]">
        About
      </h1>
      <div className="post-body mt-7 md:mt-9" dangerouslySetInnerHTML={{ __html: getAboutHtml() }} />
    </article>
  );
}
