import React from 'react'
import facebooklogo from '../res/4lCu2zih0ca.svg'
import { useNavigate } from 'react-router'
import './Signup.css'
import Logo from '../logo/Logo'
import SignupForm from '../SignupForm/SignupForm'

export default function Signup({onAddUser}) {
    return (
        <div className=" container col-center d-flex justify-content-center align-items-center vh-100">
            <div className="container justify-content-center">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <Logo />
                    </div>
                    <div className="col-lg-6">
                        <SignupForm onAddUser={onAddUser}/>       
                    </div>
                </div>
            </div>
        </div>)
}