import React from "react";
import "./style.css";
import StarRating from "../StarRating/index.jsx";
import PostImage from "../PostImage/index.jsx";

const ProfilePage = (props) => {
  return (
    <div className="container">
      <div className="left-side">
        <div className="user-info">
          <img
            src="https://i.redd.it/6bz2c53fbyo31.jpg"
            alt="User's Profile Picture"
            className="profile-picture"
          />
          <div className="user-details">
            <h2 className="name">John Doe</h2>
            <p className="posts">Number of posts: 200</p>
            <StarRating numStars={props.numStars} /> {/* will be replaced with average star rating */}
          </div>
        </div>
        <div className="friends-list">
          <h2>Friends</h2>
          <ul>
            <li>Jane Doe</li>
            <li>Jane Doe</li>
            <li>Jane Doe</li>
            <li>Jane Doe</li>
            <li>Jane Doe</li>
          </ul>
        </div>
      </div>
      <div className="right-side">
        <div className="timeline">
          <h2>Timeline</h2>
          <div className="post-container">
            <div className="post">
              <PostImage image="https://i.redd.it/6bz2c53fbyo31.jpg" link="https://www.youtube.com" />
            </div>
            <div className="post">
              <PostImage image="https://i.redd.it/6bz2c53fbyo31.jpg" link="https://www.youtube.com" />
            </div>
            <div className="post">
              <PostImage image="https://i.redd.it/6bz2c53fbyo31.jpg" link="https://www.youtube.com" />
            </div>
            <div className="post">
              <PostImage image="https://i.redd.it/6bz2c53fbyo31.jpg" link="https://www.youtube.com" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
