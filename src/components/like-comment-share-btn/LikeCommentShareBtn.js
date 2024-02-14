import React from 'react'
import './LikeCommentShareBtn.css'

export default function LikeCommentShareBtn({ toggleCommentMode, commentMode, post, liked, setLiked, setPosts }) {
  const handleCommentClick = () => {
    toggleCommentMode()
  }

  const handleLikeClick = () => {
    // If the user has already liked the post, do nothing
    if (liked) {
      return;
    }
  
    // Otherwise, update the likes and set liked to true
    const updatedPost = { ...post, likes: post.likes + 1 };
  
    setPosts((prevPosts) => prevPosts.map((p) => (p.id === post.id ? updatedPost : p)));
    setLiked(true);
  };

return (
  <>
    <div className="mt-2">
      <span className="me-2">
        <i className="bi bi-hand-thumbs-up" /> {post.likes} Likes
      </span>
      <span>
        <i className="bi bi-chat" /> {post.commentCount} Comments
      </span>
    </div>
    <div className="card-footer post-footer">

      <div className="btn-group w-100 mt-1 mb-1">
        <button type="button" className="btn btn-light" onClick={handleLikeClick}>
          <i className="bi bi-hand-thumbs-up pe-1" />
          Like
        </button>
        <button type="button" className="btn btn-light" onClick={handleCommentClick}>
          <i className="bi bi-chat pe-1" />
          {commentMode ? 'go-back' : 'comment'}
        </button>
        <button type="button" className="btn btn-light">
          <i className="bi bi-share pe-1" />
          Share
        </button>
      </div>
      <div className="line-under-buttons"></div>

    </div>
  </>)
}
