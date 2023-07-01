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
                        <li key="1">
                            <a className="underline text-blue-900" href={publicationCredit.url}>{publicationCredit.title}</a> ({publicationCredit.publisher}) - {publicationCredit.date}
                        </li>
                    )
                }
            </ul>
        </GenericModal>
    );
}