import React, { useState, useContext, useEffect } from 'react';
import NavbarFeed from '../navbarFeed/NavbarFeed';
import Menu from '../menu/Menu';
import PostGen from '../postGen/PostGen';
import Post from '../post/Post';
import RightMenu from '../rightMenu/RightMenu';
import { DarkModeContext } from '../context/DarkModeContext';
import './Feed.css';

export default function Feed({ }) {
    const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Get the user data from local storage
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    const addConnectedUser = (user) => {
        setUser(user);
    };
    const addPost = (post) => {
        setPostList((prevPost) => [post, ...prevPost]);
    };

    const deletePost = ({ pid }) => {
        // Filter out the post with the given id and update the post list
        setPostList((prevPost) => prevPost.filter((post) => post._id !== pid));
    }

    const editPost = (editedPost) => {
        // Search in the post list for the post that needs to be edited and update the post list
        setPostList((prevPosts) =>
            prevPosts.map((post) => (post._id === editedPost._id ? editedPost : post))
        );
    };

    useEffect(() => {
        const fetchUserAndPosts = async () => {
            setIsLoading(true); // Set loading to true while user and posts are being fetched
            try {
                const postsResponse = await fetch('/api/posts', {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (postsResponse.ok) { // If the response is okay, set the posts list
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

    return (
        <div className={`${darkMode ? 'dark-bg' : ''}`}>
            <NavbarFeed />
            <div className="container-fluid feedcontainer">
                <div className="row">
                    <div className="col-md-3 d-none side-column d-md-block">
                        {isLoading ? null : (
                            <div>
                                <Menu
                                    user={user}
                                    addConnectedUser={addConnectedUser} />
                            </div>
                        )
                        }
                    </div>
                    <div className="col-md-6 middle-column">
                        {isLoading ? (
                            <div className="spinner-container">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Render PostGen and post list only when not loading */}
                                <PostGen
                                    user={user}
                                    addPost={addPost} />
                                {/* Mapping through posts and rendering individual post components */}
                                {postList.map((post) => (
                                    <Post
                                        user={user}
                                        post={post}
                                        onDelete={deletePost}
                                        onEdit={editPost}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                    <div className="col-md-3 d-none side-column d-md-block">
                        {isLoading ? null : (
                            <div>
                                <RightMenu
                                    user={user}
                                />
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
