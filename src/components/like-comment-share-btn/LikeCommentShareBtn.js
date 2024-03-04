import { React, useState, useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import './LikeCommentShareBtn.css';

export default function LikeCommentShareBtn({ commentsCount, user, toggleCommentMode, post, openCommentModal, handleEditPost }) {
  const { darkMode } = useContext(DarkModeContext);
  const [unlikeMode, setUnlikeMode] = useState(post.likes.includes(user._id));

  const toggleLike = () => {
    setUnlikeMode(!unlikeMode);
  };

  const handleCommentClick = () => {
    openCommentModal();
    toggleCommentMode();
  }

  const showNotSupportedAlert = () => {
    alert("This action is not supported at the moment.");
  };

  const handleLike = async () => {
    try { // Add a new like to the post
      const response = await fetch(`/api/users/${user._id}/posts/${post._id}/likes`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) { // If the response is okay, add the user id to the likes list in the local state and update the post
        const updatedPost = { ...post, likes: [...post.likes, user._id] };
        handleEditPost(updatedPost);
        toggleLike();
      }

    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUnlike = async () => {
    try { // Remove a like from the post
      const response = await fetch(`/api/users/${user._id}/posts/${post._id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) { // If the response is okay, remove the user id from the likes list in the local state and update the post
        const updatedLikes = post.likes.filter(id => id !== user._id);
        const updatedPost = { ...post, likes: updatedLikes };
        handleEditPost(updatedPost);
        toggleLike();
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`${darkMode ? 'darkmode' : ''}`}>
      <div className="mt-2">
        {/* Display the number of likes and comments */}
        <span className="me-2">
          <i className="bi bi-hand-thumbs-up" /> {post.likes.length} Likes
        </span>
        <span>
          <i className="bi bi-chat" /> {commentsCount} Comments
        </span>
      </div>
      <div className="card-footer ">
        {/* Button group for like, comment, and share */}
        <div className="btn-group dropup d-flex w-100" role="group" aria-label="Basic example">
          {/* Like button */}
          {unlikeMode ? (
            <button type="button" className={`btn flex-grow-1 ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} onClick={handleUnlike}>
              <i className="bi bi-hand-thumbs-down pe-1" />
              unlike
            </button>
          ) : (
            <button type="button" className={`btn flex-grow-1 ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} onClick={handleLike}>
              <i className="bi bi-hand-thumbs-up pe-1" />
              like
            </button>

          )}
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
