import type { ReactNode } from 'react';

interface CardProps {
  readonly title: string;
  readonly children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <section className="card-surface p-5">
      <h2 className="mb-3 text-xl font-semibold text-text-primary">{title}</h2>
      <div className="text-sm leading-relaxed text-text-secondary">{children}</div>
    </section>
  );
}
