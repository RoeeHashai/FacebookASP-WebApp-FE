import { React , useContext } from 'react'
import { Link } from 'react-router-dom'
import { DarkModeContext } from '../context/DarkModeContext'

export default function ContactsList({ friends, user }) {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <>
            {friends.length !== 0 ? (
                <h5 className={`${darkMode ? 'text-light' : 'text-muted'} mt-3 contactsList ms-2`}>Contacts</h5>
            ) : null}
                
            {/* Map through the users array and render a list item for each user */}
            {friends.map((currentUser) =>
                // Check if the currentUser is not the logged-in user -  dont display the current user as a contact of himself
                currentUser._id !== user.id ? (
                    <Link to={`/profile/${currentUser._id}`} className="text-decoration-none">

                        <li key={currentUser._id} className="list-group-item d-flex list-to-hover align-items-center">
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
        </>)
}
