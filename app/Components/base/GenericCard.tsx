import { ReactNode } from 'react';

interface CardProps {
    title: string,
    children: ReactNode
}

export default function Card( {title, children}: CardProps) {
    return (
        <div className="border border-1 border-black p-4 mt-0 w-full lg:w-auto h-auto lg:max-h-[272px] lg:min-h-[272px]">
            <div className="font-bold">
            { title }
            </div>

            <div className="">
                { children }
            </div>
        </div>
    );
}