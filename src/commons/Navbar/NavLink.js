import React, { useContext } from "react";
import { NavContext } from "../../context/NavContext";

const NavLink = ({ link, children }) => {
  const { activeNavLinkId, setActiveNavLinkId } = useContext(NavContext);
  const handleClick = () => {
    setActiveNavLinkId(link);
  };

  return (
    <a
      href={link}
      className={`block nav__item p-6 lg:inline-block ${
        activeNavLinkId === link ? "activeClass" : ""
      }`}
      onClick={handleClick}
      id={link}
    >
      {children}
    </a>
  );
};

export default NavLink;
