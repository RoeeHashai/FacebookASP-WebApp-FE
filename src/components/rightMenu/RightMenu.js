import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RightMenu({ user, darkMode, users }) {
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

    return (
        <ul className={`list-group ${darkMode ? 'darkmode-menu' : ''}`}>
            <h5 className={`${darkMode ? 'text-light' : 'text-muted'} mt-3 contactsList ms-2`}>Contacts</h5>
            {/* Map through the users array and render a list item for each user */}
            {users.map((currentUser) =>
                // Check if the currentUser is not the logged-in user -  dont display the current user as a contact of himself
                currentUser.id !== user.id ? (
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
                ) : null
            )}
        </ul>
    );

}
