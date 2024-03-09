import React, { useState, useEffect, useContext } from 'react';
import './Menu.css';
import { useNavigate, Link } from 'react-router-dom';
import EditAccountModal from '../editAccountModal/EditAccountModal';
import DeleteAccountModal from '../deleteAccountModal/DeleteAccountModal';
import { DarkModeContext } from '../context/DarkModeContext';

export default function Menu({ user, addConnectedUser }) {
    const { darkMode } = useContext(DarkModeContext);
    const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
    const showNotSupportedAlert = () => {
        alert("This action is not supported at the moment.");
    };

    return (
        <>
            <ul className={`list-group  ${darkMode ? 'darkmode-menu' : ''}`}>
                {/* on click on the user profile image navigate to the users profile page */}
                <Link to={`/profile/${user._id}`} className="text-decoration-none">
                    <li className="margintopmenu list-group-item d-flex align-items-center">
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
                    setIsEditAccountModalOpen(false);
                    addConnectedUser(updatedUser);
                }}
            />
            <DeleteAccountModal
                isOpen={isDeleteAccountModalOpen}
                onClose={() => setIsDeleteAccountModalOpen(false)}
                user={user}
            />


        </>
    );
}
