import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';

export default function FriendReqList({ user, friendsRequests, acceptFriendRequest, rejectFriendRequest }) {
    const { darkMode } = useContext(DarkModeContext);
    const handleAcceptFriendRequest = async (newFriend) => {
        try {
            const response = await fetch(`/api/users/${user._id}/friends/${newFriend._id}`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                acceptFriendRequest(newFriend);
            }

        } catch (error) {
            console.error('Error:', error);

        }
    }

    const handleRejectFriendRequest = async (friendDel) => {
        try {
            const response = await fetch(`/api/users/${user._id}/friends/${friendDel._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                rejectFriendRequest(friendDel);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <h5 className={`${darkMode ? 'text-light' : 'text-muted'} mt-3 contactsList ms-2`}>Pending Requests</h5>
            {friendsRequests.map((currentUser) =>
                // Check if the currentUser is not the logged-in user - don't display the current user as a contact of himself
                // currentUser._id !== user.id ? (
                <li key={currentUser._id} className="list-group-item d-flex align-items-center">
                    <div className='contanier'>
                        {/* Display the profile picture of the contact user */}
                        <Link to={`/profile/${currentUser._id}`} className="text-decoration-none">
                            <img
                                src={currentUser.image}
                                alt={`Profile of ${currentUser.name}`}
                                className="rounded-circle shadow small-profile-img"
                            />
                        </Link>
                    </div>
                    {/* Display the name of the contact user */}
                    <span className={`w-100 m-1 ms-3 ${darkMode ? 'text-light' : ''} `}>{currentUser.name}</span>
                    <button className="btn btn-outline-primary me-2 border-0"
                        onClick={() => handleAcceptFriendRequest(currentUser)}>
                        <i className="bi bi-check-circle"></i></button>
                    <button className="btn btn-outline-danger border-0"
                        onClick={() => handleRejectFriendRequest(currentUser)}>
                        <i className="bi bi-x-circle"></i></button>
                </li>
                // ) : null
            )}
        </div>
    )
}
