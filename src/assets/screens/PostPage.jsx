import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const PostPage = () => {
  // TODO: read about useParams
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`https://dummyjson.com/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Ошибка загрузки поста:", error);
      }
    }
    fetchPost();
    async function fetchPostComments() {
      try {
        const response = await axios.get(
          `https://dummyjson.com/posts/${id}/comments`
        );
        setPostComments(response.data);
      } catch (error) {
        console.error("Ошибка загрузки поста:", error);
      }
    }
    fetchPostComments();
  }, [id]);

  //TODO: Add loading spinner
  if (!post || !postComments) {
    return <div className="loader"></div>;
  }

  //TODO add styling
  return (
    <div className="">
      <Link to="/" className="">
        <ArrowLeft size={24} />
      </Link>
      <h1 className="">{post.title}</h1>
      <p className="">{post.body}</p>
      <div className="">
        <h2 className="">Комментарии</h2>

        {postComments.comments.map((postComment) => (
          <div key={postComment.id} className="">
            <h3 className="">{postComment.user.fullName}</h3>
            <p className="">{postComment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
