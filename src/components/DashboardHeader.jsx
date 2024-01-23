import {
  faBell,
  faHome,
  faNewspaper,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Popover } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BlogService from "../services/blogService";

function DashboardHeader({ selectedKey, setSelectedKey, setFiltered }) {
  const [pending, setPending] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("role")) {
      const user = JSON.parse(localStorage.getItem("role"));
      if (selectedKey === "home" && user && user.role && user.role === "LEAD") {
        BlogService.getStats().then((res) => {
          setPending(res.data[0].pending_count);
        });
      }
    }
  }, []);
  switch (selectedKey) {
    case "home":
      return (
        <div className="dashboard-header-container">
          <div className="dashboard-header-left">
            <FontAwesomeIcon icon={faHome} />
            <span>My Dashboard</span>
          </div>
          <div className="dashboard-header-right">
            {pending > 0 && (
              <Popover
                placement="left"
                content={
                  pending +
                  (pending > 1 ? " blogs are " : " blog is ") +
                  "pending for review"
                }
                title={null}
              >
                <Badge count={pending} size="small">
                  <FontAwesomeIcon
                    icon={faBell}
                    fontSize="20"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setFiltered(["Pending for review"]);
                      setSelectedKey("blogs");
                    }}
                  />
                </Badge>
              </Popover>
            )}
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
