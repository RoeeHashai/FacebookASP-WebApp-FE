import React from 'react'
import facebooklogo from '../res/4lCu2zih0ca.svg'
import './Login.css'
import { useHistory, useNavigate } from 'react-router-dom'


export default function Login() {
  const navigate = useNavigate()
  const handleSignupClick = () => {
    navigate('/signup')
  }
  const handleLoginClick = () => {
    navigate('/feed')
  }
  return (
    <div className=" container col-center d-flex justify-content-center align-items-center vh-100">
      <div className="container justify-content-center">
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
              <form>
                <div className="mb-2">
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control custom-input"
                      id="exampleInputEmail1"
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control custom-input"
                      id="exampleInputEmail1"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <button type="submit" onClick={handleLoginClick} className="btn btn-primary btn-lg w-100">
                  Log In
                </button>
              </form>
              <hr className="my-2.5" />
              <button
              onClick={handleSignupClick}
                type="button"
                className="btn btn-success btn-lg mt-1 newaccount-btn"
              >
                Create New Account
              </button>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
    )
}

