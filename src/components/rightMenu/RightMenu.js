import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function RightMenu({ user, darkMode, friends, setFriends }) {
    // get the friens req from the server
    const [friendsRequests, setFriendsRequests] = useState([{
        "id": 11,
        "name": "Roee Hashai1",
        "email": "roee.hashai@gmail.com",
        "password": "1111",
        "image": "/profile-pictures/roee_hashai.jpg"
    }, {
        "id": 12,
        "name": "Roee Hashai2",
        "email": "roee.hashai@gmail.com",
        "password": "1111",
        "image": "/profile-pictures/roee_hashai.jpg"
    }, {
        "id": 13,
        "name": "Roee Hashai3",
        "email": "roee.hashai@gmail.com",
        "password": "1111",
        "image": "/profile-pictures/roee_hashai.jpg"
    },]);

    const navigate = useNavigate();

    // In case of refreshing the page need to logout because (Connected) user isn't connected any more
    useEffect(() => {
        // Check if user is falsy (null or undefined)
        if (!user) {
            // Navigate to the login page if not logged in
            navigate('/login');
        }
    }, [user, navigate]);
    // If user is not defined, return null to avoid rendering the component
    if (!user) {
        return null;
    } // =================================== End Handle Refresh =======================================

    const acceptFriendRequest = (request) => {
        // Remove the accepted friend request from the pending requests list
        const updatedRequests = friendsRequests.filter((user) => user.id !== request.id);
        setFriendsRequests(updatedRequests);

        // Add the accepted friend to the friends list
        setFriends((prevFriends) => [...prevFriends, request]);
        console.log(friends);
    };
    const rejectFriendRequest = (request) => {
        // Remove the rejected friend request from the pending requests list
        const updatedRequests = friendsRequests.filter((user) => user.id !== request.id);
        setFriendsRequests(updatedRequests);
    };
    return (
        <ul className={`list-group ${darkMode ? 'darkmode-menu' : ''}`}>
            {/* Map through the users array and render a list item for each user */}
            {friendsRequests.length === 0 ? (
                <div></div>
            ) : (
                <>
                    <h5 className={`${darkMode ? 'text-light' : 'text-muted'} mt-3 contactsList ms-2`}>Pending Requests</h5>
                    {friendsRequests.map((currentUser) =>
                        // Check if the currentUser is not the logged-in user - don't display the current user as a contact of himself
                        currentUser.id !== user.id ? (
                            <li key={currentUser.id} className="list-group-item d-flex align-items-center">
                                <div className='contanier'>
                                    {/* Display the profile picture of the contact user */}
                                    <Link to={`/profile/${currentUser.id}`} className="text-decoration-none">
                                        <img
                                            src={currentUser.image}
                                            alt={`Profile of ${currentUser.name}`}
                                            className="rounded-circle shadow small-profile-img"
                                        />
                                    </Link>
                                </div>
                                {/* Display the name of the contact user */}
                                <span className={`w-100 m-1 ms-3 ${darkMode ? 'text-light' : 'text-muted'} `}>{currentUser.name}</span>
                                <button className="btn btn-outline-primary me-2 border-0" onClick={() => acceptFriendRequest(currentUser)}><i className="bi bi-check-circle"></i></button>
                                <button className="btn btn-outline-danger border-0" onClick={() => rejectFriendRequest(currentUser)}><i className="bi bi-x-circle"></i></button>
                            </li>
                        ) : null
                    )}
                    <div className="mt-1 line-under-buttons"></div>
                </>
            )}


            <h5 className={`${darkMode ? 'text-light' : 'text-muted'} mt-3 contactsList ms-2`}>Contacts</h5>
            {/* Map through the users array and render a list item for each user */}
            {friends.map((currentUser) =>
                // Check if the currentUser is not the logged-in user -  dont display the current user as a contact of himself
                currentUser.id !== user.id ? (
                    <Link to={`/profile/${currentUser.id}`} className="text-decoration-none"> {/*maybe delet if makes the profile complex*/}

                        <li key={currentUser.id} className="list-group-item d-flex list-to-hover align-items-center">
                            <div className='contanier'>
                                {/* Display the profile picture of the contact user */}
                                <img
                                    src={currentUser.image}
                                    alt={`Profile of ${currentUser.name}`}
                                    className="rounded-circle shadow small-profile-img"
                                />
                            </div>
                            {/* Display the name of the contact user */}
                            <span className="w-100 m-1 ms-3">{currentUser.name}</span>
                        </li>
                    </Link>
                ) : null
            )}
        </ul>
    );

}
