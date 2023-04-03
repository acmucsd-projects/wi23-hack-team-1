import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import SignupPage from './signupPage/signupPage';
import Home from "./Home/Home";
import Post from "./Post/Post";
import ProfilePage from "./ProfilePage";
import RestaurantPage from "./RestaurantPage";

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
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/restaurant/:resId" element={<RestaurantPage />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
