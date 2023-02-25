import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import SignupPage from './signupPage/signupPage';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<SignupPage />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
