import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostBody from '../postBody/PostBody';
import LikeCommentShareBtn from '../like-comment-share-btn/LikeCommentShareBtn';
import './Post.css';
import CommentModal from '../commentModal/CommentModal';

export const findUser = (email, users) => {
    return users.find((user) => user.email === email) || null;
};

export default function Post({ users, user, post, setPostList, darkMode, deletePost, onDelete, onEdit }) {
    const navigate = useNavigate();
    // const [likes, setLikes] = useState(post.likes);
    const [commentMode, setCommentMode] = useState(false);
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [commentsCount, setCommentsCount] = useState(post.commentsLength); // Simplified for demonstration

    const incqCommentCount = () => {
      setCommentsCount((prevCount) => prevCount + 1);
    };

    const decrementCommentsCount = () => {
        setCommentsCount((prevCount) => prevCount - 1);
      };
    // const postCreator = findUser(author, users);
    // const postAuthor = post.author; // can delete?

    const toggleCommentMode = () => {
        setCommentMode(!commentMode);
    };

    // const handleDeletePost = (postToDel) => {
    //     // Search in the post list for the post that needs to be deleted and remove the post

    //     setPostList((prevPost) => prevPost.filter((p) => p._id !== postToDel._id));
    // };


    const openCommentModal = () => {
        setCommentModalOpen(true);
    };

    const closeCommentModal = () => {
        setCommentMode(false);
        setCommentModalOpen(false);
    };

    // // In case of refreshing the page need to logout because (Connected) user isn't connected any more
    // useEffect(() => {
    //     // Check if user is falsy (null or undefined)
    //     if (!user) {
    //         // Navigate to the login page if not logged in
    //         navigate('/login');
    //     }
    // }, [user, navigate]);
    // // If user is not defined, return null to avoid rendering the component
    // if (!user) {
    //     return null;
    // } // =================================== End Handle Refresh =======================================
    return (
        <div className={`${darkMode ? 'darkmode' : ''}`}>
            <div className={`card shadow post-card m-2 `}>
                <PostBody
                    user={user}
                    post={post}
                    // date={date}
                    // content={content}
                    // image={image}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    darkMode={darkMode}
                    // setCommentsCount={setCommentsCount}
                />
                <LikeCommentShareBtn
                    toggleCommentMode={toggleCommentMode}
                    // unlikeMode={unlikeMode}
                    // toggleUnlikeMode={toggleUnlikeMode}
                    commentMode={commentMode}
                    post={post}
                    // setLiked={setLiked}
                    setPosts={setPostList}
                    darkMode={darkMode}
                    openCommentModal={openCommentModal}
                    user={user}
                    handleEditPost={onEdit}
                    commentsCount={commentsCount}
                    // incqCommentCount={incqCommentCount}
                    // decrementCommentsCount={decrementCommentsCount}
                // handleEditPost={handleEditPost}
                />
                {/* Button to open the comment modal */}
                <button className='view-comments-btn' onClick={openCommentModal}> <i className="bi bi-list me-1"></i>View Comments</button>
            </div>

            {/* Render the comment modal if open */}
            {commentModalOpen && (
                <CommentModal
                    // comments={commentsList}
                    onClose={closeCommentModal}
                    // users={users}
                    user={user}
                    // handleDeleteComment={handleDeleteComment}
                    // handleEditComment={handleEditComment}
                    darkMode={darkMode}
                    commentMode={commentMode}
                    // addNewComment={addComment}
                    post={post}
                    setCommentsCount={setCommentsCount}
                // setPosts={setPostList}
                />
            )}
        </div>
    );
}
