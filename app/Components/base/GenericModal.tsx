import { PublicationCredit } from "../../Models/PublicationCredit";
import GenericButton from "./GenericButton";
import GenericBox from "./GenericBox";

interface GenericModalProps {
    title: string,
    children: any,
    closeHandler: () => void,
    dataTestId?: string
}

export default function GenericModal( {title, children, dataTestId, closeHandler}: GenericModalProps) {
    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            aria-labelledby={`modal-title-${title}`}
            data-testid={ dataTestId || "generic-modal"}
            >
        <GenericBox title={title}>
            <div className="text-left">
                {children}
            </div>
            <GenericButton text="Close" onClick={closeHandler} dataTestId="close-button" />
        </GenericBox>
    </div>
    );
}