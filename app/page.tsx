"use client"
/* eslint-disable react/no-unescaped-entities */
import Card from './Components/Card';
import PublicationCreditListing from './Components/PublicationCreditListing';
import SocialMediaLinks from './Components/SocialMediaLinks';
import markImage from '../public/mark.jpeg';
import Image from 'next/image';
import { useState } from 'react';
import openSourceProjects from './Data/open-source-projects.json';
import OpenSourceProjectsModal from './Components/modals/OpenSourceProjectsModal';
import GenericButton from './Components/base/GenericButton';

export default function Home() {
  const [isSelectedProjectsOpen, setIsSeletedProjectsOpen] = useState( false );

  return (
    <div className="min-h-[100vh] max-w-7xl m-3">
      <div className={"flex flex-col space-y-3 p-4  m-4 w-full items-center"}>
        <div className="text-6xl text-center">Mark Nenadov</div>
        <div>Ever curious, ever learning.</div>

        <SocialMediaLinks />
        
       
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto items-center">
          <Image src={ markImage } alt="Mark Photo" className="max-h-[272px] min-h-[272px] max-w-[246px] min-w-[246]" />
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
      
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto max-h-[272px]">
          <Card title="Enthusiastic Amatuer Naturalist">
            <div>
              <p className="mb-4">
                I'm an enthusiastic citizen scientist contributing huge amounts of data about the plants and animals around me. I actively contribute to <a className="underline text-blue-900" href="https://inaturalist.org">iNaturalist</a>,  <a className="underline text-blue-900" href="https://bugguide.net">BugGuide.net</a>, and  <a className="underline text-blue-900" href="https://ebird.org">eBird</a>.
              </p> 
              <p className="mb-4">
                I've recently posted my 26,000 iNaturalist observation. I'm particularly active in Essex County, Ontario, where I have nearly 3X more observations than the next highest observer.
              </p>
            </div>
          </Card>
          <Card title="My 'Bug Year'">
            <div>
              <p className="mb-4">
                In 2023, I'm trying to document 1,500 research-grade iNaturalist observations of Arthropod species in Essex County, Ontario.
              </p>
              <p className="mb-4">
                CBC Afternoon Drive host Allison Devereaux <a className="underline text-blue-900" href="https://www.cbc.ca/listen/live-radio/1-80-afternoon-drive/clip/15991630-a-bug-year">interviewed me</a> about this effort.
              </p>
              <p className="mb-4">
                You can follow my progress <a className="underline text-blue-900" href="https://inaturalist.ca/projects/mark-nenadov-s-bug-year-2023">here</a>.
              </p>
            </div>
          </Card>
      </div>
    </div>
  </div>
  )
}
