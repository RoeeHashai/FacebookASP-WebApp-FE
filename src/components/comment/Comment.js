import React, { useState } from 'react';
import './Comment.css';
import CommentEdit from '../commentEdit/CommentEdit';

export default function Comment({ user, commentCreator, comment, onEdit, onDelete, darkMode }) {
    const isCurrentUserCommentCreator = user.email === commentCreator.email;
    // State to manage whether the comment is in editing mode
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onDelete(comment.id);
    };

    return (
        <div className={`${darkMode ? 'darkmode' : ''}`}>
            <div className="comment" id={comment.id}>
                <div className="d-flex">
                    {/* User profile image */}
                    <img
                        src={commentCreator.image}
                        alt="User Profile"
                        className="rounded-circle me-2 small-profile-img"
                    />
                    {/* Comment details section */}
                    <div className={`comment-details ${darkMode ? 'dark-mode-comment' : 'light-mode-comment'} ps-2 position-relative`}>
                        <div>
                            {/* Displaying user name */}
                            <h6 className="mb-0">{commentCreator.name}</h6>
                            {/* Checking if the comment is in editing mode */}
                            {isEditing ? (
                                // If editing, render the CommentEdit component
                                <CommentEdit
                                    comment={comment}
                                    onEdit={(editedComment) => {
                                        onEdit(editedComment);
                                        setIsEditing(false);
                                    }}
                                    onCancel={handleCancelEdit}
                                />
                            ) : (
                                // If not editing, display the comment content
                                <div>
                                    <p className="mb-0 breakWord" id="commentText1">{comment.content}</p>
                                    {/* Options for the comment (Edit and Delete) */}
                                    {isCurrentUserCommentCreator && (
                                        <div className={`comment-options-btn position-absolute top-0 end-0 ${darkMode ? 'dark-mode-options-btn' : ''}`}>
                                            <button
                                                className={`three-dots btn remove-border`}
                                                type="button"
                                                id="postOptionsLink"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <i className="bi bi-three-dots" />
                                            </button>
                                            {/* Dropdown menu for comment options */}
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
