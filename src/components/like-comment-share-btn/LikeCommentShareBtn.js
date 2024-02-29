import React from 'react';
import './LikeCommentShareBtn.css';

export default function LikeCommentShareBtn({ toggleCommentMode, commentMode, toggleUnlikeMode, unlikeMode, post, setLiked, setPosts, darkMode, openCommentModal }) {
  // Handle click for toggling comment mode
  const handleCommentClick = () => {
    openCommentModal();
    toggleCommentMode();
  }

  const showNotSupportedAlert = () => {
    alert("This action is not supported at the moment.");
  };

  // Handle click for toggling like/unlike and updating post likes
  const handleLikeClick = () => {
    if (unlikeMode) {
      // Unlike mode: Remove the like from the post
      const updatedPost = { ...post, likes: post.likes - 1 };
      setPosts((prevPosts) => prevPosts.map((p) => (p.id === post.id ? updatedPost : p)));
      setLiked(false); // Set liked to false
    } else { // in like mode
      const updatedPost = { ...post, likes: post.likes + 1 };
      setPosts((prevPosts) => prevPosts.map((p) => (p.id === post.id ? updatedPost : p)));
      setLiked(true);
    }
    // Toggle the unlike mode for the next click
    toggleUnlikeMode();
  };

  return (
    <div className={`${darkMode ? 'darkmode' : ''}`}>
      <div className="mt-2">
        {/* Display the number of likes and comments */}
        <span className="me-2">
          <i className="bi bi-hand-thumbs-up" /> {post.likes} Likes
        </span>
        <span>
          <i className="bi bi-chat" /> {post.commentCount} Comments
        </span>
      </div>
      <div className="card-footer ">
        {/* Button group for like, comment, and share */}
        <div className="btn-group dropup d-flex w-100" role="group" aria-label="Basic example">
          {/* Like button */}
          <button type="button" className={`btn flex-grow-1 ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} onClick={handleLikeClick}>
            <i className="bi bi-hand-thumbs-up pe-1" />
            {unlikeMode ? 'unlike' : 'like'}
          </button>
          {/* Comment button */}
          <button type="button" className={`btn flex-grow-1 ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} onClick={handleCommentClick}>
            <i className="bi bi-chat pe-1" />
            comment
          </button>
          {/* Share dropdown */}
          <div className="btn-group flex-grow-1">
            <button type="button" className={`btn dropdown-toggle dropdown-toggle-no-arrow ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-share pe-1" />
              Share
            </button>
            {/* Share options dropdown menu */}
            <ul className="dropdown-menu shadow">
              <li><button className="dropdown-item" onClick={showNotSupportedAlert}><i className="bi bi-messenger me-2"></i>Send in Messenger</button></li>
              <li><button className="dropdown-item" onClick={showNotSupportedAlert}><i className="bi bi-whatsapp me-2"></i>Send in WhatsApp</button></li>
              <li><button className="dropdown-item" onClick={showNotSupportedAlert}><i className="bi bi-instagram me-2"></i>Share on Instagram</button></li>
              {/* Add more share options if needed */}
            </ul>
          </div>
        </div>
        {/* Divider line */}
        <div className="mt-1 line-under-buttons"></div>
      </div>
    </div>
  )
}
