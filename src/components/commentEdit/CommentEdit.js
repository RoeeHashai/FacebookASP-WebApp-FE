import React, { useState } from 'react';

export default function CommentEdit({ comment, onEdit, onCancel, setCommentMsg }) {
    const [editedContent, setEditedContent] = useState(comment.content);

    const handleSaveEdit = () => {
        // Call the onEdit callback with the edited comment
        onEdit({ ...comment, content: editedContent });
    };

    const handleCancelEdit = () => {
        onCancel();
    };

    const onChange = (e) => {
        setEditedContent(e.target.value);
        setCommentMsg('');
    };

    return (
        <>
            <div>
                {/* Textarea for editing the comment content */}
                <textarea
                    value={editedContent}
                    onChange={onChange}
                    className="form-control mb-2 mt-1"
                />

                {/* Save button with icon */}
                <button className="btn btn-primary me-2" onClick={handleSaveEdit}>
                    <i className="bi bi-floppy"></i> Save
                </button>

                {/* Cancel button with icon */}
                <button className="btn btn-secondary" onClick={handleCancelEdit}>
                    <i className="bi bi-x-circle"></i> Cancel
                </button>
            </div>
        </>
    );
}
