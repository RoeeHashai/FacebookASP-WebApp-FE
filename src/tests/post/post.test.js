import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Post, { findUser } from '../../components/post/Post'; // Import the findUser function

describe('Post Component', () => {
    const users = [
      {
        email: 'user1@example.com',
        name: 'User 1',
      },
      {
        email: 'user2@example.com',
        name: 'User 2',
      },
    ];
  
    const post = {
      id: 1,
      author: 'user1@example.com',
      date: '2024-02-11',
      content: 'Test post content',
      image: null,
      likes: 0,
      commentCount: 0,
      comments: [],
    };
  
    const setPosts = jest.fn();
    const darkMode = false;
  
    test('findUser should return the correct user', () => {
      const foundUser = findUser(post.author, users);
  
      expect(foundUser).toEqual(users[0]);
    });
  
    test('renders the Post component', () => {
      const { container, getByText } = render(
        <BrowserRouter>
          <Post users={users} user={users[0]} post={post} setPosts={setPosts} darkMode={darkMode} />
        </BrowserRouter>
      );
  
      // Assert that the rendered post content is present
      const postContent = getByText('Test post content');
      expect(postContent).toBeInTheDocument();
    });
  });
