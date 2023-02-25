<<<<<<< HEAD
//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./signupPage/signupPage"
=======
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
>>>>>>> 43372ad7fe93e57cf1f7f0151d4b9cbfd0425c47

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
<<<<<<< HEAD
        <Route exact path="/" element={<SignupPage />} />
=======
        <Route exact path="/" element={<Login />} />
>>>>>>> 43372ad7fe93e57cf1f7f0151d4b9cbfd0425c47
      </Routes>
    </div>
    </Router>
  );
}

export default App;
