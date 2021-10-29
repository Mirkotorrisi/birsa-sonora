import React, { useRef, useEffect } from "react";
import "./index.scss";

import Logo from "../../public/static/svg/logo_brisa.svg";
import Ondine from "../../public/static/svg/ondineMod_anim.svg";
import violinBg from "../images/violin.png";
import { instruments } from "./res";
import video from "../images/video.mp4";
import { gsap } from "gsap";

export default function HeroSection() {
  const ref = useRef(null);
  const q = gsap.utils.selector(ref);
  let tl = gsap.timeline({
    delay: 1,
  });
  useEffect(() => {
    gsap.to(q(".ond-even"), { x: 300, opacity: 0, duration: 1, delay: 0.5 });
    gsap.to(q(".ond-odd"), { x: -300, opacity: 0, duration: 1, delay: 0.5 });
    gsap.from(q(".hero-section__list__icon"), {
      opacity: 0,
      x: -1000,
      stagger: 0.2,
      delay: 1,
    });
    tl.from(q(".hero-section__title"), { opacity: 0, duration: 0.5 })
      .from(q(".hero-section__subtitle"), { opacity: 0, duration: 0.5 })
      .from(q(".hero-section__list__instr"), { opacity: 0, duration: 0.2 });
  }, []);

  return (
    <header className="hero-section h-screen px-10 lg:px-40 xl:px-60">
      <div className="hero-section__main lg:px-20 xl:px-36" ref={ref}>
        <Ondine className="ondine" />
        <img
          src={violinBg}
          alt="violin"
          aria-hidden="true"
          className="hero-section__violin"
        />
        {/* <video
          src={video}
          style={{ position: "fixed", top: 0, left: 1200, zIndex: 1 }}
        /> */}
        <h1 className="hero-section__title">
          <div className="hidden md:block">
            <Logo style={{ width: 150, maxWidth: "15vw", marginRight: 10 }} />
          </div>
          Brisa
          <span>Sonora</span>
        </h1>
        <p className="hero-section__subtitle mb-5">
          Corsi di musica per tutte le età
        </p>
        <ul className="hero-section__list mb-20 mt-10">
          {instruments.map(({ imgSrc, title, alt }) => (
            <li
              className="hero-section__list__item items-center"
              key={alt + title}
            >
              <img
                src={imgSrc}
                aria-hidden="true"
                alt={alt}
                className="hero-section__list__icon"
              />
              <span className="hero-section__list__instr"> {title}</span>
            </li>
          ))}
        </ul>
        <div className="hero-section__ctas mt-36 lg:mt-20 lg:mt-0">
          <button className="hero-section__ctas__contact">
            <a href="#contact" className="contact_cta">
              Contattaci
            </a>
          </button>
          <button className="hero-section__ctas__find-us ml-20">
            <a href="#findus">Vieni a trovarci</a>
          </button>
        </div>
      </div>
    </header>
  );
}
