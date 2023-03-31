import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import restaurant from '../restaurant.jpeg';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, TextField, FormControl, OutlinedInput, 
InputLabel, InputAdornment, IconButton } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import bcrypt from 'bcryptjs';
import API from '../API';
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
  const salt = bcrypt.genSaltSync(10);
  const handleLoginUser = async () => {
      const users = await API.getUsers();
      let userFound = false;
      for (let user of users.data){
        if (user.email === email){
          userFound = true;
          if (bcrypt.compare(password, user.password)){
              localStorage.setItem('user', user._id)
              navigate("/home");
          }
          else{
            alert("Wrong Password Entered");
          }
        }
      }
      if (!userFound) {
        alert("User with email " + email + " not found.");
      }
  };
  const handleGoogleUser = async (credentialResponse) => {
    if (credentialResponse.credential != null) {
      const USER = jwtDecode(credentialResponse.credential);
      const users = await API.getUsers();
      let userFound = false;
      for (let user of users.data){
        if (user.email === USER.email){
          userFound = true;
          localStorage.setItem('user', user._id);
          navigate("/home");
        }
      }
      if (!userFound) {
        const payload = {
          username: USER.name,
          email: USER.email,
          password: bcrypt.hashSync(credentialResponse.credential, salt),
          profilePic: "placeholder"
        };
        const response  = await API.createUser(payload);
        localStorage.setItem('user', response.data._id);
        navigate("/home");
      }
    }
  }
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
          <div className="google_login">
          <GoogleLogin
          onSuccess={handleGoogleUser}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        </div>
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
          <Button id="sign_in_bttn" variant="contained" onClick={handleLoginUser}>Sign In</Button>
          <div className="register_account">
            Don't have an account? <Link id="sign_up" to="/signup">Sign up now</Link>
          </div>
      </div>
    </form>
  );
}
export default Login;