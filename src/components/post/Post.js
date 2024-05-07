import React, { useState, useContext, useEffect } from 'react';
import PostBody from '../postBody/PostBody';
import LikeCommentShareBtn from '../like-comment-share-btn/LikeCommentShareBtn';
import CommentModal from '../commentModal/CommentModal';
import './Post.css';
import { DarkModeContext } from '../context/DarkModeContext';

export default function Post({ user, post, onDelete, onEdit }) {
    const { darkMode } = useContext(DarkModeContext);
    const [commentMode, setCommentMode] = useState(false);
    const [commentModalOpen, setCommentModalOpen] = useState(false);

    // Set the comments count to the length of the comments list info that comes from the server
    const [commentsCount, setCommentsCount] = useState(post.commentsLength || 0);

    const toggleCommentMode = () => {
        setCommentMode(!commentMode);
    };

    const openCommentModal = () => {
        setCommentModalOpen(true);
    };

    const closeCommentModal = () => {
        setCommentMode(false);
        setCommentModalOpen(false);
    };

    return (
        <div className={`${darkMode ? 'darkmode' : ''}`}>
            <div className={`card shadow post-card m-2 `}>
                <PostBody
                    user={user}
                    post={post}
                    onEdit={onEdit}
                    onDelete={onDelete} />

                <LikeCommentShareBtn
                    toggleCommentMode={toggleCommentMode}
                    commentMode={commentMode}
                    post={post}
                    openCommentModal={openCommentModal}
                    user={user}
                    handleEditPost={onEdit}
                    commentsCount={commentsCount}
                    />

                {/* Button to open the comment modal */}
                <button className='view-comments-btn'
                    onClick={openCommentModal}>
                    <i className="bi bi-list me-1"></i>View Comments</button>
            </div>

            {/* Render the comment modal if open */}
            {commentModalOpen && (
                <CommentModal
                    onClose={closeCommentModal}
                    user={user}
                    commentMode={commentMode}
                    post={post}
                    setCommentsCount={setCommentsCount}

                     />
            )}
        </div>
    );
}
