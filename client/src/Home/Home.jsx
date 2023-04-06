import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";
import Maps from "../Maps/Maps";
import { Card, CardActions, CardMedia, CardContent, Typography, Rating, Button } from '@mui/material';
import API from '../API';
import "./Home.css";
function Home(){
    const user = localStorage.getItem('user');
    const [posts, setPosts] = useState([]);
    const [selected, setSelected] = useState(0);
    const handlePostClick = async (item) => {
        setSelected(item+1);
    }
    const navigate = useNavigate();
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
                setPosts(posts => posts.concat(post_info));
            }
        }
    }
    if (!user) return navigate("/");
    handlePostDashboard();
    return () => {
        setPosts([]);
      };
    }, []);
    return (
        <div className='home_page'>
            <div className='left_home'>
            <Navbar />
            {posts.map((post, index) =>
                <div className='home_posts'>
                <Card key={post.id} sx={{ maxWidth: "100%", display: "flex" }}>
                <CardMedia
                sx={{ width: "50%"}}
                image={post.image}
                />
                    <CardContent sx={{ textAlign: "left", width: "80%"}}>
                    <CardActions sx={{ padding: "0px", marginBottom: "1%"}}>
                        <Rating
                            name="read-only"
                            value={post.stars}
                            precision={0.5}
                            sx = {{ fontSize: "2rem", color: "#4285F4"}}
                            readOnly
                        />
                    </CardActions>
                        <Typography gutterBottom variant="caption" color="text.secondary" component="div">
                            {post.restaurant}
                        </Typography>
                        <Button sx={{ fontWeight: "600", 
                        color: "#080808", 
                        textAlign: "left",
                        padding: "0px",
                        fontSize: "1em"}} onClick={() => handlePostClick(index)}>
                                {post.postTitle}
                        </Button>
                        <Typography variant="body2" color="info.main" sx={{ marginBottom: "5%"}}> {post.username}</Typography>
                        <Typography variant="body2">
                        {post.review}
                        </Typography>
                    </CardContent>
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