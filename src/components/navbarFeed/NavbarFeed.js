import {React, useContext} from 'react';
import './NavbarFeed.css';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';


export default function NavbarFeed({ }) {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        darkMode && toggleDarkMode(); // Reset dark mode to light mode before logging out
        navigate('/');
    };
    return (
        <nav className={`navbar sticky-top shadow ${darkMode ? 'dark-navbar' : ''}`}>
            <div className="container text-center">
                <div className="row justify-content-center">
                    {/* Dark mode toggle switch */}
                    <div className="col-auto d-none d-md-block position-fixed start-0">
                        <div className="form-check form-switch dark-mode-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggleSwitch"
                                onChange={toggleDarkMode}
                                checked={darkMode}

                            />
                            <label className="form-check-label" htmlFor="toggleSwitch" />
                        </div>
                    </div>
                    {/* Facebook logo */}
                    <div className="col-auto">
                        <img
                            src={process.env.PUBLIC_URL + '/facebook-logo.png'}
                            alt="Facebook logo"
                            className="d-inline-block small-profile-img"
                        />
                    </div>
                    {/* Search bar */}
                    <div className="col-auto">
                        <div className="searchbar ms-2">
                            <input
                                className={`form-control navbarSearchBar rounded-pill ${darkMode ? 'searchbar-dark' : 'searchbar-light'}`}
                                type="search"
                                placeholder="Search Facebook"
                                aria-label="Search"
                            />
                        </div>
                    </div>
                    {/* Logout button */}
                    <div className="col-auto d-none d-md-block position-fixed end-0">
                        <button className={`btn ${darkMode ? 'logout-logo-dark' : ''}`} onClick={handleLogout} data-toggle="tooltip" data-placement="bottom" title="Logout">
                            <i className="bi bi-box-arrow-left"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
