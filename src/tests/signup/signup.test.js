// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn();
import SignupForm from '../../components/signupForm/SignupForm';
import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('SignupForm Component', () => {
  test('input fields update correctly', () => { // Test 2/5: JS function test that doesnt change the screen => Test onChangeInput()
    // Arrange
    const users = [];
    const onAddUser = jest.fn();
    const { getByPlaceholderText, getByLabelText } = render(
      <MemoryRouter>
        <SignupForm users={users} onAddUser={onAddUser} />
      </MemoryRouter>
    );

    const usernameField = getByPlaceholderText('Username');
    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('New Password');
    const confirmPasswordField = getByPlaceholderText('Confirm Password');

    act(() => {
      userEvent.type(usernameField, 'testuser');
      userEvent.type(emailField, 'test@example.com');
      userEvent.type(passwordField, 'test123');
      userEvent.type(confirmPasswordField, 'test123');

      // Trigger the file input change with a dummy file
      const file = new File([''], 'image.jpg', { type: 'image/jpeg' });
      fireEvent.change(getByLabelText(/Picture/i), { target: { files: [file] } });
    });

    // Assert
    expect(usernameField.value).toBe('testuser');
    expect(emailField.value).toBe('test@example.com');
    expect(passwordField.value).toBe('test123');
    expect(confirmPasswordField.value).toBe('test123');
  });

  test('displays error messages for invalid input fields', async () => { // Test 3/5: Test that changes the screen
    // Test the isEmailValid() and isPasswordValid() and render the invalid messages to the screen 
    const users = [{
      "id": 1,
      "name": "Roee Hashai",
      "email": "roee.hashai@gmail.com",
      "password": "1111",
      "image": "/profile-pictures/roee_hashai.jpg"
    },
    {
      "id": 2,
      "name": "Talya Rubinstein",
      "email": "talya.rubinstein@gmail.com",
      "password": "2222",
      "image": "/profile-pictures/talya_rubinstein.jpg"
    },
    {
      "id": 3,
      "name": "Yatir Gross",
      "email": "yatir.gross@gmail.com",
      "password": "3333",
      "image": "/profile-pictures/yatir_gross.jpg"
    },
    {
      "id": 4,
      "name": "Natalya Gross",
      "email": "natalya.gross@gmail.com",
      "password": "4444",
      "image": "/profile-pictures/natalya_gross.jpg"
    },];
    const onAddUser = jest.fn();
    const { getByText, queryByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <SignupForm users={users} onAddUser={onAddUser} />
      </MemoryRouter>
    );

    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('New Password');
    const confirmPasswordField = getByPlaceholderText('Confirm Password');

    act(() => {
      userEvent.type(emailField, 'roee.hashai@gmail.com');
      userEvent.type(passwordField, '0000');
      userEvent.type(confirmPasswordField, '1111');
    });

    const signupButton = getByText('Sign Up');

    // Wrap the state updates in act
    await act(async () => {
      userEvent.click(signupButton);
    });

    // Assert
    await waitFor(() => {
      // Check if the error messages are displayed for each input field
      expect(queryByText('This email address is already in use. Please use a different one or log in.')).toBeInTheDocument();
      expect(queryByText('Password must be at least 8 characters long and contain both numbers and letters')).toBeInTheDocument();
      expect(queryByText('Must upload a profile picture')).toBeInTheDocument();
    });
  });
});
