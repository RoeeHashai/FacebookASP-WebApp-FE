import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarFeed from '../navbarFeed/NavbarFeed';
import Menu from '../menu/Menu';
import PostGen from '../postGen/PostGen';
import Post from '../post/Post';
import { Link } from 'react-router-dom';
import './Feed.css'; // Import the CSS file
import postsData from '../../data/posts.json';

export default function Feed({ users, user, addConnectedUser }) {
    const [posts, setPosts] = useState([...postsData]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const addPost = (post) => {
        setPosts((prevPost) => [post, ...prevPost]);
    };

    const findUser = (email, users) => {
        return users.find((user) => user.email === email) || null;
    };

    return (
        <>
            <NavbarFeed toggleDarkMode={toggleDarkMode} darkMode={darkMode} addConnectedUser={addConnectedUser} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 d-none d-md-block">
                        <Menu user={user} darkMode={darkMode} />
                    </div>
                    <div className="col-md-6 middle-column"> {/* Apply the new CSS class here */}
                        <PostGen user={user} addPost={addPost} darkMode={darkMode} />
                        {posts.map((post) => (
                            <Post key={post.id} users={users} user={user} post={post} setPosts={setPosts} darkMode={darkMode} />
                        ))}
                    </div>
                    <div className="col-md-3 d-none d-md-block" />
                    <div/>
                </div>
            </div>
        </>
    );
}
