const MessageBubble = ({ message, ...props }) => {

    return (
        <div className="flex flex-col gap-1" {...props}>
            <label className="font-satoshi-regular text-stone-400 text-light text-xs">{message?.user}</label>
            <div className="bg-gradient pr-3 pl-4 py-2 w-fit max-w-80 rounded-xl flex justify-between items-end gap-3">
                <label className="font-satoshi-regular text-white text-base">{message?.message}</label>
                <label className="font-satoshi-regular text-xs text-stone-50">{message?.formatted}</label>
            </div>
        </div>
    );

}

export default MessageBubble;