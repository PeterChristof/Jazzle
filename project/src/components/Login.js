import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "./NavBar";

function Login({setCurrentLoggedInUser}) {
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
        history.push("/feed"); //redirect path
      }
    } catch (e) {
      toast.error("Invalid login");
    }
  };

  return (
    <>
     <main className="Sign">
      <div>
        <div className='card'>
          <h4 className='card-header'>Login</h4>
          <div className='card-body'>
      <form onSubmit={handleFormSubmit}>
        <label>Username: </label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder='Your username'
        />
        <br/>
        <br/>
        <label>Password: </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder='******'
        />

        <br/>

        <button type="submit" className="mainBtn">Login</button>
      </form>
      Don't have an account? Register here <NavLink to="/signup">Here </NavLink>
            </div>
          </div>
        </div>
      </main> 
    </>
    
  );
}

export default Login;