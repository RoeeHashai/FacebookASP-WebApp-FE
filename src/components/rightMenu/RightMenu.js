import React, { useEffect, useState, useContext } from 'react'
import ContactsList from '../contactsList/ContactsList';
import FriendReqList from '../friendReqList/FriendReqList';
import { DarkModeContext } from '../context/DarkModeContext';

export default function RightMenu({ user, friends }) {
    const { darkMode } = useContext(DarkModeContext);
    const [rightMenuData, setRightMenuData] = useState({
        // friends: [],
        approvedFriends: [],
        pendingFriends: [],
    });

    useEffect(() => {
        const setFriends = async () => {
                    // filter the fetched data for pending and approved friends
                    const approvedFriends = friends.filter(friend => friend.status === 'approved');
                    const pendingFriends = friends.filter(friend => friend.status === 'pending');

                    setRightMenuData({
                        approvedFriends: approvedFriends,
                        pendingFriends: pendingFriends,
                    });
        }
        setFriends();
    }, [user]);

    const acceptFriendRequest = (newFriend) => {
        setRightMenuData(currentState => ({
            ...currentState,
            approvedFriends: [...currentState.approvedFriends, newFriend],
            // Ensure the friend is removed from the pending list based on a consistent and correct identifier
            pendingFriends: currentState.pendingFriends.filter(friend => friend._id !== newFriend._id),
        }));
    };
    
    const rejectFriendRequest = (friendDel) => {
        setRightMenuData(currentState => ({
            ...currentState,
            // Similar filter logic for removal from the pending list
            pendingFriends: currentState.pendingFriends.filter(friend => friend._id !== friendDel._id),
        }));
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