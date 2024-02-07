import React, { useEffect } from 'react'
import './Menu.css'
import {useNavigate} from 'react-router-dom'
export default function Menu({user}) {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if connectedUser is falsy (null or undefined)
      if (!user) {
        // Navigate to the login page if not logged in
        navigate('/login');
      }
    }, [user, navigate]);
  
    // If connectedUser is not defined, return null to avoid rendering the component
    if (!user) {
      return null;
    }
  
  

    return (
        <ul className="list-group">
            <li className="list-group-item d-flex align-items-center">
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
            <li className="list-group-item d-flex list-to-hover align-items-center">
                <i className="bi bi-people-fill ms-1" />
                <span className="w-100 m-1 ms-3">Friends</span>
            </li>
            <li className="list-group-item d-flex list-to-hover align-items-center">
                <i className="bi bi-shop ms-1" />
                <span className="w-100 m-1 ms-3">Marketplace</span>
            </li>
            <li className="list-group-item d-flex list-to-hover align-items-center">
                <i className="bi bi-messenger ms-1" />
                <span className="w-100 m-1 ms-3">Messenger</span>
            </li>
            <li className="list-group-item d-flex list-to-hover align-items-center">
                <i className="bi bi-newspaper ms-1" />
                <span className="w-100 m-1 ms-3">Feeds</span>
            </li>

        </ul>)
}