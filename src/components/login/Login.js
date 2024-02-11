import React from 'react'
import './Login.css'

import Logo from '../logo/Logo'
import LoginForm from '../loginForm/LoginForm'

export default function Login({ users, addConnectedUser }) {
  console.log('Received Users:', users);

  return (
    <div className=" container col-center d-flex justify-content-center align-items-center vh-100">
      <div className="container justify-content-center">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <Logo />
          </div>
          <div className="col-lg-6">
            <LoginForm users={users} addConnectedUser={addConnectedUser}/>
          </div>{" "}
        </div>
      </div>
    </div>
  )
}

