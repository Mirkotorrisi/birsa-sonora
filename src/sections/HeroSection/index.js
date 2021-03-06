import React, { useEffect, useState } from "react";
import "./index.scss";

import Ondine from "../../../public/static/svg/ondineMod_anim.svg";
import violinBg from "../../images/violin.webp";
import pianoPng from "../../images/pianoPng.webp";
import { useNav } from "../../hooks/useNav";
import { quotes } from "./res";
// import video from "../images/video.mp4";
import { gsap } from "gsap";

let interval;
export default function HeroSection() {
  const ref = useNav("#home");
  const q = gsap.utils.selector(ref);
  let tl = gsap.timeline({
    delay: 1,
  });
  const [index, setindex] = useState(0);

  useEffect(() => {
    interval = setInterval(() => {
      setindex((prev) => (prev < quotes.length - 1 ? prev + 1 : 0));
      tl.fromTo(
        q(".text"),
        {
          y: "100%",
          letterSpacing: "15px",
          duration: 0.5,
          stagger: 0.25,
        },
        {
          y: "0%",
          letterSpacing: "0px",
          duration: 0.5,
          stagger: 0.25,
        }
      );
    }, 5000);
    gsap.to(q(".ond-even"), { x: 300, opacity: 0, duration: 1, delay: 0.5 });
    gsap.to(q(".ond-odd"), { x: -300, opacity: 0, duration: 1, delay: 0.5 });

    tl.from(q(".hero-section__title"), { opacity: 0, duration: 0.5 });

    gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: "#violin",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      })
      .fromTo(q("#violin"), { right: "20%" }, { right: "-30%" });
    gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: "#violin",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      })
      .fromTo(
        q("#piano"),
        { right: 0, rotation: 60 },
        { right: -200, rotation: 130 }
      );
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="hero-section h-screen px-10 lg:px-36 xl:px-48"
      id="hero-section"
    >
      <div
        className="hero-section__main h-full flex flex-col justify-between items-start py-36"
        ref={ref}
      >
        <Ondine className="ondine" />
        <img
          src={violinBg}
          alt="violin"
          id="violin"
          aria-hidden="true"
          className="hero-section__violin hidden lg:block"
        />
        <img
          src={pianoPng}
          alt="piano"
          id="piano"
          aria-hidden="true"
          className="hero-section__violin piano hidden lg:block"
        />
        {/* <video
          src={video}
          style={{ position: "fixed", top: 0, left: 1200, zIndex: 1 }}
        /> */}
        <div className="hero-section__title my-10">
          <h1>
            Impara a <span>suonare</span> con noi
          </h1>
        </div>
        <h2 className="hero-section__proposal  lg:mb-10">
          Prenota ora la tua lezione di prova gratuita online o in presenza
        </h2>
        <div className="hero-section__ctas ">
          <button className="hero-section__ctas__contact mt-10 lg:mt-0">
            <a href="#contact" className="contact_cta">
              Contattaci
            </a>
          </button>
        </div>
        <div className="hero-section__quote mt-36">
          <p
            className={
              "hero-section__subtitle hide " +
              (quotes[index].secondline ? "" : "mb-5")
            }
          >
            <span className="text">{quotes[index].quote}</span>
          </p>
          {quotes[index].secondline && (
            <p className="hero-section__subtitle hide mb-5">
              <span className="text">{quotes[index].secondline}</span>
            </p>
          )}
          <p className="hero-section__subtitle__author hide mb-5">
            <span className="text">{quotes[index].author}</span>
          </p>
        </div>
      </div>
    </header>
  );
}
