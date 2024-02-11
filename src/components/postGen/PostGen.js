import React, { useEffect } from 'react'
import './PostGen.css'
import {useNavigate} from 'react-router-dom'


export default function PostGen({user, addPost}) {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if user is falsy (null or undefined)
      if (!user) {
        // Navigate to the login page if not logged in
        navigate('/login');
      }
    }, [user, navigate]);
  
    // If user is not defined, return null to avoid rendering the component
    if (!user) {
      return null;
    }
    return (
        <>
            {/* add new comment */}
            <div className="card m-2">
                <div className="card-body m-1">
                    <div className="d-flex add-new-comment-box">
                        {/* Profile Picture */}
                        <img
                            src={user.image}
                            alt="User Profile"
                            className="rounded-circle small-profile-img me-2 upload-post"
                        />
                        {/* Input field for the comment */}
                        <textarea
                            className="form-control "
                            placeholder={`What's on your mind, ${user.name}?`}
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
                        alt=""
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
            </div></>)
}
