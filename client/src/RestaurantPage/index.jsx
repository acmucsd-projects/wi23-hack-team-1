import React, { useState, useEffect } from "react";
import "./style.css";
import StarRating from "../StarRating/index.jsx";
import PostImage from "../PostImage/index.jsx";
import Navbar from "../Navbar/index.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const serverURL = 'http://localhost:3000';

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Use axios to send a GET request to the server to retrieve the restaurant data
    axios.get(`${serverURL}/restaurant/${id}`).then((response) => {
      setRestaurant(response.data);
    });

    // Use axios to send a GET request to the server to retrieve the restaurant's posts
    axios.get(`${serverURL}/posts/${id}`).then((response) => {
      setPosts(response.data);
    });
  }, [id]);

  // Get the total number of stars for all the posts; total is the accumulator; post is object in array; 0 is initial value
  const totalStars = posts.reduce((total, post) => total + post.stars, 0);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="left-side">
          <div className="res-info">
            {restaurant ? (
              <>
                <img
                  src={restaurant.image}
                  alt="restaurant pic"
                  className="res-picture"
                />
                <div className="res-details">
                  <h2 className="name">{restaurant.name}</h2>
                  <p className="posts">Number of posts: {posts.length}</p>
                  <StarRating totalPosts={posts.length} totalStars={totalStars} />
                </div>
              </>
            ) : (
              <p>Loading restaurant...</p>
            )}
          </div>
          <div className="follower-list">
            <h2>Followers</h2>
            {restaurant && restaurant.followers.length > 0 ? (
              restaurant.followers.map((follower) => (
                <div className="follower-card" key={follower._id}>
                  <img src={follower.profilePic} alt={follower.username} />
                  <div className="follower-card-info">
                    <div className="follower-name">{follower.username}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>No followers to display</p>
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
                    <PostImage image={post.image} link={post.user.url} />
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

export default RestaurantPage;
