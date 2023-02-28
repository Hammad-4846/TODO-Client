import React, { useState } from "react";

import "./Signup.scss";
import { axiosClient } from "../../utils/axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (req, res) => {
    const response = await axiosClient.post("/api/register", {
      email,
      password,
    });
    console.log(response);
  };
  return (
    <div className="Signup">
      <div className="signup__form flex__center">
        <h1>Signup</h1>
        <div className="signup__form-input">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="signup__form-input">
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
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;
