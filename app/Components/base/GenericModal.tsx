import { PublicationCredit } from "../../Models/PublicationCredit";
import GenericButton from "./GenericButton";

interface GenericModalProps {
    title: string,
    children: any,
    closeHandler: () => void
}

export default function GenericModal( {title, children, closeHandler}: GenericModalProps) {
    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            aria-labelledby={`modal-title-${title}`}
            data-testid={"generic-modal"}
            >
        <div 
            className="bg-white p-6 rounded shadow-md border border-1 border-black text-center max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%]"
        >
            <h2 id={`modal-title-${title}`} className="text-xl font-semibold mb-4">{title}</h2>
            <div className="text-left">
                {children}
            </div>
            <GenericButton text="Close" onClick={closeHandler} dataTestId="close-button" />
        </div>
    </div>
    );
}