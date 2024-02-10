import React, { useState } from 'react'
import './Comment.css'
import CommentEdit from '../commentEdit/CommentEdit';

export default function Comment({ user, commentCreator, comment, onEdit, onDelete, darkMode }) {
    const isCurrentUserCommentCreator = user.email === commentCreator.email;
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        // Call the onDelete callback with the comment id for deletion
        onDelete(comment.id);
    };

    return (
        <div className="comment" id={comment.id}>
            <div className="d-flex">
                {/* Profile Picture */}
                <img
                    src={commentCreator.image}
                    alt="User Profile"
                    className="rounded-circle me-2 small-profile-img"
                />
                {/* Comment Details */}
                <div className={`comment-details ${darkMode ? 'dark-mode-comment' : ''} ps-2 position-relative`}>
                    {/* User Name and Comment Text */}
                    <div>
                        <h6 className="mb-0">{commentCreator.name}</h6>
                        {isEditing ? (
                            <CommentEdit
                                comment={comment}
                                onEdit={(editedComment) => {
                                    // Call the onEdit callback with the edited comment
                                    onEdit(editedComment);
                                    setIsEditing(false);
                                }}
                                onCancel={handleCancelEdit}
                            />
                        ) : (
                            <div>
                                <p className="mb-0 breakWord" id="commentText1">{comment.content}</p>
                                {isCurrentUserCommentCreator && (
                                    <div className={`comment-options-btn position-absolute top-0 end-0 ${darkMode ? 'dark-mode-options-btn' : ''}`}>
                                        <button
                                            className={`text-${darkMode ? 'light' : 'dark'} btn remove-border`} /* Adjust text color based on dark mode */
                                            type="button"
                                            id="postOptionsLink"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="bi bi-three-dots" />
                                        </button>
                                        <ul className={`dropdown-menu shadow ${darkMode ? 'dark-mode-dropdown' : ''}`} aria-labelledby="postOptionsLink">
                                            <li>
                                                <button className="dropdown-item" onClick={handleEditClick}>
                                                    Edit
                                                </button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item" onClick={handleDeleteClick}>
                                                    Delete
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
        </div>)
}