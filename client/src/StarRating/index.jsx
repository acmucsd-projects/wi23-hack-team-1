import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./style.css";

const StarRating = ({ totalPosts, totalStars }) => {
  const averageStars = totalStars / totalPosts;
  const fullStars = Math.floor(averageStars);
  const hasHalfStar = averageStars - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-container">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={i} className="star" />
      ))}
      {hasHalfStar && <StarBorderIcon className="star" />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarBorderIcon key={i + fullStars + 1} className="empty-star" />
      ))}
    </div>
  );
};

export default StarRating;
