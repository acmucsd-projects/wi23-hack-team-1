import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./style.css";
// Page Components
import StarRating from "components/StarRating";
import PostImage from "components/PostImage";
import ProfileNavbar from "components/ProfileNavbar";
import API from "api/API";
// Mui Components
import { Autocomplete, TextField, Avatar, List,
ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const current_user = localStorage.getItem('user');

  const handleAddClick = async (user_selected) => {
    if (user.friends.includes(user_selected.id)) {
      console.log('New friend data:', user_selected);
      return; // If the user is the current user or the user is already a friend, do nothing.
    }
  
    try {
      const updatedUser = { ...user, friends: [...user.friends, user_selected.id] };
      const newUser = await API.updateUser(current_user, updatedUser); // Call an API to update the user's friend list in the database.
      // Fix code so that friend is added without having to do additional api call
      setFriends((prevFriends) => [...prevFriends, user_selected]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [userResponse, postResponse, allUsersResponse] = await Promise.all([
          API.getUser(current_user),
          API.getPosts(),
          API.getUsers()
        ]);
        
        // Sets variables with all the data 
        const user = userResponse.data;
        const posts = postResponse.data;
        const allUsers = allUsersResponse.data.filter(user => user._id !== current_user).map(
          user => ({ id: user._id, label: user.username }));
        
        // Fetch all friends concurrently
        const friendPromises = user.friends.map(friendId => API.getUser(friendId));
        const friendResponses = await Promise.all(friendPromises);
        const friendsData = friendResponses.map(response => response.data);
        
        // Updates the states
        setUser(user);
        setPosts(posts);
        setFriends(friendsData);
        setAllUsers(allUsers);
        
        // Loads page once all data is fetched
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setUser(null);
      }
    }
    if (!current_user) return navigate("/");
    fetchData();
    return () => {
      setAllUsers([]);
    };
  }, []);

  // Get the total number of stars for all the posts; total is the accumulator; post is object in array; 0 is initial value
  const userPosts = posts.filter(post => post.username === user._id);
  const totalStars = userPosts.reduce((total, post) => total + post.stars, 0);
  return (
    <div>
      <ProfileNavbar />
      <div className="container">
        <div className="left-side">
          <div className="user-info">
            {loading ? ( // check if data is still loading
              <p>Loading user...</p>
            ) : user ? (
              <>
                <Avatar sx={{width: 100, height: 100, marginRight: "10%"}} alt={user.username} src={user.image} />
                <div className="user-details">
                  <h2 className="name">{user.username}</h2>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={allUsers}
                    sx={{ width: 200 }}
                    onChange={(event, newValue) => {
                      handleAddClick(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Add Friends" />}
                  />
                  <p className="posts">Number of posts: {userPosts.length}</p>
                  <StarRating totalPosts={userPosts.length} totalStars={totalStars} />
                </div>
              </>
            ) : (
              <p>No user found</p>
            )}
          </div>
          <h2>Friends</h2>
          <div className="friends-list">
            {friends.length > 0 ? (
              <List>
                {friends.map((friend) => {
                  return (
                    <div className="friend-component" key={friend._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={friend.username} src={friend.image} />
                      </ListItemAvatar>
                      <ListItemText primary={friend.username} />
                    </ListItem>
                    </div>
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
