import React from "react";
import "./index.scss";
import violinjpg from "../images/violin.jpg";
import pianojpg from "../images/piano2.jpg";

export default function HeroSection() {
  return (
    <header className="hero-section h-screen px-60">
      <div className="hero-section__main px-36">
        <h1 className="hero-section__title">
          <span>B</span>risa sonora
        </h1>
        <p className="hero-section__subtitle mb-5">
          Corsi di musica per tutte le età
        </p>
        <ul className="hero-section__list mb-20 mt-10">
          <li className="hero-section__list__item">Pianoforte</li>
          <li className="hero-section__list__item">Violino</li>
          <li className="hero-section__list__item">Chitarra</li>
          <li className="hero-section__list__item">Sax</li>
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
