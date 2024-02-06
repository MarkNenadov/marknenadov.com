import { PublicationCredit } from "../../Models/PublicationCredit";
import GenericModal from "../base/GenericModal";

interface TechnicalReviewsModalProps {
    publicationCredits: PublicationCredit[],
    setIsReviewsModalOpen: (value: boolean) => void;
}

export default function TechnicalReviewsModal( {publicationCredits, setIsReviewsModalOpen}: TechnicalReviewsModalProps) {
    return (
        <GenericModal 
            title="Selected Technical Review Credits"
            dataTestId="technical-review-modal"
            closeHandler={ () => setIsReviewsModalOpen( false )  }
        >
            <ul className="list-disc list-inside">
                {            
                    publicationCredits.filter( 
                        p => p.type === "Technical Reviewer" ).map( ({title, url, publisher, date }
                    ) => 
                        <li key={title}>
                            <a 
                                className="underline text-blue-900" 
                                href={url}
                                aria-label={ `Link to ${url}` }
                            >
                                {title}
                            </a> ({publisher}) - {date}
                        </li>
                    )
                }
            </ul>
        </GenericModal>
    );
}