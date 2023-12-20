import { Switch } from "antd";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SwitchThemeButton({ theme, setTheme }) {
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const switchStyle = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    border: `1px solid ${theme === "light" ? "#d9d9d9" : "#434343"}`,
    color: theme === "light" ? "#1890ff" : "#52c41a",
  };
  return (
    <Switch
      unCheckedChildren={<FontAwesomeIcon icon={faMoon} />}
      checkedChildren={
        <FontAwesomeIcon icon={faSun} style={{ color: "#000" }} />
      }
      checked={theme === "light"}
      onChange={toggleTheme}
      style={switchStyle}
    />
  );
}

export default SwitchThemeButton;
