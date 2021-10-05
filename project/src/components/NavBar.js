import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"; 
import Navbar from 'react-bootstrap/Navbar'

function NavBar({loggedInUser, setCurrentLoggedInUser}) {
    const logoutUser = async () => {
        debugger;
        await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/logout`, null, {
          withCredentials: true,
        });
        setCurrentLoggedInUser("");
      };

      return loggedInUser ? (
        <>

        <nav className="nav-bar">
          <ul className="nav-bar-ul">
          <li>
                <NavLink activeStyle={{ color: "white" }} exact to="/feed">
                 Feed
                </NavLink>
              </li>
                <li>
                <NavLink activeStyle={{ color: "white" }} to="/feed">
                Create Post
              </NavLink>
            </li>

          <li>
                <NavLink exact to="/">
                  <button onClick={logoutUser} className="nav-button">Logout</button>
                </NavLink>
              </li>
          </ul>
        </nav>
        <p>Start Jazzling - {loggedInUser.username}</p>
        </>
         ) : (
           <>
          
          
          <nav className="nav-bar">
          <ul className="nav-bar-ul">
            <li>
              <NavLink activeStyle={{ color: "white" }} to="/signup" >
                Signup
              </NavLink>
            </li>
            <li>
            
              <NavLink activeStyle={{ color: "white" }} to="/login">
                Login
              </NavLink>
            </li>
          </ul>
          </nav>
          
          <div className="Welcome"> Welcome to JAZZLE</div>
          </>
      );
    }

export default NavBar;