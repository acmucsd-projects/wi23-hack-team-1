import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";
import { Card, CardActions, CardMedia, CardContent, Typography, Rating } from '@mui/material';
import "./Home.css";
import restaurant from '../restaurant.jpeg';
function Home(){
    const [value, setValue] = useState(3);
    return (
        <div className='home_page'>
            <Navbar />
            <div className='home_posts'>
                <Card sx={{ maxWidth: "50%", display: "flex" }}>
                <CardMedia
                sx={{ height: 200, width: "100%"}}
                image={restaurant}
                />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        In-n-out
                        </Typography>
                        <Typography variant="body2" color="info.main"> Profile of User</Typography>
                        <Typography variant="body2" color="text.secondary">
                        Yummy burgers and ggsfjkfgdjkljfd
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Rating
                            name="read-only"
                            value={value}
                            precision={0.5}
                            sx = {{ fontSize: "2rem", color: "#4285F4"}}
                            readOnly
                        />
                    </CardActions>
                </Card>
            </div>
            <div className='home_posts'>
                <Card sx={{ maxWidth: "50%", display: "flex" }}>
                <CardMedia
                sx={{ height: 200, width: "100%"}}
                image={restaurant}
                />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        McDonalds
                        </Typography>
                        <Typography variant="body2" color="info.main"> Profile of User</Typography>
                        <Typography variant="body2" color="text.secondary">
                        Yummy burgers and ggsfjkfgdjkljfd
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Rating
                            name="read-only"
                            value={value}
                            precision={0.5}
                            sx = {{ fontSize: "2rem", color: "#4285F4"}}
                            readOnly
                        />
                    </CardActions>
                </Card>
            </div>
            <div className='home_posts'>
                <Card sx={{ maxWidth: "50%", display: "flex" }}>
                <CardMedia
                sx={{ height: 200, width: "100%"}}
                image={restaurant}
                />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Taco Bell
                        </Typography>
                        <Typography variant="body2" color="info.main"> Profile of User</Typography>
                        <Typography variant="body2" color="text.secondary">
                        Yummy burgers and ggsfjkfgdjkljfd
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Rating
                            name="read-only"
                            value={value}
                            precision={0.5}
                            sx = {{ fontSize: "2rem", color: "#4285F4"}}
                            readOnly
                        />
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}

export default Home;