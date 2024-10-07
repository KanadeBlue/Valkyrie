// * DEPENDENCIES * //
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { fetchFriends, deleteFriend } from '../../features/friends/friendsSlice';
import { reset } from '../../features/conversation/conversationSlice';

// * COMPONENTS * //
import Button from '../Button';
import Loading from './Loading';
import { ProfileIcon } from '../ProfileIcon';

const Friend = ({ onClick, children, actions }) => (
    <div
        className="relative cursor-pointer flex items-center justify-start w-full h-15 p-2.5 rounded-lg bg-[#001f3f] transition ease-in-out duration-200 hover:bg-[#02305f]"
        onClick={onClick}
    >
        <p className="ml-2">{children}</p>
        <div className="absolute right-2 top-1/2 flex items-center justify-center gap-1 transform -translate-y-1/2">
            {actions}
        </div>
    </div>
);

const FriendsList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { friends, loading, success } = useSelector((state) => state.friends);

    useEffect(() => {
        dispatch(fetchFriends());
        if (success) dispatch(reset());
    }, [dispatch, success]);

    const removeFriend = (e, friend) => {
        e.stopPropagation();
        dispatch(deleteFriend(friend._id));
    };

    if (loading)
        return (
            <>
                <Loading />
                <Loading />
                <Loading />
                <Loading />
                <Loading />
            </>
        );

    return friends?.map((friend) => (
        <Friend key={friend._id} onClick={() => navigate(`/channels/@me/${friend._id}`)}>
            <ProfileIcon avatar={friend.avatar} />
            <p>{friend.username}</p>
            <Button
                onClick={(e) => removeFriend(e, friend)}
                variant={'danger'}
                className="w-20 h-7"
            >
                Remove
            </Button>
        </Friend>
    ));
};

export default FriendsList;
