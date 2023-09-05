import { PublicationCredit } from "../../Models/PublicationCredit";
import GenericModal from "../base/GenericModal";

interface OpenSourceProjectsModalProps {
    openSourceProjects: OpenSourceProject[],
    setIsSeletedProjectsOpen: any
}

export default function OpenSourceProjectsModal( {openSourceProjects, setIsSeletedProjectsOpen}: OpenSourceProjectsModalProps) {
    return (
        <GenericModal 
            title="Selected Open Source Projects"
            closeHandler={ () => setIsSeletedProjectsOpen( false )  }
        >
            <ul className="list-disc list-inside">
                {            
                    openSourceProjects.map( ( {name, url, description} ) => 
                        <li key={name}><a className="underline text-blue-900" href={ url }>{name}</a> - {description}</li>
                    )
                }
            </ul>
        </GenericModal>
    );
}