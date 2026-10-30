import type { Tag } from '@/lib/posts';
import { TagPill } from './TagPill';

export function TagList({ tags }: { tags: readonly Tag[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map(({ name, count }) => (
        <li key={name}><TagPill name={name} count={count} /></li>
      ))}
    </ul>
  );
}
