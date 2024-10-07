import Button from "../../components/Button";
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <nav className="flex items-center justify-between h-[80%] p-5">
            <div className="pr-12">
                <p className="mb-5">
                    Whether you're part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Valkyrie makes it easy to talk every day and hang out more often.
                </p>

                {!user ? (
                    <>
                        <Button variant={'primary'} height={'35px'} width={'100px'} onClick={() => navigate('/signup')}>Sign Up</Button>
                        <small>Already have an account? <Link to={'/login'} className="text-blue-500 hover:underline">Login!</Link></small>
                    </>
                ) : (
                    <Button variant={'primary'} height={'35px'} width={'120px'} onClick={() => navigate('/channels/@me')}>Open Valkyrie</Button>
                )}
            </div>
            <img 
                src='ui.svg' 
                className="animate-float ml-7 mt-1 w-1/2 mx-auto shadow-md" 
                alt="Floating UI Element"
            />
        </nav>
    );
};

export default Hero;
