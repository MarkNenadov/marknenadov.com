import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Not found' };

export default function NotFound() {
  return (
    <div className="page-narrow pt-16 md:pt-28">
      <p className="meta-text">404</p>
      <h1 className="mt-3 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[3.25rem]">
        This page does not exist.
      </h1>
      <p className="mt-5 text-lg text-ink-soft">
        <Link className="link-text" href="/">Try this</Link>.
      </p>
    </div>
  );
}
