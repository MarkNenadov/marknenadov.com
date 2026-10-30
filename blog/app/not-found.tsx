import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Not found' };

export default function NotFound() {
  return (
    <div className="card-surface mx-auto max-w-3xl p-6 md:p-10">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-3 text-text-secondary">
        The page you are looking for does not exist. <Link className="link-text" href="/">Try this</Link>.
      </p>
    </div>
  );
}
