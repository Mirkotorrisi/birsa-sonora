import React from "react";
import "./index.scss";

import bLogo from "../images/logo_brisa.svg";
import violinBg from "../images/violinBg.png";
import violinIcon from "../images/violinIcon.png";
import saxIcon from "../images/saxIcon.png";
import pianoIcon from "../images/pianoIcon.png";
import guitarIcon from "../images/guitarIcon.png";
import video from "../images/video.mp4";

export default function HeroSection() {
  return (
    <header className="hero-section h-screen px-60">
      <div className="hero-section__main px-36">
        <img
          src={violinBg}
          alt="violin"
          aria-hidden="true"
          className="hero-section__violin"
        />
        <video
          src={video}
          style={{ position: "fixed", top: 0, left: 1200, zIndex: 1 }}
        />
        <h1 className="hero-section__title">
          Brisa
          <span>Sonora</span>
        </h1>
        <p className="hero-section__subtitle mb-5">
          Corsi di musica per tutte le età
        </p>
        <ul className="hero-section__list mb-20 mt-10">
          <li className="hero-section__list__item">
            <img
              src={pianoIcon}
              aria-hidden="true"
              alt="piano"
              className="hero-section__list__icon"
            />
            Pianoforte
          </li>
          <li className="hero-section__list__item">
            <img
              src={violinIcon}
              aria-hidden="true"
              alt="violin"
              className="hero-section__list__icon"
            />
            Violino
          </li>
          <li className="hero-section__list__item">
            <img
              src={guitarIcon}
              aria-hidden="true"
              alt="guitar"
              className="hero-section__list__icon"
            />
            Chitarra
          </li>
          <li className="hero-section__list__item">
            <img
              src={saxIcon}
              aria-hidden="true"
              alt="sax"
              className="hero-section__list__icon"
            />
            Sax
          </li>
        </ul>
        <div className="hero-section__ctas">
          <button className="hero-section__ctas__contact">Contattaci</button>
          <button className="hero-section__ctas__find-us ml-20">
            Vieni a trovarci
          </button>
        </div>
      </div>
    </header>
  );
}
