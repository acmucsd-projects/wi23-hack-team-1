import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
<<<<<<< HEAD
import SignupPage from './signupPage/signupPage';
=======
import Home from "./Home/Home";
import Post from "./Post/Post";
import ProfilePage from "./ProfilePage";
>>>>>>> bae57c5a100cea3c791d47e7cf755c30dd17bc54

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<SignupPage />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/post" element={<Post />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
