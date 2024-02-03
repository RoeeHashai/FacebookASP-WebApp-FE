import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import Logo from '../logo/Logo'


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
              <Logo />
            </div>
            <div className="col-lg-6">
              <div className="card shadow rounded p-3">
                <form>
                  <div className="mb-2">
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control custom-input"
                        id="emailInput"
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control custom-input"
                        id="passwordInput"
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

