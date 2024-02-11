import React from 'react'
import './Comment.css'

export default function Comment({ user, comment }) {
    return (
            <div className="comment" id={comment.id}>
                <div className="d-flex">
                    {/* Profile Picture */}
                    <img
                        src={user.image}
                        alt="User Profile"
                        className="rounded-circle me-2 small-profile-img"
                    />
                    {/* Comment Details */}
                    <div className="comment-details bg-light ps-2 position-relative">
                        {/* User Name and Comment Text */}
                        <div>
                            <h6 className="mb-0">{user.name}</h6>
                            <p
                                className="mb-0 breakWord"
                            />
                            <span id="commentText1">{comment.content}</span>
                            <div className="comment-options-btn position-absolute top-0 end-0">
                                <button
                                    className="text-dark btn remove-border"
                                    type="button"
                                    id="postOptionsLink"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-three-dots" />
                                </button>
                                <ul className="dropdown-menu shadow" aria-labelledby="postOptionsLink">
                                    <li>
                                        <button className="dropdown-item">
                                            Edit
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item">
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        </div>)
}
