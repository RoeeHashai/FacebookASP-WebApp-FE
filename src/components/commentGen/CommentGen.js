import React, { useState } from 'react'
import './CommentGen.css'

export default function CommentGen({ user, addComment, setPosts, post }) {
    const [idCounter, setIdCounter] = useState(10)
    const [commentContent, setCommentContent] = useState('')

    const incCommentCount = () => {
        const updatedPost = { ...post, commentCount: post.commentCount + 1 };
        setPosts((prevPosts) => prevPosts.map((p) => (p.id === post.id ? updatedPost : p)));
    }

    const handleAddCommentClick = () => {
        if (!commentContent) return
        const idComment = idCounter
        setIdCounter(idCounter + 1)
        const newComment = {
            "id": idComment,
            "author": user.email,
            "content": commentContent
        }
        incCommentCount()
        addComment(newComment)
    }
    const handleOnChangeContentComment = (e) => {
        setCommentContent(e.target.value)
    }
    return (
        <div className="card-footer mt-2">
            <div className="comment">
                <div className="d-flex">
                    {/* Profile Picture */}
                    <img
                        src={user.image}
                        alt="User Profile"
                        className="rounded-circle me-2 small-profile-img"
                    />
                    {/* Input field for the comment */}
                    <div className="col add-new-comment-box">
                        <div className="d-flex">
                            <textarea
                                className="form-control add-comment-custom"
                                placeholder="Add a comment..."
                                defaultValue={""}
                                onChange={handleOnChangeContentComment}
                            />
                            <button className='btn' onClick={handleAddCommentClick}><i className="bi bi-send"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
