import Link from 'next/link';
import type { Tag } from '@/lib/posts';

export function TagList({ tags }: { tags: readonly Tag[] }) {
  return (
    <ul className="divide-y divide-hairline">
      {tags.map(({ name, count }) => (
        <li key={name}>
          <Link
            href={`/t/${name}`}
            aria-label={`View all posts tagged with ${name}`}
            className="group flex items-baseline justify-between gap-4 py-2.5 text-[0.9375rem] transition-colors hover:text-accent"
          >
            {name}
            <span className="meta-text transition-colors group-hover:text-accent">{count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
