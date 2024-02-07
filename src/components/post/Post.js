import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

import './Post.css'
import Comment from '../comment/Comment'
import CommentGen from '../commentGen/CommentGen';
import PostBody from '../../postBody/PostBody';
import LikeCommentShareBtn from '../like-comment-share-btn/LikeCommentShareBtn';

export default function Post({ users, user, post, setPosts }) {
    const { id, author, date, content, image, likes, commentCount, comments } = post;
    const navigate = useNavigate();
    const [commentsLst, setCommentsLst] = useState(comments)
    const addComment = (comment) => {
        setCommentsLst((prevComments) => [comment, ...prevComments])
    }

    const findUser = (email, users) => {
        return users.find((user) => user.email === email) || null
    }
    const postCreator = findUser(author, users)

    const [liked, setLiked] = useState(false);
    const [commentMode, setCommentMode] = useState(false)
    // const [isEditing, setIsEditing] = useState(false);
    const toggleCommentMode = () => {
        setCommentMode(!commentMode)
    }

    // const handleCancelEdit = () => {
    //     setIsEditing(false);
    // };

    // const handleEditClick = () => {
    //     setIsEditing(true);
    // };

    const handleEditPost = (editedPost) => {
        // Implement logic to handle post editing
        console.log('Editing post:', post);
        setPosts((prevPosts) =>
            prevPosts.map((p) => (p.id === editedPost.id ? editedPost : p))
        );
        // // Exit editing mode
        // setIsEditing(false);
    };



    const handleDeletePost = ({ post, postId }) => {
        // Implement logic to handle post deletion
        setPosts((prevPost) => prevPost.filter((p) => p.id !== postId))
    };
    useEffect(() => {
        // Check if connectedUser is falsy (null or undefined)
        if (!user) {
          // Navigate to the login page if not logged in
          navigate('/login');
        }
      }, [user, navigate]);
    
      // If connectedUser is not defined, return null to avoid rendering the component
      if (!user) {
        return null;
      }

    return (
        <div className="card post-card m-2">
            <PostBody
                user={user}
                post={post}
                postCreator={postCreator}
                date={date}
                content={content}
                image={image}
                onEdit={handleEditPost} // Set editing mode to true when Edit is clicked
                onDelete={handleDeletePost}
            />
            <LikeCommentShareBtn
                toggleCommentMode={toggleCommentMode}
                commentMode={commentMode}
                post={post}
                liked={liked}
                setLiked={setLiked}
                setPosts={setPosts}
            />
            {commentsLst.map((comment) =>
                <Comment key={comment.id} user = {user} commentCreator={findUser(comment.author, users)} comment={comment} />
            )}
            {commentMode && <CommentGen user={user} post={post} setPosts={setPosts} addComment={addComment} />}

        </div>)
}
