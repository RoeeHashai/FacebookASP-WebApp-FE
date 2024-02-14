import React, { useEffect, useState } from 'react';
import './PostGen.css';
import { useNavigate } from 'react-router-dom';

export default function PostGen({ user, addPost, darkMode }) {
    // State for managing post data
    const [postState, setPostState] = useState({
        idCounter: 11,
        postContent: '',
        image: null,
        imageValid: true,
        imageMessage: '',
    });

    // Function to increment idCounter, to give a unique id for each post
    const incrementIdCounter = () => {
        setPostState((prevState) => ({
            ...prevState,
            idCounter: prevState.idCounter + 1,
        }));
    };

    // React Router hook for navigation
    const navigate = useNavigate();

    // In case of refreshing the page need to logout because (Connected) user isn't connected any more
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
    } // =================================== End Handle Refresh =======================================

    const handlePostClick = (e) => {
        e.preventDefault();
        const isImageValidValue = isImageValid(postState.image);
        setPostState((prevState) => ({
            ...prevState,
            imageValid: isImageValidValue,
        }));

        // If image is valid, create and add new post
        if (isImageValidValue) {
            if (!postState.postContent && !postState.image) return;
            const currentDate = new Date();
            const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(currentDate);
            const idPost = postState.idCounter;
            incrementIdCounter();

            const newPost = {
                id: idPost,
                author: user.email,
                date: formattedDate,
                content: postState.postContent,
                image: postState.image && URL.createObjectURL(postState.image), // Use createObjectURL to get a URL for the image
                likes: 0,
                commentCount: 0,
                comments: [],
            };

            addPost(newPost);
        }
    };

    const setPostText = (e) => {
        setPostState((prevState) => ({
            ...prevState,
            postContent: e.target.value,
        }));
    };

    const setPostImage = (e) => {
        setPostState((prevState) => ({
            ...prevState,
            image: e.target.files[0],
            imageValid: true,
            imageMessage: '',
        }));
    };

    // Function to validate image format - only png or jpeg are valid, else will display a error message to the user
    const isImageValid = (image) => {
        if (image) {
            const acceptedFormats = ['image/jpeg', 'image/png'];

            if (!image.type || !acceptedFormats.includes(image.type)) {
                setPostState((prevState) => ({
                    ...prevState,
                    imageMessage: 'Please upload a valid JPEG or PNG image',
                }));
                return false;
            }
        }
        return true;
    };

    return (
        <div className={`${darkMode ? 'darkmode' : ''}`}>
            {/* Add new post */}
            <div className={`card shadow m-2 `}>
                <div className="card-body m-1">
                    <div className="d-flex add-new-comment-box">
                        {/* User profile picture */}
                        <img
                            src={user.image}
                            alt="User Profile"
                            className="rounded-circle small-profile-img me-2 upload-post"
                            onChange={setPostImage}
                            style={{ width: '60px !important', height: '60px !important' }}
                        />
                        {/* Input field for the post content */}
                        <textarea
                            className={`form-control mb-2`}
                            placeholder={`What's on your mind, ${user.name}?`}
                            defaultValue={""}
                            onChange={setPostText}
                        />
                    </div>

                    {/* Input field for uploading an image */}
                    <input
                        type="file"
                        data-testid="postImageInput"
                        className={`form-control uploade-image-form ${!postState.imageValid && 'is-invalid'}`}
                        onChange={setPostImage}
                        id="postImage"
                        required=""
                        name='picture'
                    />
                    {!postState.imageValid && <div className='invalid-feedback'>{postState.imageMessage}</div>}

                </div>
                {/* Post footer */}
                <div className="card-footer post-footer add-new-comment-box">
                    <div className="btn-group w-100 ms-1">
                        {/* Button to post the content */}
                        <button type="button" className={`btn btn-light ${darkMode ? '' : ''}`} onClick={handlePostClick}>
                            <i className="bi bi-file-post pe-1" />
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
