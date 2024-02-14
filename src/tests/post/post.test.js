import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostGen from '../../components/postGen/PostGen';
import { findUser } from '../../components/post/Post';

describe('PostGen Component', () => {
    // Test JS fucntion to test if the find user function finds the user based on the author of the post + Test upload a post and render the screen
    test('findUser should return the correct user', () => {
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
        }];
        const post = {
            id: 11,
            author: 'yatir.gross@gmail.com',
            date: 'Feburay 11, 2024',
            content: 'Test post content',
            image: process.env.PUBLIC_URL + '/index.html',
            likes: 0,
            commentCount: 0,
            comments: [],
        };
        const foundUser = findUser(post.author, users);
        expect(foundUser).toEqual(users[2]);
    });

    test('adds a new post', async () => {
        // Arrange
        const user = {
            name: 'Foo Bar',
            email: 'foobar@example.com',
            image: 'profile-image.jpg',
        };
        const addPostMock = jest.fn();

        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>
                <PostGen user={user} addPost={addPostMock} darkMode={false} />
            </MemoryRouter>
        );

        // Act
        const postInput = getByPlaceholderText(`What's on your mind, ${user.name}?`);
        const postButton = getByText('Post');

        fireEvent.change(postInput, { target: { value: 'Hello World' } });
        fireEvent.click(postButton);

        // Wait for the post to be added
        await waitFor(() => expect(addPostMock).toHaveBeenCalledTimes(1));

        // Assert
        expect(addPostMock).toHaveBeenCalledWith(
            expect.objectContaining({
                author: user.email,
                content: 'Hello World',
            })
        );
    });
});