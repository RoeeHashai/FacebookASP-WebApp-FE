import React, { useState } from 'react';
import './PostBody.css';
import PostEditor from '../postEditor/PostEditor';

export default function PostBody({ user, post, postCreator, date, content, image, onEdit, onDelete, darkMode }) {
    // Check if the current user is the creator of the post
    const isCurrentUserPostCreator = user.email === postCreator.email;

    // State for managing editing mode
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (editedPost) => {
        // Call the onEdit prop with the edited post
        onEdit(editedPost);
        // Exit editing mode
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Exit editing mode
        setIsEditing(false);
    };

    const handleEditClick = () => {
        // Enter editing mode
        setIsEditing(true);
    };

    const handleDeleteClick = () => {
        // Pass both the post and postId to the parent component for deletion
        onDelete({ post, postId: post.id });
    };

    return (
        <div className={`${darkMode ? 'darkMode' : ''}`}>
            <div className='to-hover'>
                {/* Display post header */}
                <div className={`card-header`}>
                    <div className="d-flex">
                        {/* Display post creator's profile picture and name */}
                        <img
                            src={postCreator.image}
                            alt="User Profile"
                            className="rounded-circle small-profile-img me-2 "
                        />
                        <div>
                            <h6 className="mb-0">{postCreator.name}</h6>
                            <p className="mb-0 small">Posted on {date}</p>
                        </div>
                        {/* Display post options (edit and delete) for the post creator */}
                        {isCurrentUserPostCreator && (
                            <div className="post-options-btn position-absolute top-0 end-0">
                                <button
                                    className={` btn remove-border three-dots`}
                                    type="button"
                                    id="postOptionsLink"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-three-dots " />
                                </button>
                                {/* Dropdown menu for post options, will be blocked if the user isnt the creator of the post */}
                                <ul className={`dropdown-menu shadow ${darkMode ? 'dark-mode-dropdown' : ''}`} aria-labelledby="postOptionsLink">
                                    <li>
                                        {/* Edit option */}
                                        <button className="dropdown-item primary" onClick={handleEditClick}>
                                            <i className="bi bi-pen pe-1"></i>Edit
                                        </button>
                                    </li>
                                    <li>
                                        {/* Delete option */}
                                        <button className="dropdown-item" onClick={handleDeleteClick}>
                                            <i className="bi bi-trash pe-1"></i>Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Display post content body */}
                <div className="card-body pb-0">
                    {/* Conditionally render PostEditor or post content based on editing mode */}
                    {isEditing ? (
                        // Render the PostEditor when in editing mode
                        <PostEditor post={post} onCancel={handleCancel} onSave={handleSave} />
                    ) : (
                        // Render post content when not in editing mode
                        <>
                            <p className='card-text'>{content} </p>
                            {/* Display post image if available */}
                            {image && (
                                <img src={image} className='post-img img-fluid' alt='' />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
