import { PublicationCredit } from "../../Models/PublicationCredit";
import GenericModal from "../base/GenericModal";

interface CitizenScienceProjectsModalProps {
    setIsSeletedProjectsOpen: any
}

export default function CitizenScienceProjectsModal( {setIsSeletedProjectsOpen}: CitizenScienceProjectsModalProps) {
    return (
        <GenericModal 
            title="Selected Citizen Science Projects"
            closeHandler={ () => setIsSeletedProjectsOpen( false )  }
        >
            <p>I&apos;m a regular or semi-regular contributor to each of these efforrs:</p>
            <ul className="list-disc list-inside">
                <li><a className="underline text-blue-900" href="https://ebird.org">eBird</a></li>
                <li><a className="underline text-blue-900" href="https://inaturalist.org">iNaturalist</a></li>
                <li><a className="underline text-blue-900" href="https://bugguide.net">BugGuide.net</a></li>
                <li>Christimas Bird Counts (ie. Point Pelee NP and Holiday Beach CA)</li>
            </ul>
        </GenericModal>
    );
}