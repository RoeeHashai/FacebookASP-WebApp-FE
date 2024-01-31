import React from 'react'
import facebooklogo from '../res/4lCu2zih0ca.svg'
import { useNavigate } from 'react-router'
import './Signup.css'

export default function Signup() {
    const navigate = useNavigate()
    const handleSignupClick = () => {
        navigate('/feed')
    }

    return (
        <div className=" container col-center d-flex justify-content-center align-items-center vh-100">
            <div className="container  justify-content-center">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col">
                                <img
                                    src={facebooklogo}
                                    alt="facebooklogo"
                                    className="img-fluid logo"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="text-below-logo">
                                    Connect with friends and the world around you on Facebook.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card shadow rounded p-3">
                            <form className="row g-3">
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputUsername"
                                        placeholder="Username"
                                        required=""
                                    />
                                </div>
                                <div className="col-md-12">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        placeholder="Email"
                                        required=""
                                    />
                                </div>
                                <div className="col-md-12">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPassword"
                                        placeholder="Password"
                                        required=""
                                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                        title="Password must be at least 8 characters long and include a combination of letters and numbers"
                                    />
                                    <small className="form-text text-muted">
                                        Password must be at least 8 characters long and include a
                                        combination of letters and numbers.
                                    </small>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="inputConfirmPassword"
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="inputPicture" className="form-label">
                                            Picture
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="inputPicture"
                                            required=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button
                                    onClick={handleSignupClick}
                                        type="submit"
                                        className="btn btn-primary w-100 newaccount-btn"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}