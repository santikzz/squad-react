const HeaderButton = ({ onClick, className, children }) => {
    return (
        <button
            className={`text-white border-none outline-none bg-transparent hover:brightness-75 transition-all duration-150 ${className}`}
            size="icon"
            variant="ghost"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default HeaderButton;