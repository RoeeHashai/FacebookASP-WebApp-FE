// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn();
import SignupForm from '../../components/signupForm/SignupForm';
import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('SignupForm Component', () => {
  test('input fields update correctly', () => {
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
      userEvent.type(passwordField, 'password123');
      userEvent.type(confirmPasswordField, 'password123');

      // Trigger the file input change with a dummy file
      const file = new File([''], 'image.jpg', { type: 'image/jpeg' });
      fireEvent.change(getByLabelText(/Picture/i), { target: { files: [file] } });
    });

    // Assert
    expect(usernameField.value).toBe('testuser');
    expect(emailField.value).toBe('test@example.com');
    expect(passwordField.value).toBe('password123');
    expect(confirmPasswordField.value).toBe('password123');
  });

  test('displays error messages for empty input fields', async () => {
    // Arrange
    const users = [];
    const onAddUser = jest.fn();
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <SignupForm users={users} onAddUser={onAddUser} />
      </MemoryRouter>
    );

    // Act
    const signupButton = getByText('Sign Up');

    // Wrap the state updates in act
    await act(async () => {
      userEvent.click(signupButton);
    });

    // Assert
    await waitFor(() => {
      // Check if the error messages are displayed for each input field
      expect(queryByText('Email must be in a correct email format (e.g., XXX@XXX.XXX)')).toBeInTheDocument();
      expect(queryByText('Password must be at least 8 characters long and contain both numbers and letters')).toBeInTheDocument();
      expect(queryByText('Must upload a profile picture')).toBeInTheDocument();
    });
  });
});
