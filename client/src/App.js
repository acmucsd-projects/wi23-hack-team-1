//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./signupPage/signupPage"

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<SignupPage />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
