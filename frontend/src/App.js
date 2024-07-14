import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import "./App.css";
import LoginForm from "./Components/auth/LoginForm";
import SignupForm from "./Components/auth/SignupForm";
import Create from "./Components/create/Create";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/auth/signup" element={<SignupForm />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
