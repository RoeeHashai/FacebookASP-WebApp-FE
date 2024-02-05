import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

export default function LoginForm({ users, addConnectedUser }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
    
        const user = validateEmail(email);
    
        if (user) {
            setEmailValid(true);
    
            if (validatePassword(user, password)) {
                setPasswordValid(true);
                addConnectedUser(user)
                navigate('/feed');
            } else {
                setPasswordValid(false);
                setPasswordMessage('Wrong password');
            }
        } else {
            setEmailValid(false);
            setEmailMessage('Invalid email');
            setPasswordValid(false);
            setPasswordMessage('');
        }
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const validateEmail = (email) => {
        return users.find((user) => user.email === email)
    };

    const validatePassword = (user, password) => {
        return user.password === password
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
        </div>
    );
}
