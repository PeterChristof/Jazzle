import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };
    try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/login`,
          body,
          { withCredentials: true }
        );
      if (response.data.username) {
        toast.success("Login success");
        setCurrentLoggedInUser(response.data); //Comes from the app component
        history.push("/"); //redirect path
      }
    } catch (e) {
      toast.error("Invalid login");
    }
  };

  return (
    <>
      <h2>Login</h2>
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

        <button type="submit">Login</button>
      </form>
      Don't have an account? Register here <NavLink to="/signup">Here </NavLink>
    </>
  );
}

export default Login;