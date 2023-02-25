import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from "../Navbar";
function Home(){
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <Button variant="contained" onClick={() => navigate("/post")}>Make A Post</Button>
        </div>
    )
}

export default Home;