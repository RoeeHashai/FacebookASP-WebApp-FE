import React, { useState, useContext } from 'react';
import NavbarFeed from '../navbarFeed/NavbarFeed';
import Menu from '../menu/Menu';
import PostGen from '../postGen/PostGen';
import Post from '../post/Post';
import RightMenu from '../rightMenu/RightMenu';
import postsData from '../../data/posts.json';
import './Feed.css';
import { DarkModeContext } from '../context/DarkModeContext';

export default function Feed({ users, user, token, addConnectedUser }) {
    // State to manage the list of posts
    // get the posts from the server
    const [posts, setPosts] = useState([...postsData]);
    // Function to add a new post to the feed
    const addPost = (post) => {
        setPosts((prevPost) => [post, ...prevPost]);
    };
    // // State to control dark mode
    // const [darkMode, setDarkMode] = useState(false);
    // // Function to toggle dark mode
    // const toggleDarkMode = () => {
    //     setDarkMode((prevMode) => !prevMode);
    // };
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    // get the friens req from the server

    return (
        <div className={`${darkMode ? 'dark-bg' : ''}`}>
            {/* Navbar component for the feed */}
            <NavbarFeed toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

            <div className="container-fluid feedcontainer">
                <div className="row">
                    <div className="col-md-3 d-none side-column d-md-block">
                        {/* Sidebar menu component */}
                        <Menu user={user} darkMode={darkMode} addConnectedUser={addConnectedUser} />
                    </div>
                    <div className="col-md-6 middle-column">
                        {/* Component to generate and display posts */}
                        <PostGen user={user} addPost={addPost} darkMode={darkMode} />
                        {/* Mapping through posts and rendering individual post components */}
                        {posts.map((post) => (
                            <Post key={post.id} users={users} user={user} post={post} setPosts={setPosts} darkMode={darkMode} />
                        ))}
                    </div>
                    <div className="col-md-3 d-none side-column d-md-block">
                        {/* Right menu component */}
                        <RightMenu user={user} darkMode={darkMode} token={token} />
                    </div>
                </div>
            </div>
        </div>
    );
}
