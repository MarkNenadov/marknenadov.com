import { ReactNode } from 'react';

interface GenericBoxProps {
    children: ReactNode
    title: string
}


export default function GenericBox({children, title}: GenericBoxProps) {
    return (
        <div 
        className="bg-white p-6 rounded shadow-md border border-1 border-black text-center max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%]"
        >
            <h2 id={`modal-title-${title}`} className="text-xl font-semibold mb-4">{title}</h2>

            { children }
        </div>
    )
}