import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputPassword = ({ className = null, error = false, ...props }) => {

    const [isHidden, setIsHidden] = useState(true);

    return (
        <div className={`h-10 w-full rounded-md border-[1px] border-gray-300 bg-background flex flex-row justify-between ${error && 'outline outline-2 outline-red-600'} ${className} }`}>
            <input
                className={`font-satoshi-medium bg-transparent flex px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed flex-1 border-r-[1px] border-gray-300`}
                type={isHidden ? 'password' : 'text'}
                {...props}
            />
            <button
                onClick={(event) => {
                    event.preventDefault();
                    setIsHidden((prev) => !prev)
                }}
                className="flex px-3 items-center justify-center outline-none active:brightness-75 transition-all duration-150"
                type="button"
            >
                {isHidden ? (
                    <Eye color="#9ca3af" strokeWidth={2} />
                ) : (
                    <EyeOff color="#9ca3af" strokeWidth={2} />
                )}
            </button>
        </div>
    );
}

export default InputPassword;