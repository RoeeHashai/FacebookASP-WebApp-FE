import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Feed from '../../components/feed/Feed';

describe('Feed Component', () => {
  test('adds a post to the feed', async () => {
    // Arrange
    const testData = [
      {
        "id": 1,
        "name": "Roee Hashai",
        "email": "roee.hashai@gmail.com",
        "password": "1234",
        "image": "/profile-pictures/roee_hashai.jpeg"
      }
    ];

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Feed users={testData} user={testData[0]} />
      </MemoryRouter>
    );

    // Act
    const postInput = getByPlaceholderText("What's on your mind, Roee Hashai?");
    const postButton = getByText('Post');

    // Enter post content
    fireEvent.change(postInput, { target: { value: 'This is a test post' } });

    // Perform adding a post
    await act(async () => {
      fireEvent.click(postButton);
    });

    // Assert
    // Check if the new post is added to the feed
    const addedPost = getByText('This is a test post');
    expect(addedPost).toBeInTheDocument();
  });
  

  // You can add more tests for other scenarios as needed
});
