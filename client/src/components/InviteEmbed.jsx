import { useNavigate } from 'react-router-dom';
import Button from './Button';

const InviteEmbed = ({ inviteID }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full min-w-[200px] max-w-[400px] h-[100px] p-2 bg-[#4E6E9E] rounded-md flex flex-col justify-center">
            <p className="text-white text-center">You have been invited to join this server</p>
            <Button
                width={'100px'}
                onClick={() => navigate(`/invite/${inviteID}`)}
                className="mt-2 mx-auto" // Center the button horizontally
            >
                Join
            </Button>
        </div>
    );
};

export default InviteEmbed;
