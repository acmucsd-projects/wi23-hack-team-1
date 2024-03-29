import React from "react";
import "./style.css";
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LogoutIcon from '@mui/icons-material/Logout';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Navbar = () => {
  const handleSearchPress = (event) => {
    if (event.key === 'Enter') {
      alert("Enter pressed");
    }
  }
  const handleLogoutClick = () => {
    localStorage.removeItem('user');
  }


  return (
    <div className="navbar">
      <nav className="navlinks">
        <a href="/home">
          <div className="navbar-logo">
          <FoodBankOutlinedIcon style={{ fontSize: '3rem' }} />
          <h3>IGFood</h3>
          </div>
        </a>
        <div className="search-container">
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
            <TextField input="text" id="filled-basic" label="Search" variant="filled" onKeyPress={handleSearchPress} /> {/* not implemented */}
          </Box>
        </div>
        <Stack direction="row" spacing={3} sx={{ marginLeft: "3%" }}>
          <a href="/post">
            <Chip label="Make a Post" clickable/>
          </a>
          <a href="/profile/:userID">
            <Chip label="My Profile" clickable/>
          </a>
        </Stack>
        <a href="/">
          <LogoutIcon onClick={handleLogoutClick} style={{ fontSize: '2rem' }} />
        </a>
      </nav>
    </div>
  );
};

export default Navbar;