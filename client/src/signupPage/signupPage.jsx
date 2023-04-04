import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import IconButton from '@mui/material/IconButton'
import "./signupPage.css";
import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Button, Link } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from "@mui/icons-material/Visibility";
import restaurant from './restaurant.jpeg';
import API from "../API";
import bcrypt from 'bcryptjs';

//NEED TO ADD LOGO At toP, HOW??
const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword( (show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const navigate = useNavigate();
    const salt = bcrypt.genSaltSync(10);
    const handleCreateUser = async () => {
        const payload = {
            username: name,
            email: email,
            password: bcrypt.hashSync(password, salt),
            profilePic: "placeholder"
        };
        const response = await API.createUser(payload);
        localStorage.setItem('user', response.data._id);
        navigate("/home")
    };

    return(
        <form>
            <div className="food_image">
            <img src={restaurant} alt="Logo" />
            </div>
            <div className="signup-form">
                <div className = "foodIcon">
                    <FoodBankOutlinedIcon sx={{ fontSize: "10rem" }}></FoodBankOutlinedIcon>
                    <h1 id="app_name">IGFood</h1>
                </div>
                <h1 id="createAccount">Create your account</h1>
                <div className="create-row">
                    <TextField id="outlined-basic" sx={{ width: "60%", backgroundColor: "#F5F5F5" }} 
                    label="Full name" variant="outlined"
                    value={name} onChange={(e) => setName(e.target.value)}/>   
                </div>
                <div className="create-row">
                    <TextField id="outlined-basic" sx={{ width: "60%", backgroundColor: "#F5F5F5" }} 
                    label="Email Address" variant="outlined"
                    value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="create-row">
                    <FormControl sx={{m: 1, width: "60%", backgroundColor: "#F5F5F5"}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Enter Password</InputLabel>
                        <OutlinedInput 
                            id="outlined_adornment_password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                    </FormControl>
                </div>
                <Button id="create_account_bttn" variant="contained" onClick={handleCreateUser}>Create your account</Button>
                <Link sx={{display: "block", 
                marginTop: "5%", 
                fontSize: "18px", 
                fontWeight: 400,
                color: "#007AFF"}} underline="none" href="/">Back</Link>
            </div>
        </form>
        
    );
};

export default SignupPage;
