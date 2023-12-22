import React, { useEffect, useState } from "react";
import { theme as themeProvider, ConfigProvider } from "antd";
import HomeNav from "../../components/HomeNav";
import SearchBar from "../../components/SearchBar";
import { suggestionsData } from "../../constants/constant";
import { FloatButton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import BlogCard from "../../components/BlogCard";
import BlogService from "../../services/blogService";

function Home({ theme, setTheme }) {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { darkAlgorithm, defaultAlgorithm } = themeProvider;
  const onSearch = (data) => {
    if (data === "") {
      return;
    }
    setLoading(true);
    BlogService.searchBlogs(data)
      .then((res) => {
        if (res.data.data.hits.total.value === 0) {
          setError({
            title: "No Blogs Found",
            description: "No blogs found for the given search text",
          });
          setBlogs([]);
          setLoading(false);
        } else {
          setBlogs(res.data.data.hits.hits);
          setError(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setBlogs([]);
        setError({
          title: "No Blogs Found",
          description: "Something wrong happened!! Please try again later..",
        });
        setLoading(false);
      });
  };
  useEffect(() => {
    setSuggestions(suggestionsData);
  }, []);
  return (
    <>
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
      </ConfigProvider>
      <HomeNav theme={theme} setTheme={setTheme} />
      <div className="home-body">
        <div className="search-bar-wrapper">
          <div className="search-bar">
            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              onSearch={onSearch}
              loading={loading}
            />
          </div>
          <div className="suggestion-bar">
            {suggestions.map((suggestion, index) => {
              return (
                <div
                  className="suggestion-tag"
                  key={index}
                  onClick={() => {
                    setSearchText(suggestion);
                    onSearch(suggestion);
                  }}
                >
                  {suggestion}
                </div>
              );
            })}
          </div>
        </div>
        {blogs.length !== 0 && (
          <div className="blog-list">
            {blogs.map((blog) => {
              return <BlogCard blog={blog} key={blog._id} />;
            })}
          </div>
        )}
        {error && (
          <div className="error-blog">
            <div className="error-title">{error.title}</div>
            <div className="error-description">{error.description}</div>
          </div>
        )}
      </div>
      <div className="footer">GPS Blog Builder©2023</div>
    </>
  );
}

export default Home;
