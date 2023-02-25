import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import restaurant from '../restaurant.jpeg';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, TextField, FormControl, OutlinedInput, 
InputLabel, InputAdornment, IconButton } from '@mui/material';
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  return (
    <form>
        <div className="food_image">
        <img src={restaurant} alt="Logo" />
        </div>
        <div className="login">
          <div className='title'>
          <FoodBankOutlinedIcon sx={{ fontSize: "10rem" }}></FoodBankOutlinedIcon>
          <h1 id="app_name">IGFood</h1>
          </div>
          <Button id="google_bttn" variant="outlined" startIcon={<GoogleIcon />}>Sign in with Google</Button>
          <h4 id="or">or</h4>
          <div className="form-group">
              <TextField id="outlined-basic" sx={{ width: "60%", backgroundColor: "#F5F5F5" }} 
              label="Email Address" variant="outlined"
              value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <FormControl sx={{ m: 1, width: "60%", backgroundColor: "#F5F5F5" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </div>
          <Button id="sign_in_bttn" variant="contained" onClick={() => navigate("/home")}>Sign In</Button>
          <div className="register_account">
            Don't have an account? <Link id="sign_up" to="/register">Sign up now</Link>
          </div>
      </div>
    </form>
  );
}
export default Login;