import React from "react";
import { Card, CardActions, CardMedia, CardContent, Typography, Rating } from '@mui/material';
const PostCard = ({ post }) => {
    return (
    <Card sx={{ maxWidth: "100%", display: "flex" }}>
        <CardMedia
            sx={{ width: "50%" }}
            image={post.image}
        />
        <CardContent sx={{ textAlign: "left", width: "80%" }}>
            <CardActions sx={{ padding: "0px", marginBottom: "1%" }}>
                <Rating
                    name="read-only"
                    value={post.stars}
                    precision={0.5}
                    sx={{ fontSize: "2rem", color: "#4285F4" }}
                    readOnly
                />
            </CardActions>
            <Typography gutterBottom variant="caption" color="text.secondary" component="div">
                {post.restaurant}
            </Typography>
            <Typography variant="h6">{post.postTitle}</Typography>
            <Typography variant="body2" color="info.main" sx={{ marginBottom: "5%" }}> {post.username}</Typography>
            <Typography variant="body2">
                {post.review}
            </Typography>
        </CardContent>
    </Card>
)};
export default PostCard;