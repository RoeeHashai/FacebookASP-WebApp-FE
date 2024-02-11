import React from 'react'
import './CommentGen.css'

export default function CommentGen({user}) {
    return (
        <div className="card-footer mt-2">
            <div className="comment">
                <div className="d-flex">
                    {/* Profile Picture */}
                    <img
                        src={user.image}
                        alt="User Profile"
                        className="rounded-circle me-2 small-profile-img"
                    />
                    {/* Input field for the comment */}
                    <div className="col add-new-comment-box">
                        <div className="d-flex">
                            <textarea
                                className="form-control add-comment-custom"
                                placeholder="Add a comment..."
                                defaultValue={""}
                            />
                            <button className='btn'><i className="bi bi-send"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
