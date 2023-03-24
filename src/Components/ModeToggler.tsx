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
        <span></span>
      </label>
      <SunIcon />
    </div>
  );
};

export default ModeToggler;
