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
    const [user, setUser] = useState(null); // Get the user data from local storage
    const { darkMode } = useContext(DarkModeContext);
    const [friendsList, setFriendsList] = useState([]);

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
                const userResponse = await fetch(`api/users/${JSON.parse(localStorage.getItem('user_id'))}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (userResponse.ok) { // If the response is okay, set the user data
                    const userData = await userResponse.json();
                    setUser(userData);
                }
                const friendsResponse = await fetch(`/api/users/${JSON.parse(localStorage.getItem('user_id'))}/friends`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (friendsResponse.ok) { // If the response is okay, set the friends list
                    const friendsData = await friendsResponse.json();
                    setFriendsList(friendsData.friends);
                }
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

    return user ? (
        <div className={`${darkMode ? 'dark-bg' : ''}`}>
            <NavbarFeed />
            <div className="container-fluid feedcontainer">
                <div className="row">
                    <div className="col-md-3 d-none side-column d-md-block">
                        {!isLoading && (
                            <Menu
                                user={user}
                                addConnectedUser={addConnectedUser} />
                        )}
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
                                <PostGen
                                    user={user}
                                    addPost={addPost} />
                                {postList.map((post) => (
                                    <Post
                                        key={post._id}
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
                        {!isLoading && (
                            <RightMenu user={user} friends={friendsList} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        // This will be rendered while `user` is null or loading
        null
    );
    
}
