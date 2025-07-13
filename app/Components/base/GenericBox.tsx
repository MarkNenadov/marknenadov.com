import { ReactNode } from 'react';
import GenericButton from './GenericButton';

interface GenericBoxProps {
    children: ReactNode;
    title: string;
    closeHandler: () => void;
}

export default function GenericBox({children, title, closeHandler}: GenericBoxProps) {
    return (
        <div 
        className="bg-white p-8 rounded-3xl shadow-elegant-lg border border-border-primary text-center max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] animate-scale-in opacity-100 flex flex-col"
        >
            <h2 id={`modal-title-${title}`} className="text-2xl font-semibold mb-6 text-text-primary flex-shrink-0">{title}</h2>

            <div className="max-h-[70vh] overflow-y-auto flex-1">
                { children }
            </div>

            <div className="flex-shrink-0 mt-4">
                <GenericButton text="Close" onClick={closeHandler} dataTestId="close-button" />
            </div>
        </div>
    )
}