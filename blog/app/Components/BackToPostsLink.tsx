import Link from 'next/link';

export function BackToPostsLink() {
  return (
    <Link
      href="/"
      className="inline-block rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md"
    >
      ← Back to posts
    </Link>
  );
}
