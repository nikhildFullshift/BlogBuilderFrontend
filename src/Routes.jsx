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
  if (
    document.querySelector("#root") &&
    document.getElementById("cursor-bubble")
  ) {
    const pc = document.querySelector("#root");
    const cursorBubble = document.getElementById("cursor-bubble");
    pc.addEventListener("mouseenter", () => {
      cursorBubble.style.scale = 1;
    });

    pc.addEventListener("mouseleave", () => {
      cursorBubble.style.scale = 0;
    });
    pc.addEventListener("click", () => {
      cursorBubble.style.height = "50px";
      cursorBubble.style.width = "50px";
      setTimeout(() => {
        cursorBubble.style.height = "20px";
        cursorBubble.style.width = "20px";
      }, 300);
    });
    pc.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const maxRightPosition = window.innerWidth - 20;
      const adjustedLeft = Math.min(mouseX, maxRightPosition);
      const maxBottomPosition = window.innerHeight - 20;
      const adjustedTop = Math.min(mouseY, maxBottomPosition);
      // Update the position of the bubble
      cursorBubble.style.left = `${adjustedLeft}px`;
      cursorBubble.style.top = `${adjustedTop}px`;
    });
  }
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
    <>
      <div id="cursor-bubble"></div>
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
    </>
  );
}

export default Routes;
