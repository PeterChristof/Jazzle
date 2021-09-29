import React, {useEffect, useState} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
       async function getAllPost() {
       const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/post`);
       setPosts(response.data);
        }
        getAllPost();
    }, []);

    return (
      <>
        <ul>
            {posts.map((post)=> {
                return (
                <div className="card" key={post._id}><NavLink to={`/post/${post._id}`}>{post.title}</NavLink>
    
                                <h3>{post.title}</h3>
                                <p><span className="bold">Description</span>: {post.description}</p>
                                <p><span className="bold">songLink</span>: {post.songLink}</p>

            
                </div>
                );
            })}
        </ul>
        
        </>
    );
}


export default Feed;