import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import useAuthStatus from "../../hooks/auth/useAuthStatus";

export default function LoginForm() {
  const navigate = useNavigate();
  const { state, login } = useAuthStatus();
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
      const res = await response.json();
      console.log(res);
      state.userId = res.UId;
      login();

      if (res.status === 401) {
        alert("Invalid login details");
        return;
      }

      navigate("/");
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
