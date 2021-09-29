import './App.css';
import {Switch, Route} from "react-router-dom";
import Feed from './components/Feed';
import Signup from './components/Signup';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "./components/CreatePost"

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
    <div className="App">
         <NavBar loggedInUser={loggedInUser} setCurrentLoggedInUser={setCurrentLoggedInUser} />
          <Switch> 
          <Route exact path={["/", "/feed"]} component={Feed} />
          <Route exact path="/post" component={CreatePost} />
          <Route path="/signup" component={Signup} />
          <Route 
        path="/login" 
        render={()=> {
          return <Login setCurrentLoggedInUser={setCurrentLoggedInUser} />;
        }} />

          </Switch>
     
    </div>
  );
}

export default App;
