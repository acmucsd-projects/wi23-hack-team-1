import React from "react";
import "./style.css";
import StarRating from "../StarRating/index.jsx";
import PostImage from "../PostImage/index.jsx";
import Navbar from "../Navbar/index.jsx";

const RestaurantPage = () => {
  return (
    <div>
      <Navbar /> {/* include the Navbar component */}
      <div className="container">
        <div className="left-side">
          <div className="user-info">
            <img
              src="https://i.redd.it/6bz2c53fbyo31.jpg"
              alt="profile pic"
              className="profile-picture"
            />
            <div className="user-details">
              <h2 className="name">John Doe</h2>
              <p className="posts">Number of posts: 200</p>
              <StarRating numStars={3.5} />
            </div>
          </div>
          <div class="friends-list">
            <h2>Friends</h2>
            <div class="friend-card">
              <img src="res1.jpg" alt="Res 1" />
              <div class="friend-card-info">
                <div class="friend-name">Res 1</div>
            </div>
          </div>
          <div class="friend-card">
            <img src="res2.jpg" alt="Res 2" />
            <div class="friend-card-info">
              <div class="friend-name">Res 2</div>
            </div>
          </div>
          <div class="friend-card">
            <img src="res3.jpg" alt="Res 3" />
            <div class="friend-card-info">
              <div class="friend-name">Res 3</div>
            </div>
          </div>
          <div class="friend-card">
            <img src="res4.jpg" alt="Res 4" />
            <div class="friend-card-info">
              <div class="friend-name">Res 4</div>
            </div>
          </div>
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
    </div>
  );
};

export default RestaurantPage;
