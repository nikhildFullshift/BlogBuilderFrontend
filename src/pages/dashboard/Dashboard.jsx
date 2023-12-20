import {
  faAdd,
  faAnglesLeft,
  faAnglesRight,
  faHome,
  faNewspaper,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, Button } from "antd";
import { useEffect, useState } from "react";
import SwitchThemeButton from "../../components/SwitchThemeButton";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardHome from "./DashboardHome";
import DashboardBlogs from "./DashboardBlogs";
import DashboardCreateBlog from "./DashboardCreateBlog";
import { roles } from "../../constants/constant";
const { Header, Sider, Content } = Layout;

function Dashboard({ theme, setTheme }) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("home");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const getContent = () => {
    switch (selectedKey) {
      case "home":
        return <DashboardHome theme={theme} setSelectedKey={setSelectedKey} />;
      case "blogs":
        return <DashboardBlogs currentTheme={theme} />;
      case "create":
        return (
          <DashboardCreateBlog
            currentTheme={theme}
            setSelectedKey={setSelectedKey}
          />
        );
    }
  };
  const changeRole = (e) => {
    roles.forEach((role) => {
      if (role.userId.toString() === e.target.value) {
        setUserId(e.target.value);
        localStorage.setItem("role", JSON.stringify(role));
        window.location.reload();
      }
    });
  };
  useEffect(() => {
    if (localStorage.getItem("role")) {
      setUserId(JSON.parse(localStorage.getItem("role")).userId);
      setUserName(JSON.parse(localStorage.getItem("role")).name);
    } else {
      localStorage.setItem("role", JSON.stringify(roles[0]));
      setUserId(roles[0].userId);
      setUserName(roles[0].name);
    }
  }, []);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={theme}
        className="dashboard-left"
      >
        <div className="dashboard-header-menu">
          <div
            className="dashboard-user"
            style={{ justifyContent: collapsed ? "center" : "flex-start" }}
          >
            <FontAwesomeIcon icon={faUser} fontSize={20} />
            {!collapsed ? <span>{userName}</span> : null}
          </div>
          <Menu
            theme={theme}
            mode="inline"
            selectedKeys={selectedKey}
            onSelect={(e) => {
              setSelectedKey(e.key);
            }}
            items={[
              {
                key: "home",
                icon: <FontAwesomeIcon icon={faHome} />,
                label: "Home",
              },
              {
                key: "blogs",
                icon: <FontAwesomeIcon icon={faNewspaper} />,
                label: "Blogs",
              },
              {
                key: "create",
                icon: <FontAwesomeIcon icon={faAdd} />,
                label: "Create New Post",
              },
            ]}
          />
        </div>
        <div className="dashboard-footer-menu">
          {userId && (
            <select
              name="user"
              value={userId}
              onChange={changeRole}
              className="user-role"
            >
              {roles.map((role) => {
                return (
                  <option value={role.userId} key={role.userId}>
                    {role.label}
                  </option>
                );
              })}
            </select>
          )}
          <SwitchThemeButton theme={theme} setTheme={setTheme} />
          <Button
            type="text"
            icon={
              collapsed ? (
                <FontAwesomeIcon icon={faAnglesRight} />
              ) : (
                <FontAwesomeIcon icon={faAnglesLeft} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 54,
              height: 36,
            }}
          />
        </div>
      </Sider>
      <Layout className="dashboard-main">
        <Header className="dashboard-header">
          <DashboardHeader
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
          />
        </Header>
        <Content
          style={{
            margin: "0 24px 50px",
          }}
        >
          {getContent()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
