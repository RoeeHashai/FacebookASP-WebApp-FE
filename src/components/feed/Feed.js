import React from 'react'
import facebooklogo from '../res/Facebook_Logo_2023-1.png'
import myprofilepic from '../res/roeehashai_profile.jpeg'
import mypostpic from '../res/1677057215865.png'
import { Link } from 'react-router-dom'
import './Feed.css'

export default function Feed() {
    return (
<>
            <nav className="navbar sticky-top ">
                <div className="container justify-content-center">
                    <Link to='/feed'>
                        <img
                            src={facebooklogo}
                            alt="Facebook logo"
                            className="d-inline-block small-profile-img"
                        />
                        </Link>
                            <div className="searchbar ms-2">
                                <input
                                    className="form-control rounded-pill"
                                    type="search"
                                    placeholder="Search Facebook"
                                    aria-label="Search"
                                />
                            </div>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 d-none d-md-block">
                                <ul className="list-group">
                                    <li className="list-group-item d-flex list-to-hover align-items-center">
                                        <i className="bi bi-people-fill ms-5" />
                                        <span className="w-100 m-1 ms-3">Friends</span>
                                    </li>
                                    <li className="list-group-item d-flex list-to-hover align-items-center">
                                        <i className="bi bi-shop ms-5" />
                                        <span className="w-100 m-1 ms-3">Marketplace</span>
                                    </li>
                                    <li className="list-group-item d-flex list-to-hover align-items-center">
                                        <i className="bi bi-messenger ms-5" />
                                        <span className="w-100 m-1 ms-3">Messenger</span>
                                    </li>
                                    <li className="list-group-item d-flex list-to-hover align-items-center">
                                        <i className="bi bi-newspaper ms-5" />
                                        <span className="w-100 m-1 ms-3">Feeds</span>
                                    </li>
                                    <li className="list-group-item ms-5">
                                        <div className="form-check form-switch dark-mode-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="toggleSwitch"
                                            />
                                            <label className="form-check-label" htmlFor="toggleSwitch" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col">
                                {/* add new comment */}
                                <div className="card m-2">
                                    <div className="card-body m-1">
                                        <div className="d-flex add-new-comment-box">
                                            {/* Profile Picture */}
                                            <img
                                                src={myprofilepic}
                                                alt="User Profile"
                                                className="rounded-circle small-profile-img me-2 upload-post"
                                            />
                                            {/* Input field for the comment */}
                                            <textarea
                                                className="form-control "
                                                placeholder="Add a comment..."
                                                defaultValue={""}
                                            />
                                        </div>
                                        {/* Input for image upload */}
                                        <input
                                            type="file"
                                            className="form-control mt-3 cimageuploding"
                                            accept="image/*"
                                        />
                                        {/* Preview for the uploaded image */}
                                        <img
                                            id="imagePreview"
                                            className="img-fluid"
                                            style={{ display: "none" }}
                                            alt="Image Preview"
                                        />
                                    </div>
                                    <div className="card-footer post-footer add-new-comment-box">
                                        <div className="btn-group w-100 ms-1">
                                            <button type="button" className="btn btn-light">
                                                <i className="bi bi-file-post pe-1" />
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* card-post */}
                                <div className="card post-card m-2">
                                    <div className="card-header bg-white">
                                        <div className="d-flex">
                                            <img
                                                src={myprofilepic}
                                                alt="User Profile"
                                                className="rounded-circle small-profile-img me-2 "
                                            />
                                            <div>
                                                <h6 className="mb-0">Roee Hashai</h6>
                                                <p className="mb-0 small">Posted on January 1, 2024</p>
                                            </div>
                                            <div className="post-options position-absolute top-0 end-0">
                                                <a
                                                    className="text-dark"
                                                    href="#"
                                                    id="postOptionsLink"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i className="bi bi-three-dots m-3 fs-5" />
                                                </a>
                                                <ul
                                                    className="dropdown-menu shadow"
                                                    aria-labelledby="postOptionsLink"
                                                >
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Delete
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body pb-0">
                                        <p className="card-text">
                                            Hello There and welcome to the amazing Facebook!
                                        </p>
                                        <img
                                            src={mypostpic}
                                            alt="Post Image"
                                            className="post-img img-fluid"
                                        />
                                        <div className="mt-2">
                                            <span className="me-2">
                                                <i className="bi bi-hand-thumbs-up" /> 42 Likes
                                            </span>
                                            <span>
                                                <i className="bi bi-chat" /> 10 Comments
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
                                        </div>
                                        <div className="card-footer">
                                            <div className="comment" id="comment1">
                                                <div className="d-flex">
                                                    {/* Profile Picture */}
                                                    <img
                                                        src={myprofilepic}
                                                        alt="User Profile"
                                                        className="rounded-circle me-2 small-profile-img"
                                                    />
                                                    {/* Comment Details */}
                                                    <div className="comment-details bg-light ps-2 position-relative">
                                                        {/* User Name and Comment Text */}
                                                        <div>
                                                            <h6 className="mb-0">Roee Hasahi</h6>
                                                            <p
                                                                className="mb-0"
                                                                style={{ overflowWrap: "break-word" }}
                                                            />
                                                            <span id="commentText1">Looking good! :)</span>
                                                            <div className="comment-options position-absolute top-0 end-0">
                                                                <a
                                                                    className="text-dark"
                                                                    href="#"
                                                                    id="dropdownMenuLink"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="bi bi-three-dots-vertical p-1 pt-1 fs-5" />
                                                                </a>
                                                                <ul
                                                                    className="dropdown-menu shadow"
                                                                    aria-labelledby="dropdownMenuLink"
                                                                >
                                                                    <li>
                                                                        <a className="dropdown-item" href="#">
                                                                            Edit
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a className="dropdown-item" href="#">
                                                                            Delete
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="comment">
                                                <div className="d-flex">
                                                    {/* Profile Picture */}
                                                    <img
                                                        src={myprofilepic}
                                                        alt="User Profile"
                                                        className="rounded-circle me-2 small-profile-img"
                                                    />
                                                    {/* Input field for the comment */}
                                                    <div className="col add-new-comment-box">
                                                        <textarea
                                                            className="form-control add-comment-custom"
                                                            placeholder="Add a comment..."
                                                            defaultValue={""}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-none d-md-block" />
                        </div>
                    </div>
                </>  )
}