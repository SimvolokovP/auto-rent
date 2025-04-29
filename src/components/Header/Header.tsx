import { Link } from "react-router-dom";
import ThemeButton from "../ThemeButton/ThemeButton";

import "./Header.scss";

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <div className="header__hud">
          <Link to={"/"}>
            <h3 className="header__hud--title">UbX</h3>
          </Link>
          <div className="header__hud--theme">
            <ThemeButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
