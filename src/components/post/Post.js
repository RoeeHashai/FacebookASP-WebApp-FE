import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Comment from '../comment/Comment';
import CommentGen from '../commentGen/CommentGen';
import PostBody from '../postBody/PostBody';
import LikeCommentShareBtn from '../like-comment-share-btn/LikeCommentShareBtn';
import './Post.css';

export const findUser = (email, users) => {
    return users.find((user) => user.email === email) || null;
};

export default function Post({ users, user, post, setPosts, darkMode }) {
    const { author, date, content, image, comments } = post;
    const navigate = useNavigate();
    const [commentsLst, setCommentsLst] = useState(comments);
    const addComment = (comment) => {
        setCommentsLst((prevComments) => [comment, ...prevComments]);
    };

    const postCreator = findUser(author, users);

    const [, setLiked] = useState(false);
    const [commentMode, setCommentMode] = useState(false);
    const toggleCommentMode = () => {
        setCommentMode(!commentMode);
    };
    const [unlikeMode, setUnlikeMode] = useState(false);
    const toggleUnlikeMode = () => {
        setUnlikeMode(!unlikeMode);
    };

    const handleEditPost = (editedPost) => {
        // Search in the post list for the post that needs to be edited and update the post
        setPosts((prevPosts) =>
            prevPosts.map((p) => (p.id === editedPost.id ? editedPost : p))
        );
    };

    const handleDeletePost = ({ postId }) => {
        // Search in the post list for the post that needs to be deleted and remove the post
        setPosts((prevPost) => prevPost.filter((p) => p.id !== postId));
    };

    const handleEditComment = (editedComment) => {
        // Search in the comments list for the comment that needs to be edited and update the comment
        setCommentsLst((prevComments) =>
            prevComments.map((comment) =>
                comment.id === editedComment.id ? editedComment : comment
            )
        );
    };

    const handleDeleteComment = (commentId) => {
        // Search in the comments list for the comment that needs to be deleted and remove the comment
        setCommentsLst((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
        );
    };

    // In case of refreshing the page need to logout because (Connected) user isn't connected any more
    useEffect(() => {
        // Check if user is falsy (null or undefined)
        if (!user) {
            // Navigate to the login page if not logged in
            navigate('/login');
        }
    }, [user, navigate]);
    // If user is not defined, return null to avoid rendering the component
    if (!user) {
        return null;
    } // =================================== End Handle Refresh =======================================

    return (
        <div className={`${darkMode ? 'darkmode' : ''}`}>
            <div className={`card shadow post-card m-2 `}>
                <PostBody
                    user={user}
                    post={post}
                    postCreator={postCreator}
                    date={date}
                    content={content}
                    image={image}
                    onEdit={handleEditPost}
                    onDelete={handleDeletePost}
                    darkMode={darkMode}
                />
                <LikeCommentShareBtn
                    toggleCommentMode={toggleCommentMode}
                    unlikeMode={unlikeMode}
                    toggleUnlikeMode={toggleUnlikeMode}
                    commentMode={commentMode}
                    post={post}
                    setLiked={setLiked}
                    setPosts={setPosts}
                    darkMode={darkMode}
                />
                {commentsLst.map((comment) => (
                    <Comment
                        key={comment.id}
                        user={user}
                        commentCreator={findUser(comment.author, users)}
                        comment={comment}
                        onDelete={handleDeleteComment}
                        onEdit={handleEditComment}
                        darkMode={darkMode}
                    />
                ))}
                {commentMode && (
                    <CommentGen
                        user={user}
                        post={post}
                        setPosts={setPosts}
                        addComment={addComment}
                        darkMode={darkMode}
                    />
                )}
            </div>
        </div>
    );
}
