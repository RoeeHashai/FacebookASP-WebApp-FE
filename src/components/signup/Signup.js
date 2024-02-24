import React from 'react'
import './Signup.css'
import Logo from '../logo/Logo'
import SignupForm from '../signupForm/SignupForm'
export default function Signup({}) {
    return (
        <div className=" container col-center d-flex justify-content-center align-items-center vh-100">
            <div className="container justify-content-center">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        {/* logo component */}
                        <Logo />
                    </div>
                    <div className="col-lg-6">
                        {/* SignupForm component */}
                        <SignupForm/>
                    </div>
                </div>
            </div>
        </div>)
}