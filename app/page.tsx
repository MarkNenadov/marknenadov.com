"use client"
/* eslint-disable react/no-unescaped-entities */
import Card from './Components/base/GenericCard';
import PublicationCreditListing from './Components/PublicationCreditListing';
import SocialMediaLinks from './Components/SocialMediaLinks';
import markImage from '../public/mark.jpeg';
import markInterestsImage from '../public/mark-interests.webp';
import Image from 'next/image';
import { useState } from 'react';
import openSourceProjects from './Data/open-source-projects.json';
import OpenSourceProjectsModal from './Components/modals/OpenSourceProjectsModal';
import { AmateurNaturalistCard } from './Components/AmateurNaturalistCard';
import GenericButton from './Components/base/GenericButton';
import { BottomRightCard } from './Components/BottomRightCard';
import { Footer } from './Components/Footer';

export default function Home() {
  const [isSelectedProjectsOpen, setIsSelectedProjectsOpen] = useState(false);

  return (
    <main className="min-h-[100vh] max-w-7xl md:m-3">
      <div className="flex flex-col space-y-6 p-4 md:m-4 w-full items-center">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-bold">Mark Nenadov</h1>
          <p className="text-xl text-gray-600">Software Engineer & Technical Leader</p>
          <SocialMediaLinks />
        </header>
        
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
            alt="Mark's interests and hobbies" 
            width={246}
            height={272}
            priority
            className="max-h-[272px] min-h-[272px] max-w-[246px] min-w-[246px] opacity-95 rounded-lg shadow-lg"
          />

          <Card title="Technical Leader">
            <div className="space-y-4">
              <p className="mb-4 opacity-85">
                I'm a curious software engineer with 24 years of industry experience in full-stack development.  
                My roles have included CTO and Senior Software Developer. I'm currently working in the Fintech industry.
              </p> 
              <div className="space-y-3">
                <p>
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
      
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
          <AmateurNaturalistCard />
          <BottomRightCard />
        </div>

        <Footer />
      </div>
    </main>
  );
}
