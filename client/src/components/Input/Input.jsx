const Input = ({ style, type, label, placeholder, required, onChange, value, inputRef }) => {
    return (
        <>
            <h6 className="text-left ml-1 uppercase text-silver">{label}</h6>
            <input
                style={style}
                className={`w-full h-[45px] rounded-[5px] pl-[20px] bg-ebony text-lavender-blush outline-none transition-all focus:outline-azure-radiance focus:outline-[3px]`}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                value={value}
                ref={inputRef}
            />
        </>
    );
}

export default Input;
