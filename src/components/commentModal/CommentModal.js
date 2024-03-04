import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Comment from '../comment/Comment';
import CommentGen from '../commentGen/CommentGen';
import { DarkModeContext } from '../context/DarkModeContext';

import './CommentModal.css';

const CommentModal = ({ onClose, user, commentMode, setCommentsCount, post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [commentsList, setCommentsList] = useState([]);
    const { darkMode } = useContext(DarkModeContext);
    useEffect(() => {
        const fetchComments = async () => {
            // Set loading to true while comments are being fetched
            setIsLoading(true);
            try {
                // Fetch comments for the post
                const response = await fetch(`/api/users/${user._id}/posts/${post._id}/comments`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.ok) { // If the response is okay, set the comments list
                    const commentsData = await response.json();
                    setCommentsList(commentsData.comments);
                }
            } catch (error) {
                console.error('Error:', error);
            }
            finally { // Set loading to false after comments are fetched
                setIsLoading(false);
            }
        };
        fetchComments();
    }, []);

    const handleAddComment = async (comment) => {
        try { // Add a new comment to the post
            const response = await fetch(`/api/users/${user._id}/posts/${post._id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(comment),
            });
            if (response.ok) { // If the response is okay, add the new comment to the comments list and increment the comments count
                const newComment = await response.json();
                setCommentsList((prevComments) => [newComment, ...prevComments]);
                setCommentsCount((prevCount) => prevCount + 1);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditComment = async (editedComment) => {
        try {
            const response = await fetch(`/api/users/${user._id}/posts/${post._id}/comments/${editedComment._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(editedComment),
            });
            if (response.ok) { // If the response is okay, update the comments list with the edited comment
                setCommentsList((prevComments) =>
                    prevComments.map((comment) =>
                        comment._id === editedComment._id ? editedComment : comment
                    )
                );
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteComment = async (commentId) => { 
        try {
            const response = await fetch(`/api/users/${user._id}/posts/${post._id}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) { // If the response is okay, remove the comment from the comments list and decrement the comments count
                setCommentsList((prevComments) =>
                    prevComments.filter((comment) => comment._id !== commentId)
                );
                setCommentsCount((prevCount) => prevCount - 1);
            }

        }
        catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className={`${darkMode ? 'darkmode' : ''}`}>
            <Modal className={`${darkMode ? 'darkmode-' : ''}modal`} show={true} onHide={onClose} centered scrollable>
                <Modal.Header className={`${darkMode ? 'darkmode-' : ''}modalTitle`}>
                    <Modal.Title className={`${darkMode ? 'darkmode-' : ''}modalTitle`}>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`${darkMode ? 'darkmode-' : ''}modalTitle`}>
                    {isLoading ? (
                        // Display loading spinner while comments are being fetched
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : commentsList.length === 0 ? (
                        <p>No comments</p>
                    ) : (
                        commentsList.map((comment) => (
                            <Comment
                                key={comment._id}
                                user={user}
                                commentCreator={comment.author}
                                comment={comment}
                                onDelete={handleDeleteComment}
                                onEdit={handleEditComment}
                            />
                        ))
                    )}
                    {/* Render CommentGen below the modal */}
                    <div className={`${darkMode ? 'darkmode-' : ''}modalTitle`}>
                        {commentMode && (
                            <CommentGen
                                user={user}
                                post={post}
                                addComment={handleAddComment}
                            />
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer className={`${darkMode ? 'darkmode-' : ''}modalTitle`}>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CommentModal;
