import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import { NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import NavBar from "./NavBar";

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
    history.push("/login");
  };

  return (
    <>
     <main className='flex-row justify-center mb-2' className="Height">
      <div className='col-12 col-md-12'>
        <div className='card'>
          <h4 className='card-header'>Sign Up</h4>
          <div className='card-body'>
      <form onSubmit={handleFormSubmit}>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder='Your username'
        />
  <br/>
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder='******'
        />
<br/>
       <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='Your email'
        />

        <button className="mainBtn" type='submit'>
                Submit
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </main> 
    </>
  );
}

export default Signup;