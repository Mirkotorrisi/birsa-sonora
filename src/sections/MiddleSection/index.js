import React, { useRef, useEffect } from "react";
import "./index.scss";
import { useNav } from "../../hooks/useNav";
import { gsap } from "gsap";
import { pictures } from "./res.js";
import WaveSvg from "../../../public/static/svg/vaweSvg.svg";

export default function MiddleSection() {
  const ref = useNav("#about");
  const q = gsap.utils.selector(ref);

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".middle-section__picture",
          start: "top center",
        },
      })
      .from(q("img"), { xPercent: -50, opacity: 0 }, 0)
      .from(q("p"), { xPercent: 50, opacity: 0 }, 0);
  }, []);

  return (
    <>
      <section
        className="middle-section  px-10 pt-20 lg:px-60 xl:px-96 "
        ref={ref}
        id="about"
      >
        <h1 className="title mb-20">La scuola </h1>
        {pictures.map((pic, i) => (
          <div className="mt-20">
            <h2 className="middle-section__picture__title mb-10 mt-20 lg:mt-0">
              {pic.title}
            </h2>
            <div
              className={`middle-section__picture items-start lg:items-center ${
                i !== pictures.length - 1 ? "pb-36" : ""
              } flex-col lg:flex-row${i % 2 === 0 ? "-reverse" : ""}`}
              key={pic.alt + i + "o"}
            >
              <img
                src={pic.src}
                alt={pic.alt}
                className={`middle-section__picture__img ${
                  i % 2 === 0 ? "lg:ml-10" : "lg:mr-10"
                }`}
                id={`img-${i}`}
              />

              <p
                className="middle-section__picture__desc mt-20 lg:mt-0 "
                id={`p-${i}`}
              >
                {pic.desc}
              </p>
            </div>
          </div>
        ))}
      </section>
      <div className="svgContainer">
        <WaveSvg />
      </div>
    </>
  );
}
