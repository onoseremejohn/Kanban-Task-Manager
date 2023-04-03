import { MoonIcon, SunIcon } from "../assets/Icons";
import { useGlobalContext } from "../AppContext";
const ModeToggler = () => {
  const { theme, toggleTheme } = useGlobalContext() || {};
  return (
    <div className="icons">
      <MoonIcon />
      <label className="switch">
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === "light"}
        />
        <span
          style={{
            backgroundColor: `${
              theme === "light" ? "var(--purple)" : "var(--grey)"
            }`,
          }}
        ></span>
      </label>
      <SunIcon />
    </div>
  );
};

export default ModeToggler;
