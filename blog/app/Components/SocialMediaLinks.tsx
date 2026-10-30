import { SOCIAL_ICON_PATHS } from './socialIconPaths';

const SOCIAL_MEDIA_LINKS = [
  { title: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/MarkNenadov' },
  { title: 'GitHub', icon: 'github', href: 'https://www.github.com/MarkNenadov' },
  { title: 'Goodreads', icon: 'goodreads', href: 'https://www.goodreads.com/user/show/4015564-mark-nenadov' },
  { title: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/mark-nenadov-6397273/' },
] as const;

export function SocialMediaLinks() {
  return (
    <ul className="flex items-center">
      {SOCIAL_MEDIA_LINKS.map(({ title, icon, href }) => (
        <li key={title}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} profile`}
            title={title}
            className="flex size-11 items-center justify-center text-muted transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[1.125rem] fill-current">
              <path d={SOCIAL_ICON_PATHS[icon]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
