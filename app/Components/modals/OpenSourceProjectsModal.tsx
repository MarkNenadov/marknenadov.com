import { PublicationCredit } from "../../Models/PublicationCredit";
import GenericModal from "../base/GenericModal";
import { Dispatch, SetStateAction } from "react";

interface OpenSourceProject {
    name: string;
    url: string;
    description: string;
}

interface OpenSourceProjectsModalProps {
    openSourceProjects: OpenSourceProject[];
    setIsSelectedProjectsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function OpenSourceProjectsModal({ openSourceProjects, setIsSelectedProjectsOpen }: OpenSourceProjectsModalProps) {
    return (
        <GenericModal 
            title="Selected Open Source Projects"
            closeHandler={() => setIsSelectedProjectsOpen(false)}
        >
            <ul className="list-disc list-inside">
                {            
                    openSourceProjects.map(({ name, url, description }) => (
                        <li key={name}>
                            <a 
                                className="underline text-blue-900 hover:text-blue-700 transition-colors" 
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {name}
                            </a> - {description}
                        </li>
                    ))
                }
            </ul>
        </GenericModal>
    );
}