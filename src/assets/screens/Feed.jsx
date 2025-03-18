import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";

const Feed = () => {
  const [posts, setPosts] = useState(null);

  async function getPosts() {
    try {
      const response = await axios.get("https://dummyjson.com/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  //TODO: Add loading spinner
  if (!posts) {
    return <div className="loader"></div>;
  }

  return (
    <div className="post-container">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          likes={post.reactions.likes}
          dislikes={post.reactions.dislikes}
          views={post.views}
        />
      ))}
    </div>
  );
};

export default Feed;
