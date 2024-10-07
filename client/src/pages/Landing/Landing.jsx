import { DiGithubFull } from 'react-icons/di';

import Navbar from '../../components/Navbar';
import Hero from './Hero';
import Footer from './Footer';

const Landing = () => {
    return (
        <div className="w-full max-w-[1180px] mx-auto h-screen">
            <Navbar />
            <Hero />
            <Footer />
        </div>
    );
};

export default Landing;
