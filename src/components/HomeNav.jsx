import React from "react";
import SwitchThemeButton from "./SwitchThemeButton";

function HomeNav({ theme, setTheme }) {
  return (
    <div className="home-nav">
      <div
        className="home-nav-logo"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Knowledge Base
      </div>
      <div className="nav-theme-switch">
        <SwitchThemeButton theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}

export default HomeNav;
