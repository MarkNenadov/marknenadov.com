import { PublicationCredit } from "../../Models/PublicationCredit";
import GenericModal from "../base/GenericModal";

interface TechnicalReviewsModalProps {
    publicationCredits: PublicationCredit[],
    setIsSelectedExamplesOpen: any
}

export default function TechnicalReviewsModal( {publicationCredits, setIsSelectedExamplesOpen}: TechnicalReviewsModalProps) {
    return (
        <GenericModal 
            title="Selected Technical Review Credits"
            closeHandler={ () => setIsSelectedExamplesOpen( false )  }
        >
            <ul className="list-disc list-inside">
                {            
                    publicationCredits.filter( p => p.type === "Technical Reviewer" ).map( (publicationCredit) => 
                        <li key="1">{publicationCredit.title} ({publicationCredit.publisher}) - {publicationCredit.date}</li>
                    )
                }
            </ul>
        </GenericModal>
    );
}