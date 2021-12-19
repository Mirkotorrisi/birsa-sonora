import React, { useEffect } from "react";
import "./index.scss";
import { useNav } from "../../hooks/useNav";
import { gsap } from "gsap";
import { pictures } from "./res.js";
import WaveSvg from "../../../public/static/svg/vaweSvg.svg";

export default function MiddleSection() {
  const ref = useNav("#about");
  const q = gsap.utils.selector(ref);

  useEffect(() => {
    pictures.forEach((pic, i) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: `#middle-${i}`,
            start: "top center",
          },
        })
        .from(q(`#img-${i}`), { xPercent: -50, opacity: 0 }, 0)
        .from(q(`#p-${i}`), { xPercent: 50, opacity: 0 }, 0);
    });
  }, []);

  return (
    <>
      <section
        className="middle-section pt-20 px-10 lg:px-36 xl:px-48"
        ref={ref}
        id="about"
      >
        {pictures.map((pic, i) => (
          <div className="mt-20" key={pic.title} id={`middle-${i}`}>
            <h2 className="middle-section__picture__title mb-10 mt-20 lg:mt-0">
              {pic.title}
            </h2>
            <div
              className={`middle-section__picture items-start lg:items-center ${
                i !== pictures.length - 1 ? "pb-36" : ""
              } ${i % 2 === 0 ? "row-reverse" : "row"} flex flex-col`}
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
