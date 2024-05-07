import React, { useState, useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import './CommentGen.css';

export default function CommentGen({ user, addComment }) {
    const [commentContent, setCommentContent] = useState('');
    const { darkMode } = useContext(DarkModeContext);

    const handleAddCommentClick = () => {
        // Adds a new comment if content is not empty
        if (!commentContent) return;
        addComment({ content: commentContent });
        setCommentContent('');
    };

    // Updates state with the current value of the text area
    const handleOnChange = (e) => setCommentContent(e.target.value);

    return (
        <div className={`${darkMode ? 'darkmode' : ''} card-footer mt-2`}>
            <div className="comment">
                <div className="d-flex">
                    <img
                        src={user.image}
                        alt="User Profile"
                        className="rounded-circle me-2 small-profile-img"
                    />
                    <div className="col add-new-comment-box">
                        <div className="d-flex">
                            <textarea
                                className={`form-control add-comment-custom ${darkMode ? 'dark-mode' : ''}`}
                                placeholder="Add a comment..."
                                value={commentContent}
                                onChange={handleOnChange}
                            />
                            <button
                                className={`btn ${darkMode ? 'btn-upload-post-dark' : ''}`}
                                onClick={handleAddCommentClick}
                                title="sendButton"
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
