import React from 'react'
import './Signup.css'
import Logo from '../logo/Logo'
import SignupForm from '../SignupForm/SignupForm'
export default function Signup({ users, onAddUser, idNewUser }) {
    return (
        <div className=" container col-center d-flex justify-content-center align-items-center vh-100">
            <div className="container justify-content-center">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        {/* Logo component */}
                        <Logo />
                    </div>
                    <div className="col-lg-6">
                        {/* SignupForm component */}
                        <SignupForm users={users} onAddUser={onAddUser} idNewUser={idNewUser}/>
                    </div>
                </div>
            </div>
        </div>)
}