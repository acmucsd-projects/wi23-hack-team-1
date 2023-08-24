import React, { useState } from "react";
import "./style.css";

const PostImage = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="post-image-link" onClick={handleClick}>
        <div className="post-image-card">
          <img src={image} alt="Post" className="post-image" />
          <div className="post-image-overlay">
            <div className="post-image-text">Click to view post</div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal">
            <img src={image} alt="Post" className="modal-image" />
            <div className="modal-link" onClick={handleClose}>
              Close
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostImage;

