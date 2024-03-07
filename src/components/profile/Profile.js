import React, { useState, useContext, useEffect } from 'react';
import NavbarFeed from '../navbarFeed/NavbarFeed';
import Post from '../post/Post';
import './Profile.css';
import { DarkModeContext } from '../context/DarkModeContext';
import { useParams, Link } from 'react-router-dom';
import ContactsList from '../contactsList/ContactsList';
import { useNavigate } from 'react-router-dom';

export default function Profile({ }) {
    const { targetUserId } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { darkMode } = useContext(DarkModeContext);
    const [friends, setFriends] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [isFriend, setIsFriend] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [friendRequestSent, setFriendRequestSent] = useState(false);
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [postList, setPostList] = useState([]);

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
        try {
            const response = await fetch(`/api/users/${targetUserId}/friends`, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setFriendRequestSent(true);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemoveFriend = async () => {
        try {
            const response = await fetch(`/api/users/${user._id}/friends/${targetUserId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                navigate('/feed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const userResponse = await fetch(`/api/users/${JSON.parse(localStorage.getItem('user_id'))}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, []);

    // Fetch related data once user is available
    useEffect(() => {
        if (!user) return; // Ensure user is fetched before proceeding

        const fetchRelatedData = async () => {
            setIsLoading(true);

            try {
                // Fetch the target user details and set the state to display the profile of target user
                const userDetailsData = await fetch(`/api/users/${targetUserId}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const userDetails = await userDetailsData.json();
                setProfileUser(userDetails);

                // Fetch the friends list of connected user to determine if the target user is a friend
                const friendsCheckData = await fetch(`/api/users/${user._id}/friends`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const friendsCheck = await friendsCheckData.json();
                // Check if the connected user is a friend or if the connected user is pending a friend request
                const isFriend = friendsCheck.friends.some(friend => friend._id === targetUserId && friend.status === 'approved');
                const isPending = friendsCheck.friends.some(friend => friend._id === targetUserId && friend.status === 's-pending');
                setIsPending(isPending);

                // determine if the page is the connected user's profile
                const myProfile = user._id === targetUserId;
                setIsMyProfile(myProfile);

                if (isFriend || myProfile) {
                    setIsFriend(true); // Set the state to display the friends list
                    const friendsListData = await fetch(`/api/users/${targetUserId}/friends`, {
                        method: 'GET',
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    const friendsList = await friendsListData.json();
                    // Filter the friends list to display only approved friends not to show the pending friends on the contacts list
                    const approvedFriends = friendsList.friends.filter(friend => friend.status === 'approved');
                    setFriends(approvedFriends);

                    // Fetch the posts of the target user
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

            } catch (error) {
                console.error('Error fetching related data:', error);
            }

            setIsLoading(false);
        };

        fetchRelatedData();
    }, [user, targetUserId]);

    return user ? (
        <div className={`${darkMode ? 'dark-bg' : ''}`}>
            <NavbarFeed />

            {isLoading ? (
                <div className="spinner-container">
                    <div className="spinner-border text-primary" role="status">
                    </div>
                </div>
            ) : (
                <div className="container-fluid profilecontainer">
                    <div className="row">
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
                                        <Post key={post._id}
                                            user={user}
                                            post={post}
                                            onDelete={deletePost}
                                            onEdit={editPost}
                                            darkMode={darkMode} />
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

                        <div className="col-md-3 d-none side-column d-md-block">
                            <ul className={`list-group ${darkMode ? 'darkmode-menu' : ''}`}>
                                {/* only if firend in can see the firneds list need to fetch this get req*/}
                                {isFriend &&
                                    <ContactsList friends={friends} 
                                    user={user} 
                                    {...(!isMyProfile && { nametoDisplay: profileUser.name })}

                                    />
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : null;
}
