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
         <p>Welcome {loggedInUser.username}</p>



        <nav>
          <ul>
          <li>
                <NavLink activeStyle={{ color: "red" }} exact to="/">
                 Feed
                </NavLink>
              </li>
                <li>
                <NavLink activeStyle={{ color: "red" }} to="/post">
                Create Post
              </NavLink>
            </li>

          <li>
                <NavLink exact to="/">
                  <button onClick={logoutUser}>Logout</button>
                </NavLink>
              </li>
          </ul>
        </nav>
        </>
         ) : (
          <nav>
          <ul>
            <li>
              <NavLink activeStyle={{ color: "red" }} to="/signup">
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ color: "red" }} to="/login">
                Login
              </NavLink>
            </li>
          </ul>
          </nav>
          
      );
    }

export default NavBar;