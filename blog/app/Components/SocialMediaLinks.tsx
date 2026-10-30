import Image from 'next/image';

const SOCIAL_MEDIA_LINKS = [
  { title: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/MarkNenadov' },
  { title: 'GitHub', icon: 'github', href: 'https://www.github.com/MarkNenadov' },
  { title: 'Goodreads', icon: 'goodreads', href: 'https://www.goodreads.com/user/show/4015564-mark-nenadov' },
  { title: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/mark-nenadov-6397273/' },
] as const;

export function SocialMediaLinks() {
  return (
    <ul className="flex flex-row justify-center gap-8">
      {SOCIAL_MEDIA_LINKS.map(({ title, icon, href }) => (
        <li key={title} className="hover:invert">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} profile`}
          >
            <Image
              src={`/images/social/${icon}.png`}
              width={24}
              height={24}
              alt=""
              title={title}
              className="opacity-70"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
