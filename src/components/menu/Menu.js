import React, { useState, useEffect } from 'react';
import './Menu.css';
import { useNavigate, Link } from 'react-router-dom';
import EditAccountModal from '../editAccountModal/EditAccountModal';
import DeleteAccountModal from '../deleteAccountModal/DeleteAccountModal';


export default function Menu({ user, darkMode, addConnectedUser }) {
    const navigate = useNavigate();
    const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
    const showNotSupportedAlert = () => {
        alert("This action is not supported at the moment.");
    };

    // const toggleEditModal = () => {
    //     setIsEditAccountModalOpen(!isEditAccountModalOpen);
    //     console.log(isEditAccountModalOpen);
    // };
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
        <>
            <ul className={`list-group  ${darkMode ? 'darkmode-menu' : ''}`}>
                {/* User profile information */}
                <Link to={`/profile/${user._id}`} className="text-decoration-none">
                    <li className="margintopmenu list-group-item d-flex align-items-center">
                        {/* Profile Picture */}
                        <div className='contanier'>
                            <img
                                src={user.image}
                                alt="User Profile"
                                className="rounded-circle shadow small-profile-img"
                            />
                        </div>
                        <span className="w-100 m-1 ms-3">{user.name}</span>
                    </li>
                </Link>

                {/* Menu items with icons */}
                <li className="list-group-item d-flex list-to-hover align-items-center" onClick={showNotSupportedAlert}>
                    <i className="bi bi-people-fill ms-1" />
                    <span className="w-100 m-1 ms-3">Friends</span>
                </li>
                <li className="list-group-item d-flex list-to-hover align-items-center" onClick={showNotSupportedAlert}>
                    <i className="bi bi-newspaper ms-1" />
                    <span className="w-100 m-1 ms-3">Feeds</span>
                </li>
                <li className="list-group-item d-flex list-to-hover align-items-center" onClick={showNotSupportedAlert}>
                    <i className="bi bi-clock ms-1" />
                    <span className="w-100 m-1 ms-3">Memories</span>
                </li>
                <li className="list-group-item d-flex list-to-hover align-items-center" onClick={showNotSupportedAlert}>
                    <i className="bi bi-bookmark ms-1" />
                    <span className="w-100 m-1 ms-3">Saved</span>
                </li>
                <li className="list-group-item d-flex list-to-hover align-items-center" onClick={showNotSupportedAlert}>
                    <i className="bi bi-people-fill ms-1" />
                    <span className="w-100 m-1 ms-3">Groups</span>
                </li>
                <li className="list-group-item d-flex list-to-hover align-items-center" onClick={showNotSupportedAlert}>
                    <i className="bi bi-play-btn ms-1" />
                    <span className="w-100 m-1 ms-3">Video</span>
                </li>
                <li className="list-group-item d-flex list-to-hover align-items-center" onClick={showNotSupportedAlert}>
                    <i className="bi bi-shop ms-1" />
                    <span className="w-100 m-1 ms-3">Marketplace</span>
                </li>
                <li className="list-group-item d-flex list-to-hover align-items-center" onClick={showNotSupportedAlert}>
                    <i className="bi bi-calendar ms-1" />
                    <span className="w-100 m-1 ms-3">Events</span>
                </li>
                <li className="list-group-item d-flex list-to-hover align-items-center" onClick={showNotSupportedAlert}>
                    <i className="bi bi-messenger ms-1" />
                    <span className="w-100 m-1 ms-3">Messenger</span>
                </li>
                <li className="list-group-item d-flex list-to-hover align-items-center" onClick={() => setIsEditAccountModalOpen(true)}>
                    <i className="bi bi-pencil-square ms-1" />
                    <span className="w-100 m-1 ms-3">Edit Account</span>
                </li>
                <li className="list-group-item d-flex list-to-hover align-items-center" onClick={() => setIsDeleteAccountModalOpen(true)}>
                    <i className="bi bi-exclamation-triangle-fill ms-1" />
                    <span className="w-100 m-1 ms-3">Delete Account</span>
                </li>
            </ul>
            <EditAccountModal
                isOpen={isEditAccountModalOpen}
                onClose={() => setIsEditAccountModalOpen(false)}
                user={user}
                onSave={(updatedUser) => {
                    // Implement your save logic here
                    setIsEditAccountModalOpen(false);
                    addConnectedUser(updatedUser);
                }}
                darkMode={darkMode}
            />
            <DeleteAccountModal
                isOpen={isDeleteAccountModalOpen}
                onClose={() => setIsDeleteAccountModalOpen(false)}
                user={user}
                darkMode={darkMode}
            />


        </>
    );
}
