import {
  faCaretUp,
  faCompassDrafting,
  faExclamationCircle,
  faNewspaper,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Statistic, notification } from "antd";
import React, { useState } from "react";
import RecentPost from "../../components/RecentPost";
import { useEffect } from "react";
import BlogService from "../../services/blogService";

function DashboardHome({ theme, setSelectedKey }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    published_count: 0,
    total_count: 0,
    pending_count: 0,
    reviewed_count: 0,
    draft_count: 0,
  });

  useEffect(() => {
    if (localStorage.getItem("role")) {
      setUser(JSON.parse(localStorage.getItem("role")));
    }
    BlogService.getStats()
      .then((res) => {
        setStats(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        notification.error({
          message: "Error while fetching dashboard statistics data !!",
        });
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="dashboard-home-title">
        <h2>Knowledge Base</h2>
        <div className="home-count">
          <div>
            <span>{stats.total_count}</span>Total blog posts
          </div>
          <div>
            <span>{stats.published_count}</span>Approved blog posts
          </div>
        </div>
      </div>
      <div className="dashboard-home-content">
        <div className="dashboard-stat-card">
          <Card bordered={false}>
            <Statistic
              title="Lifetime total posts"
              loading={loading}
              value={stats.total_count}
              valueStyle={{
                color: theme === "dark" ? "#fff" : "#000",
                fontSize: "30px",
              }}
              prefix={<FontAwesomeIcon icon={faNewspaper} />}
            />
          </Card>
          <Card bordered={false}>
            <Statistic
              loading={loading}
              title="Active posts"
              value={stats.published_count}
              valueStyle={{
                color: "green",
                fontSize: "30px",
              }}
              prefix={<FontAwesomeIcon icon={faCaretUp} />}
            />
          </Card>
          <Card bordered={false}>
            <Statistic
              loading={loading}
              title="Pending for review"
              value={stats.pending_count}
              valueStyle={{
                color: "#ff9900",
                fontSize: "30px",
              }}
              prefix={<FontAwesomeIcon icon={faExclamationCircle} />}
            />
          </Card>
          <Card bordered={false}>
            {user && user.role === "LEAD" ? (
              <Statistic
                loading={loading}
                title={"Reviewed"}
                value={stats.reviewed_count}
                valueStyle={{
                  color: "blue",
                  fontSize: "30px",
                }}
                prefix={<FontAwesomeIcon icon={faRotate} />}
              />
            ) : (
              <Statistic
                loading={loading}
                title={"In draft"}
                value={stats.draft_count}
                valueStyle={{
                  color: "blue",
                  fontSize: "30px",
                }}
                prefix={<FontAwesomeIcon icon={faCompassDrafting} />}
              />
            )}
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
