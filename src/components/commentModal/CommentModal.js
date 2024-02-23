import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Comment from '../comment/Comment';
import CommentGen from '../commentGen/CommentGen';
import './CommentModal.css';

const findUser = (email, users) => {
    return users.find((user) => user.email === email) || null;
};

const CommentModal = ({ comments, onClose, users, user, handleDeleteComment, handleEditComment, darkMode, addComment, setPosts, post, commentMode, addNewComment }) => {
    return (
        <div className={`${darkMode ? 'darkmode' : ''}`}>
            <Modal className={`${darkMode ? 'darkmode-' : ''}modal`} show={true} onHide={onClose} centered scrollable>
                <Modal.Header className={`${darkMode ? 'darkmode-' : ''}modalTitle`}>
                    <Modal.Title className={`${darkMode ? 'darkmode-' : ''}modalTitle`}>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`${darkMode ? 'darkmode-' : ''}modalTitle`}>
                    {comments.length === 0 ? (
                        <p>No comments</p>
                    ) : (
                        comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                user={user}
                                commentCreator={findUser(comment.author, users)}
                                comment={comment}
                                onDelete={handleDeleteComment}
                                onEdit={handleEditComment}
                                darkMode={darkMode}
                                handleDeleteComment={handleDeleteComment}
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
                                setPosts={setPosts}
                                addComment={addNewComment}
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
