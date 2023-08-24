import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "pages/Login";
import SignupPage from "pages/SignupPage";
import Home from "pages/Home";
import Post from "pages/Post";
import ProfilePage from "pages/ProfilePage";
import RestaurantPage from "pages/RestaurantPage";

require('dotenv').config()


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<SignupPage />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/post" element={<Post />} />
        <Route path={"/profile/" + localStorage.getItem('user')} element={<ProfilePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/restaurant/:resId" element={<RestaurantPage />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
