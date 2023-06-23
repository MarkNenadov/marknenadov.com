import Image from 'next/image';
import twitterImage from '../../public/twitter.png';
import instagramImage from '../../public/instagram.png';
import gitHubImage from '../../public/github.png';
import goodreadsImage from '../../public/goodreads.png';
import linkedinImage from '../../public/linkedin.png';
import SocialMediaLink from './SocialMediaLink';

export default function SocialMediaLinks() {
    return (
        <div className="flex flex-row justify-evenly md:justify-between w-full pb-2">
        <SocialMediaLink 
          logoSource={ twitterImage }
          title="Twitter"
          href="https://twitter.com/MarkNenadov"
        />
        <SocialMediaLink 
          logoSource={ instagramImage }
          title="Instagram"
          href="https://www.instagram.com/MarkNenadov"
        />
        <SocialMediaLink 
          logoSource={ gitHubImage }
          title="GitHub"
          href="https://www.github.com/MarkNenadov"
        />
        <SocialMediaLink 
          logoSource={ goodreadsImage }
          title="Goodreads"
          href="https://www.goodreads.com/user/show/4015564-mark-nenadov"
        />
        <SocialMediaLink 
          logoSource={ linkedinImage }
          title="Linkedin"
          href="https://www.linkedin.com/in/mark-nenadov-6397273/"
        />
      </div>
    );
}