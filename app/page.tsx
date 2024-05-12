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
  const [isSelectedProjectsOpen, setIsSeletedProjectsOpen] = useState( false );

  return (

<div className="min-h-[100vh] max-w-7xl md:m-3">
      <div className={"flex flex-col space-y-3 p-4 md:m-4 w-full items-center"}>
        <div className="text-6xl text-center">Mark Nenadov</div>
        <div>Ever curious, ever learning.</div>

        <SocialMediaLinks />
        
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto items-center">
          <Image 
            src={ markImage } 
            alt="Mark Photo" 
            className="max-h-[272px] min-h-[272px] max-w-[246px] min-w-[246]" 
           />

          <Image 
            src={ markInterestsImage } 
            alt="Mark Interests" 
            className="max-h-[272px] min-h-[272px] max-w-[246px] min-w-[246]"
          />

          <Card title="Technical Leader">
            <div>
              <p className="mb-4">
                I'm builder, problem-solver, and knowledge-sharer. I have over 20 years of experience in the Software Development industry and specialize in full-stack software development.
              </p> 
              <p className="">
                For the curious, you can see <a className="underline text-blue-900" href="https://github.com/MarkNenadov/uses">what tech I use</a>.
              </p>

              <GenericButton 
                text="💡 Selected Open-Source Projects"
                shortText="Projects"
                onClick={ () => setIsSeletedProjectsOpen( !isSelectedProjectsOpen ) } 
              />

                { isSelectedProjectsOpen && (
                  <OpenSourceProjectsModal 
                    setIsSeletedProjectsOpen={ setIsSeletedProjectsOpen } 
                      openSourceProjects={ openSourceProjects } 
                  />
                ) }

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
  </div>
  )
}
