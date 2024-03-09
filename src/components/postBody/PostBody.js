import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PostBody.css';
import PostEditor from '../postEditor/PostEditor';

export default function PostBody({ user, post, onEdit, onDelete, darkMode}) {
    // Check if the current user is the creator of the post
    const currentDate = new Date(post.date);
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(currentDate);
    post = {
        ...post,
        date: formattedDate,
    };
    const postCreator = post.author;
    const isUserPostCreator = user._id === postCreator._id;
    // State for managing editing mode
    const [isEditing, setIsEditing] = useState(false);

    const handleSaveOnEditMode = (editedPost) => {
        // Call the onEdit prop with the edited post
        onEdit(editedPost);
        // Exit editing mode
        setIsEditing(false);
    };

    const handleCancelOnEditMode = () => {
        // Exit editing mode
        setIsEditing(false);
    };

    const handleEditClick = () => {
        // Enter editing mode
        setIsEditing(true);
    };

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`/api/users/${user._id}/posts/${post._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                console.log('Post deleted');
                // Pass both the post and postId to the parent component for deletion
                onDelete({ post, pid: post._id });
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={`${darkMode ? 'darkMode' : ''}`}>
            <div className='to-hover'>
                {/* Display post header */}
                <div className={`card-header`}>
                    <div className="d-flex">
                        {/* Display post creator's profile picture and name */}
                        <Link to={`/profile/${postCreator._id}`} className="text-decoration-none">
                            <img
                                src={postCreator.image}
                                alt="User Profile"
                                className="rounded-circle small-profile-img me-2 "
                            />
                        </Link>
                        <div>
                            <h6 className="mb-0">{postCreator.name}</h6>
                            <p className="mb-0 small">Posted on {post.date}</p>
                        </div>
                        {/* Display post options (edit and delete) for the post creator */}
                        {isUserPostCreator && (
                            <div className="post-options-btn position-absolute top-0 end-0">
                                <button
                                    className={` btn remove-border three-dots`}
                                    type="button"
                                    id="postOptionsLink"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-three-dots" />
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
                        <PostEditor user={user} post={post} onCancel={handleCancelOnEditMode} onSave={handleSaveOnEditMode} />
                    ) : (
                        // Render post content when not in editing mode
                        <>
                            <p className='card-text'>{post.content} </p>
                            {/* Display post image if available */}
                            {post.image && (
                                <img src={post.image} className='post-img img-fluid' alt='' />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
