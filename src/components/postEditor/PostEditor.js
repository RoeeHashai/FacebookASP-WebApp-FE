import React, { useState } from 'react';
import './PostEditor.css';

export default function PostEditor({ post, onCancel, onSave }) {
    // State for edited content, edited image, and image validation
    const [editorState, setEditorState] = useState({
        editedContent: post.content,
        editedImage: null,
        imageValid: true,
        imageMessage: '',
    });

    const { editedContent, editedImage, imageValid, imageMessage } = editorState;

    const handleContentChange = (event) => {
        setEditorState((prevState) => ({ ...prevState, editedContent: event.target.value }));
    };
    const handleImageChange = (e) => {
        setEditorState((prevState) => ({
            ...prevState,
            editedImage: e.target.files[0],
            imageValid: true,
            imageMessage: '',
        }));
    };

    const handleSave = () => {
        if (editedImage) {
            // If there is an edited image, proceed with Blob and Object URL logic
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
            {/* Textarea for editing content */}
            <textarea className="form-control bg-custom" value={editedContent} onChange={handleContentChange} />

            {/* File input for uploading images */}
            <input
                type="file"
                className="form-control mt-2 uploade-image-form"
                onChange={handleImageChange}
                id="postImage"
                required=""
                name="picture"
            />

            {/* Display error message if image validation fails */}
            {!imageValid && <div className="invalid-feedback">{imageMessage}</div>}

            {/* Buttons for Save and Cancel actions */}
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
