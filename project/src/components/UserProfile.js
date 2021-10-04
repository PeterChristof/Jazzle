import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function UserDetails({ match }) {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function getUserDetails() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/user/${match.params.id}`
      );
      setUser(response.data);
    }
    getUserDetails();
  }, []);

//   const handleDeletePost = async (id) => {
//     await axios.delete(
//       `${process.env.REACT_APP_SERVER_HOSTNAME}/post/${id}`
//     );
//     toast.success("Post deleted");
//     history.push("/post");
//   };

  return (
    <>
    <main>
      <h2>{user.username}</h2>
      <h3>{user.followers}</h3>
      <h3>{user.following}</h3>

      {/* <NavLink to={`/post/${post._id}/edit`}>Edit</NavLink> */}
      {/* <button onClick={() => handleDeletePost(post._id)}>Delete</button> */}
      </main>
    </>
  );
}

export default UserDetails;