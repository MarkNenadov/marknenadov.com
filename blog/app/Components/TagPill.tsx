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
      className="relative z-10 inline-block rounded-lg border border-border-primary bg-surface-secondary px-2 py-0.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
    >
      {name}
      {count !== undefined && <span className="ml-1.5 text-text-tertiary">{count}</span>}
    </Link>
  );
}
