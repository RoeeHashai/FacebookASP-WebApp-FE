import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './PostBody.css';
import PostEditor from '../postEditor/PostEditor';
import { DarkModeContext } from '../context/DarkModeContext';

export default function PostBody({ user, post, onEdit, onDelete}) {
    const { darkMode } = useContext(DarkModeContext);
    const [isEditing, setIsEditing] = useState(false);

    // Format the date to be displayed in the post
    const currentDate = new Date(post.date);
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(currentDate);
    post = {
        ...post,
        date: formattedDate,
    };

    // Get the post creator in order to display their name and profile picture to give them premeissions to edit and delete the post
    const postCreator = post.author;
    const isUserPostCreator = user._id === postCreator._id;

    const handleSaveOnEditMode = (editedPost) => {
        onEdit(editedPost);
        setIsEditing(false);
    };

    const handleCancelOnEditMode = () => {
        setIsEditing(false);
    };

    const handleEditClick = () => {
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
            if (response.ok) { // If the response is okay, delete the post and update the post list by calling the onDelete function
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
                <div className={`card-header`}>
                    <div className="d-flex">
                        <Link to={`/profile/${postCreator._id}`} className="text-decoration-none">
                            <img
                                src={postCreator.image}
                                alt="User Profile"
                                className="rounded-circle small-profile-img me-2 "/>
                        </Link>
                        <div>
                            <h6 className="mb-0">{postCreator.name}</h6>
                            <p className="mb-0 small">Posted on {post.date}</p>
                        </div>
                        {/* Display post options (edit and delete) only to the post creator */}
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
                                <ul className={`dropdown-menu shadow ${darkMode ? 'dark-mode-dropdown' : ''}`} aria-labelledby="postOptionsLink">
                                    <li>
                                        <button className="dropdown-item primary" onClick={handleEditClick}>
                                            <i className="bi bi-pen pe-1"></i>Edit
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={handleDeleteClick}>
                                            <i className="bi bi-trash pe-1"></i>Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="card-body pb-0">
                    {/* Conditionally render PostEditor or post content based on editing mode */}
                    {isEditing ? (
                        <PostEditor user={user} post={post} onCancel={handleCancelOnEditMode} onSave={handleSaveOnEditMode} />
                    ) : (
                        <>
                            <p className='card-text'>{post.content} </p>
                            {/* Display post image if the post contains a image */}
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
