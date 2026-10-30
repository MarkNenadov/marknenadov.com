import type { Metadata } from 'next';
import { getAllTags } from '@/lib/posts';
import { BackToPostsLink } from '../Components/BackToPostsLink';
import { TagList } from '../Components/TagList';

export const metadata: Metadata = { title: 'Tags' };

export default function TagsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <section className="card-surface p-6 md:p-10">
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">Tags</h1>
        <TagList tags={getAllTags()} />
      </section>
      <div><BackToPostsLink /></div>
    </div>
  );
}
