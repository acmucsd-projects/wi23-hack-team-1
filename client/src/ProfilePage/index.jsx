import React, { useState, useEffect } from "react";
import "./style.css";
import StarRating from "../StarRating/index.jsx";
import PostImage from "../PostImage/index.jsx";
import Navbar from "../Navbar/index.jsx";
import API from "../API";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching user with id:", userId);
        const dbusers = await API.getUsers();
        console.log("Users: ", dbusers);
        const userResponse = await API.getUser(userId);
        console.log("User response:", userResponse.data);
        const postResponse = await API.getPosts();

        setUser(userResponse.data);
        setPosts(postResponse.data);
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
  const totalStars = posts.reduce((total, post) => total + post.stars, 0);

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
                  <p className="posts">Number of posts: {user.postCount}</p>
                  <StarRating totalPosts={user.postCount} totalStars={totalStars} />
                </div>
              </>
            ) : (
              <p>No user found</p>
            )}
          </div>
          <div className="friends-list">
            <h2>Friends</h2>
            {user && user.friendCount > 0 ? (
              <p>{user.friendCount} friends to display</p>
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
