import {
  faBook,
  faCaretUp,
  faExclamationCircle,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Statistic } from "antd";
import React, { useState } from "react";
import RecentPost from "../../components/RecentPost";

function DashboardHome({ theme, setSelectedKey }) {
  const [total, setTotal] = useState(10);
  const [approved, setApproved] = useState(5);
  return (
    <>
      <div className="dashboard-home-title">
        <h2>Knowledge Base</h2>
        <div className="home-count">
          <div>
            <span>123</span>Total blog posts
          </div>
          <div>
            <span>0</span>Approved blog posts
          </div>
        </div>
      </div>
      <div className="dashboard-home-content">
        <div className="dashboard-stat-card">
          <Card bordered={false}>
            <Statistic
              title="Lifetime total posts"
              value={123}
              valueStyle={{
                color: theme === "dark" ? "#fff" : "#000",
              }}
              prefix={<FontAwesomeIcon icon={faBook} />}
            />
          </Card>
          <Card bordered={false}>
            <Statistic
              title="Active posts"
              value={0}
              valueStyle={{
                color: "green",
              }}
              prefix={<FontAwesomeIcon icon={faCaretUp} />}
            />
          </Card>
          <Card bordered={false}>
            <Statistic
              title="Pending for review"
              value={84}
              valueStyle={{
                color: "#ff9900",
              }}
              prefix={<FontAwesomeIcon icon={faExclamationCircle} />}
            />
          </Card>
          <Card bordered={false}>
            <Statistic
              title="In draft"
              value={39}
              precision={2}
              valueStyle={{
                color: "blue",
              }}
              prefix={<FontAwesomeIcon icon={faPause} />}
            />
          </Card>
        </div>
        <Card bordered={false} className="dashboard-recent-posts">
          <RecentPost setSelectedKey={setSelectedKey} />
        </Card>
      </div>
    </>
  );
}

export default DashboardHome;
