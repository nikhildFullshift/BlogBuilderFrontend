import { faList, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Result, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { blogs } from "../constants/constant";

function RecentPost({ setSelectedKey }) {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setRecentBlogs(blogs);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
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
                  key={blog._id}
                  onClick={() => {
                    window.open("/blog/" + blog._id, "_blank");
                  }}
                >
                  <h3>{blog._source.title}</h3>
                  <p>{new Date(blog._source.created_at).toDateString()}</p>
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
            subTitle="Sorry, you haven't posted anything yet.."
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
