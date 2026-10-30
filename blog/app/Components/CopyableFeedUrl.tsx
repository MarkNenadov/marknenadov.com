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
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="min-w-0">
        <a href={path} className="block py-1 font-medium tracking-[-0.015em] transition-colors hover:text-accent">{label}</a>
        <p className="meta-text [overflow-wrap:anywhere]">{url.replace('https://', '')}</p>
      </div>
      <button
        type="button"
        onClick={copyUrl}
        aria-label={`Copy ${label} URL`}
        className="min-h-9 w-[4.5rem] shrink-0 rounded-full border border-hairline text-[0.8125rem] font-medium transition-colors hover:border-hairline-strong hover:bg-surface active:bg-surface"
      >
        <span aria-live="polite">{isCopied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}
