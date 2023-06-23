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
                    openSourceProjects.map( (project) => 
                        <li key="1"><a className="underline text-blue-900" href={ project.url }>{project.name}</a> - {project.description}</li>
                    )
                }
            </ul>
        </GenericModal>
    );
}