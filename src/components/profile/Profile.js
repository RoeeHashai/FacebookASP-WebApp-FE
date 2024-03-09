import React, { useState, useContext, useEffect } from 'react';
import NavbarFeed from '../navbarFeed/NavbarFeed';
import Post from '../post/Post';
import postsData from '../../data/posts.json';
import userData from '../../data/users.json';
// import users from '../../data/users.json';
import './Profile.css';
import { DarkModeContext } from '../context/DarkModeContext';
import { useParams, Link } from 'react-router-dom';
import ContactsList from '../contactsList/ContactsList';
import { useNavigate } from 'react-router-dom';

export default function Profile({ }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();
    // Accessing dark mode context
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    // const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [isFriend, setIsFriend] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [friendRequestSent, setFriendRequestSent] = useState(false);
    const { targetUserId } = useParams();
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Added loading state
    const [postList, setPostList] = useState([]);

    console.log('targetUserId: ', targetUserId);

    const deletePost = ({ pid }) => {
        setPostList((prevPost) => prevPost.filter((post) => post._id !== pid));
    }

    const editPost = (editedPost) => {
        // Search in the post list for the post that needs to be edited and update the post
        setPostList((prevPosts) =>
            prevPosts.map((post) => (post._id === editedPost._id ? editedPost : post))
        );
    };
    const handleAddFriend = async () => {
        // Implement logic to send a friend request or perform necessary actions
        try {
            const response = await fetch(`/api/users/${targetUserId}/friends`, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                console.log(`Friend request sent to ${profileUser.name}`);
                setFriendRequestSent(true);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle the add friend button click
    const handleRemoveFriend = async () => {
        // Implement logic to send a friend request or perform necessary actions
        try {
            const response = await fetch(`/api/users/${user._id}/friends/${targetUserId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                console.log(`Friend connection remove to ${profileUser.name}`);
                navigate('/feed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        console.log(`Friend connection remove to ${profileUser.name}`);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true); // Start loading

            const userDetailsData = await fetch(`/api/users/${targetUserId}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const userDetails = await userDetailsData.json();
            setProfileUser(userDetails);

            // check if the user is a friend
            const friendsCheckData = await fetch(`/api/users/${user._id}/friends`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const friendsCheck = await friendsCheckData.json();
            const isFriend = friendsCheck.friends.some(friend => friend._id === targetUserId && friend.status === 'approved');
            const isPending = friendsCheck.friends.some(friend => friend._id === targetUserId && friend.status === 's-pending');
            setIsPending(isPending);
            const myProfile = user._id === targetUserId;
            setIsMyProfile(myProfile);
            console.log('isFriend: ', isFriend);
            if (isFriend || myProfile) {
                setIsFriend(true);
                const friendsListData = await fetch(`/api/users/${targetUserId}/friends`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const friendsList = await friendsListData.json();
                const approvedFriends = friendsList.friends.filter(friend => friend.status === 'approved');
                setFriends(approvedFriends);
                const postsData = await fetch(`/api/users/${targetUserId}/posts`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const posts = await postsData.json();
                setPostList(posts);
            }
            else {
                setIsFriend(false);
            }
            setIsLoading(false); // End loading
        }
        fetchUserData();
    }, [user, targetUserId]);

    return (
        <div className={`${darkMode ? 'dark-bg' : ''}`}>
            <NavbarFeed toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

            {isLoading ? (
                <div className="spinner-container">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                // Main content to render after loading is complete
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
                            {((isFriend && !isMyProfile) || isPending) && (
                                <button className="btn shadow btn-outline-danger w-100" onClick={handleRemoveFriend}>
                                    <i className="bi bi-x-circle me-2"></i>Unfriend</button>
                            )}
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
                                    {postList.map((post) => (
                                        <Post users={userData} user={user} post={post} onDelete={deletePost}
                                            onEdit={editPost} darkMode={darkMode} />
                                    ))}

                                </div>
                            ) : (
                                <div>
                                    {/* Add friend button */}
                                    <button className="btn btn-primary shadow w-100" onClick={handleAddFriend}>
                                        {(friendRequestSent || isPending) ? (
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
                            <ul className={`list-group ${darkMode ? 'darkmode-menu' : ''}`}>
                                {/* only if firend in can see the firneds list need to fetch this get req*/}
                                {isFriend &&
                                    <ContactsList friends={friends} darkMode={darkMode} user={user} />
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
