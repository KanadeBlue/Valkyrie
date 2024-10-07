// * DEPENDENCIES * //
import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// * REDUX SLICE * //
import { SocketContext } from '../../context/SocketContext';

// * COMPONENTS * //
import ServerList from '../../components/ServerList/ServerList';
import Sidebar from '../../components/Sidebar/Sidebar';
import FriendsTab from '../../components/FriendsTab/FriendsTab';
import Conversation from '../../components/Conversation/Conversation';
import GuildConversation from '../../components/Conversation/GuildConversation';

const Dashboard = () => {
    const navigate = useNavigate();
    const notificationAudio = new Audio('/notification.mp3');

    const socket = useContext(SocketContext);
    const { user } = useSelector(state => state.auth);
    const checkUser = localStorage.getItem('user');
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!checkUser) return;
        socket.emit('join', user.details._id);

        socket.on('received_message_notification', (message) => {
            setNotifications(notifications => [...notifications, message]);
            notificationAudio.play();
        });

        socket.on('friend_request_notification', () => toast('You have received a friend request', { icon: '👏' }));
        socket.on('accept_friend_request_notification', username => toast.success(`${username} has accepted your request`));

        return () => {
            socket.off('received_message_notification');
            socket.off('friend_request_notification');
            socket.off('accept_friend_request_notification');
        };
    }, [socket, user]);

    useEffect(() => { if (!checkUser) return navigate('/login') }, []);

    return (
        <SocketContext.Provider value={socket}>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{ style: { backgroundColor: '#14151e', color: '#fff', fontSize: '0.8rem' } }}
            />

            <div className="flex w-screen h-screen">
                {notifications.length > 0 && (
                    <div className="z-10 absolute top-[55px] left-[45px] flex items-center justify-center w-[15px] h-[15px] text-xs font-bold rounded-full bg-red-600 outline outline-2 outline-black">
                        {notifications.length}
                    </div>
                )}
                <ServerList />
                <Sidebar />

                <div className="w-full h-full bg-[#003a70]"> {/* Replace with your desired background color */}
                    <Routes>
                        <Route path={':guildID/:channelID'} element={<GuildConversation />} />
                        <Route path={'@me/:friendID'} element={<Conversation />} />
                        <Route path={'@me'} element={<FriendsTab />} />
                    </Routes>
                </div>
            </div>
        </SocketContext.Provider>
    );
};

export default Dashboard;
