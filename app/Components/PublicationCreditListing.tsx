import Image from 'next/image';
import Card from "./base/GenericCard";
import GenericButton from './base/GenericButton';
import publicationCredits from '../Data/publication-credits.json';
import TechnicalReviewsModal from './modals/TechnicalReviewsModal';
import { useModal } from '../hooks/useModal';

export default function PublicationCreditListing() {
    const { isOpen: isReviewsModalOpen, openModal, closeModal } = useModal();
 
    return (
        <Card title="✍️ Publications">
            <div className="space-y-3">
                <p className="text-text-secondary leading-relaxed text-sm">
                    I&apos;ve published articles and poetry. See <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href="https://independent.academia.edu/MarkNenadov">Academia.edu</a>.
                </p>

                <GenericButton 
                    text="💡 Technical Reviews"
                    shortText="Reviews"
                    onClick={ openModal } 
                    dataTestId='technical-reviews-button'
                    className="w-full"
                />

                { isReviewsModalOpen && (
                    <TechnicalReviewsModal 
                        setIsReviewsModalOpen={ closeModal } 
                        publicationCredits={ publicationCredits } 
                    />
                ) }
            </div>
    </Card>
    );
}