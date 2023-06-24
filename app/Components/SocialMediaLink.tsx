import Image from 'next/image'

interface SocialMediaLinkProps {
    logoSource: any;
    title: string;
    href: string;
}

export default function SocialMediaLink( {logoSource, title, href}: SocialMediaLinkProps) {
    return (
        <div>
        <a href={ href }>
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