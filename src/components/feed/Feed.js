import React, { useState } from 'react';
import NavbarFeed from '../navbarFeed/NavbarFeed';
import Menu from '../menu/Menu';
import PostGen from '../postGen/PostGen';
import Post from '../post/Post';
import RightMenu from '../rightMenu/RightMenu';
import postsData from '../../data/posts.json';
import './Feed.css';

export default function Feed({ users, user }) {
    // State to manage the list of posts
    const [posts, setPosts] = useState([...postsData]);
    // State to control dark mode
    const [darkMode, setDarkMode] = useState(false);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    // Function to add a new post to the feed
    const addPost = (post) => {
        setPosts((prevPost) => [post, ...prevPost]);
    };

    return (
        <div className={`${darkMode ? 'dark-bg' : ''}`}>
            {/* Navbar component for the feed */}
            <NavbarFeed toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 d-none d-md-block">
                        {/* Sidebar menu component */}
                        <Menu user={user} darkMode={darkMode} />
                    </div>
                    <div className="col-md-6 middle-column">
                        {/* Component to generate and display posts */}
                        <PostGen user={user} addPost={addPost} darkMode={darkMode} />

                        {/* Mapping through posts and rendering individual post components */}
                        {posts.map((post) => (
                            <Post key={post.id} users={users} user={user} post={post} setPosts={setPosts} darkMode={darkMode} />
                        ))}
                    </div>
                    <div className="col-md-3 d-none d-md-block">
                        {/* Right menu component */}
                        <RightMenu user={user} darkMode={darkMode} users={users} />
                    </div>
                </div>
            </div>
        </div>
    );
}
