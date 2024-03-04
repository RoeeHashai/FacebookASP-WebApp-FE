import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

export default function LoginForm({ }) {
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
        try { // after the user logs in, we fetch the user data from the server
            const response = await fetch(`api/users/${email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                return userData;
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLoginClick = async (e) => {
        e.preventDefault();
        // Create login data object to be send to the server
        const loginData = {
            email: formData.email,
            password: formData.password
        };

        try {
            // Send login data to the server and get back the token
            const response = await fetch('/api/tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) { // if the response is okay, set the token and user data in the local storage and navigate to the feed
                const data = await response.json();
                localStorage.setItem('token', data.token);

                const connectedUser = await fetchUser(formData.email);
                localStorage.setItem('user', JSON.stringify(connectedUser));
                navigate('/feed');
            } else {
                const errorData = await response.json();
                if (errorData.message === 'User not found.') { // if the user is not found, set the email validation message
                    setFormData((prevData) => ({
                        ...prevData,
                        formSubmitted: true,
                        emailValid: false,
                        emailMessage: "Email doesn't exist. Please create an account.",
                        passwordValid: true,
                    }));
                } else if (errorData.message === 'Invalid password.') { // if the password is invalid, set the password validation message so user can try again
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

    const onChangePassword = (e) => {
        setFormData((prevData) => ({ ...prevData, password: e.target.value }));
    };

    const onChangeEmail = (e) => {
        setFormData((prevData) => ({ ...prevData, email: e.target.value }));
    };
    return (
        <div className="card shadow rounded p-3">
            <form>
                <div className="mb-2">
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
                <button type="submit" onClick={handleLoginClick} className="btn btn-primary btn-lg w-100">
                    Log In
                </button>
            </form>
            <hr className="my-2.5" />
            <button
                onClick={handleSignupClick}
                type="button"
                className="btn btn-success btn-lg mt-1 newaccount-btn">
                Create New Account
            </button>
        </div>
    );
}