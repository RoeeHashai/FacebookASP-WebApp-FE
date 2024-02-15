import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

export default function LoginForm({ users, addConnectedUser }) {
    const navigate = useNavigate();

    // Combined state for form data and validation
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        formSubmitted: false,
        emailValid: false,
        passwordValid: false,
        emailMessage: '',
        passwordMessage: '',
    });

    // Function to navigate to the signup page
    const handleSignupClick = () => {
        navigate('/signup');
    };

    // Function to handle login button click
    const handleLoginClick = (e) => {
        e.preventDefault();
        
        // Set formSubmitted to true to trigger validation messages
        setFormData((prevData) => ({ ...prevData, formSubmitted: true }));

        // Validate email and get user
        const user = validateEmail(formData.email);
        if (user) {
            // Set emailValid to true if email is valid
            setFormData((prevData) => ({ ...prevData, emailValid: true }));

            // Validate password for the user
            if (validatePasswordForUser(user, formData.password)) {
                // Set passwordValid to true, add connected user, and navigate to feed
                setFormData((prevData) => ({ ...prevData, passwordValid: true }));
                addConnectedUser(user);
                navigate('/feed');
            } else {
                // Set passwordValid to false and display a wrong password message
                setFormData((prevData) => ({ ...prevData, passwordValid: false, passwordMessage: 'Wrong Password' }));
            }
        } else {
            // Set emailValid to false, display an invalid email message, and reset passwordValid and passwordMessage
            setFormData((prevData) => ({ ...prevData, emailValid: false, emailMessage: 'Invalid Email', passwordValid: false, passwordMessage: '' }));
        }
    };

    // Function to handle password input change
    const onChangePassword = (e) => {
        setFormData((prevData) => ({ ...prevData, password: e.target.value }));
    };

    // Function to handle email input change
    const onChangeEmail = (e) => {
        setFormData((prevData) => ({ ...prevData, email: e.target.value }));
    };

    // Function to validate email against registered users
    const validateEmail = (email) => {
        return users && users.find((user) => user.email === email);
    };

    // Function to validate password against a specific user's password
    const validatePasswordForUser = (user, enteredPassword) => {
        return user && user.password === enteredPassword;
    };

    return (
        <div className="card shadow rounded p-3">
            {/* Login form */}
            <form>
                <div className="mb-2">
                    {/* Email input */}
                    <input
                        type="email"
                        className={`form-control custom-input ${formData.formSubmitted && !formData.emailValid && 'is-invalid'}`}
                        onChange={onChangeEmail}
                        id="emailInput"
                        placeholder="Email address"
                    />
                    {/* Display email validation message if email is not valid */}
                    {!formData.emailValid && <div className='invalid-feedback'>{formData.emailMessage}</div>}
                </div>
                <div className="mb-3">
                    {/* Password input */}
                    <input
                        type="password"
                        className={`form-control custom-input ${formData.formSubmitted && !formData.passwordValid && 'is-invalid'}`}
                        onChange={onChangePassword}
                        id="passwordInput"
                        placeholder="Password"
                    />
                    {/* Display password validation message if password is not valid */}
                    {!formData.passwordValid && <div className='invalid-feedback'>{formData.passwordMessage}</div>}
                </div>
                {/* Login button */}
                <button type="submit" onClick={handleLoginClick} className="btn btn-primary btn-lg w-100">
                    Log In
                </button>
            </form>
            <hr className="my-2.5" />
            {/* Signup button */}
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
