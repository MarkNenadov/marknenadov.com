import Image, { StaticImageData } from 'next/image'

interface SocialMediaLinkProps {
    logoSource: StaticImageData;
    title: string;
    href: string;
}

export default function SocialMediaLink( {logoSource, title, href}: SocialMediaLinkProps) {
    return (
        <div className="hover:invert">
        <a 
            href={ href }
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ `${title} profile` }
        >
          <Image 
              src={ logoSource }
              width="24" 
              height="24" 
              alt={ title }
              title={ title }
          />
          </a>
      </div>

    );
}