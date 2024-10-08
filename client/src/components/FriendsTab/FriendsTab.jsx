// * DEPENDENCIES * //
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

// * REDUX SLICE * //
import { updateOnline, createFriendRequest, reset } from '../../features/friends/friendsSlice';
import { SocketContext } from '../../context/SocketContext';

// * COMPONENTS * //
import Button from '../Button';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import FriendsList from './FriendsList';
import PendingList from './PendingList';
import ConversationNavbar from '../ConversationNavbar';
import OnlineList from '../OnlineList';

const FriendsTab = () => {
    const dispatch = useDispatch();

    const { lastRequest, online, success, Error } = useSelector(state => state.friends);
    const { user } = useSelector(state => state.auth);
    const socket = useContext(SocketContext);
    const [currentTab, setCurrentTab] = useState('friends');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [friendFullUsername, setFriendFullUsername] = useState('');

    useEffect(() => {
        socket.emit('get_online_friends', user.details._id);
        const interval = setInterval(() => socket.emit('get_online_friends', user.details._id), 10000);
        socket.on('receive_online_friends', onlineFriends => dispatch(updateOnline(onlineFriends)));

        return () => {
            socket.off('receive_online_friends');
            clearInterval(interval);
        };
    }, [socket, user.details._id, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const [username, tag] = friendFullUsername.split('#');
        const friendDetails = { username, tag: '#' + tag };
        dispatch(createFriendRequest(friendDetails));
    };

    useEffect(() => {
        if (success) {
            setIsModalOpen(false);
            toast.success(`Sent a friend request to ${friendFullUsername}`);
            socket.emit('friend_request_notification', lastRequest);
            dispatch(reset());
        }

        if (Error) {
            toast.error(Error);
            dispatch(reset());
        }
    }, [success, Error, friendFullUsername, lastRequest, dispatch, socket]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] grid-rows-[fit-content_repeat(2,_fit-content)] gap-0">
            <Modal
                isModalOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                title={'Add a friend'}
                action={'Add'}
                handleSubmit={handleSubmit}
            >
                <Input
                    type={'text'}
                    label={'Username'}
                    required={true}
                    placeholder={'Valkyrie#0001'}
                    onChange={e => setFriendFullUsername(e.target.value)}
                    friendFullUsername={friendFullUsername}
                />
            </Modal>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{ style: { backgroundColor: '#14151e', color: '#fff', fontSize: '0.8rem' } }}
            />

            <ConversationNavbar>
                <div className="flex items-center space-x-2">
                    <p>Friends</p>
                    <Button onClick={() => setCurrentTab('friends')} variant={'transparent'} className="w-20 h-7">Friends</Button>
                    <Button onClick={() => setCurrentTab('pending')} variant={'transparent'} className="w-20 h-7">Pending</Button>
                </div>
                <Button onClick={() => setIsModalOpen(true)} variant={'transparent'} className="w-20 h-7">Add Friend</Button>
            </ConversationNavbar>

            <div className="overflow-y-scroll p-4 h-full pb-16">
                {currentTab === 'friends' && <FriendsList />}
                {currentTab === 'pending' && <PendingList />}
            </div>

            <OnlineList online={online} />
        </div>
    );
}

export default FriendsTab;
