import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"; 
import Navbar from 'react-bootstrap/Navbar'

function Footer({loggedInUser, setCurrentLoggedInUser}) {
    const logoutUser = async () => {
        debugger;
        await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/logout`, null, {
          withCredentials: true,
        });
        setCurrentLoggedInUser("");
      };

      return (
        <>

        <nav className="nav-bar">
          <ul className="nav-bar-ul">
          <li>
             <p className="Footer">Thats It - Thats All - Thats All There Is</p>
             
            </li>
            <li>
             <p className="Footer">Made with Love by Laura & Peter </p>
             
            </li>
          </ul>
        </nav>
        </>
      );
    }

export default Footer;