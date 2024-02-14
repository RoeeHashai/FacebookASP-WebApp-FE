import React, { useState } from 'react'
import './PostBody.css'
import PostEditor from '../postEditor/PostEditor'
export default function PostBody({ user, post, postCreator, date, content, image, onEdit, onDelete, darkMode }) {
    const isCurrentUserPostCreator = user.email === postCreator.email;
    // State for managing editing mode
    const [isEditing, setIsEditing] = useState(false);

    // Function to handle the save action
    const handleSave = (editedPost) => {
        // Implement logic to save the edited post
        // Call the onEdit prop with the edited post
        onEdit(editedPost);
        // Exit editing mode
        setIsEditing(false);
    };

    // Function to handle the cancel action
    const handleCancel = () => {
        // Exit editing mode
        setIsEditing(false);
    };

    // Function to handle the edit button click
    const handleEditClick = () => {
        // Enter editing mode
        setIsEditing(true);
    };

    const handleDeleteClick = () => {
        // Pass both the post and postId to the parent component for deletion
        onDelete({ post, postId: post.id });
    };
    return (
        <div className='to-hover'>
            <div className={`card-header ${darkMode ? 'dark-mode-header' : 'bg-white'}`}>
                <div className="d-flex">
                    <img
                        src={postCreator.image}
                        alt="User Profile"
                        className="rounded-circle small-profile-img me-2 "
                    />
                    <div>
                        <h6 className="mb-0">{postCreator.name}</h6>
                        <p className="mb-0 small">Posted on {date}</p>
                    </div>
                    {isCurrentUserPostCreator && (
                        <div className="post-options-btn position-absolute top-0 end-0">
                            <button
                                className={` btn remove-border ${darkMode ? 'dark-mode-icon' : ''}`}
                                type="button"
                                id="postOptionsLink"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi bi-three-dots " />
                            </button>
                            <ul className={`dropdown-menu shadow ${darkMode ? 'dark-mode-dropdown' : ''}`} aria-labelledby="postOptionsLink">
                                <li>
                                    <button className="dropdown-item primary" onClick={handleEditClick}>
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
            </div>
            <div className="card-body pb-0">
                {isEditing ? (
                    // Render the PostEditor when in editing mode
                    <PostEditor post={post} onCancel={handleCancel} onSave={handleSave} />
                ) : (
                    // Render post content when not in editing mode
                    <>
                        <p className='card-text'>{content} </p>
                        {image && (
                            <img src={image} className='post-img img-fluid' alt='' />
                        )}
                    </>
                )}

            </div>
        </div>
    )
}
