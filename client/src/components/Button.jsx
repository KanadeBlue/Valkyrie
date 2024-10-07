import React from 'react';

const Button = ({ variant = 'primary', width = '100%', height = '50px', onClick, children }) => {
    const baseStyle = `flex items-center justify-center cursor-pointer transition-colors duration-200 font-semibold rounded-lg`;
    
    const variantStyles = {
        primary: 'bg-azure-radiance text-lavender-blush',
        white: 'bg-lavender-blush text-bright-gray',
        transparent: 'bg-transparent text-lavender-blush',
        danger: 'bg-error-danger text-lavender-blush',
    };

    return (
        <button
            className={`${baseStyle} ${variantStyles[variant]} h-[${height}] w-[${width}]`}
            onClick={onClick}
            style={{
                width: width,
                height: height,
            }}
        >
            {children}
        </button>
    );
};

export default Button;
