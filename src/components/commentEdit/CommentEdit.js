import React, { useState } from 'react';

export default function CommentEdit({ comment, onEdit , onCancel}) {
    const [editedContent, setEditedContent] = useState(comment.content);

    const handleSaveEdit = () => {
        // Call the onEdit callback with the edited comment
        onEdit({ ...comment, content: editedContent });
    };

    const handleCancelEdit = () => {
        onCancel();
    };

    return (
        <div>
            {/* Edit Comment Form */}
            <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="form-control mb-2 mt-1"
            />
            <button className="btn btn-primary me-2" onClick={handleSaveEdit}>
            <i className="bi bi-floppy"></i> Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancelEdit}>
            <i className="bi bi-x-circle"></i> Cancel
            </button>
        </div>
    );
}