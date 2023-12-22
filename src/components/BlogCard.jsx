import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Skeleton } from "antd";
import React from "react";

function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <div className="blog-card-img">
        {blog._source.image ? (
          <img src={blog._source.image} alt={blog._source.title} />
        ) : (
          <Skeleton.Image />
        )}
      </div>
      <div className="blog-card-text">
        <div className="blog-card-title">
          <h3>{blog._source.title}</h3>
          <Button
            type="link"
            onClick={() => {
              window.open("/blog/" + blog._id, "_blank");
            }}
          >
            Read more
          </Button>
        </div>

        {blog._source.tags.length !== 0 && (
          <div className="blog-card-tags">
            {blog._source.tags.map((tag, index) => (
              <div className="blog-tag" key={index}>
                {tag}
              </div>
            ))}
          </div>
        )}
        <div className="blog-card-auth">
          <div className="author">
            <FontAwesomeIcon icon={faUser} /> <span>Annonymus</span>
          </div>
          <div className="date">
            {new Date(blog._source.published_at).toDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
