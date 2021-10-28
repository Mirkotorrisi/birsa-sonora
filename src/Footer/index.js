import React from "react";
import { socials } from "./resources";
import logocompleto from "../images/logocompleto.png";
import "./index.scss";

const Footer = () => (
  <footer className="footer flex flex-col md:flex-row items-center justify-between flex-wrap w-screen p-3 lg:px-60 xl:px-96 py-20">
    <div className="footer__section">
      <img
        src={logocompleto}
        alt="brisa sonora logo"
        className={"footer__section__logo"}
      />
    </div>
    <div className="footer__section flex justify-between">
      {socials.map(({ src, href }, index) => (
        <a href={href}>
          <img
            src={src}
            alt={href.slice(12, 20)}
            className={"footer__section__social " + (index !== 0 ? "ml-3" : "")}
          />
        </a>
      ))}
    </div>
    <div className="footer__section mt-10 md:mt-0">
      Developed by
      <a href="https://www.linkedin.com/in/mirko-torrisi/"> Mirko Torrisi</a>
    </div>
  </footer>
);

export default Footer;
