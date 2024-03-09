import React, { useEffect, useState, useContext } from 'react'
import ContactsList from '../contactsList/ContactsList';
import FriendReqList from '../friendReqList/FriendReqList';
import { DarkModeContext } from '../context/DarkModeContext';

export default function RightMenu({ user }) {
    const { darkMode } = useContext(DarkModeContext);
    const [rightMenuData, setRightMenuData] = useState({
        friends: [],
        approvedFriends: [],
        pendingFriends: [],
    });

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch(`/api/users/${user._id}/friends`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.ok) {
                    const friendsListData = await response.json();

                    // filter the fetched data for pending and approved friends
                    const approvedFriends = friendsListData.friends.filter(friend => friend.status === 'approved');
                    const pendingFriends = friendsListData.friends.filter(friend => friend.status === 'pending');

                    setRightMenuData({
                        ...rightMenuData,
                        approvedFriends: approvedFriends,
                        pendingFriends: pendingFriends,
                        friends: friendsListData.friends
                    });


                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchFriends();
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
