import React, { useState, useContext, useEffect } from 'react';
import NavbarFeed from '../navbarFeed/NavbarFeed';
import Menu from '../menu/Menu';
import PostGen from '../postGen/PostGen';
import Post from '../post/Post';
import RightMenu from '../rightMenu/RightMenu';
import postsData from '../../data/posts.json';
import './Feed.css';
import { DarkModeContext } from '../context/DarkModeContext';

export default function Feed({ }) {
    // State to manage the list of posts
    // get the posts from the server
    const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Added loading state
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const addConnectedUser = (user) => {
        setUser(user);
    };
    // Function to add a new post to the feed
    const addPost = (post) => {
        setPostList((prevPost) => [post, ...prevPost]);
        console.log("after adding a post:", postList);
    };

    const deletePost = ({ pid }) => {
        setPostList((prevPost) => prevPost.filter((post) => post._id !== pid));
    }

    const editPost = (editedPost) => {
        // Search in the post list for the post that needs to be edited and update the post
        setPostList((prevPosts) =>
            prevPosts.map((post) => (post._id === editedPost._id ? editedPost : post))
        );
    };
    useEffect(() => {
        const fetchUserAndPosts = async () => {
            setIsLoading(true);
            try {
                // // Fetch user data
                // const userResponse = await fetch(`/api/users/${localStorage.getItem('_id')}`, {
                //     method: 'GET',
                //     headers: {
                //         authorization: `Bearer ${localStorage.getItem('token')}`,
                //     },
                // });
                // if (userResponse.ok) {
                //     const userData = await userResponse.json();
                //     console.log('userData:', userData);
                //     setUser(userData);
                // }

                // Fetch posts data
                const postsResponse = await fetch('/api/posts', {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (postsResponse.ok) {
                    const postsData = await postsResponse.json();
                    setPostList(postsData);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserAndPosts();
    }, []);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await fetch('/api/posts', {
    //                 method: 'GET',
    //                 headers: {
    //                     authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 },
    //             });
    //             if (response.ok) {
    //                 const postsData = await response.json();
    //                 setPostList(postsData);
    //             }
    //         }
    //         catch (error) {
    //             console.error('Error:', error);
    //         }
    //         finally {
    //             setIsLoading(false);
    //         }
    //     }
    //     fetchPosts();
    // }, []);

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
                        {isLoading ? null : (
                            <div>
                                <Menu user={user} darkMode={darkMode} addConnectedUser={addConnectedUser} />
                            </div>
                        )
                        }

                    </div>
                    <div className="col-md-6 middle-column">
                        {/* Component to generate and display posts */}
                        {/* Mapping through posts and rendering individual post components */}
                        {isLoading ? (
                            <div className="spinner-container">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Render PostGen only when not loading */}
                                <PostGen user={user} darkMode={darkMode} addPost={addPost} />
                                {/* Mapping through posts and rendering individual post components */}
                                {postList.map((post) => (
                                    <Post  user={user} post={post} onDelete={deletePost}
                                        onEdit={editPost} darkMode={darkMode} />
                                ))}
                            </>
                        )}
                    </div>
                    <div className="col-md-3 d-none side-column d-md-block">
                        {isLoading ? null : (
                            <div>
                                {/* Right menu component */}
                                <RightMenu user={user} darkMode={darkMode} />
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
