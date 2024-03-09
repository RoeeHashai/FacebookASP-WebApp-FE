import React, { useState } from 'react';
import './PostEditor.css';

export default function PostEditor({ user, post, onCancel, onSave }) {
    // State for edited content, edited image, and image validation
    // const [editorState, setEditorState] = useState({
    //     editedContent: post.content,
    //     editedImage: null,
    //     imageValid: true,
    //     imageMessage: '',
    // });

    const [formData, setFormData] = useState({
        eContent: post.content,
        eImage: post.image,
        imageValid: true,
        imageMessage: '',
    });

    // const { editedContent, editedImage, imageValid, imageMessage } = editorState;
    const handleDeleteImageClick = () => {
        setFormData((prevState) => ({ ...prevState, eImage: '' }));
    }
    const handleContentChange = (event) => {
        setFormData((prevState) => ({ ...prevState, eContent: event.target.value }));
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
                console.log('Invalid image format');
                setFormData((prevState) => ({ ...prevState, imageValid: false, imageMessage: 'Please upload a valid JPEG or PNG image' }));
            }
        };
    };

    const handleSave = async () => {
        // if (editedImage) {
        //     // If there is an edited image, proceed with Blob and Object URL logic
        //     const imageBlob = new Blob([editedImage], { type: editedImage.type });
        //     const imageUrl = URL.createObjectURL(imageBlob);
        //     const editedPost = { ...post, content: editedContent, image: imageUrl };
        //     onSave(editedPost);
        // } else {
        //     // If there is no edited image, proceed without Blob and Object URL
        //     const editedPost = { ...post, image: null, content: editedContent };
        // onSave(editedPost);
        // }
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
            if (response.ok) {
                onSave({ ...post, content: formData.eContent, image: formData.eImage });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div className="post-editor-container">
            {/* Textarea for editing content */}
            <textarea className="form-control bg-custom" value={formData.eContent} onChange={handleContentChange} />

            {/* File input for uploading images */}
            <input
                type="file"
                className={`form-control mt-2 uploade-image-form" ${!formData.imageValid && 'is-invalid'}`}
                onChange={handleImageChange}
                id="postImage"
                required=""
                name="picture"
            />

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
            {/* Buttons for Save and Cancel actions */}
            <div className="button-container mt-2 d-flex justify-content-center">
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
