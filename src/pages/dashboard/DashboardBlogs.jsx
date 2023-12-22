import { useEffect, useState } from "react";
import BlogService from "../../services/blogService";
import { Button, Space, Table } from "antd";
import { theme, ConfigProvider } from "antd";
import ReviewModal from "../../components/ReviewModal";
import ModifyBlog from "../../components/ModifyBlog";

function DashboardBlogs({ currentTheme }) {
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [target, setTarget] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const { darkAlgorithm, defaultAlgorithm } = theme;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <div className="title-column">{text}</div>,
      width: "30%",
    },
    {
      title: "Author ID",
      dataIndex: "author_id",
      key: "author_id",
      width: "100px",
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => (
        <div className="created-column">{new Date(date).toDateString()}</div>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
      title: "Published",
      dataIndex: "published_at",
      key: "published_at",
      render: (date) =>
        date ? (
          <div className="created-column">{new Date(date).toDateString()}</div>
        ) : (
          "Not yet published"
        ),
      sorter: (a, b) => new Date(a.published_at) - new Date(b.published_at),
    },
    {
      title: "Status",
      dataIndex: "statusMessage",
      key: "statusMessage",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: "20%",
      render: (__, { actions, blog_id }) => {
        if (actions && actions.length !== 0) {
          return (
            <Space>
              {actions.map((action) => {
                switch (action) {
                  case "Edit":
                    return (
                      <Button
                        type="link"
                        onClick={() => {
                          setTarget(blog_id);
                          setEditOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    );
                  case "Edit Draft":
                    return (
                      <Button
                        type="link"
                        onClick={() => {
                          setTarget(blog_id);
                          setEditOpen(true);
                          setDraft(true);
                        }}
                      >
                        Edit Draft
                      </Button>
                    );
                  case "Suggestions":
                    return (
                      <Button
                        type="link"
                        onClick={() => {
                          setTarget(blog_id);
                          setOpen(true);
                        }}
                      >
                        Suggestions
                      </Button>
                    );
                  case "Review":
                    return (
                      <Button
                        onClick={() => {
                          setTarget(blog_id);
                          setOpen(true);
                        }}
                        type="link"
                      >
                        Review
                      </Button>
                    );
                  case "View in Kb":
                    return (
                      <Button
                        type="link"
                        onClick={() => {
                          window.open("/blog/" + blog_id, "_blank");
                        }}
                      >
                        View
                      </Button>
                    );
                }
              })}
            </Space>
          );
        }
      },
    },
  ];

  useEffect(() => {
    BlogService.getAllBlogs()
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [refresh]);
  return (
    <ConfigProvider
      theme={{
        token:
          currentTheme === "dark"
            ? {
                colorBgContainer: "#1c2d3b",
                colorBorderSecondary: "#14212d",
                colorBgElevated: "#1c2d3b",
              }
            : {
                colorBgContainer: "#fff",
              },
        algorithm: currentTheme === "dark" ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <ReviewModal
        open={open}
        setRefresh={setRefresh}
        refresh={refresh}
        setOpen={setOpen}
        target={target}
        setTarget={setTarget}
        currentTheme={currentTheme}
      />
      <ModifyBlog
        editOpen={editOpen}
        setRefresh={setRefresh}
        refresh={refresh}
        setEditOpen={setEditOpen}
        target={target}
        setTarget={setTarget}
        currentTheme={currentTheme}
        draft={draft}
        setDraft={setDraft}
      />
      <Table
        className="blog-table"
        columns={columns}
        dataSource={blogs}
        loading={loading}
        pagination={{
          pageSize: pageSize, // Default items per page
          pageSizeOptions: [5, 10, 20, 50], // Options for items per page
          showSizeChanger: true, // Display options to change items per page
          position: ["bottomCenter"], // Pagination position
          onChange: ({ pageSize }) => {
            setPageSize(pageSize);
          },
        }}
        scroll={{
          y: 440,
        }}
      />
    </ConfigProvider>
  );
}

export default DashboardBlogs;
