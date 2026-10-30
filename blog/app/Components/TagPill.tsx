import Link from 'next/link';

interface TagPillProps {
  readonly name: string;
  readonly count?: number;
}

export function TagPill({ name, count }: TagPillProps) {
  return (
    <Link
      href={`/t/${name}`}
      aria-label={`View all posts tagged with ${name}`}
      className="group inline-flex min-h-8 items-center gap-1.5 rounded-full border border-hairline px-3 text-[0.8125rem] text-ink-soft transition-colors hover:border-hairline-strong hover:text-accent"
    >
      {name}
      {count !== undefined && <span className="meta-text transition-colors group-hover:text-accent">{count}</span>}
    </Link>
  );
}
