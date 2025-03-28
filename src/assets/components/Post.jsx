import React from "react";
import { Heart, ThumbsDown, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Post = ({
  routes,
  homeRoutes,
  id,
  title,
  body,
  views,
  likes,
  dislikes,
  tags,
}) => {
  return (
    <>
      <div className="post-preview">
        <div className="post-preview-header">
          <h1>{title}</h1>
        </div>
        <div className="post-preview-body">
          <p>{body}</p>
        </div>
        <Link
          to={`${routes.HOME.replace("/*", "")}${homeRoutes.POST.replace(
            ":id",
            id
          )}`}
          className="navbar-item"
        >
          <span>More details</span> <ArrowRight />
        </Link>
        <div className="post-preview-tags">
          <h3>Tags:</h3>
          {tags.map((tag) => (
            <div key={tag} className="post-preview-tag">
              {String(tag).charAt(0).toUpperCase() + String(tag).slice(1)}
            </div>
          ))}
        </div>
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
