import React, { useState } from 'react';
import { TextField, Button, Rating } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import "./Post.css"
function Post(){
    const [searchQuery, setSearchQuery] = useState("");
    const [value, setValue] = useState(0);
    return (
        <div className="post_wrapper">
            <div className="search-group">
              <TextField id="outlined-basic" sx={{ width: "60%",
               backgroundColor: "#F5F5F5", fontWeight: 400 }} 
              label="Search for restaurant" variant="outlined"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>
          <div className="image_upload">
            <Button variant="contained" component="label" sx={{ 
            width: "60%", 
            lineHeight: "2.5rem", 
            backgroundColor: "#4285F4",
            textTransform: "capitalize",
            fontWeight: 700}}
            startIcon={<UploadFileIcon />}>Upload image
            <input hidden accept="image/*" multiple type="file" />
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
          <div className="review">
            <TextField
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={4}
            sx={{ width: "60%"}}
            />
          </div>
          <Button variant="contained" sx={{ width: "60%", lineHeight: "2.5rem"}}>Post</Button>
        </div>
    )
}

export default Post;