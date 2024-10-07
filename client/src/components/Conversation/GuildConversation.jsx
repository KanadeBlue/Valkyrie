import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getGuild, getChannelMessages, createGuildMessage, updater } from '../../features/guilds/guildsSlice';
import { SocketContext } from '../../context/SocketContext';

import Input from '../Input/Input';
import GuildMessage from './GuildMessage';
import ConversationNavbar from '../ConversationNavbar';

const GuildConversation = () => {
    const dispatch = useDispatch();
    const scrollRef = useRef();
    const inputRef = useRef();
    const { guildID, channelID } = useParams();

    const socket = useContext(SocketContext);
    const { messages } = useSelector((state) => state.guilds);
    const { members, channels } = useSelector((state) => state.guilds.currentGuild);
    const [messageContent, setMessageContent] = useState('');

    const channel = channels?.find(channel => channel._id === channelID);

    useEffect(() => {
        socket.emit('join_channel', channelID);

        socket.on('received_message', message => dispatch(updater(message)));

        dispatch(getGuild(guildID));
        dispatch(getChannelMessages(channelID));
        scrollToBottom();
        inputRef.current.focus();

        return () => { socket.off('received_message'); };
    }, [guildID, channelID]);


    useEffect(() => { scrollToBottom() }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!messageContent) return;

        const message = {
            channelID,
            content: messageContent,
        };

        dispatch(createGuildMessage(message));
        setMessageContent('');
        scrollToBottom();
        e.target.reset();
    };

    const scrollToBottom = () => { scrollRef.current?.scrollIntoView(); };

    return (
        <div className="flex flex-col justify-between w-full h-full relative">
            <ConversationNavbar>
                <p>#{channel?.name}</p>
            </ConversationNavbar>

            <div className="flex-1 overflow-y-scroll overflow-x-hidden">
                {messages?.map((message) => (
                    <GuildMessage
                        message={message}
                        members={members}
                        key={message._id}
                    />
                ))}
                <div ref={scrollRef}></div>
            </div>

            <form
                className="w-full bg-[#283046] p-4"
                onSubmit={(e) => handleSubmit(e)}
            >
                <Input
                    type={'text'}
                    placeholder={`Message #${channel?.name}`}
                    required={true}
                    onChange={(e) => setMessageContent(e.target.value)}
                    messageContent={messageContent}
                    inputRef={inputRef}
                />
            </form>
        </div>
    );
};

export default GuildConversation;
