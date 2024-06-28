import { useState } from 'react';
import Card from './base/GenericCard';
import GenericButton from './base/GenericButton';
import CitizenScienceProjectsModal from './modals/CitizenScienceProjectsModal';

export const AmateurNaturalistCard = () => {
    const [isCitizenScienceProjectsOpen, setIsCitizenScienceProjectsOpen] = useState( false );

    return (
        <Card title="Enthusiastic Amatuer Naturalist">
            <div>
              <p className="mb-4">
                I&apos;m more or less interested in every living creature, but over the years birds and moths have particularly caught my imagination. I earnestly collect data for various citizens cience projects, such as iNaturalist (I&apos;ve recently posted my 29,000th observation).
              </p> 
              <p className="mb-4">
                In 2023, I documented 673 research-grade iNaturalist Arthropod species in Essex County, Ontario.  Check out the <a className="underline text-blue-900" href="https://www.cbc.ca/listen/live-radio/1-80-afternoon-drive/clip/15991630-a-bug-year">CBC radio interview</a> and the <a className="underline text-blue-900" href="https://inaturalist.ca/projects/mark-nenadov-s-bug-year-2023">data</a> I gathered.
              </p>

              <GenericButton 
                text="💡 Selected Citizen Science Projects"
                shortText="Projects"
                onClick={ () => setIsCitizenScienceProjectsOpen( !isCitizenScienceProjectsOpen ) } 
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