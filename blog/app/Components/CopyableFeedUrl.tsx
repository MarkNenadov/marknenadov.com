'use client';

import { useState } from 'react';

const COPIED_CONFIRMATION_MS = 2000;

interface CopyableFeedUrlProps {
  readonly label: string;
  readonly path: string;
  readonly url: string;
}

export function CopyableFeedUrl({ label, path, url }: CopyableFeedUrlProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyUrl() {
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), COPIED_CONFIRMATION_MS);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
      <div className="min-w-0">
        <div className="font-semibold text-text-primary">{label}</div>
        <a className="link-text break-all font-mono text-xs" href={path}>{url}</a>
      </div>
      <button
        type="button"
        onClick={copyUrl}
        aria-label={`Copy ${label} URL`}
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
      >
        <span aria-live="polite">{isCopied ? '✓ Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}
