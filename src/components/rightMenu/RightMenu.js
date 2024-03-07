import React, { useEffect, useState, useContext } from 'react'
import ContactsList from '../contactsList/ContactsList';
import FriendReqList from '../friendReqList/FriendReqList';
import { DarkModeContext } from '../context/DarkModeContext';

export default function RightMenu({ user, friends }) {
    const { darkMode } = useContext(DarkModeContext);
    const [rightMenuData, setRightMenuData] = useState({
        friends: [],
        approvedFriends: [],
        pendingFriends: [],
    });

    useEffect(() => {
        const setFriends = async () => {
                    // filter the fetched data for pending and approved friends
                    const approvedFriends = friends.filter(friend => friend.status === 'approved');
                    const pendingFriends = friends.filter(friend => friend.status === 'pending');

                    setRightMenuData({
                        ...rightMenuData,
                        approvedFriends: approvedFriends,
                        pendingFriends: pendingFriends,
                        friends: friends
                    });
        }
        setFriends();
    }, [user]);

    const acceptFriendRequest = (newFriend) => {
        setRightMenuData({
            ...rightMenuData,
            approvedFriends: [...rightMenuData.approvedFriends, newFriend],
            pendingFriends: rightMenuData.pendingFriends.filter((user) => user.id !== newFriend.id)
        });
    };

    const rejectFriendRequest = (friendDel) => {
        setRightMenuData({
            ...rightMenuData,
            pendingFriends: rightMenuData.pendingFriends.filter((user) => user.id !== friendDel.id)
        });
    };

    return (
        <ul className={`list-group ${darkMode ? 'darkmode-menu' : ''}`}>
            <>
                {rightMenuData.pendingFriends.length > 0 &&
                    <>
                        <FriendReqList darkMode={darkMode}
                            user={user}
                            friendsRequests={rightMenuData.pendingFriends}
                            acceptFriendRequest={acceptFriendRequest}
                            rejectFriendRequest={rejectFriendRequest} />
                        <div className="mt-1 line-under-buttons"></div>
                    </>
                }

                {rightMenuData.approvedFriends.length > 0 ?
                    (<ContactsList
                        darkMode={darkMode}
                        friends={rightMenuData.approvedFriends}
                        user={user} />) :
                    null
                }
            </>
        </ul>
    );

}
