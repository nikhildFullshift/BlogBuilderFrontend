import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import Home from "./pages/home-page/Home";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import ViewBlog from "./pages/view-blog-page/ViewBlog";

function Routes() {
  const [theme, setTheme] = useState();
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme);
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, []);
  return (
    <Router>
      <Layout className={theme === "dark" ? "dark-theme" : "light-theme"}>
        <Switch>
          <Route
            exact
            path="/"
            element={<Home theme={theme} setTheme={setTheme} />}
          />
          <Route
            exact
            path="/blog/:id"
            element={<ViewBlog theme={theme} setTheme={setTheme} />}
          />
          <Route
            exact
            path="/dashboard"
            element={<Dashboard theme={theme} setTheme={setTheme} />}
          />
          <Route exact path="/pageNotFound" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/pageNotFound" />} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default Routes;
