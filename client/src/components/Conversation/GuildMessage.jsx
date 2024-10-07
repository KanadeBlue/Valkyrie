import { ProfileIcon } from '../ProfileIcon';

const GuildMessage = ({ message, members }) => {
    const sender = members?.filter(member => member._id === message.sender);

    return (
        <div className="flex gap-4 p-2 w-full text-gray-300 text-sm hover:bg-[#2e3a4b]">
            <ProfileIcon className="w-10 h-10" avatar={sender && sender[0].avatar} />
            <div className="message__content">
                <p className="text-pink-100 text-sm">{sender && sender[0].username}</p>
                <p>{message.content}</p>
            </div>
        </div>
    );
};

export default GuildMessage;
