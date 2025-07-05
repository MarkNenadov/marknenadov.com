import { useState } from 'react';
import Card from './base/GenericCard';
import GenericButton from './base/GenericButton';
import CitizenScienceProjectsModal from './modals/CitizenScienceProjectsModal';

export const AmateurNaturalistCard = () => {
    const [isCitizenScienceProjectsOpen, setIsCitizenScienceProjectsOpen] = useState( false );

    return (
        <Card title="🌱 Enthusiastic Amatuer Naturalist">
            <div className="space-y-3">
              <p className="text-text-secondary leading-relaxed text-sm">
                I&apos;m interested in every living creature, but birds and moths have particularly caught my imagination. I collect data for citizen science projects, such as iNaturalist (I&apos;ve recently posted my <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href="https://docs.google.com/document/d/19-Nd1FMf-i1crleeBk0qfocPLEZFZPEB0-CNjl1a2Ac/edit?usp=sharing">30,000th observation</a>).
              </p> 
              <p className="text-text-secondary leading-relaxed text-sm">
                In 2023, I documented 717 research-grade iNaturalist Arthropod species in Essex County, Ontario. Check out the <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href="https://www.cbc.ca/listen/live-radio/1-80-afternoon-drive/clip/15991630-a-bug-year">CBC radio interview</a> and the <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href="https://inaturalist.ca/projects/mark-nenadov-s-bug-year-2023">data</a> I gathered.
              </p>

              <GenericButton 
                text="💡 Citizen Science Projects"
                shortText="Projects"
                onClick={ () => setIsCitizenScienceProjectsOpen( !isCitizenScienceProjectsOpen ) } 
                className="w-full"
              />

                { isCitizenScienceProjectsOpen && (
                  <CitizenScienceProjectsModal 
                    setIsSeletedProjectsOpen={ setIsCitizenScienceProjectsOpen } 
                  />
                ) }
            </div>
          </Card>

    )
}