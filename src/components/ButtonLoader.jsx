import { ring } from "ldrs";

const ButtonLoader = ({ children, isLoading = false, disabled = false, onClick = () => { }, className, ...props }) => {
    ring.register();
    return (
        <button
            className={`w-full bg-gradient rounded-md items-center justify-center text-white transition-all duration-100 active:brightness-75 py-3 shadow-sm flex flex-row gap-1 text-base font-satoshi-bold ${(disabled || isLoading) && 'brightness-75'} ${className}`}
            onClick={onClick}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <l-ring size="24" stroke="3" bg-opacity="0" speed="2" color="#fff" />
            ) : (
                children
            )}
        </button>
    )
}

export default ButtonLoader;