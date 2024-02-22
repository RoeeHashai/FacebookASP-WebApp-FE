import React, { useState, useContext } from 'react';
import NavbarFeed from '../navbarFeed/NavbarFeed';
import Post from '../post/Post';
import postsData from '../../data/posts.json';
import './Profile.css';
import { DarkModeContext } from '../context/DarkModeContext';
import { useParams, Link } from 'react-router-dom';

export default function Profile({ users, user }) {
    // Accessing dark mode context
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    // State to manage the list of posts
    const [posts, setPosts] = useState([...postsData]);
    // State to track friend request status
    const [friendRequestSent, setFriendRequestSent] = useState(false);

    // Get the user and posts from server, check if friend to show posts
    const { userId } = useParams();

    // Find the user based on the userId parameter
    const profileUser = users.find((u) => u.id === parseInt(userId, 10));

    // Check if the profileUser is a friend of the logged-in user
    const isFriend = false; // This is a temporary solution to avoid errors

    // Handle the add friend button click
    const handleAddFriend = () => {
        // Implement logic to send a friend request or perform necessary actions
        console.log(`Friend request sent to ${profileUser.name}`);
        setFriendRequestSent(true);
    };

    // Handle the add friend button click
    const handleRemoveFriend = () => {
        // Implement logic to send a friend request or perform necessary actions
        console.log(`Friend connection remove to ${profileUser.name}`);
    };

    return (
        <div className={`${darkMode ? 'dark-bg' : ''}`}>
            {/* Navbar component for the feed */}
            <NavbarFeed toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

            <div className="container-fluid profilecontainer">
                <div className="row">
                    {/* Side column with profile image and name */}
                    <div className="col-md-3 d-none side-column d-md-block text-center">
                        <div>
                            <img
                                src={profileUser.image}
                                alt={profileUser.name}
                                className="img-fluid shadow mt-5 rounded-circle mb-3"
                                style={{ width: '150px', height: '150px' }}
                            />
                        </div>
                        <div>
                            <p className='profile-name' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>{profileUser.name}</p>
                        </div>
                    </div>

                    {/* Middle column with back button and content */}
                    <div className="col-md-6 middle-column">
                        {/* Back button */}
                        <Link to='/feed'>
                            <button className='btn mt-3 border-0'>
                                <i className="bi bi-arrow-left"></i>
                            </button>
                        </Link>

                        {/* Render posts or add friend button based on friendship status */}
                        {isFriend ? (
                            <div>
                                {posts.map((post) => (
                                    <Post key={post.id} users={users} user={user} post={post} setPosts={setPosts} darkMode={darkMode} />
                                ))}
                                <button className="btn shadow btn-outline-danger w-100" onClick={handleRemoveFriend}> <i className="bi bi-x-circle me-2"></i>Unfriend</button>
                            </div>
                        ) : (
                            <div>
                                {/* Add friend button */}
                                <button className="btn btn-primary shadow w-100" onClick={handleAddFriend}>
                                    {friendRequestSent ? (
                                        <><i className="bi bi-check-circle-fill me-2"></i>Friend Request Sent</>
                                    ) : (
                                        <>
                                            <i className="bi bi-person-plus-fill me-2"></i>
                                            Add Friend
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right-side column (placeholder for existing content) */}
                    <div className="col-md-3 d-none side-column d-md-block">
                        {/* Your existing content */}
                    </div>
                </div>
            </div>
        </div>
    );
}
