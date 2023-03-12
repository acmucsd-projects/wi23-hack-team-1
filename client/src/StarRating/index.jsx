import React from "react";
import "./style.css";

const StarRating = (props) => {
  const { rating } = props;

  return (
    <div className="star-rating">
      <span className={`star ${rating >= 0.5 ? "filled" : ""}`}>&#9733;</span>
      <span className={`star ${rating >= 1.5 ? "filled" : ""}`}>&#9733;</span>
      <span className={`star ${rating >= 2.5 ? "filled" : ""}`}>&#9733;</span>
      <span className={`star ${rating >= 3.5 ? "filled" : ""}`}>&#9733;</span>
      <span className={`star ${rating >= 4.5 ? "filled" : ""}`}>&#9733;</span>
    </div>
  );
};

export default StarRating;
