import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import useAuthStatus from "../../hooks/auth/useAuthStatus";

export default function SignupForm() {
  const navigate = useNavigate();
  const { setUid } = useAuthStatus();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res = await response.json();
      console.log(res);
      setUid(res.UId);

      if (res.status === 409) {
        alert("Username already exists, please choose another one");
        return;
      } else if (res.status === 401) {
        alert("Error creating user");
        return;
      }

      navigate("/auth/login");
    } catch (error) {
      console.error(error);
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
      <h1 className="auth--heading">Signup</h1>
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
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?
        <span>
          <Link to="/auth/login">Login</Link>
        </span>
      </p>
    </div>
  );
}
