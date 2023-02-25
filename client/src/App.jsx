import "./App.css";
import Navbar from "./Navbar";
import ProfilePage from "./ProfilePage";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <main>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;