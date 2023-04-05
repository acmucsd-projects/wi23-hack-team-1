import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Rating } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import API from "../API";
import "./Post.css";

require('dotenv').config();
const libraries = ["places"];

function Post(){
    const user = localStorage.getItem('user');
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [name, setName] = useState("");
    const [autocomplete, setAutocomplete] = useState(null);
    const [location, setLocation] = useState([0, 0]);
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(0);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const onLoad = (autocomplete) => setAutocomplete(autocomplete);
    const onPlaceChanged = () => {
      if (autocomplete !== null) {
        setLocation([autocomplete.getPlace().geometry.location.lat(), 
        autocomplete.getPlace().geometry.location.lng()])
        setName(autocomplete.getPlace().name);
        setSearchQuery(autocomplete.getPlace().name);
        setDescription(autocomplete.getPlace().formatted_address);
      }
    };
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const form = new FormData();
      form.append('image', file)
      setImage(form);
    };
    useEffect(() => {
    const handleRestaurant = async () => {
      const restaurants = await API.getRestaurants();
      let restaurantFound = false;
      for (let res of restaurants.data){
        if (res.location.latitude === location[0] && res.location.longitude === location[1]){
            restaurantFound = true;
            setRestaurant(res._id);
        }
      }
      if (name && !restaurantFound) {
      const restaurant_object = {
        title: name,
        followers: 1,
        location: {latitude: location[0], longitude: location[1]},
        description: description
      }
      console.log(restaurant_object)
      const response = await API.createRestaurant(restaurant_object);
      setRestaurant(response.data._id);
      console.log(restaurant)
      }
    }
    if (!user) return navigate("/");
    handleRestaurant();
  }, [name]);
    const handlePost = async () => {
        const payload = {
          username: user,
          restaurant: restaurant,
          image: "",
          postTitle: title,
          review: review,
          stars: value
        };
        console.log(payload)
        const new_post = await API.createPost(payload);
        const file_upload = await API.uploadPostImage(image, new_post.data._id);
        navigate("/home")
    }
    
    return (
        <div className="post_wrapper">
          <div className='back_button'>
          <a href="/home">
          <ArrowBackIcon sx={{fontSize: "3em"}}></ArrowBackIcon>
          </a>
          </div>
            <div className="search-group">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API} libraries={libraries}>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <TextField id="outlined-basic" sx={{ width: "60%",
               backgroundColor: "#F5F5F5", fontWeight: 400 }} 
              label="Search for restaurant" variant="outlined"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </Autocomplete>
            </LoadScript>
          </div>
          <div className="image_upload">
            <Button variant="contained" component="label" sx={{ 
            width: "60%", 
            lineHeight: "2.5rem", 
            backgroundColor: "#007AFF",
            textTransform: "capitalize",
            fontWeight: 700}}
            startIcon={<UploadFileIcon />}>Upload image
            <input hidden accept="image/*" multiple type="file" onChange={(e) => handleFileUpload(e)}/>
            </Button>
          </div>
          <div className="rating">
            <h3>Rating:</h3>
            <Rating
                name="simple-controlled"
                value={value}
                precision={0.5}
                sx = {{ fontSize: "4rem", color: "#4285F4"}}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
          </div>
          <div className="new_post_title">
            <TextField
            id="outlined-basic"
            label="Post Title"
            sx={{ width: "60%", marginBottom: "2%"}}
            onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="review">
            <TextField
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={4}
            sx={{ width: "60%"}}
            onChange={e => setReview(e.target.value)}
            />
          </div>
          <Button variant="contained" sx={{ width: "60%", 
          lineHeight: "2.5rem", 
          fontWeight: 700,
          textTransform: "capitalize",
          backgroundColor: "#007AFF"}
          } onClick={handlePost}>Post</Button>
        </div>
    )
}

export default Post;