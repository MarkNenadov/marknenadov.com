import { ReactNode } from 'react';
import GenericButton from "./GenericButton";
import GenericBox from "./GenericBox";

interface GenericModalProps {
    title: string,
    children: ReactNode,
    closeHandler: () => void,
    dataTestId?: string
}

export default function GenericModal( {title, children, dataTestId, closeHandler}: GenericModalProps) {
    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
            aria-labelledby={`modal-title-${title}`}
            data-testid={ dataTestId || "generic-modal"}
            onClick={closeHandler}
            >
            <div onClick={(e) => e.stopPropagation()}>
                <GenericBox title={title}>
                    <div className="text-left text-text-secondary">
                        {children}
                    </div>
                    <GenericButton text="Close" onClick={closeHandler} dataTestId="close-button" />
                </GenericBox>
            </div>
        </div>
    );
}