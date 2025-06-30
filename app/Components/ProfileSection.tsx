import Image from 'next/image';
import Card from './base/GenericCard';
import GenericButton from './base/GenericButton';
import PublicationCreditListing from './PublicationCreditListing';
import markImage from '../../public/mark.jpeg';
import markInterestsImage from '../../public/mark-interests.webp';
import { useState } from 'react';
import OpenSourceProjectsModal from './modals/OpenSourceProjectsModal';
import openSourceProjects from '../Data/open-source-projects.json';

export const ProfileSection = () => {
  const [isSelectedProjectsOpen, setIsSelectedProjectsOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto items-center">
      <Image 
        src={markImage} 
        alt="Mark Nenadov - Professional headshot" 
        width={246}
        height={272}
        priority
        className="max-h-[272px] min-h-[272px] max-w-[246px] min-w-[246px] opacity-95 rounded-lg shadow-lg" 
      />

      <Image 
        src={markInterestsImage} 
        alt="Mark&apos;s interests and hobbies" 
        width={246}
        height={272}
        priority
        className="max-h-[272px] min-h-[272px] max-w-[246px] min-w-[246px] opacity-95 rounded-lg shadow-lg"
      />

      <Card title="Technical Leader">
        <div className="space-y-4">
          <p className="mb-4 opacity-85">
            I&apos;m a curious software engineer with 24 years of industry experience in full-stack development.  
            My roles have included CTO and Senior Software Developer. I&apos;m currently working in the Fintech industry.
          </p> 
          <div className="space-y-3">
            <p>
              I have <a className="underline text-blue-900 hover:text-blue-700 transition-colors" href="https://wondering.willow.camp/">a blog</a>.
              For the curious, <a className="underline text-blue-900 hover:text-blue-700 transition-colors" href="https://github.com/MarkNenadov/uses">here is the tech I use</a>.
            </p>

            <GenericButton 
              text="💡 Selected Open-Source Projects"
              shortText="Projects"
              onClick={() => setIsSelectedProjectsOpen(!isSelectedProjectsOpen)} 
              aria-expanded={isSelectedProjectsOpen}
              aria-controls="open-source-projects-modal"
            />

            {isSelectedProjectsOpen && (
              <OpenSourceProjectsModal 
                setIsSelectedProjectsOpen={setIsSelectedProjectsOpen} 
                openSourceProjects={openSourceProjects} 
              />
            )}
          </div>
        </div>
      </Card>
      <PublicationCreditListing />
    </div>
  );
}; 