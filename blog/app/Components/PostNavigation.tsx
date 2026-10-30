import Link from 'next/link';
import { splitTitle, type AdjacentPosts, type Post } from '@/lib/posts';

interface NeighbourLinkProps {
  readonly label: string;
  readonly post: Post;
  readonly alignment: string;
}

function NeighbourLink({ label, post: { slug, title }, alignment }: NeighbourLinkProps) {
  return (
    <Link
      href={`/${slug}`}
      className={`${alignment} group block rounded-xl border border-hairline p-4 transition-colors hover:border-hairline-strong hover:bg-surface active:bg-surface`}
    >
      <span className="eyebrow block">{label}</span>
      <span className="mt-1.5 block font-medium leading-snug tracking-[-0.015em] transition-colors group-hover:text-accent">
        {splitTitle(title).text}
      </span>
    </Link>
  );
}

export function PostNavigation({ newer, older }: AdjacentPosts) {
  return (
    <nav aria-label="More posts" className="grid gap-3 md:grid-cols-2">
      {newer && <NeighbourLink label="← Newer" post={newer} alignment="" />}
      {older && <NeighbourLink label="Older →" post={older} alignment="md:col-start-2 md:text-right" />}
    </nav>
  );
}
