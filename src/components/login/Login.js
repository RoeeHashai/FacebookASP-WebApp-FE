import React from 'react';
import Logo from '../logo/Logo';
import LoginForm from '../loginForm/LoginForm';
import './Login.css';

export default function Login({ addConnectedUser, addToken}) {
  return (
    // Main container for the login page
    <div className=" container col-center d-flex justify-content-center align-items-center vh-100">
      <div className="container justify-content-center">
        {/* Row to hold the logo and login form */}
        <div className="row align-items-center">
          {/* Column for the logo and the writing under it */}
          <div className="col-lg-6">
            <Logo />
          </div>
          {/* Column for the login form */}
          <div className="col-lg-6">
            <LoginForm addConnectedUser={addConnectedUser} addToken={addToken} />
          </div>
        </div>
      </div>
    </div>
  );
}
