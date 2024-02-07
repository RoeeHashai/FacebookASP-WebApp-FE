import React, { useState } from 'react'
import './Post.css'
import Comment from '../comment/Comment'
import CommentGen from '../commentGen/CommentGen';
import PostBody from '../../postBody/PostBody';
export default function Post({ users, user, post }) {
    const { id, author, date, content, image, likes, commentCount, comments } = post;
    const [commentsLst, setCommentsLst] = useState(comments)
    const findUser = (email, users) => {
        return users.find((user) => user.email === email) || null
    }
    const postCreator = findUser(author, users)
    return (
        <div className="card post-card m-2">
            <PostBody
                postCreator={postCreator}
                date={date}
                content={content}
                image={image}
                likes={likes}
                commentCount={commentCount}
            />
            {commentsLst.map((comment) =>
                <Comment key={comment.id} user={findUser(comment.author, users)} comment={comment} />
            )}
            <CommentGen user={user} />

        </div>)
}
