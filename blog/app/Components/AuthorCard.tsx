import Image from 'next/image';
import { SITE } from '@/lib/site';

export function AuthorCard() {
  return (
    <aside className="flex items-start gap-4">
      <Image
        src="/images/markn.png"
        alt={`${SITE.author} - Professional headshot`}
        width={112}
        height={112}
        className="size-14 shrink-0 rounded-full object-cover object-top"
      />
      <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
        <span className="font-medium text-ink">{SITE.author}</span> is a Canadian software developer working in
        the fintech industry. He loves feedback. Drop him a line
        through <a className="link-text" href="https://letterbird.co/marknenadov">letterbird</a>.
      </p>
    </aside>
  );
}
