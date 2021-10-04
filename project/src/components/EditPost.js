import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function EditPost({ match }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [songLink, setSongLink] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function getPost() {
      const post = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/post/${match.params.id}`
      );

      setTitle(post.data.title);
      setDescription(post.data.description);
      setSongLink(post.data.songLink);
    }
    getPost();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title,
      description,
      songLink
    //   imageUrl: "http://someimage.com"
    };

    await axios.put(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/post/${match.params.id}`,
      body
    );

    toast.success("Post updated");
    history.push("/post");
  };

  return (
    <>
    <main className="textColor">
     <div>
      <form onSubmit={handleFormSubmit}>
        <label>Title</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label>Description</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <label>Song Link</label>
        <input
          type="url"
          onChange={(e) => setSongLink(e.target.value)}
          value={songLink}
        />

        <button type="submit">Update</button>
      </form>
      </div>
      </main>
    </>
  );
}

export default EditPost;