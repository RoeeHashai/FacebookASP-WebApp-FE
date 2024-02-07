// CommentList.jsx or your parent component
import React, { useState } from 'react';
import Comment from '../comment/Comment';
export default function CommentList({ users, user, comments }) {
    const [commentsList, setCommentsList] = useState(comments)
    const addComment = (comment) => {
        setCommentsList((prevComments) => [comment, ...prevComments])
    }
    const findUser = (email, users) => {
        return users.find((user) => user.email === email) || null
    }

    const handleDeleteComment = (commentId) => {
        // Implement logic to delete the comment with the given ID
        // Update the state to remove the comment
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setCommentsList(updatedComments);
    };
    const handleEditComment = () => {

    }

    return (
        <div>
            {commentsList.map((comment) => (
                <Comment
                    key={comment.id}
                    user={user}
                    commentCreator={findUser(comment.author, users)}
                    comment={comment}
                    onDelete={handleDeleteComment}
                    onEdit={handleEditComment}
                />
            ))}
        </div>
    );
}
