import { faList, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Result, Skeleton, notification } from "antd";
import React, { useEffect, useState } from "react";
import BlogService from "../services/blogService";

function RecentPost({ setSelectedKey }) {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    BlogService.getRecentPosts()
      .then((res) => {
        setRecentBlogs(res.data);
        setLoading(false);
      })
      .catch(() => {
        notification.error({
          message:
            "Something went wrong while fetching recent post!! Please try again later..",
        });
        setLoading(false);
      });
  }, []);
  return (
    <>
      {!loading ? (
        recentBlogs.length !== 0 ? (
          <>
            <h2 className="recent-post-title">Recent Post</h2>
            {recentBlogs.map((blog) => {
              return (
                <div
                  className="recent-post"
                  key={blog.id}
                  onClick={() => {
                    window.open("/blog/" + blog.id, "_blank");
                  }}
                >
                  <h3>{blog.title}</h3>
                  <p>{new Date(blog.created_at).toDateString()}</p>
                </div>
              );
            })}
            <div className="recent-button-wrapper">
              <Button
                icon={<FontAwesomeIcon icon={faList} />}
                onClick={() => setSelectedKey("blogs")}
              >
                View more
              </Button>
            </div>
          </>
        ) : (
          <Result
            className="result"
            icon={false}
            title="No recent post"
            subTitle="Sorry, you don't have any published blog yet.."
            extra={
              <Button
                icon={<FontAwesomeIcon icon={faPen} />}
                onClick={() => setSelectedKey("create")}
              >
                WRITE A POST
              </Button>
            }
          />
        )
      ) : (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      )}
    </>
  );
}

export default RecentPost;
