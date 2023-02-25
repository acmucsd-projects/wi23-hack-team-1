import React from "react";
import "./style.css";
import StarRating from "../StarRating/index.jsx";

const Post = (props) => {
  const { username, profilepicture, image, caption } = props;

  return (
    <article className="post">
      {/* profile picture */}
      <div className="post-header">
        <img src={profilepicture} alt={username} className="post-profile-picture" />
        <span className="post-username">{username}</span>
      </div>
      {/* image */}
      <div className="post-image-wrapper">
        <img src={image} alt={caption} className="post-image" />
      </div>
      {/* star rating */}
      <div className="star-rating">
        <StarRating numStars={props.numStars} />
      </div>
      {/* caption */}
      <div className="post-caption">
        <strong>{username}</strong> {caption}
      </div>
    </article>
  );
}

export default Post;
