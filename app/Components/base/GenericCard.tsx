import { ReactNode } from 'react';

interface CardProps {
    title: string;
    children: ReactNode;
}

export default function Card( {title, children}: CardProps) {
    return (
        <div className="bg-surface-primary border border-border-primary shadow-soft-lg rounded-2xl p-5 w-full lg:w-auto h-auto lg:min-h-[272px] transition-all duration-200 hover:shadow-elegant hover:border-border-secondary overflow-hidden" data-testid={"generic-card"}>
            <div className="text-xl font-semibold text-text-primary mb-3" data-testid={"generic-card-title"}>
            { title }
            </div>

            <div className="text-text-secondary overflow-hidden">
                { children }
            </div>
        </div>
    );
}