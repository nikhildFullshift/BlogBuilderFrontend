import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  theme as themeProvider,
  ConfigProvider,
  FloatButton,
  Skeleton,
  Result,
  Button,
  Divider,
} from "antd";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import HomeNav from "../../components/HomeNav";
import BlogService from "../../services/blogService";

function ViewBlog({ theme, setTheme }) {
  const { id } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(false);
  const { darkAlgorithm, defaultAlgorithm } = themeProvider;

  useEffect(() => {
    setPageLoading(true);
    if (id) {
      BlogService.getBlog(id)
        .then((res) => {
          setBlog(res.data.result);
          setPageLoading(false);
        })
        .catch((err) => {
          setError(true);
          setPageLoading(false);
        });
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token:
          theme === "dark"
            ? {
                colorBgContainer: "#1c2d3b",
                colorBorderSecondary: "#14212d",
                colorBgElevated: "#1c2d3b",
              }
            : {
                colorBgContainer: "#fff",
              },
        algorithm: theme === "dark" ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <>
        <FloatButton
          icon={<FontAwesomeIcon icon={faAdd} />}
          className="floating-add-button"
          tooltip={"Post new blog"}
          shape="circle"
          style={{
            right: 40,
            bottom: 100,
          }}
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        />
        <HomeNav theme={theme} setTheme={setTheme} />
        <div className="home-body" style={{ justifyContent: "flex-start" }}>
          {pageLoading ? (
            <>
              <Skeleton title={{ width: "70%" }} paragraph={false} active />
              <Skeleton.Node active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active title={false} />
            </>
          ) : error ? (
            <Result
              status="500"
              title="500"
              subTitle="Sorry, Something went wrong.. Please revisit later."
              extra={
                <Button
                  type="primary"
                  ghost
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className="home"
                >
                  Go to Home
                </Button>
              }
            />
          ) : (
            <>
              <div className="view-blog-title">{blog.title}</div>
              <Divider className="view-blog-divider" />
              <div className="view-blog-author-tag">
                {blog.tags.length !== 0 && (
                  <div className="blog-card-tags">
                    {blog.tags.map((tag, index) => (
                      <div className="blog-tag" key={index}>
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="view-blog-description">
                <ReactMarkdown>{blog.description}</ReactMarkdown>
              </div>
            </>
          )}
        </div>
        <div className="footer">GPS Blog Builder©2023</div>
      </>
    </ConfigProvider>
  );
}

export default ViewBlog;
