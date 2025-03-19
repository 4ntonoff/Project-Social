import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Heart, ThumbsDown, Eye } from "lucide-react";

const PostPage = () => {
  // TODO: read about useParams
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState(null);
  async function fetchPost() {
    try {
      const response = await axios.get(`https://dummyjson.com/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error("Error loading post:", error);
    }
  }
  async function fetchPostComments() {
    try {
      const response = await axios.get(
        `https://dummyjson.com/posts/${id}/comments`
      );
      setPostComments(response.data);
    } catch (error) {
      console.error("Error loading post:", error);
    }
  }
  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, []);

  if (!post || !postComments) {
    return <div className="loader"></div>;
  }

  return (
    <div className="post-page">
      <div className="post-page-back">
        <Link to="/">
          <ArrowLeft className="post-page-back-arrow" size={24} />
        </Link>
        <span className="post-page-back-text">Post</span>
      </div>
      <div className="post-page-content">
        <h1 className="post-page-title">{post.title}</h1>
        <p className="post-page-text">{post.body}</p>
        <div className="post-preview-rating">
          <div>
            <Heart />
            <p>{post.reactions.likes}</p>
          </div>
          <div>
            <ThumbsDown />
            <p>{post.reactions.dislikes}</p>
          </div>
          <div>
            <Eye />
            <p>{post.views}</p>
          </div>
        </div>
        <div className="post-page-comments">
          {postComments.comments.map((postComment) => (
            <>
              <div key={postComment.id} className="post-page-comment-section">
                <div className="post-page-comment-header">
                  <div className="post-page-comment-user">
                    <span className="post-page-comment-name">
                      {postComment.user.fullName}
                    </span>
                    <span className="post-page-comment-username">
                      @{postComment.user.username}
                    </span>
                  </div>
                  <div>
                    <Heart />
                    <p>{postComment.likes}</p>
                  </div>
                </div>
                <p className="post-page-comment-text">{postComment.body}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
