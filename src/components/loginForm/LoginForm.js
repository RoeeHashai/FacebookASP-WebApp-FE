import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginForm.css'
export default function LoginForm({ users }) {
    const navigate = useNavigate()
    // state variable to track form submission
    const [formSubmitted, setFormSubmitted] = useState(false)

    // state variables of the sign up form
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // validation status for each field
    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)

    // Error messages
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    useEffect(() => {
        // Check if both email and password are valid, then navigate
        if (emailValid && passwordValid) {
            navigate('/feed');
        }
    }, [emailValid, passwordValid, navigate]);


    const handleSignupClick = () => {
        navigate('/signup')
    }
    const handleLoginClick = (e) => {
        e.preventDefault()
        setFormSubmitted(true)
        var isPasswordValid = false
        // Validate the forms fileds
        const userMatchEmail = validateEmail(email)
        const isUsrEmailValid = userMatchEmail == null ? false : true
        if (isUsrEmailValid) {
            isPasswordValid = validatePassword(userMatchEmail, password)
        }
        else{
            setEmailMessage('Invalid email')
        }
        if(!isPasswordValid){
            setPasswordMessage('Wrong password')
        }

        // Update validation status and messages
        //setEmailMessage(isEmailValid ? '' : 'Invalid Email Adrress') //?
        setEmailValid(isUsrEmailValid)

        //setPasswordMessage(isPasswordValid ? '' : 'Wrong Password') //?
        setPasswordValid(isPasswordValid)

    }

    const onChangePassword = (e) => {
        const { name, value } = e.target

        setPassword(value)
    }
    const onChangeEmail = (e) => {
        const { name, value } = e.target
        setEmail(value)
    }

    const validateEmail = (email) => {
        if (Array.isArray(users)) {
            const foundUser = users.find(user => user.email === email);
            // if (foundUser === null) {
            //     setEmailMessage('Email not Found, please create a new account')
            //     return null
            // }
            return foundUser || null
        }
    }

    const validatePassword = (user, password) => {
        if (user && user.password) {
            // Validate the password by checking if it matches the user's password
            // if (user.password !== password) {
            //     setPasswordMessage('Wrong password')
            // }
            return user.password === password
        }
    };

    return (
        <div className="card shadow rounded p-3">
            <form>
                <div className="mb-2">
                    <input
                        type="email"
                        className={`form-control custom-input ${formSubmitted && !emailValid && 'is-invalid'}`}
                        onChange={onChangeEmail}
                        id="emailInput"
                        placeholder="Email address"
                    />
                    {!emailValid && <div className='invalid-feedback'>{emailMessage}</div>}

                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className={`form-control custom-input ${formSubmitted && !passwordValid && 'is-invalid'}`}
                        onChange={onChangePassword}
                        id="passwordInput"
                        placeholder="Password"
                    />
                    {!passwordValid && <div className='invalid-feedback'>{passwordMessage}</div>}

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
        </div>)
}
