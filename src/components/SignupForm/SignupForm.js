import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import './SignupForm.css'

export default function SignupForm({ users, onAddUser }) {
  const navigate = useNavigate()

  // state variables of the sign up form
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [picture, setPicture] = useState(null)

  // validation status for each field
  const [usernameValid, setUsernameValid] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true)
  const [pictureValid, setPictureValid] = useState(true)

  // Error messages
  const [usernameMessage, setUsernameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('')
  const [pictureMessage, setPictureMessage] = useState('')

  const handleOnInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'username') {
      const isUserNameValidValue = isUsernameValid(value)
      setUsername(value)
      setUsernameValid(isUserNameValidValue)
    }
    else if (name === 'email') {
      const isEmailValidValue = isEmailValid(value)
      setEmail(value)
      setEmailValid(isEmailValidValue)
    }
    else if (name === 'password') {
      const isPasswordValidValue = isPasswordValid(value)
      setPassword(value)
      setPasswordValid(isPasswordValidValue)
    }
    else if (name === 'confirmPassword') {
      const isConfirmPasswordValidValue = isConfirmPasswordValid(value)
      setConfirmPassword(value)
      setConfirmPasswordValid(isConfirmPasswordValidValue)
    }
    else if (name === 'picture') {
      const isPictureValidValue = isPictureValid(e.target.files[0])
      setPicture(e.target.files[0])
      setPictureValid(isPictureValidValue)
    }
  }

  const handleOnBlur = (e) => {
    const { name } = e.target
    if (name === 'username') {
      setUsernameMessage('')
    }
    else if (name === 'email') {
      setEmailMessage('')
    }
    else if (name === 'password') {
      setPasswordMessage('')
    }
    else if (name === 'confirmPassword') {
      setConfirmPasswordMessage('')
    }
    else if (name === 'picture') {
      setPasswordMessage('')
    }

  }

  const handleSignupClick = (e) => {
    e.preventDefault();

    // Check if Signin was done valid or not, don't proceed to the login page if not valid
    if (!validateForm()) {
      return;
    }

    // Generate a unique ID for the user
    const userId = uuidv4();

    // Create a new user to add to the users list
    const newUser = {
      id: userId,
      username,
      email,
      password,
      picture: picture && URL.createObjectURL(picture), // Use createObjectURL to get a URL for the image
    };

    // Add the new user to the list of users
    onAddUser(newUser);

    // You can clear the state after adding the user if needed
    setUsername('');
    setEmail('');
    setPassword('');
    setPicture(null);

    // Navigate to the login page after successfully adding a new user
    navigate('/login');
  };

  const validateForm = () => {
    if (username === '') {
      setUsernameValid(false)
    }
    // Check of the username is valid if not display error
    const isUserNameValidValue = isUsernameValid(username)
    setUsernameValid(isUserNameValidValue)

    // Check if the email is valid if not display error
    const isEmailValidValue = isEmailValid(email)
    setEmailValid(isEmailValidValue)

    // Check if new password is valid if not display error
    const isPasswordValidValue = isPasswordValid(password)
    setPasswordValid(isPasswordValidValue)

    const isConfirmPasswordValidValue = isConfirmPasswordValid(confirmPassword)
    setConfirmPasswordValid(isConfirmPasswordValidValue)

    const isPictureValidValue = isPictureValid(picture)
    setPictureValid(isPictureValidValue)
    return usernameValid && emailValid && passwordValid && isConfirmPasswordValidValue && isPictureValidValue
  }

  const isUsernameValid = (username) => {
    const isValid = username.length >= 3

    // Set the error message if validation fails
    setUsernameMessage(isValid ? '' : 'Username must be at least 3 characters long')

    return isValid
  }

  const isEmailValid = (email) => {
    // email pattern validation - using regex
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isLegalEmail = pattern.test(email)
    if (!isLegalEmail) {
      setEmailMessage('Email must be in a correct email format (e.g., XXX@XXX.XXX)')
      return false
    }
    const emailExist = users.find((user) => user.email === email)
    if (emailExist) {
      setEmailMessage('This email address is already in use. Please use a different one or log in.');
      return false
    }
    return true
  }

  const isPasswordValid = (password) => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const isValid = pattern.test(password)

    // Set error message based on conditions
    setPasswordMessage(isValid ? '' : 'Password must be at least 8 characters long and contain both numbers and letters')

    return isValid
  }

  const isConfirmPasswordValid = (confirmPassword) => {
    const isValid = password === confirmPassword

    // Set error message based on conditions
    setConfirmPasswordMessage(isValid ? '' : 'Passwords must match')

    return isValid
  };

  const isPictureValid = (picture) => {
    if (picture === null) {
      setPictureMessage('Must upload a profile picture');
      return false;
    }
  
    const acceptedFormats = ['image/jpeg', 'image/png'];
  
    if (!picture.type || !acceptedFormats.includes(picture.type)) {
      setPictureMessage('Please upload a valid JPEG or PNG image');
      return false;
    }
  
    // If all checks pass, the picture is valid
    return true;
  };

  return (
    <div className="card shadow rounded p-3">
      <Link to='/login'>
        <button className='btn'>
          <i className="bi bi-arrow-left mb-2"></i>
        </button>
      </Link>
      <form className="row g-3">
        {/* Username */}
        <div className="col-md-12">
          <input
            type="text"
            className={`form-control ${!usernameValid && 'is-invalid'}`}
            onBlur={handleOnBlur}
            onChange={handleOnInputChange}
            id="inputUsername"
            name='username'
            placeholder="Username"
            required=""
          />
          {!usernameValid && <div className='invalid-feedback'>{usernameMessage}</div>}
        </div>
        <div className="col-md-12">
          <input
            type="email"
            className={`form-control ${!emailValid && 'is-invalid'}`}
            onBlur={handleOnBlur}
            onChange={handleOnInputChange}
            id="inputEmail"
            name='email'
            placeholder="Email"
            required=""
          />
          {!emailValid && <div className='invalid-feedback'>{emailMessage}</div>}

        </div>
        <div className="col-md-12">
          <input
            type="password"
            className={`form-control ${!passwordValid && 'is-invalid'}`}
            onBlur={handleOnBlur}
            onChange={handleOnInputChange}
            name='password'
            id="inputPassword"
            placeholder="New Password"
            required=""
          />
          {!passwordValid && <div className='invalid-feedback'>{passwordMessage}</div>}

        </div>
        <div className="col-md-12">
          <div className="form-group">
            <input
              type="password"
              className={`form-control ${!confirmPasswordValid && 'is-invalid'}`}
              onBlur={handleOnBlur}
              onChange={handleOnInputChange}
              name='confirmPassword'
              id="inputConfirmPassword"
              placeholder="Confirm Password"
            />
            {!confirmPasswordValid && <div className='invalid-feedback'>{confirmPasswordMessage}</div>}

          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="inputPicture" className="form-label">
              Picture
            </label>
            <input
              type="file"
              className={`form-control ${!pictureValid && 'is-invalid'}`}
              onBlur={handleOnBlur}
              onChange={handleOnInputChange}
              id="inputPicture"
              required=""
              name='picture'
            />
            {!pictureValid && <div className='invalid-feedback'>{pictureMessage}</div>}

          </div>
          {/* Display the profile picture preview */}
          {picture && pictureValid && (
            <div className="mt-3">
              <h6>Profile Picture Preview:</h6>
              <img
              className='sm previewProfile img-fluid'
                src={URL.createObjectURL(picture)}
                alt="Profile Preview"
              />
            </div>
          )}
        </div>
        <div className="col-12">
          <button
            onClick={handleSignupClick}
            type="submit"
            className="btn btn-success w-100 newaccount-btn"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>)
}
