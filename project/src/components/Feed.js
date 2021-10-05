import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import CreatePost from "./CreatePost";
import { useHistory } from "react-router";
// import Datetime from 'react-datetime';
// import "react-datetime/css/react-datetime.css";

function Feed({ loggedInUser }) {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState("");
  const history = useHistory();
  const [user, setUser] = useState("");
  const [post, setPost] = useState("");

  useEffect(() => {
    async function getAllPost() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/post`
      );
      setPosts(response.data);
      // setUser(response.data.user);
      // setPost(response.data.post);
    }

    getAllPost();
  }, []);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  //testing like form

  const handleFormSubmit = async (id) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/post/${id}/like`,
      null,
      { withCredentials: true }
    );

    //  console.log(response.data)
    console.log(response.data.likes.length);
    setLikes(response.data.likes.length);

    setPosts(
      posts.map((post) =>
        post._id === id ? { ...post, likes: response.data.likes } : post
      )
    );
    history.push("/feed");
  };

  //testing following

  // const handleFormSubmit = async (id) => {
  //   const response = await axios.post(
  //     `${process.env.REACT_APP_SERVER_HOSTNAME}/post/${username}/follow`,
  //     null,
  //     { withCredentials: true }
  //   );

  //   //  console.log(response.data)
  //
  //   setLikes(response.data.likes.length);

  //   setPosts(posts.map(post => post._id === id ? {...post, likes : response.data.likes} : post));
  //   history.push("/feed");
  // };

  return (
    <>
    
    
      {loggedInUser && (
        <div className="App">
          <CreatePost addPost={addPost} loggedInUser={loggedInUser} />
        </div>
       
      )}

      <ul>
        {posts.map((post) => {
          return (
            <>
            <div className="feedCard" key={post._id}>
              {/* <NavLink to={`/post/${post._id}`}>{post.title}</NavLink> */}

              <h3>{post.title}</h3>
              
              {post.postedBy && <p>posted by: {post.postedBy.username}</p> }
              {/* <Datetime /> */}
             
              
              {/* follow / unfollow button - call it on the feed. call routes from backend */}

              {/* <NavLink to={`/user/${user._id}`}>{}</NavLink> */}

              <p>
                <span className="bold">Description</span>: {post.description}
              </p>
              <p>
                <span className="bold">songLink</span>:
                <a href={post.songLink} target="_blank">
                  Listen
                </a>
              </p>
              
              <div>
                <p> {post.likes.length} Likes</p>
                <button onClick={() => handleFormSubmit(post._id)}>Like</button>
              </div>
              <div>
              <NavLink to={`/post/${post._id}/edit`}>Edit</NavLink>
              </div>
              <div key={post._id}>
              <NavLink to={`/post/${post._id}`}>Details</NavLink>
              </div>
            </div>
            
            </>
          );
        })}
      </ul>
    </>
  );
}

export default Feed;
