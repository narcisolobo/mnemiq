import Logo from '../brand/Logo';
import { Moon, Sun } from 'lucide-react';

function Header() {
  return (
    <div className="bg-base-200 border-b-4 border-neutral">
      <div className="px-4 max-w-8xl mx-auto">
        <header className="navbar">
          <div className="flex-1">
            <Logo />
          </div>
          <div className="navbar-end">
            <label className="swap swap-rotate ">
              <input
                type="checkbox"
                value="mnemiq-light"
                className="theme-controller focus-ring ring-offset-base-200"
              />

              <Sun className="swap-off h-6 w-6 fill-current" />
              <Moon className="swap-on h-6 w-6 fill-current" />
            </label>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
