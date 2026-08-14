import { Moon, Sun } from "lucide-react";

function ThemeSwitcher() {
  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        value="mnemiq-light"
        className="theme-controller"
      />

      <Sun className="swap-off h-6 w-6 fill-current" />
      <Moon className="swap-on h-6 w-6 fill-current" />
    </label>
  );
}

export default ThemeSwitcher;
