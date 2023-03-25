import React, { useState, useEffect } from "react";
import "./style.css";
import StarRating from "../StarRating/index.jsx";
import PostImage from "../PostImage/index.jsx";
import Navbar from "../Navbar/index.jsx";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Use axios to send a GET request to the server to retrieve the user data
    axios.get("/api/user").then((response) => {
      setUser(response.data);
    });

    // Use axios to send a GET request to the server to retrieve the user's posts
    axios.get("/api/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div>
      <Navbar /> {/* include the Navbar component */}
      <div className="container">
        <div className="left-side">
          <div className="user-info">
            {user ? (
              <>
                <img
                  src={user.profilePic}
                  alt="profile pic"
                  className="profile-picture"
                />
                <div className="user-details">
                  <h2 className="name">{user.username}</h2>
                  <p className="posts">Number of posts: {posts.length}</p>
                  <StarRating numStars={user.avgStars} />
                </div>
              </>
            ) : (
              <p>Loading user...</p>
            )}
          </div>
          <div className="friends-list">
            <h2>Friends</h2>
            {user && user.friends.length > 0 ? (
              user.friends.map((friend) => (
                <div className="friend-card" key={friend._id}>
                  <img src={friend.profilePic} alt={friend.username} />
                  <div className="friend-card-info">
                    <div className="friend-name">{friend.username}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>No friends to display</p>
            )}
          </div>
        </div>
        <div className="right-side">
          <div className="timeline">
            <h2>Timeline</h2>
            <div className="post-container">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div className="post" key={post._id}>
                    <PostImage image={post.image} link={post.restaurant.url} />
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
