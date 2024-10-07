import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem('user'));

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between p-5">
            <Link to="/" className="relative cursor-pointer user-select-none text-white">
                <h3 className="text-2xl">Valkyrie</h3>
                <img
                    src="/logo.png"
                    className="absolute top-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2 h-full z-[-1]"
                    alt="Logo"
                />
            </Link>

            <div className="flex items-center">
                {!user ? (
                    <>
                        <Button variant="transparent" height="35px" width="100px" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                        <Button variant="primary" height="35px" width="100px" onClick={() => navigate('/signup')}>
                            Sign Up
                        </Button>
                    </>
                ) : (
                    <Button variant="primary" height="35px" width="100px" onClick={() => navigate('/channels/@me')}>
                        Open
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
