import React from "react";
import "./style.css";
import StarRating from "../StarRating/index.jsx";
import PostImage from "../PostImage/index.jsx";
import Navbar from "../Navbar/index.jsx";

const ProfilePage = () => {
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
              <img src="friend1.jpg" alt="Friend 1" />
              <div class="friend-card-info">
                <div class="friend-name">Friend 1</div>
            </div>
          </div>
          <div class="friend-card">
            <img src="friend2.jpg" alt="Friend 2" />
            <div class="friend-card-info">
              <div class="friend-name">Friend 2</div>
            </div>
          </div>
          <div class="friend-card">
            <img src="friend3.jpg" alt="Friend 3" />
            <div class="friend-card-info">
              <div class="friend-name">Friend 3</div>
            </div>
          </div>
          <div class="friend-card">
            <img src="friend4.jpg" alt="Friend 4" />
            <div class="friend-card-info">
              <div class="friend-name">Friend 4</div>
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

export default ProfilePage;
