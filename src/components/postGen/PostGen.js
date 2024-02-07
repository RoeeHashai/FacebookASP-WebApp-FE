import React, { useEffect, useState } from 'react'
import './PostGen.css'
import { useNavigate } from 'react-router-dom'


export default function PostGen({ user, addPost }) {
    const [idCounter, setIdCounter] = useState(10)

    // state variables of post form
    const [postContent, setPostContent] = useState('')
    const [image, setImage] = useState(null)

    // validation status for image
    const [imageValid, setImageValid] = useState(true)

    // validation message for image
    const [imageMessage, setImageMessage] = useState('')

    const increamentIdCount = () => {
        setIdCounter(idCounter + 1)
    }
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

    const handlePostClick = (e) => {
        e.preventDefault()
        const isImageValidValue = isImageValid(image)
        setImageValid(isImageValidValue)
        if (imageValid) {
            const currentDate = new Date();
            const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(currentDate);
            const idPost = idCounter
            increamentIdCount()
            const newPost = {
                "id": idPost, 
                "author": user.email, 
                "date": formattedDate, 
                "content": postContent,
                "image": image && URL.createObjectURL(image), // Use createObjectURL to get a URL for the image
                "likes": 0, 
                "commentCount": 0, 
                "comments":[]
            }
            addPost(newPost)
        }


    }
    const setPostText = (e) => {
        setPostContent(e.target.value)
    }
    const setPostImage = (e) => {
        setImage(e.target.files[0])
        setImageValid(true)
        setImageMessage('')
    }
    const isImageValid = (image) => {
        if (image) {
            const acceptedFormats = ['image/jpeg', 'image/png'];

            if (!image.type || !acceptedFormats.includes(image.type)) {
                setImageMessage('Please upload a valid JPEG or PNG image');
                return false;
            }
        }
        return true;
    };
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
                            onChange={setPostImage}
                        />
                        {/* Input field for the comment */}
                        <textarea
                            className="form-control mb-2"
                            placeholder={`What's on your mind, ${user.name}?`}
                            defaultValue={""}
                            onChange={setPostText}
                        />
                    </div>

                    <input
                        type="file"
                        className={`form-control ${!imageValid && 'is-invalid'}`}
                        onChange={setPostImage}
                        id="postImage"
                        required=""
                        name='picture'
                    />
                    {!imageValid && <div className='invalid-feedback'>{imageMessage}</div>}

                    {/* Display the profile picture preview */}
                </div>
                <div className="card-footer post-footer add-new-comment-box">
                    <div className="btn-group w-100 ms-1">
                        <button type="button" className="btn btn-light" onClick={handlePostClick}>
                            <i className="bi bi-file-post pe-1" />
                            Post
                        </button>
                    </div>
                </div>
            </div></>)
}
