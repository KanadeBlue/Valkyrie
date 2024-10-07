import { useState, useEffect } from 'react';
import { ProfileIcon } from '../ProfileIcon';
import InviteEmbed from '../InviteEmbed';

const Message = ({ message, sender, receiver }) => {
    const isSender = sender._id === message.sender ? sender : receiver;
    const [inviteID, setInviteID] = useState(null);

    useEffect(() => {
        if (!message) return;
        if (message.content.includes(`${window.location.origin}/invite`)) {
            setInviteID(message.content.split('invite', -1)[1].substring(1));
        }
    }, [message]);

    return (
        <div className="relative flex gap-4 p-2 w-full text-gray-300 text-sm hover:bg-[#2e3a4b]">
            <ProfileIcon className="w-10 h-10" avatar={isSender.avatar} />
            <div className="w-full">
                <p className="text-pink-100 text-sm">{isSender.username}</p>
                <p>{message.content}</p>
                {inviteID && <InviteEmbed inviteID={inviteID} />}
            </div>
        </div>
    );
};

export default Message;
