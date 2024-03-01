import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Comment from '../comment/Comment';
import CommentGen from '../commentGen/CommentGen';

import './CommentModal.css';

// const findUser = (email, users) => {
//     return users.find((user) => user.email === email) || null;
// };

const CommentModal = ({ onClose, users, user, darkMode, addComment, post, commentMode, setCommentsCount }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [commentsList, setCommentsList] = useState([]);
    useEffect(() => {
        const fetchComments = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/users/${user._id}/posts/${post._id}/comments`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.ok) {
                    const commentsData = await response.json();
                    setCommentsList(commentsData.comments);
                }
            } catch (error) {
                console.error('Error:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchComments();
    }, []);

    const handleAddComment = async (comment) => {
        try {
            const response = await fetch(`/api/users/${user._id}/posts/${post._id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(comment),
            });
            if (response.ok) {
                //const newComment = await response.json();
                // setCommentsList((prevComments) =>
                //     [{
                //         ...comment,
                //         author: {
                //             _id: user._id,
                //             name: user.name,
                //             image: user.image,
                //         }
                //     }, ...prevComments]);
                const newComment = await response.json();
                setCommentsList((prevComments) => [newComment, ...prevComments]);
                setCommentsCount((prevCount) => prevCount + 1);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };
    // add fetching the data from the server        

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
            if (response.ok) {
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

    const handleDeleteComment = async (commentId) => { // need to be to server
        try {
            const response = await fetch(`/api/users/${user._id}/posts/${post._id}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
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







    // // Find the comment that needs to be deleted
    // const deletedComment = commentsList.find((comment) => comment.id === commentId);

    // // Ensure the comment is found before proceeding
    // if (deletedComment) {
    //     // Update the comment count in the associated post
    //     const updatedPost = { ...post, commentCount: post.commentCount - 1 };

    //     // Update the local state (commentsLst) by removing the deleted comment
    //     setCommentsList((prevComments) =>
    //         prevComments.filter((comment) => comment.id !== commentId)
    //     );

    //     // Update the post data in the server or wherever it's stored

    //     // Update the post data in the local state (setPostList function)
    //     setPostList((prevPosts) =>
    //         prevPosts.map((p) => (p.id === post.id ? updatedPost : p))
    //     );
    // }

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
                                key={comment._id} // Ensure you have a unique key for each comment
                                user={user}
                                commentCreator={comment.author}
                                comment={comment}
                                onDelete={handleDeleteComment}
                                onEdit={handleEditComment}
                                darkMode={darkMode}
                            />
                        ))
                    )}
                    {/* Render CommentGen below the modal */}
                    {/* Line break */}
                    <div className={`${darkMode ? 'darkmode-' : ''}modalTitle`}>
                        {commentMode && (
                            <CommentGen
                                user={user}
                                post={post}
                                addComment={handleAddComment}
                                darkMode={darkMode}
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
