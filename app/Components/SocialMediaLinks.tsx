import Image from 'next/image';
import twitterImage from '../../public/twitter.png';
import instagramImage from '../../public/instagram.png';
import gitHubImage from '../../public/github.png';
import goodreadsImage from '../../public/goodreads.png';
import linkedinImage from '../../public/linkedin.png';
import SocialMediaLink from './SocialMediaLink';

const socialMediaLinks = [
  {
    logoSource: twitterImage,
    title: "Twitter",
    href: "https://twitter.com/MarkNenadov"
  },
  {
    logoSource: instagramImage,
    title: "Instagram",
    href: "https://www.instagram.com/MarkNenadov"
  },
  {
    logoSource: gitHubImage,
    title: "GitHub",
    href: "https://www.github.com/MarkNenadov"
  },
  {
    logoSource: goodreadsImage,
    title: "Goodreads",
    href: "https://www.goodreads.com/user/show/4015564-mark-nenadov"
  },
  {
    logoSource: linkedinImage,
    title: "Linkedin",
    href: "https://www.linkedin.com/in/mark-nenadov-6397273/"
  }
];

export default function SocialMediaLinks() {
  return (
    <div className="flex flex-row justify-evenly md:justify-between w-full pb-2">
      { socialMediaLinks.map( link => (
        <SocialMediaLink
          key={ link.title}
          logoSource={ link.logoSource }
          title={ link.title }
          href={ link.href }
        />
      ) ) }
    </div>
  );
}
