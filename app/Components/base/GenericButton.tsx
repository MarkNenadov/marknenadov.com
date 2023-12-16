interface GenericButtonProps {
    text: string,
    shortText?: string,
    onClick: () => void
}

export default function GenericButton( {text, shortText, onClick}: GenericButtonProps) {
    return (
        <button
            type="button"
            className="bg-white hover:bg-gray-200 font-semibold py-2 px-4 rounded mt-4  border border-1 border-black"
            onClick={ onClick }
        >
            <span className="hidden lg:block">
                { text }
            </span>
            <span className="block lg:hidden">
                { !!shortText ? shortText : text }
            </span>
        </button>
    );
}