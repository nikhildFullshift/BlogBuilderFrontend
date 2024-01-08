import { faHome, faNewspaper, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import React from "react";

function DashboardHeader({ selectedKey, setSelectedKey }) {
  switch (selectedKey) {
    case "home":
      return (
        <div className="dashboard-header-container">
          <div className="dashboard-header-left">
            <FontAwesomeIcon icon={faHome} />
            <span>My Dashboard</span>
          </div>
          <div className="dashboard-header-right">
            {/* <Button
              icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => setSelectedKey("create")}
            >
              WRITE A POST
            </Button> */}
          </div>
        </div>
      );
    case "blogs":
      return (
        <div className="dashboard-header-container">
          <div className="dashboard-header-left">
            <FontAwesomeIcon icon={faNewspaper} />
            <span>All Blogs</span>
          </div>
          <div className="dashboard-header-right">
            <Button
              icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => setSelectedKey("create")}
            >
              WRITE A POST
            </Button>
          </div>
        </div>
      );
    case "create":
      return (
        <div className="dashboard-header-container">
          <div className="dashboard-header-left">
            <FontAwesomeIcon icon={faPen} />
            <span>Write a new post</span>
          </div>
          <div className="dashboard-header-right">
            <Button
              icon={<FontAwesomeIcon icon={faNewspaper} />}
              onClick={() => setSelectedKey("blogs")}
            >
              VIEW ALL POST
            </Button>
          </div>
        </div>
      );
  }
}

export default DashboardHeader;
