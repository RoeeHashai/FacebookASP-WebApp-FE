import { React, useState } from 'react';
import './LikeCommentShareBtn.css';

export default function LikeCommentShareBtn({ commentsCount, user, toggleCommentMode, post, darkMode, openCommentModal, handleEditPost }) {
  // const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [unlikeMode, setUnlikeMode] = useState(post.likes.includes(user._id));
  console.log("unlike mode:", unlikeMode);

  console.log('the post is', post);

  const toggleLike = () => {
    setUnlikeMode(!unlikeMode);
  };
  // Handle click for toggling comment mode
  const handleCommentClick = () => {
    openCommentModal();
    toggleCommentMode();
  }

  const showNotSupportedAlert = () => {
    alert("This action is not supported at the moment.");
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}/posts/${post._id}/likes`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const updatedPost = { ...post, likes: [...post.likes, user._id] };
        console.log(updatedPost);
        handleEditPost(updatedPost);
        toggleLike();
      }

    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}/posts/${post._id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const updatedLikes = post.likes.filter(id => id !== user._id);
        const updatedPost = { ...post, likes: updatedLikes };
        console.log(updatedPost);
        handleEditPost(updatedPost);
        toggleLike();
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  };


  //   // Filter out the user's ID from the likes array
  //   const updatedLikes = post.likes.filter(id => id !== user._id);

  //   // Create an updated post object with the new likes array
  //   const updatedPost = { ...post, likes: updatedLikes };
  //   console.log(updatedPost);
  //   handleEditPost(updatedPost);
  //   toggleLike();
  // };

  // // Handle click for toggling like/unlike and updating post likes
  // const handleLikeClick = () => {
  //   if (unlikeMode) {
  //     // Unlike mode: Remove the like from the post

  //     //setPosts((prevPosts) => prevPosts.map((p) => (p._id === post._id ? updatedPost : p)));

  //     // setLiked(false); // Set liked to false
  //   } else { // in like mode
  //     const updatedPost = { ...post, likes: [...post.likes, user._id] };
  //     console.log(updatedPost)
  //     handleEditPost(updatedPost)
  //     // setPosts((prevPosts) => prevPosts.map((p) => (p._id === post._id ? updatedPost : p)));
  //     // setLiked(true);
  //   }
  //   // Toggle the unlike mode for the next click
  //   toggleUnlikeMode();
  // };

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

          {/* ):(
            <button type="button" className={`btn flex-grow-1 ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} onClick={handleLike}>
              <i className="bi bi-hand-thumbs-up pe-1" />
              like
            </button>
          
          )}
          <button type="button" className={`btn flex-grow-1 ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} onClick={handleLikeClick}>
            {unlikeMode ? (<i className="bi bi-hand-thumbs-down pe-1" />) : (<i className="bi bi-hand-thumbs-up pe-1" />)}
            {unlikeMode ? 'unlike' : 'like'}
          </button> */}
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
