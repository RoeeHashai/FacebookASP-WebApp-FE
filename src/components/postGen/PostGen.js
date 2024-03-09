import React, { useState, useContext, useRef } from 'react';
import './PostGen.css';
import { DarkModeContext } from '../context/DarkModeContext';

export default function PostGen({ user, addPost }) {
    const { darkMode } = useContext(DarkModeContext);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        content: '',
        image: '',
    });

    const [imageValid, setImageValid] = useState({
        imageValid: true,
        imageMessage: '',
    });

    const setPostContent = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            content: e.target.value,
        }));
    }

    const setPostImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const acceptedFormats = ['image/jpeg', 'image/png'];
            if (!acceptedFormats.includes(file.type)) {
                setImageValid({
                    imageValid: false,
                    imageMessage: 'Please upload a valid JPEG or PNG image'
                });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevState) => ({
                    ...prevState,
                    image: reader.result,
                }));
                setImageValid({
                    imageValid: true,
                    imageMessage: '',
                });
            }
            reader.readAsDataURL(file);
        }
    }

    const handlePostClick = async (e) => {
        e.preventDefault();

        // If content is empty and image is not valid, return and do not fetch the server
        if (!formData.content && !formData.image) return;

        try {
            const response = await fetch(`/api/users/${user._id}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    content: formData.content,
                    image: formData.image,
                }),
            });
            if (response.ok) {
                // If the response is okay, add the new post to the local state after formatting the date
                const newPostData = await response.json();
                const currentDate = new Date(newPostData.date);
                const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(currentDate);
                const newPost = {
                    ...newPostData,
                    date: formattedDate,
                };
                addPost(newPost);
                setFormData({
                    content: '',
                    image: ''
                });
                fileInputRef.current.value = '';
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={`${darkMode ? 'darkmode' : ''}`}>
            <div className={`card shadow m-2 `}>
                <div className="card-body m-1">
                    <div className="d-flex add-new-comment-box">
                        <img
                            src={user.image}
                            alt="User Profile"
                            className="rounded-circle small-profile-img me-2 upload-post"
                            style={{ width: '60px !important', height: '60px !important' }}
                        />
                        <textarea
                            className={`form-control mb-2`}
                            placeholder={`What's on your mind, ${user.name}?`}
                            value={formData.content}
                            defaultValue={""}
                            onChange={setPostContent}
                        />
                    </div>

                    <input
                        type="file"
                        data-testid="postImageInput"
                        className={`form-control uploade-image-form ${!imageValid.imageValid && 'is-invalid'}`}
                        onChange={setPostImage}
                        id="postImage"
                        name='picture'
                        ref={fileInputRef}

                    />
                    {!imageValid.imageValid && <div className='invalid-feedback'>{imageValid.imageMessage}</div>}
                    {/* Display the post picture preview if uploaded a post to the image */}
                    {formData.image && (
                        <div className="mt-3">
                            <h6>Post Image Preview:</h6>
                            <img
                                className='sm previewProfile img-fluid'
                                src={formData.image}
                                alt="Post Image Preview"
                            />
                        </div>
                    )}

                </div>
                <div className="card-footer post-footer add-new-comment-box">
                    <div className="btn-group w-100 ms-1">
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