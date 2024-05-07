import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignupForm.css'

export default function SignupForm({ }) {
  const navigate = useNavigate()

  // state variables of the sign up form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [picture, setPicture] = useState(null)

  // validation status for each field
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true)
  const [pictureValid, setPictureValid] = useState(true)

  // Error messages
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('')
  const [pictureMessage, setPictureMessage] = useState('')

  const [emailExist, setEmailExist] = useState(false);
  const [base64Picture, setBase64Picture] = useState('');

  const handleOnInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'username') {
      setName(value)
    }
    else if (name === 'email') {
      const isEmailValidValue = isEmailValid(value)
      setEmail(value)
      setEmailValid(isEmailValidValue)
      setEmailExist(false);
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
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64Picture(reader.result);
        };
        reader.readAsDataURL(file);
        setPicture(file);
        const isPictureValidValue = isPictureValid(file);
        setPictureValid(isPictureValidValue);
      } else {
        setBase64Picture('');
        setPicture(null);
      }
    }
  }

  const handleOnBlur = (e) => {
    const { name } = e.target
    if (name === 'email') {
      setEmailMessage('')
    }
    else if (name === 'password') {
      setPasswordMessage('')
    }
    else if (name === 'confirmPassword') {
      setConfirmPasswordMessage('')
    }
    else if (name === 'picture') {
      setPictureMessage('')
    }

  }

  const handleSignupClick = async (e) => {
    e.preventDefault();

    // Check if Signup was done valid or not, don't proceed to the login page if not valid
    if (!validateForm()) {
      return;
    }

    // Create a new user to add to the users list
    const newUser = {
      name: name,
      email,
      password,
      image: base64Picture,
    };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        const data = await response.json();;

        // Clear the form state
        setName('');
        setEmail('');
        setPassword('');
        setPicture(null);
        setBase64Picture('');

        // Navigate to the login page after successfully adding a new user
        navigate('/');
      } else {
        // Handle error (display error message or log it)
        if (response.status === 400) {
          setEmailMessage('This email address is already in use. Please use a different one or log in.');
          setEmailValid(false);
          setEmailExist(true);
          const data = await response.json();
        }
      }
    } catch (error) {
      // Handle other errors (display error message or log it)
      console.error('Error creating user:', error.message);
    }
  };

  const validateForm = () => {
    // Check if the email is valid if not display error
    const isEmailValidValue = isEmailValid(email);
    setEmailValid(isEmailValidValue);

    // Check if new password is valid if not display error
    const isPasswordValidValue = isPasswordValid(password);
    setPasswordValid(isPasswordValidValue);

    const isConfirmPasswordValidValue = isConfirmPasswordValid(confirmPassword);
    setConfirmPasswordValid(isConfirmPasswordValidValue);

    // Check if picture is valid if provided
    const isPictureValidValue = isPictureValid(picture);
    setPictureValid(isPictureValidValue);

    if (name === '' || email === '' || password === '' || confirmPassword === '' || picture == null) {
      return false;
    }
    return emailValid && passwordValid && confirmPasswordValid && pictureValid;
  };

  const isEmailValid = (email) => {
    if (emailExist) {
      return false;
    }

    // email pattern validation - using regex
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isLegalEmail = pattern.test(email)
    if (!isLegalEmail) {
      setEmailMessage('Email must be in a correct email format (e.g., XXX@XXX.XXX)')
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

    return true;
  };

  return (
    <div className="card shadow rounded p-3">
      <Link to='/'>
        <button className='btn'>
          <i className="bi bi-arrow-left mb-2"></i>
        </button>
      </Link>
      <form className="row g-3">
        <div className="col-md-12">
          <input
            type="text"
            className={`form-control`}
            onBlur={handleOnBlur}
            onChange={handleOnInputChange}
            id="inputUsername"
            name='username'
            placeholder="Username"
            required=""
          />
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
          {base64Picture && (
            <div className="mt-3">
              <h6>Profile Picture Preview:</h6>
              <img
                className='sm previewProfile img-fluid'
                src={base64Picture}
                alt="Profile Preview"
              />
            </div>
          )}
        </div>
        <div className="col-12">
          <button
            onClick={handleSignupClick}
            type="button"
            className="btn btn-success w-100 newaccount-btn"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>)
}
