import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
      email
    };
    await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/signup`, body);
    toast.success("Signup success");
    history.push("/");
  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

       <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <button type="submit">Signup</button>
      </form>
    </>
  );
}

export default Signup;