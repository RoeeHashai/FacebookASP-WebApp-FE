import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ContactsList from '../contactsList/ContactsList';
import FriendReqList from '../friendReqList/FriendReqList';

export default function RightMenu({ user, darkMode }) {
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

                    // Directly filter the fetched data for pending and approved friends
                    const approvedFriends = friendsListData.friends.filter(friend => friend.status === 'approved');
                    const pendingFriends = friendsListData.friends.filter(friend => friend.status === 'pending');
                    
                    // Update the state with both filtered lists
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
    if (!user) {
        return null;
    }

    const acceptFriendRequest = (newFriend) => {
        // Remove the accepted friend request from the pending requests list
        // const updatedRequests = friendsRequests.filter((user) => user.id !== request.id);
        // setFriendsRequests(updatedRequests);

        // Add the accepted friend to the friends list
        //setFriends((prevFriends) => [...prevFriends, request]);
        // console.log(friends);
        setRightMenuData({
            ...rightMenuData,
            approvedFriends: [...rightMenuData.approvedFriends, newFriend],
            pendingFriends: rightMenuData.pendingFriends.filter((user) => user.id !== newFriend.id)
        });
    };
    const rejectFriendRequest = (friendDel) => {
        // Remove the rejected friend request from the pending requests list
        // const updatedRequests = friendsRequests.filter((user) => user.id !== request.id);
        // setFriendsRequests(updatedRequests);
        setRightMenuData({
            ...rightMenuData,
            pendingFriends: rightMenuData.pendingFriends.filter((user) => user.id !== friendDel.id)
        });
    };
    return (
        <ul className={`list-group ${darkMode ? 'darkmode-menu' : ''}`}>
            {/* Map through the users array and render a list item for each user */}
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
