import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LikeCommentShareBtn from '../../components/like-comment-share-btn/LikeCommentShareBtn';
describe('LikeCommentShareBtn Component', () => {
  it('increments the like count by 1 when the "Like" button is clicked', () => {
    // Arrange
    const post = {
      id: 1,
      likes: 5,
      commentCount: 3,
    };

    const setPosts = jest.fn();

    // Mock the setPosts function to handle its behavior
    setPosts.mockImplementation((updateFunction) => {
      // Call the update function with the initial post data
      const updatedPost = updateFunction(post);
      // Ensure the like count is incremented by 1
      expect(updatedPost.likes).toEqual(post.likes + 1);
      // Return the updated post data
      return [updatedPost];
    });

    const { getByText } = render(
      <LikeCommentShareBtn
        post={post}
        liked={false}
        setLiked={() => {}}
        setPosts={setPosts}
        darkMode={false}
      />
    );

    // Act
    const likeButton = getByText("Like"); // Using a case-insensitive regex to match 'Like'
    fireEvent.click(likeButton);

    // Assert
    // Check if setPosts is called with the expected arguments
    expect(setPosts).toHaveBeenCalled();
  });

  // You can add more tests for other scenarios as needed
});
