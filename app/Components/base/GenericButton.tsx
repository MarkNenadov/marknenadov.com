interface GenericButtonProps {
    text: string,
    shortText?: string,
    onClick: () => void,
    dataTestId?: string,
    className?: string
}

export default function GenericButton( {text, shortText, onClick, dataTestId, className}: GenericButtonProps) {
    return (
        <button
            type="button"
            className={`bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md py-2.5 px-4 rounded-lg mt-2 text-gray-700 hover:text-gray-900 font-medium transition-all duration-200 text-sm leading-tight ${className || ''}`}
            onClick={ onClick }
            data-testid={dataTestId || "generic-button"}
        >
            <span className="hidden lg:block text-center" data-testid="large-text-span">
                { text }
            </span>
            <span className="block lg:hidden text-center" data-testid="small-text-span">
                { !!shortText ? shortText : text }
            </span>
        </button>
    );
}