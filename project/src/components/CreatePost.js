import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CreatePost({addPost}) {
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
    };
    
    await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/post`, body);
    addPost(body)

    toast.success("Post created");
    history.push("/feed");
  };

  return (
    <>
      <h2>Create Post</h2>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">

        <label>Title </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br/>
        <br/>

        <label>Description </label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <br/>
        <br/>

        <label>Song-Link </label>
        <input
          type="text"
          onChange={(e) => setSongLink(e.target.value)}
          value={songLink}
        />
        <br/>
        <br/>

        <label>Comments </label>
        <input
          type="text"
          onChange={(e) => setComments(e.target.value)}
          value={comments}
        />

        {/* <label>Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} /> */}

        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreatePost;