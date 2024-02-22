import React, { useState } from 'react';
import './CommentGen.css';

export default function CommentGen({ user, addComment, setPosts, post, darkMode }) {
    // Combined state for comment information
    const [commentInfo, setCommentInfo] = useState({
        idCounter: 10,
        commentContent: ''
    });

    // Destructuring the state values
    const { idCounter, commentContent } = commentInfo;

    // Function to increment the comment count of the post
    const incCommentCount = () => {
        const updatedPost = { ...post, commentCount: post.commentCount + 1 };
        setPosts((prevPosts) => prevPosts.map((p) => (p.id === post.id ? updatedPost : p)));
    }

    // Handler for adding a new comment
    const handleAddCommentClick = () => {
        if (!commentContent) return; // Return if comment content is empty
        const idComment = idCounter;
        setCommentInfo({
            idCounter: idCounter + 1,
            commentContent: ''
        });
        const newComment = {
            "id": idComment,
            "author": user.email,
            "content": commentContent,
        };
        incCommentCount(); // Increment the comment count
        addComment(newComment); // Call the parent component function to add the comment
    }

    // Handler for updating the content of the comment as the user types
    const handleOnChangeContentComment = (e) => {
        setCommentInfo({
            ...commentInfo,
            commentContent: e.target.value
        });
    }
    return (
        <div className={`${darkMode ? 'darkmode' : ''} card-footer mt-2`}>
            <div className="comment">
                <div className="d-flex">
                    {/* Profile Picture */}
                    <img
                        src={user.image}
                        alt="User Profile"
                        className="rounded-circle me-2 small-profile-img"
                    />
                    {/* Input field for the comment */}
                    <div className="col add-new-comment-box">
                        <div className="d-flex">
                            <textarea
                                className={`form-control add-comment-custom ${darkMode ? 'dark-mode' : ''}`}
                                placeholder="Add a comment..."
                                value={commentContent}
                                onChange={handleOnChangeContentComment}
                            />
                            <button
                                className={`btn ${darkMode ? 'btn-upload-post-dark' : ''}`}
                                onClick={handleAddCommentClick}
                                title="sendButton" // Add a name to the button
                            >
                                <i className="bi bi-send"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
