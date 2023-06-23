import Image from 'next/image';
import { PublicationCredit } from '../Models/PublicationCredit';
import Card from "./base/GenericCard";
import { useState } from 'react';
import publicationCredits from '../Data/publication-credits.json';
import TechnicalReviewsModal from './modals/TechnicalReviewsModal';
import GenericButton from './base/GenericButton';

export default function PublicationCreditListing() {
    const [isSelectedExamplesOpen, setIsSelectedExamplesOpen] = useState( false );
 
    return (
        <Card title="Writer / Technical Reviewer">
            <div>
                <p className ="pb-4">
                I&apos;ve published articles and poetry. As an independent researcher, I&apos;m in the top 2% of accounts at <a className="underline text-blue-900" href="https://independent.academia.edu/MarkNenadov">Academia.edu</a>.
                </p>

                <p className="">
                    I&apos;ve also done technical reviews for numerous publishers. 
                </p>

                <GenericButton 
                    text="💡 Selected Technical Reviews"
                    shortText="Tech Reviews"
                    onClick={ () => setIsSelectedExamplesOpen( !isSelectedExamplesOpen ) } 
                />

                { isSelectedExamplesOpen && (
                    <TechnicalReviewsModal 
                        setIsSelectedExamplesOpen={ setIsSelectedExamplesOpen } 
                        publicationCredits={ publicationCredits } 
                    />
                ) }
            </div>
        </Card>
    );
}