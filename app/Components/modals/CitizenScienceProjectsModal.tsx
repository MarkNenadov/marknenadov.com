import React from "react";
import { Modal } from "../base/Modal";
import { BaseModalProps } from "../../types/modal";

interface CitizenScienceProjectsModalProps extends BaseModalProps {
}

interface Project {
    name: string;
    url?: string;
}
  
const PROJECTS: Project[] = [
    { name: "eBird", url: "https://ebird.org/ebird/profile/MzE3NzQ1/world" },
    { name: "iNaturalist", url: "https://inaturalist.org" },
    { name: "BugGuide.net", url: "https://bugguide.net" },
    { name: "Christmas Bird Counts (ie. Point Pelee NP and Holiday)"}
];

export default function CitizenScienceProjectsModal({ onClose }: CitizenScienceProjectsModalProps) {
    return (
        <Modal isOpen={true} onClose={onClose}>
            <Modal.Overlay>
                <Modal.Content>
                    <Modal.Header>
                        Selected Citizen Science Projects
                    </Modal.Header>
                    <Modal.Body>
                        <p className="mb-3 text-text-secondary">I&apos;m a regular or semi-regular contributor to each of these efforts:</p>
                        <ul className="list-disc list-inside text-text-secondary">
                            { 
                                PROJECTS.map(({ name, url }) => (
                                    !!url ? (
                                        <li key={name} className="mb-1">
                                            <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href={url}>
                                                {name}
                                            </a>
                                        </li> 
                                    ) : (
                                        <li key={name} className="mb-1">{name}</li>
                                    )
                                ))
                            }
                        </ul>
                    </Modal.Body>
                    <Modal.Footer />
                </Modal.Content>
            </Modal.Overlay>
        </Modal>
    );
}