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

const RestaurantPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleAddClick = () => {
    alert("Restaurant followed"); // not implemented.
  }

  const { resId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching restaurant with id:", resId);
        const resResponse = await API.getRestaurant(resId);
        console.log("Restaurant response:", resResponse.data);
        const postResponse = await API.getPosts();

        setRestaurant(resResponse.data);
        setPosts(postResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setRestaurant(null);
      }
    }

    fetchData();
  }, [resId]);

  // Get the total number of stars for all the posts; total is the accumulator; post is object in array; 0 is initial value
  const resPosts = posts.filter(post => post.restaurant === restaurant._id);
  const totalStars = resPosts.reduce((total, post) => total + post.stars, 0);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="left-side">
          <div className="res-info">
            {loading ? ( // check if data is still loading
              <p>Loading restaurant...</p>
            ) : restaurant ? (
              <>
                <img
                  src={restaurant.image} // meant to take from google maps?
                  alt="res pic"
                  className="res-picture"
                />
                <div className="res-details">
                  <h2 className="name">{restaurant.title}</h2>
                  <Chip
                    label="Follow restaurant"
                    onClick={handleAddClick}
                    color="primary"
                    variant="outlined"
                  />
                  <p className="posts">Number of posts: {resPosts.length}</p>
                  <StarRating totalPosts={resPosts.length} totalStars={totalStars} />
                </div>
              </>
            ) : (
              <p>No restaurant found</p>
            )}
          </div>
          <div className="follower-list">
            <h2>Recent Visitors</h2> {/* decided to make my life easier and do visitors instead of followers */}
            {resPosts.length > 0 ? (
              <List>
                {resPosts.map((visitorId) => {
                  const visitor = API.getUser(visitorId);
                  return (
                    <ListItem key={visitor._id}>
                      <ListItemAvatar>
                        <Avatar alt={visitor.username} src={visitor.image} />
                      </ListItemAvatar>
                      <ListItemText primary={visitor.username} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <p>No visitors to display</p>
            )}
          </div>
        </div>
        <div className="right-side">
          <div className="timeline">
            <h2>Timeline</h2>
            <div className="post-container">
              {resPosts.length > 0 ? (
                resPosts.map((post) => (
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

export default RestaurantPage;
