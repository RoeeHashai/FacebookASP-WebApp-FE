import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../../components/loginForm/LoginForm';

describe('LoginForm Component', () => {
  test('displays error for wrong login credentials', async () => {
    // Arrange
    const { getByPlaceholderText, getByText, container } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Act
    const emailInput = getByPlaceholderText('Email address');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Log In');

    // Enter incorrect login credentials
    fireEvent.change(emailInput, { target: { value: 'invalid.email@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1222' } });

    // Perform login
    await act(async () => {
      fireEvent.click(loginButton);
    });

    // Assert
    await waitFor(() => {
      // Check if the error message is displayed
      const errorMessage = container.querySelector('.invalid-feedback');
      expect(errorMessage.textContent).toBe('Invalid email');
    });
  });

  // You can add more tests for other scenarios as needed
});
