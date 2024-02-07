import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarFeed from '../navbarFeed/NavbarFeed';
import Menu from '../menu/Menu';
import PostGen from '../postGen/PostGen';
import Post from '../post/Post';
import { Link } from 'react-router-dom';
import './Feed.css';
import postsData from '../../data/posts.json';

export default function Feed({ users, user }) {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([...postsData]);
    // Check if user is null and navigate to '/login'
    
    
    

    const addPost = (post) => {
        setPosts((prevPost) => [post, ...prevPost]);
    };

    const findUser = (email, users) => {
        return users.find((user) => user.email === email) || null;
    };

    return (
        <>
            <NavbarFeed />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 d-none d-md-block">
                        <Menu user={user} />
                    </div>
                    <div className="col">
                        <PostGen user={user} addPost={addPost} />
                        {/* card-post */}
                        {posts.map((post) => (
                            <Post key={post.id} users={users} user={user} post={post} setPosts={setPosts} />
                        ))}
                    </div>
                    <div className="col-md-3 d-none d-md-block" />
                </div>
            </div>
        </>
    );
}
