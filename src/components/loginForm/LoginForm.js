import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

export default function LoginForm({ addConnectedUser }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        formSubmitted: false,
        emailValid: false,
        passwordValid: false,
        emailMessage: '',
        passwordMessage: '',
    });

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const fetchUser = async (email) => {
        try {
            const response = await fetch(`api/users/${email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data;
            }
            else {
                console.log('Error fetching user');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLoginClick = async (e) => {
        e.preventDefault();

        // Set formSubmitted to true to trigger validation messages
        //setFormData((prevData) => ({ ...prevData, formSubmitted: true }));
        const loginData = {
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch('/api/tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {

                const data = await response.json();

                // Set token in local storage
                localStorage.setItem('token', data.token);

                const connectedUser = await fetchUser(formData.email);
                // Get user data and add connected user to the state
                addConnectedUser(connectedUser);
                
                // Navigate to feed
                navigate('/feed');
            } else {
                const errorData = await response.json();
                console.log(errorData);
                if (errorData.message === 'User not found.') {
                    setFormData((prevData) => ({
                        ...prevData,
                        formSubmitted: true,
                        emailValid: false,
                        emailMessage: "Email doesn't exist. Please create an account.",
                        passwordValid: true,
                    }));
                } else if (errorData.message === 'Invalid password.') {
                    setFormData((prevData) => ({
                        ...prevData,
                        formSubmitted: true,
                        passwordValid: false,
                        passwordMessage: 'Wrong Password',
                        emailValid: true,
                    }));
                }
            }
        } catch (error) {
            console.error('Error:', error);
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