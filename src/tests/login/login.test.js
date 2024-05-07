// import React from 'react';
// import { render, act, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { MemoryRouter, useNavigate } from 'react-router-dom';
// import LoginForm from '../../components/loginForm/LoginForm';

// jest.mock('react-router-dom', () => {
//     const originalModule = jest.requireActual('react-router-dom');
//     return {
//         ...originalModule,
//         useNavigate: jest.fn(),
//     };
// });

// describe('LoginForm Component', () => {
//     const users = [{
//         "id": 1,
//         "name": "Roee Hashai",
//         "email": "roee.hashai@gmail.com",
//         "password": "1111",
//         "image": "/profile-pictures/roee_hashai.jpg"
//     },
//     {
//         "id": 2,
//         "name": "Talya Rubinstein",
//         "email": "talya.rubinstein@gmail.com",
//         "password": "2222",
//         "image": "/profile-pictures/talya_rubinstein.jpg"
//     },
//     {
//         "id": 3,
//         "name": "Yatir Gross",
//         "email": "yatir.gross@gmail.com",
//         "password": "3333",
//         "image": "/profile-pictures/yatir_gross.jpg"
//     },
//     {
//         "id": 4,
//         "name": "Natalya Gross",
//         "email": "natalya.gross@gmail.com",
//         "password": "4444",
//         "image": "/profile-pictures/natalya_gross.jpg"
//     },];
    
//     test('logs in and navigates to feed', async () => { // Test 4/5: changes the screen
//         // Test that logs in with a signup user and check if the user is navigated to the feed page

//         // Arrange
//         const addConnectedUser = jest.fn();
//         const navigateMock = jest.fn();
//         useNavigate.mockReturnValue(navigateMock);

//         const { getByText, getByPlaceholderText } = render(
//             <MemoryRouter>
//                 <LoginForm users={users} addConnectedUser={addConnectedUser} />
//             </MemoryRouter>
//         );

//         const emailField = getByPlaceholderText('Email address');
//         const passwordField = getByPlaceholderText('Password');
//         const loginButton = getByText('Log In');

//         // Act
//         await act(async () => {
//             userEvent.type(emailField, 'roee.hashai@gmail.com');
//             userEvent.type(passwordField, '1111');
//             userEvent.click(loginButton);
//         });

//         // Assert
//         // Check if the navigation moved to the feed page
//         await waitFor(() => {
//             expect(addConnectedUser).toHaveBeenCalledWith(users[0]);
//             expect(navigateMock).toHaveBeenCalledWith('/feed');
//             expect(navigateMock).toHaveBeenCalledTimes(1);
//         });
//     });
// });
