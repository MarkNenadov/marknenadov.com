import React from "react";
import GenericModal from "../base/GenericModal";

interface CitizenScienceProjectsModalProps {
    setIsSeletedProjectsOpen: (value: boolean) => void;
}

interface Project {
    name: string;
    url?: string;
  }
  
const PROJECTS : Project[] = [
    { name: "eBird", url: "https://ebird.org/ebird/profile/MzE3NzQ1/world" },
    { name: "iNaturalist", url: "https://inaturalist.org" },
    { name: "BugGuide.net", url: "https://bugguide.net" },
    { name: "Christmas Bird Counts (ie. Point Pelee NP and Holiday "}
];

export default function CitizenScienceProjectsModal( {setIsSeletedProjectsOpen}: CitizenScienceProjectsModalProps) {
    return (
        <GenericModal 
            title="Selected Citizen Science Projects"
            closeHandler={ () => setIsSeletedProjectsOpen( false )  }
        >
            <p>I&apos;m a regular or semi-regular contributor to each of these efforts:</p>
            <ul className="list-disc list-inside">
                { 
                    PROJECTS.map( ( {name, url}) => {
                        return !!url ? <li key={name} ><a className="underline text-blue-900" href={url}>{ name }</a></li> : <li>{name}</li>
                    })
                }
            </ul>
        </GenericModal>
    );
}