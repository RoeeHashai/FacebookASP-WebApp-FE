import React, { useState } from 'react';
import './PostEditor.css'

export default function PostEditor({ post, onCancel, onSave }) {
    const [editedContent, setEditedContent] = useState(post.content);
    const [editedImage, setEditedImage] = useState(null)
    // validation status for image
    const [imageValid, setImageValid] = useState(true)

    // validation message for image
    const [imageMessage, setImageMessage] = useState('')
    console.log(editedImage)

    const handleContentChange = (event) => {
        setEditedContent(event.target.value);
    };
    const handleImageChange = (e) => {
        setEditedImage(e.target.files[0]);
        setImageValid(true);
        setImageMessage('');
    };

    const handleSave = () => {
        if (editedImage) {
            console.log('tjrer')
            // If there is an edited image, proceed with the Blob and Object URL logic
            const imageBlob = new Blob([editedImage], { type: editedImage.type });
            const imageUrl = URL.createObjectURL(imageBlob);
            const editedPost = { ...post, content: editedContent, image: imageUrl };
            onSave(editedPost);
        } else {
            // If there is no edited image, proceed without Blob and Object URL
            const editedPost = { ...post, image: null, content: editedContent };
            onSave(editedPost);
        }
    };


    return (
        <div className="post-editor-container">
            <textarea className="form-control bg-custom" value={editedContent} onChange={handleContentChange} />
            <input
                type="file"
                className="form-control mt-2"
                onChange={handleImageChange}
                id="postImage"
                required=""
                name="picture"
            />

            {!imageValid && <div className="invalid-feedback">{imageMessage}</div>}

            <div className="button-container mt-2 d-flex justify-content-center">
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
