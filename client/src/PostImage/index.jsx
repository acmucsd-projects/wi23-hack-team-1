import React from "react";
import "./style.css";

const PostImage = ({ image, link }) => {
  return (
    <a href={link} className="post-image-link">
      <div className="post-image-card">
        <img src={image} alt="Post" className="post-image" />
        <div className="post-image-overlay">
          <div className="post-image-text">Click to view post</div>
        </div>
      </div>
    </a>
  );
};

export default PostImage;
