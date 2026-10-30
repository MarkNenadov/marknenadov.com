import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { SITE } from '@/lib/site';
import { AuthorCard } from './Components/AuthorCard';
import { Card } from './Components/Card';
import { PostList } from './Components/PostList';
import { SocialMediaLinks } from './Components/SocialMediaLinks';
import { TagList } from './Components/TagList';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-4 py-4 text-center">
        <h1 className="text-5xl font-bold md:text-6xl">{SITE.name}</h1>
        <p className="text-xl text-gray-600">{SITE.description}</p>
        <SocialMediaLinks />
      </header>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <PostList posts={getAllPosts()} />
        <div className="flex flex-col gap-6">
          <AuthorCard />
          <Card title="🏷 Tags">
            <TagList tags={getAllTags()} />
          </Card>
          <Card title="📡 Subscribe">
            Follow along with <Link className="link-text" href="/subscribe">RSS, Atom, or JSON Feed</Link>.
          </Card>
        </div>
      </div>
    </div>
  );
}
