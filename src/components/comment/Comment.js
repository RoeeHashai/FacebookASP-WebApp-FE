import React, { useState, useContext } from 'react';
import CommentEdit from '../commentEdit/CommentEdit';
import { DarkModeContext } from '../context/DarkModeContext';
import './Comment.css';

export default function Comment({ user, commentCreator, comment, onEdit, onDelete }) {
    
    const isCurrentUserCommentCreator = user._id === commentCreator._id;
    const [isEditing, setIsEditing] = useState(false);
    const { darkMode, _ } = useContext(DarkModeContext);
    
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
    };
    const handleDeleteClick = () => {
        onDelete(comment._id);
    };

    return (
        <div className={`${darkMode ? 'darkmode' : ''}`}>
            <div className="comment" id={comment._id}>
                <div className="d-flex">
                    {/* Display the comment creator's profile image */}
                    <img
                        src={commentCreator.image}
                        alt="User Profile"
                        className="rounded-circle me-2 small-profile-img"
                    />
                    {/* Container for comment details */}
                    <div className={`comment-details ${darkMode ? 'dark-mode-comment' : 'light-mode-comment'} ps-2 position-relative`}>
                        <div>
                            {/* Display the comment creator's name */}
                            <h6 className="mb-0">{commentCreator.name}</h6>
                            {isEditing ? (
                                // If in editing mode, render the CommentEdit component for editing comment content
                                <CommentEdit
                                    comment={comment}
                                    onEdit={(editedComment) => {
                                        onEdit(editedComment);
                                        setIsEditing(false);
                                    }}
                                    onCancel={handleCancelEdit}
                                />
                            ) : (
                                // Display the comment content
                                <div>
                                    <p className="mb-0 breakWord" id="commentText1">{comment.content}</p>
                                    {/* Show edit and delete options if the current user is the comment creator */}
                                    {isCurrentUserCommentCreator && (
                                        <div className={`comment-options-btn position-absolute top-0 end-0 ${darkMode ? 'dark-mode-options-btn' : ''}`}>
                                            <button
                                                className={`three-dots btn remove-border`}
                                                type="button"
                                                id="postOptionsLink"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                {/* Icon for displaying comment options */}
                                                <i className="bi bi-three-dots" />
                                            </button>
                                            {/* Dropdown menu for editing or deleting the comment */}
                                            <ul className={`dropdown-menu shadow ${darkMode ? 'dark-mode-dropdown' : ''}`} aria-labelledby="postOptionsLink">
                                                <li>
                                                    <button className="dropdown-item" onClick={handleEditClick}>
                                                        <i className="bi bi-pen me-1"></i>Edit
                                                    </button>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item" onClick={handleDeleteClick}>
                                                        <i className="bi bi-trash me-1"></i>Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
