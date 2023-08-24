import React from "react";
import "./ProfileNavbar.css";
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const ProfileNavbar = () => {
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
        <Stack direction="row" spacing={5} sx={{marginLeft: "60%"}}>
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

export default ProfileNavbar;