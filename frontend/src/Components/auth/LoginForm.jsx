import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="auth--form">
      <h1 className="auth--heading">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="auth--label">
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <div className="auth--label">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?
        <span>
          <Link to="/auth/signup">Signup</Link>
        </span>
      </p>
    </div>
  );
}
