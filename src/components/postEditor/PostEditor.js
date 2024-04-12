import React, { useState } from 'react';
import './PostEditor.css';

export default function PostEditor({ user, post, onCancel, onSave }) {
    const [formData, setFormData] = useState({
        eContent: post.content,
        eImage: post.image,
        imageValid: true,
        imageMessage: '',
    });
    const [isContentValid, setIsContentValid] = useState(true);
    const [contentErrorMessage, setContentErrorMessage] = useState('');

    const handleDeleteImageClick = () => {
        setFormData((prevState) => ({ ...prevState, eImage: '' }));
    }
    const handleContentChange = (event) => {
        setFormData((prevState) => ({ ...prevState, eContent: event.target.value }));
        setContentErrorMessage('');
        setIsContentValid(true);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64 = e.target.result;
                    setFormData((prevState) => ({ ...prevState, imageMessage: '', imageValid: true, eImage: base64 }));
                }
                reader.readAsDataURL(file);
            }
            else {
                setFormData((prevState) => ({ ...prevState, imageValid: false, imageMessage: 'Please upload a valid JPEG or PNG image' }));
            }
        };
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/users/${user._id}/posts/${post._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    content: formData.eContent,
                    image: formData.eImage,
                })
            });
            if (response.ok) { // If the response is okay, save the post in the local state and close the editor
                onSave({ ...post, content: formData.eContent, image: formData.eImage });
            }
            if (response.status === 400) {
                console.log('Bad Request');
                setIsContentValid(false);
                setContentErrorMessage('You are trying to uplaod a blacklisted URL.\nPlease remove the URL and try again.')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div className="post-editor-container">
            <textarea className="form-control bg-custom" value={formData.eContent} onChange={handleContentChange} />
            {!isContentValid && <div className='error-message'>{contentErrorMessage}</div>}

            <input
                type="file"
                className={`form-control mt-2 uploade-image-form" ${!formData.imageValid && 'is-invalid'}`}
                onChange={handleImageChange}
                id="postImage"
                required=""
                name="picture" />

            {/* Display error message if image validation fails */}
            {!formData.imageValid && <div className='invalid-feedback'>{formData.imageMessage}</div>}

            {formData.eImage && (
                <div className="mt-3">
                    <h6>Image Preview:</h6>
                    <img
                        className='sm previewProfile img-fluid'
                        src={formData.eImage}
                        alt="Post Image Preview"
                    />
                </div>
            )
            }
            <div className="button-container mt-2 d-flex justify-content-center">
                {/* If user uploaded image give option to delete it and not uplode it */}
                {formData.eImage && (
                    <button className="btn btn-danger ps-3 pe-3 me-2" onClick={handleDeleteImageClick}>
                        <i className="bi bi-trash"></i> Delete Image
                    </button>
                )}
                <button className="btn btn-primary ps-3 pe-3 me-2" onClick={handleSave}>
                    <i className="bi bi-floppy"></i> Save
                </button>
                <button className="btn btn-secondary" onClick={onCancel}>
                    <i className="bi bi-x-circle"></i> Cancel
                </button>
            </div>
        </div>
    );
}
