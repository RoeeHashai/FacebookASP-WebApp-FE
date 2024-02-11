import React from 'react'
import './NavbarFeed.css'
import facebooklogo from '../res/Facebook_Logo_2023-1.png'
import { Link } from 'react-router-dom'


export default function NavbarFeed() {
    return (
        <nav className="navbar sticky-top shadow">
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-auto d-none d-md-block position-fixed start-0">
                        <div className="form-check form-switch dark-mode-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggleSwitch"
                            />
                            <label className="form-check-label" htmlFor="toggleSwitch" />
                        </div>
                    </div>
                    <div className="col-auto">
                        <Link to='/feed'>
                            <img
                                src={facebooklogo}
                                alt="Facebook logo"
                                className="d-inline-block small-profile-img"
                            />
                        </Link>
                    </div>
                    <div className="col-auto">
                        <div className="searchbar ms-2">
                            <input
                                className="form-control rounded-pill"
                                type="search"
                                placeholder="Search Facebook"
                                aria-label="Search"
                            />

                        </div>
                    </div>
                    <div className="col-auto d-none d-md-block position-fixed end-0">
                        <Link to='/login'>
                            <button className='btn' data-toggle="tooltip" data-placement="bottom" title="Logout"><i className="bi bi-box-arrow-left"></i></button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav >

    )
}
