import { useState } from 'react';
import Image from 'next/image';
import Card from "./base/GenericCard";
import GenericButton from './base/GenericButton';
import publicationCredits from '../Data/publication-credits.json';
import TechnicalReviewsModal from './modals/TechnicalReviewsModal';

export default function PublicationCreditListing() {
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState( false );
 
    return (
        <Card title="Writer / Reviewer">
            <p className ="pb-4">
                I&apos;ve published articles and poetry. My independent research is up at <a className="underline text-blue-900" href="https://independent.academia.edu/MarkNenadov">Academia.edu</a>.
            </p>

            <p>
                I&apos;m also a technical reviewer for publishers.
            </p>

            <GenericButton 
                text="💡 Technical Reviews"
                shortText="Tech Reviews"
                onClick={ () => setIsReviewsModalOpen( !isReviewsModalOpen ) } 
            />

            { isReviewsModalOpen && (
                <TechnicalReviewsModal 
                    setIsReviewsModalOpen={ setIsReviewsModalOpen } 
                    publicationCredits={ publicationCredits } 
                />
            ) }
    </Card>
    );
}