import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ThemeSwitcher() {
  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        value="mnemiq-light"
        className="theme-controller"
      />
      <FontAwesomeIcon icon={faSun} className="swap-off h-6 w-6 fill-current" />
      <FontAwesomeIcon icon={faMoon} className="swap-on h-6 w-6 fill-current" />
    </label>
  );
}

export default ThemeSwitcher;
