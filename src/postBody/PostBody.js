import React from 'react'
import './PostBody.css'

export default function PostBody({ postCreator, date, content, image, likes, commentCount }) {
    return (
        <div className='to-hover'>
            <div className="card-header bg-white">
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
                    <div className="post-options-btn position-absolute top-0 end-0">
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
            <div className="card-body pb-0">
                <p className="card-text">{content} </p>
                <img
                    src={image}
                    className="post-img img-fluid"
                    alt=''
                />
                <div className="mt-2">
                    <span className="me-2">
                        <i className="bi bi-hand-thumbs-up" /> {likes} Likes
                    </span>
                    <span>
                        <i className="bi bi-chat" /> {commentCount} Comments
                    </span>
                </div>
                <div className="card-footer post-footer">

                    <div className="btn-group w-100 mt-1 mb-1">
                        <button type="button" className="btn btn-light">
                            <i className="bi bi-hand-thumbs-up pe-1" />
                            Like
                        </button>
                        <button type="button" className="btn btn-light">
                            <i className="bi bi-chat pe-1" />
                            Comment
                        </button>
                        <button type="button" className="btn btn-light">
                            <i className="bi bi-share pe-1" />
                            Share
                        </button>
                    </div>
                    <div className="line-under-buttons"></div>

                </div>
            </div>
        </div>
    )
}
