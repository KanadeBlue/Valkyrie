import React from 'react';

const ContextMenu = ({ children, contextMenu, position }) => {
    if (!contextMenu) return null;

    return (
        <div
            className={`z-10 absolute`}
            style={{
                top: position.y,
                left: position.x,
                transform: 'translateY(-50%)',
                width: '190px',
                padding: '7px',
                borderRadius: '3px',
                backgroundColor: 'rgba(40, 48, 70, 0.95)', // This should be the lightened color of your --down-river variable
                boxShadow: 'var(--box-shadow)', // Make sure to define this in your CSS
            }}
        >
            {children}
        </div>
    );
};

const ContextItem = ({ variant = 'default', onClick, children }) => {
    const baseStyle = `cursor-pointer w-full h-[35px] flex items-center pl-2 rounded-[3px] text-sm`;
    const variantStyles = {
        danger: 'text-error-danger hover:bg-error-danger hover:text-lavender-blush',
        default: 'text-lavender-blush hover:bg-azure-radiance hover:text-lavender-blush',
    };

    return (
        <div
            className={`${baseStyle} ${variantStyles[variant]}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export { ContextMenu, ContextItem };
