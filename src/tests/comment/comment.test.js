// import React from 'react';
// import { render, fireEvent, getByTitle } from '@testing-library/react';
// import CommentGen from '../../components/commentGen/CommentGen';
// describe('CommentGen Component', () => {
//     const user = {
//       email: 'user@example.com',
//       image: '/path/to/profile/image.jpg',
//     };
  
//     const post = {
//       id: 1,
//       author: 'user@example.com',
//       date: '2024-02-11',
//       content: 'Test post content',
//       image: null,
//       likes: 0,
//       commentCount: 0,
//       comments: [],
//     };
  
//     const setPosts = jest.fn();
//     const addComment = jest.fn();
  
//     it('increments the comment count and adds a comment when "Send" button is clicked', () => {
//       const { getByPlaceholderText, getByText } = render(
//         <CommentGen user={user} addComment={addComment} setPosts={setPosts} post={post} darkMode={false} />
//       );
  
//       // Simulate adding a comment
//       const commentInput = getByPlaceholderText('Add a comment...');
//       fireEvent.change(commentInput, { target: { value: 'Test comment' } });
  
//       const sendButton = getByTitle('sendButton'); // Use a case-insensitive regex to match 'Send'
//       fireEvent.click(sendButton);
  
//       // Expect the incCommentCount function to be called and the comment count to be incremented
//       expect(setPosts).toHaveBeenCalledWith(expect.any(Function));
//       expect(setPosts.mock.calls[0][0](post).commentCount).toEqual(post.commentCount + 1);
  
//       // Expect the addComment function to be called with the new comment
//       expect(addComment).toHaveBeenCalledWith({
//         id: expect.any(Number),
//         author: user.email,
//         content: 'Test comment',
//       });
//     });
//   });
  
