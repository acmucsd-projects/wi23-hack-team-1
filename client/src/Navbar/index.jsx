import React from "react";
import "./style.css";
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LogoutIcon from '@mui/icons-material/Logout';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Navbar = () => {
  const handleHomeClick = () => {
    alert("Home clicked");
  }
  const handleSearchPress = (event) => {
    if(event.key === 'Enter'){
      alert("Enter pressed");
    }
  }
  const handlePostClick = () => {
    alert("Post clicked");
  }
  const handleProfileClick = () => {
    alert("Profile clicked");
  }
  const handleLogoutClick = () => {
    alert("Logout clicked");
  }

  
  return (
    <div className="navbar">
      <nav className="navlinks">
        <a href="/">
          <FoodBankOutlinedIcon onClick={handleHomeClick} />
        </a>
        <div className="search-container">
          <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
            <TextField input="text" id="filled-basic" label="Search" variant="filled" onKeyPress={handleSearchPress} />
          </Box>
        </div>
        <Stack direction="row" spacing={1}>
          <a href="/post">
            <Chip label="Make a Post" onClick={handlePostClick} />
          </a>
          <a href="/profile">
            <Chip label="My Profile" onClick={handleProfileClick} />
          </a>
        </Stack>
        <a href="/">
          <LogoutIcon onClick={handleLogoutClick} />
        </a>
      </nav>
    </div>
  );
};

export default Navbar;