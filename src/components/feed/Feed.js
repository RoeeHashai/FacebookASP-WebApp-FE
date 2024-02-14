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
    const [darkMode, setDarkMode] = useState(false); // Step 1

    // useEffect(() => {
    //     // Step 2: Apply dark mode class
    //     document.body.classList.toggle('dark-mode', darkMode);
    //     document.querySelector('.navbar').classList.toggle('dark-mode-nav', darkMode);
    //     document.querySelector('.navbarSearchBar').classList.toggle('dark-mode-searchbar', darkMode);

    // }, [darkMode]);
    useEffect(() => {
        // Apply dark mode class to the body element
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    
    const toggleDarkMode = () => {
        console.log('toggle')
        // Step 3: Toggle dark mode
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
            <NavbarFeed toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 d-none d-md-block">
                        <Menu user={user} darkMode={darkMode} />
                    </div>
                    <div className="col">
                        <PostGen user={user} addPost={addPost} darkMode={darkMode} />
                        {/* card-post */}
                        {posts.map((post) => (
                            <Post key={post.id} users={users} user={user} post={post} setPosts={setPosts} darkMode={darkMode} />
                        ))}
                    </div>
                    <div className="col-md-3 d-none d-md-block" />
                </div>
            </div>
        </>
    );
}
