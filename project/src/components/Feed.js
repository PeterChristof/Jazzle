import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import CreatePost from "./CreatePost";
import { useHistory } from "react-router";

function Feed() {
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
   
    setPosts(posts.map(post => post._id === id ? {...post, likes : response.data.likes} : post));
    history.push("/feed");
  };

  return (
    <>
      <div>
        <CreatePost addPost={addPost} />
      </div>
      <ul>
        {posts.map((post) => {
          return (
            <div className="card" key={post._id}>
              <NavLink to={`/post/${post._id}`}>{post.title}</NavLink>

              <h3>{post.title}</h3>
              <p>
                <span className="bold">Description</span>: {post.description}
              </p>
              <p>
                <span className="bold">songLink</span>: {post.songLink}
              </p>
              <div>
                <p> {post.likes.length} Likes</p>
                <button onClick={() => handleFormSubmit(post._id)}>Like</button>
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default Feed;
