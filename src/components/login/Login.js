import React from 'react';
import Logo from '../logo/Logo';
import LoginForm from '../loginForm/LoginForm';
import './Login.css';

export default function Login({ }) {
  return (
    <div className=" container col-center d-flex justify-content-center align-items-center vh-100">
      <div className="container justify-content-center">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <Logo />
          </div>
          <div className="col-lg-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
