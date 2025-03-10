import { useState } from 'react';
import Image from 'next/image';
import Card from "./base/GenericCard";
import GenericButton from './base/GenericButton';
import publicationCredits from '../Data/publication-credits.json';
import TechnicalReviewsModal from './modals/TechnicalReviewsModal';

export default function PublicationCreditListing() {
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState( false );
 
    return (
        <Card title="✍️ Publications">
            <p className ="pb-4 opacity-85">
                I&apos;ve published articles and poetry. See <a className="underline text-blue-900" href="https://independent.academia.edu/MarkNenadov">Academia.edu</a>.
            </p>

            <GenericButton 
                text="💡 Technical Review Credits"
                shortText="Tech Reviews"
                onClick={ () => setIsReviewsModalOpen( !isReviewsModalOpen ) } 
                dataTestId='technical-reviews-button'
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