const Footer = () => {
    return (
        <div className="absolute w-full max-w-[1180px] bottom-1 flex items-center justify-center text-center">
            <h6 className="text-lg"> {/* You can adjust the text size with Tailwind's text size utilities */}
                Developed by <a href='https://github.com/khaledxyz/' target='_blank' rel="noopener noreferrer" className="text-blue-500 hover:underline">khaled.xyz</a>
                {' '}See on <a href='https://github.com/khaledxyz/valkyrie' target='_blank' rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>
                <br />
                &#9888; Data gets wiped every 24 hours
            </h6>
        </div>
    );
};

export default Footer;
