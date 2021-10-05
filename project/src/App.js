import './App.css';
import {Switch, Route} from "react-router-dom";
import Feed from './components/Feed';
import Signup from './components/Signup';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from './components/NavBar';
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from 'react-bootstrap/Navbar'
import './Login.css';
import "react-toastify/dist/ReactToastify.css";
import PostDetails from './components/PostDetails';
import EditPost from './components/EditPost';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

function App() {
  const [loggedInUser,setCurrentLoggedInUser]=  useState("");
  
  useEffect(() => {
    async function checkLoggedIn() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/isloggedin`,
        { withCredentials: true }
      );
      if (response.data.username) {
        setCurrentLoggedInUser(response.data);
      }
    }
    checkLoggedIn();
  }, []);

  return (
    
    <div>


        <ToastContainer/>
         <NavBar loggedInUser={loggedInUser} setCurrentLoggedInUser={setCurrentLoggedInUser} />
          <Switch> 
          <Route exact path={["/", "/signup"]} component={Signup} />
          <Route exact path={"/feed"} render={()=> {
            return <Feed loggedInUser={loggedInUser}/>;
          }} />
          <Route exact path="/post/:id" component={PostDetails} />
          <Route path="/post/:id/edit" component={EditPost} />

          {/* <Route path="/signup" component={Signup} /> */}
          <Route path="/login" render={()=> {
          return <Login setCurrentLoggedInUser={setCurrentLoggedInUser} />;
        }} />

        <Route path="/user/:id" component={UserProfile} />
        {/* Create userprofile page
            Access this page/component from the Feed 
            Add links to follow and unfollow

         */}
          </Switch>
         <Footer/>
    </div>
  );
}

export default App;
