import React, { useState, useEffect } from "react";
import "./style.css";
import StarRating from "../StarRating/index.jsx";
import PostImage from "../PostImage/index.jsx";
import Navbar from "../Navbar/index.jsx";
import API from "../API";
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const { userId } = useParams();
  const defaultUser = JSON.parse(localStorage.getItem('user'));

  const handleAddClick = async () => {
    if (user._id === defaultUser._id || defaultUser.friends.includes(userId)) {
      return; // If the user is the current user or the user is already a friend, do nothing.
    }
  
    try {
      const updatedUser = { ...defaultUser, friends: [...defaultUser.friends, userId] }; // Recreates the user object with a new friends list with the added friend.
      await API.updateUser(defaultUser._id, updatedUser); // Call an API to update the user's friend list in the database.
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Update the user object in localStorage with the new friend list.
      setFriends(updatedUser.friends);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching user with id:", userId);
        const userResponse = await API.getUser(userId);
        console.log("User response:", userResponse.data);
        const postResponse = await API.getPosts();

        setUser(userResponse.data);
        setPosts(postResponse.data);
        setFriends(userResponse.data.friends);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setUser(null);
      }
    }

    fetchData();
  }, [userId]);

  // Get the total number of stars for all the posts; total is the accumulator; post is object in array; 0 is initial value
  const userPosts = posts.filter(post => post.username === user._id);
  const totalStars = userPosts.reduce((total, post) => total + post.stars, 0);
  

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="left-side">
          <div className="user-info">
            {loading ? ( // check if data is still loading
              <p>Loading user...</p>
            ) : user ? (
              <>
                <img
                  src={user.image}
                  alt="profile pic"
                  className="profile-picture"
                />
                <div className="user-details">
                  <h2 className="name">{user.username}</h2>
                  <Chip
                    label="Add friend"
                    onClick={handleAddClick}
                    color="primary"
                    variant="outlined"
                  />
                  <p className="posts">Number of posts: {userPosts.length}</p>
                  <StarRating totalPosts={userPosts.length} totalStars={totalStars} />
                </div>
              </>
            ) : (
              <p>No user found</p>
            )}
          </div>
          <div className="friends-list">
            <h2>Friends</h2>
            {friends.length > 0 ? (
              <List>
                {friends.map((friendId) => {
                  const friend = API.getUser(friendId);
                  return (
                    <ListItem key={friend._id}>
                      <ListItemAvatar>
                        <Avatar alt={friend.username} src={friend.image} />
                      </ListItemAvatar>
                      <ListItemText primary={friend.username} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <p>No friends to display</p>
            )}
          </div>
        </div>
        <div className="right-side">
          <div className="timeline">
            <h2>Timeline</h2>
            <div className="post-container">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <div className="post" key={post._id}>
                    <PostImage image={post.image} />
                  </div>
                ))
              ) : (
                <p>No posts to display</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
