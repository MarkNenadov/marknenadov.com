import { ReactNode } from 'react';

interface GenericBoxProps {
    children: ReactNode
    title: string
}


export default function GenericBox({children, title}: GenericBoxProps) {
    return (
        <div 
        className="bg-white p-8 rounded-3xl shadow-elegant-lg border border-border-primary text-center max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] animate-scale-in opacity-100"
        >
            <h2 id={`modal-title-${title}`} className="text-2xl font-semibold mb-6 text-text-primary">{title}</h2>

            { children }
        </div>
    )
}