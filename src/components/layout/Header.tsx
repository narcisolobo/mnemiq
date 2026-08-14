import MnemIQLogo from "../brand/MnemIQLogo";
import ThemeSwitcher from "../shared/ThemeSwitcher";

function Header() {
  return (
    <div className="bg-base-200 border-neutral flex-none border-b-4">
      <div className="max-w-8xl mx-auto px-4">
        <header className="navbar">
          <div className="flex-1">
            <MnemIQLogo />
          </div>
          <div className="navbar-end">
            <ThemeSwitcher />
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
