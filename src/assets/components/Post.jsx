import React from "react";
import { Heart, ThumbsDown, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Post = ({ id, title, body, likes, dislikes, views }) => {
  return (
    <>
      <div className="post-preview">
        <div className="post-preview-header">
          <h1>{title}</h1>
        </div>
        <div className="post-preview-body">
          <p>{body}</p>
        </div>
        <Link to={`/home/post/${id}`} className="navbar-item">
          <span>More details</span> <ArrowRight />
        </Link>
        <div className="post-preview-rating">
          <div>
            <Heart />
            <p>{likes}</p>
          </div>
          <div>
            <ThumbsDown />
            <p>{dislikes}</p>
          </div>
          <div>
            <Eye />
            <p>{views}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
