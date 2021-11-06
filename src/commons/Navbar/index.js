import React from "react";
import "./index.scss";
import NavLink from "./NavLink";
import logoBrisa from "../../images/logo_brisa.webp";

const Navbar = () => {
  const [menuShow, setMenu] = React.useState(false);
  const showMenu = () => setMenu(!menuShow);

  return (
    <nav className="navbar flex fixed items-center justify-between flex-wrap w-screen py-4 lg:py-0 px-10 lg:px-60 xl:px-96 ">
      <a href="#hero-section">
        <img
          src={logoBrisa}
          alt="logo-brisa"
          className="lg:hidden navbar__logo"
        />
      </a>
      <div className="flex align-center justify-between lg:hidden">
        <button aria-label="menu" className="mr-10 w-0" onClick={showMenu}>
          <div
            id="hamburger"
            className={"hamburglar " + (menuShow ? "is-open" : "is-closed")}
          >
            <div className="burger-icon">
              <div className="burger-container">
                <span className="burger-bun-top"></span>
                <span className="burger-filling"></span>
                <span className="burger-bun-bot"></span>
              </div>
            </div>

            <div className="path-burger">
              <div className="animate-path"></div>
            </div>
          </div>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-right lg:w-auto ${
          menuShow ? "" : "h-0"
        } lg:h-full`}
      >
        <div
          className={` ${
            !menuShow ? "hidden" : ""
          } lg:flex flex-col lg:flex-row flexitems-center mt-5 lg:mt-0 justify-between lg:flex-grow w-full`}
        >
          <NavLink link="#about">La scuola</NavLink>
          <NavLink link="#contact">Contatti</NavLink>
          <NavLink link="#findus">Dove Trovarci</NavLink>
          <NavLink link="#video">Video Didattici</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
