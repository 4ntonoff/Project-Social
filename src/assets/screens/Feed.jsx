import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";

const Feed = () => {
  const [posts, setPosts] = useState(null);
  const [tag, setTag] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  let tags = [];

  async function getPosts() {
    try {
      const response = await axios.get("https://dummyjson.com/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }
  ("https://dummyjson.com/posts/tag-list");

  useEffect(() => {
    getPosts();
  }, []);

  if (!posts) {
    return <div className="loader"></div>;
  }

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  let filteredPosts = tag
    ? posts.filter((post) => post.tags.includes(tag))
    : posts;

  return (
    <div className="post-container">
      <div className="tags">
        {tags.map((tag) => (
          <div
            className={`tag ${selectedTag === tag ? "tag--active" : ""}`}
            onClick={() => {
              setTag(tag === selectedTag ? null : tag);
              setSelectedTag(tag === selectedTag ? null : tag);
            }}
          >
            {String(tag).charAt(0).toUpperCase() + String(tag).slice(1)}
          </div>
        ))}
      </div>
      {filteredPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          likes={post.reactions.likes}
          dislikes={post.reactions.dislikes}
          views={post.views}
          tags={post.tags}
        />
      ))}
    </div>
  );
};

export default Feed;
