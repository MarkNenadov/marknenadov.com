import six from '../../public/thesix.png';
import Image from 'next/image';

export const Footer = () => {
    return (
        <div className="w-full border border-1 border-black border-opacity-20 p-2 text-center">
        🚀🚀 This site was built with Next.js, Tailwind CSS, and Vercel. 🚀🚀 
        <a 
          className="ml-2 underline text-blue-900" 
          href="https://github.com/MarkNenadov/marknenadov.com">
            Source code
        </a>. 

              <Image 
        src={six} 
        alt="xyz" 
        priority
      />

      </div>
    );
}