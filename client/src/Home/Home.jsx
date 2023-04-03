import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import Maps from "../Maps/Maps";
import { Card, CardActions, CardMedia, CardContent, Typography, Rating } from '@mui/material';
import API from '../API';
import "./Home.css";
import restaurant from '../restaurant.jpeg';
function Home(){
    const user = localStorage.getItem('user');
    const [posts, setPosts] = useState([]);
    const [selected, setSelected] = useState(0);
    const handlePostClick = async (item) => {
        setSelected(item+1);
    }
    useEffect(() => {
    const handlePostDashboard = async () => {
        const all_posts = await API.getPosts();
        for (let post of all_posts.data){
            if (post.username !== user){
                const post_user = await API.getUser(post.username);
                const post_restaurant = await API.getRestaurant(post.restaurant);
                const post_info = {
                    id: post._id,
                    username: post_user.data.username,
                    restaurant: post_restaurant.data.title,
                    location: {lat: post_restaurant.data.location.latitude, 
                        lng: post_restaurant.data.location.longitude},
                    image: post.image,
                    postTitle: post.postTitle,
                    review: post.review,
                    stars: post.stars
                }
                setPosts(posts => posts.concat(post_info))
            }
        }
    }
    handlePostDashboard();
    }, []);
    return (
        <div className='home_page'>
            <div className='left_home'>
            <Navbar />
            {posts.map((post, index) =>
                <div className='home_posts'>
                <Card key={post.id} sx={{ maxWidth: "100%", display: "flex" }}>
                <CardMedia
                sx={{ height: 205, width: "50%"}}
                image={restaurant}
                />
                    <CardContent sx={{ textAlign: "left"}}>
                        <Typography gutterBottom variant="caption" color="text.secondary" component="div">
                            {post.restaurant}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ fontWeight: "600", textDecoration: "underline"}} onClick={() => handlePostClick(index)}>
                            {post.postTitle}
                        </Typography>
                        <Typography variant="body2" color="info.main" sx={{ marginBottom: "10%"}}> {post.username}</Typography>
                        <Typography variant="body2">
                        {post.review}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Rating
                            name="read-only"
                            value={post.stars}
                            precision={0.5}
                            sx = {{ fontSize: "2rem", color: "#4285F4"}}
                            readOnly
                        />
                    </CardActions>
                </Card>
                    </div>
                )}
            </div>      
            <div className='map_page'>
                <Maps posts={posts} selected={selected}/>
            </div>
                
        </div>
    )
}

export default Home;