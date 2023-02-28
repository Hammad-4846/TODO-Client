import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosClient } from "../../utils/axios";
import "./Login.scss";

function Login() {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (req, res) => {
    const response = await axiosClient.post("/api/login", {
      email,
      password,
    });
    if (response.data.status === "ok" || response.data.statusCode === 200) {
      localStorage.setItem("todoAccessToken", response.data.result.localToken);
      navigate("/");
    }
  };

  return (
    <div className="Login">
      <div className="login__form flex__center">
        <h1>Login</h1>
        <div className="login__form-input">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="login__form-input">
          <label htmlFor="pass">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="pass"
            id="pass"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
