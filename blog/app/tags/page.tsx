import type { Metadata } from 'next';
import { getAllTags } from '@/lib/posts';
import { TagList } from '../Components/TagList';

export const metadata: Metadata = { title: 'Tags' };

export default function TagsPage() {
  return (
    <section className="page-narrow pt-12 md:pt-20">
      <h1 className="border-b border-hairline pb-7 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] md:pb-9 md:text-[3.25rem]">
        Tags
      </h1>
      <div className="mt-2"><TagList tags={getAllTags()} /></div>
    </section>
  );
}
