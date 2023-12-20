import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Collapse,
  ConfigProvider,
  Result,
  Tooltip,
  theme,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretRight,
  faCircleCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import GenerateBlog from "../../components/GenerateBlog";
import OptionalService from "../../services/optionalService";
import ReviewCreateBlog from "../../components/ReviewCreateBlog";

function DashboardCreateBlog({ currentTheme, setSelectedKey }) {
  const [activeKey, setActiveKey] = useState(1);
  const { token } = theme.useToken();
  const [blogData, setBlogData] = useState(null);
  const { darkAlgorithm, defaultAlgorithm } = theme;
  const [pageLoading, setPageLoading] = useState(true);
  const [optional, setOptional] = useState([]);
  const [error, setError] = useState(false);

  const panelStyle = {
    marginBottom: 24,
    padding: "12px",
    background: currentTheme === "light" ? token.colorBgBase : "#1c2d3b",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const getItems = (panelStyle) => [
    {
      key: 1,
      label: (
        <div className="generate-blog-header">
          Generate Blog
          {activeKey === 1 ? (
            <Tooltip
              placement="right"
              title={
                <p className="tooltip-description-p">
                  Generates blog using OpenAI Turbo 3.5
                </p>
              }
              arrow
            >
              <FontAwesomeIcon icon={faExclamationCircle} />
            </Tooltip>
          ) : (
            <FontAwesomeIcon icon={faCircleCheck} color="green" />
          )}
        </div>
      ),
      children: (
        <GenerateBlog
          nextTab={nextTab}
          optional={optional}
          currentTheme={currentTheme}
        />
      ),
      style: panelStyle,
    },
    {
      key: 2,
      label: (
        <div className="generate-blog-header">
          Review Post
          {activeKey === 3 ? (
            <FontAwesomeIcon icon={faCircleCheck} color="green" />
          ) : (
            <Tooltip
              placement="right"
              title={
                <p className="tooltip-description-p">
                  Review the blog being generated
                </p>
              }
              arrow
            >
              <FontAwesomeIcon icon={faExclamationCircle} />
            </Tooltip>
          )}
        </div>
      ),
      children: (
        <ReviewCreateBlog setActiveKey={setActiveKey} blogData={blogData} />
      ),
      style: panelStyle,
    },
  ];

  const nextTab = (e) => {
    setBlogData(e);
    setActiveKey(2);
  };

  useEffect(() => {
    OptionalService.getAllOptional()
      .then((res) => {
        setOptional(res.data.updatedResult);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPageLoading(false);
        setError(true);
      });
  }, []);

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
      {error ? (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong!! Please try again later.."
        />
      ) : pageLoading ? (
        <>
          <Card loading={pageLoading} style={{ margin: "20px 0 40px" }} />
          <Card loading={pageLoading} />
        </>
      ) : (
        <Collapse
          bordered={false}
          collapsible="icon"
          activeKey={activeKey}
          expandIcon={({ isActive }) => (
            <FontAwesomeIcon
              icon={isActive ? faCaretDown : faCaretRight}
              className="collapse-panel-icon"
            />
          )}
          style={{
            background: "transparent",
            paddingBottom: "12px",
          }}
          items={getItems(panelStyle)}
        />
      )}
      {activeKey === 3 ? (
        <Result
          status="success"
          title="Successfully crated a blog!"
          subTitle="Congrats!! You have successfully created a blog using blog builder.."
          extra={[
            <Button
              key="blog"
              onClick={() => {
                setSelectedKey("blogs");
              }}
            >
              View All blogs
            </Button>,
          ]}
        />
      ) : null}
    </ConfigProvider>
  );
}

export default DashboardCreateBlog;
