import Image from 'next/image';
import { SITE } from '@/lib/site';

export function AuthorCard() {
  return (
    <aside className="card-surface flex items-start gap-4 p-5">
      <Image
        src="/images/markn.png"
        alt={`${SITE.author} - Professional headshot`}
        width={80}
        height={80}
        className="size-20 shrink-0 rounded-2xl object-cover object-top shadow-elegant"
      />
      <p className="text-sm leading-relaxed text-text-secondary">
        {SITE.author} is a Canadian software developer working in
        the fintech industry. He loves feedback. Drop him a line
        through <a className="link-text" href="https://letterbird.co/marknenadov">letterbird</a>.
      </p>
    </aside>
  );
}
