import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RiHashtag } from 'react-icons/ri';
import { BsPlusLg } from 'react-icons/bs';

// * REDUX SLICE * //
import { getGuild, createChannel } from '../../features/guilds/guildsSlice';

// * COMPONENTS * //
import Separator from '../Separator';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';

const GuildSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { guildID } = useParams();

    const { owner, channels } = useSelector((state) => state.guilds.currentGuild);
    const { user } = useSelector((state) => state.auth);
    const [channelName, setChannelName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getGuild(guildID));
    }, [guildID]);

    const handleSubmit = () => {
        dispatch(createChannel({ guildID, name: channelName }));
        setIsModalOpen(false);
    };

    const isActive = (channelID) => {
        const path = location.pathname;
        return path.includes(channelID) ? 'bg-blue-600 text-white' : 'text-gray-400';
    };

    return (
        <>
            <Modal
                isModalOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title={'Create a new channel'}
                action={'Create'}
                handleSubmit={handleSubmit}
            >
                <Input
                    type={'text'}
                    label={'Channel name'}
                    required={true}
                    placeholder={'new-channel'}
                    onChange={(e) => {
                        const name = e.target.value.replace(/\s+/g, '-').toLowerCase();
                        setChannelName(name);
                    }}
                    value={channelName}
                />
            </Modal>

            {user.details._id === owner && (
                <>
                    <button
                        className="flex items-center bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md transition duration-200 mb-2"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <BsPlusLg className="mr-2" /> New Channel
                    </button>
                    <Separator />
                </>
            )}

            <div className="flex flex-col p-2 overflow-y-auto h-full">
                {channels && channels.map((channel) => (
                    <div
                        key={channel._id}
                        className={`flex items-center p-2 rounded-md cursor-pointer transition duration-200 ${isActive(channel._id)} hover:bg-blue-700`}
                        onClick={() => navigate(channel._id)}
                    >
                        <RiHashtag className="text-gray-300 mr-2" />
                        <span className="truncate">{channel.name}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default GuildSidebar;
