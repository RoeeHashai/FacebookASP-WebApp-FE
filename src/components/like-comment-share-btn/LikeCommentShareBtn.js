import React from 'react'
import './LikeCommentShareBtn.css'

export default function LikeCommentShareBtn({ toggleCommentMode, commentMode, toggleUnlikeMode, unlikeMode, post, liked, setLiked, setPosts, darkMode }) {
  const handleCommentClick = () => {
    toggleCommentMode()
  }


  const handleLikeClick = () => {
    if (unlikeMode) {
      // Unlike mode: Remove the like from the post
      const updatedPost = { ...post, likes: post.likes - 1 };

      setPosts((prevPosts) => prevPosts.map((p) => (p.id === post.id ? updatedPost : p)));
      setLiked(false); // Set liked to false
    } else {
      // Like mode: Add a like to the post
      // If the user has already liked the post, do nothing
      // if (liked) {
      //   return;
      // }

      // Otherwise, update the likes and set liked to true
      const updatedPost = { ...post, likes: post.likes + 1 };

      setPosts((prevPosts) => prevPosts.map((p) => (p.id === post.id ? updatedPost : p)));
      setLiked(true);
    }
    console.log(unlikeMode)
    // Toggle the unlike mode for the next click
    toggleUnlikeMode();
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
      <div className="card-footer ">

        {/* <div className={`btn-group w-100 ${darkMode ? 'dark-mode-btn-group' : ''}`}>
          <button type="button" className={`btn ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} onClick={handleLikeClick}>
            <i className="bi bi-hand-thumbs-up pe-1" />
            {unlikeMode ? 'unlike' : 'like'}
          </button>
          <button type="button" className={`btn ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} onClick={handleCommentClick}>
            <i className="bi bi-chat pe-1" />
            {commentMode ? 'go-back' : 'comment'}
          </button>
          <button type="button" className={`btn ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`}>
            <i className="bi bi-share pe-1" />
            Share
          </button>
        </div> */}
        <div class="btn-group dropup d-flex w-100" role="group" aria-label="Basic example">
          <button type="button" className={`btn flex-grow-1 ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} onClick={handleLikeClick}>
            <i className="bi bi-hand-thumbs-up pe-1" />
            {unlikeMode ? 'unlike' : 'like'}
          </button>
          <button type="button" className={`btn flex-grow-1 ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} onClick={handleCommentClick}>
            <i className="bi bi-chat pe-1" />
            {commentMode ? 'go-back' : 'comment'}
          </button>
          <div class="btn-group flex-grow-1">
            <button type="button" className={`btn dropdown-toggle dropdown-toggle-no-arrow ${darkMode ? 'btn-dark-custom' : 'btn-light-custom'}`} data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-share pe-1" />
              Share            
              </button>
            <ul class="dropdown-menu shadow">
              <li><a class="dropdown-item"><i className="bi bi-messenger me-2"></i>Send in Messenger</a></li>
              <li><a class="dropdown-item"><i className="bi bi-whatsapp me-2"></i>Send in WhatsApp</a></li>
              <li><a class="dropdown-item"><i className="bi bi-instagram me-2"></i>Share on Instegram</a></li>

              <li><a class="dropdown-item"></a></li>
            </ul>
          </div>
        </div>



        <div className="line-under-buttons"></div>

      </div>
    </>)
}
