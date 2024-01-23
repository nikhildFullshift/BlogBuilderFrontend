import { useEffect, useState } from "react";
import BlogService from "../../services/blogService";
import { Button, Space, Table } from "antd";
import { theme, ConfigProvider } from "antd";
import ReviewModal from "../../components/ReviewModal";
import ModifyBlog from "../../components/ModifyBlog";
import { roles } from "../../constants/constant";
import moment from "moment";
import PreviewBlog from "../../components/PreviewBlog";

function DashboardBlogs({ currentTheme, filtered, setFiltered }) {
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
      title: "Author",
      dataIndex: "author_id",
      key: "author_id",
      width: "100px",
      align: "center",
      render: (author_id) => {
        const user = roles.filter(({ userId }) => userId === author_id);
        return user[0].name;
      },
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => (
        <div className="created-column">
          {moment(date).format("DD/MM/yyyy")}
        </div>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      align: "center",
    },
    {
      title: "Published On",
      dataIndex: "published_at",
      key: "published_at",
      render: (date) =>
        date ? (
          <div className="created-column">
            {moment(date).format("DD/MM/yyyy")}
          </div>
        ) : (
          "Not yet published"
        ),
      sorter: (a, b) => new Date(a.published_at) - new Date(b.published_at),
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "statusMessage",
      key: "statusMessage",
      align: "center",
      filters: [
        {
          text: "Pending for review",
          value: "Pending for review",
        },
        {
          text: "Reviewed",
          value: "Reviewed",
        },
        {
          text: "Published",
          value: "Published",
        },
        {
          text: "In draft",
          value: "In draft",
        },
      ],
      defaultFilteredValue: filtered,
      onFilter: (value, record) => {
        switch (value) {
          case "Pending for review":
            if (
              record.actions.length === 0 ||
              record.actions.includes("Review")
            ) {
              return record;
            }
            break;
          case "Reviewed":
            if (record.actions.includes("Suggestions")) {
              return record;
            }
            break;
          case "Published":
            if (record.actions.includes("View in Kb")) {
              return record;
            }
            break;
          case "In draft":
            if (record.actions.includes("Edit Draft")) {
              return record;
            }
            break;
        }
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: "25%",
      align: "center",
      render: (__, { actions, blog_id }) => {
        if (actions) {
          return (
            <Space size={0}>
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
              {actions.includes("View in Kb") ? null : (
                <PreviewBlog blogId={blog_id} />
              )}
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
