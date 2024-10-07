export const Friend = ({ children, actions }) => {
    return (
        <div className="relative cursor-pointer flex items-center justify-start w-full h-15 p-2.5 rounded-lg bg-[#001f3f] transition ease-in-out duration-200 hover:bg-[#02305f]">
            <p className="ml-2">{children}</p>
            <div className="absolute right-2 top-1/2 flex items-center justify-center gap-1 transform -translate-y-1/2">
                {actions}
            </div>
        </div>
    );
};
