import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CreatePost({addPost, loggedInUser}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [songLink, setSongLink] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  

  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // const uploadData = new FormData();
    // uploadData.append("file", image);

    // const response = await axios.post(
    //   `${process.env.REACT_APP_SERVER_HOSTNAME}/upload`,
    //   uploadData
    // );

    const body = {
      title,
      description,
      songLink,
      comments,
      likes,
      postedBy: loggedInUser
    };
    
    await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/post`, body);
    addPost(body)

    toast.success("Post created");
    history.push("/feed");
  };

  return (
    <>
    <br/>
    <main className="textColor">
      
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
<ul>
<li>
        <label>Title </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        </li>
        <br/>
        <br/>

<li>
        <label>Description </label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        </li>
        <br/>
        <br/>

        <li>
        <label>Song-Link </label>
        <input
          type="url"
          onChange={(e) => setSongLink(e.target.value)}
          value={songLink}
        />
        </li>
        <br/>
        <br/>

        <li>
        <label>Comments </label>
        <input
          type="text"
          onChange={(e) => setComments(e.target.value)}
          value={comments}
        />
        </li>

        {/* <label>Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} /> */}
        <br/>
        <br/>
        <button type="submit">Create</button>
        </ul>
      </form>
      </main>
    </>
  );
}

export default CreatePost;