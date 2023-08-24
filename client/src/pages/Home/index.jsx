import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "components/Navbar";
import Maps from "components/Maps";
import PostCard from "components/PostCard";
import API from 'api/API';
import "./Home.css";
function Home() {
    const user = localStorage.getItem('user');
    const [posts, setPosts] = useState([]);
    const [selected, setSelected] = useState(0);
    const handlePostClick = (item) => {
        setSelected(item + 1);
    }
    const navigate = useNavigate();
    useEffect(() => {
        const handlePostDashboard = async () => {
            const all_posts = await API.getPosts();
            for (let post of all_posts.data) {
                if (post.username !== user) {
                    const post_user = await API.getUser(post.username);
                    const post_restaurant = await API.getRestaurant(post.restaurant);
                    const post_info = {
                        id: post._id,
                        username: post_user.data.username,
                        restaurant: post_restaurant.data.title,
                        location: {
                            lat: post_restaurant.data.location.latitude,
                            lng: post_restaurant.data.location.longitude
                        },
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
                    <div className='home_posts'
                    key={post.id}
                    onClick={() => handlePostClick(index)}>
                    <PostCard post={post} />
                </div>
                )}
            </div>
            <div className='map_page'>
                <Maps posts={posts} selected={selected} />
            </div>

        </div>
    )
}

export default Home;