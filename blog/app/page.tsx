import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { SITE } from '@/lib/site';
import { AuthorCard } from './Components/AuthorCard';
import { PostList } from './Components/PostList';
import { TagPill } from './Components/TagPill';

export default function Home() {
  return (
    <div className="page-wide">
      <header className="border-b border-hairline pb-10 pt-12 md:pb-16 md:pt-24">
        <div className="relative">
          <h1 className="text-[clamp(3.25rem,14.5vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-balance">
            {SITE.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-snug tracking-[-0.016em] text-ink-soft text-pretty md:mt-7 md:text-2xl">
            {SITE.description}
          </p>
          <p className="meta-text mt-5 md:mt-7">By {SITE.author}</p>
          <figure className="mt-8 max-w-xl md:mt-10">
            <blockquote className="text-[0.9375rem] italic leading-relaxed text-ink-soft text-pretty">{SITE.epigraph.quote}</blockquote>
            <figcaption className="meta-text mt-1.5">{SITE.epigraph.attribution}</figcaption>
          </figure>
          {/* Hidden until the content area is at full width; any narrower and it would collide with the title. */}
          <Image
            src="/images/wondering-willow.webp"
            alt="A person reading under a willow tree, looking up at a firefly whose trail traces a question mark"
            width={240}
            height={240}
            className="absolute right-0 top-1/2 hidden size-60 -translate-y-1/2 min-[68rem]:block"
          />
        </div>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20">
        <PostList posts={getAllPosts()} />
        <aside className="flex flex-col gap-10 border-t border-hairline pt-10 lg:sticky lg:top-14 lg:self-start lg:border-t-0 lg:py-9">
          <section>
            <h2 className="eyebrow mb-4">About the author</h2>
            <AuthorCard />
          </section>
          <section>
            <h2 className="eyebrow mb-4">Tags</h2>
            <ul className="flex flex-wrap gap-2">
              {getAllTags().map(({ name, count }) => <li key={name}><TagPill name={name} count={count} /></li>)}
            </ul>
          </section>
          <section>
            <h2 className="eyebrow mb-3">Subscribe</h2>
            <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
              Follow along with <Link className="link-text" href="/subscribe">RSS, Atom, or JSON Feed</Link>.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
