import React from "react";
import "./index.scss";
import logoBrisa from "../images/logo_brisa.png";

const Navbar = () => {
  const [menuShow, setMenu] = React.useState(false);
  const showMenu = () => setMenu(!menuShow);

  return (
    <nav className="navbar flex fixed items-center justify-between flex-wrap w-screen px-10 lg:px-60 xl:px-96 py-8">
      <a href="#hero-section">
        <img src={logoBrisa} className="lg:hidden navbar__logo" />
      </a>
      <div className="flex align-center justify-between lg:hidden">
        <button className="mr-10 w-0" onClick={showMenu}>
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
          {" "}
          <a href="#about" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            La scuola
          </a>
          <a href="#contact" className="block mt-4 lg:inline-block lg:mt-0">
            Contatti
          </a>
          <a href="#findus" className="block mt-4 lg:inline-block lg:mt-0">
            Dove trovarci
          </a>
          <a href="#video" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            Video didattici
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
