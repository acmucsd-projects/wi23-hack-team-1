import React, {useState} from "react";
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import IconButton from '@mui/material/IconButton'
//import "/.style.css";
import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Button } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from "@mui/icons-material/Visibility";

//NEED TO ADD LOGO At toP, HOW??
const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword( (show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    return(
        <form>
            <div className="signup-page-container" >  
                <div className="signup-form">
                    <div className = "foodIcon">
                        <FoodBankOutlinedIcon sx={{ fontSize: "10rem" }}></FoodBankOutlinedIcon>
                        <h1 id="app_name">IGFood</h1>
                    </div>
                    <h1 id="createAccount">Create your account</h1>
                    <div className="name-row">
                        <TextField id="outlined-basic" sx={{ width: "60%", backgroundColor: "#F5F5F5" }} 
                        label="Full name" variant="outlined"
                        value={name} onChange={(e) => setName(e.target.value)}/>   
                    </div>
                    <div className="address-row">
                        <TextField id="outlined-basic" sx={{ width: "60%", backgroundColor: "#F5F5F5" }} 
                        label="Email Address" variant="outlined"
                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="password-row">
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
                    <Button id="create_account_bttn" variant="contained">Create your account</Button>
                </div>
            </div>
        </form>
        
    );
};

export default SignupPage;
