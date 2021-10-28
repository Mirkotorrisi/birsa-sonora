import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { gsap } from "gsap";

import { teachers } from "./resources.js";
import { instruments } from "../HeroSection/res";
import TeachersCarousel from "./TeachersCarousel";

let interval;
export default function MiddleSection() {
  const [index, setIndex] = useState(0);

  const ref = useRef(null);
  const q = gsap.utils.selector(ref);

  useEffect(() => {
    interval = setInterval(() => {
      setIndex((prev) => (prev < instruments.length - 1 ? prev + 1 : 0));
    }, 5000);
  }, []);

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".teachers-section",
          start: "top center",
        },
      })
      .from(q("img"), { xPercent: -50, opacity: 0, stagger: 0.1 }, 0)
      .from(q("p"), { xPercent: 50, opacity: 0, stagger: 0.1 }, 0);
  }, []);

  return (
    <section
      className="teachers-section  pt-36 lg:pb-10 px-10 lg:px-60 xl:px-96"
      ref={ref}
    >
      <h1 className="title mb-10 lg:mt-20">I docenti</h1>
      <div className="teachers-section__instruments flex space-around">
        {instruments.map(({ imgSrc, title, alt }, instrInd) => (
          <li
            className={`hero-section__list__item${
              index % instruments.length === instrInd ? "--selected" : ""
            }`}
            key={alt + title}
            onClick={() => {
              setIndex(instrInd);
              clearInterval(interval);
            }}
          >
            <img
              src={imgSrc}
              aria-hidden="true"
              alt={alt}
              className="hero-section__list__icon"
            />
          </li>
        ))}
      </div>
      <h2 className="teachers-section__name mt-10">
        {teachers[Math.abs(index) % teachers.length]?.name}
      </h2>
      <div className="flex flex-col md:flex-row space-between mt-20 lg:mt-0">
        <TeachersCarousel
          index={index}
          setIndex={setIndex}
          interval={interval}
        />
        <div className="flex space-between">
          <div className="w-1/2 h-1/2"></div>
          <div className="teachers-section__desc p-10">
            <p className="teachers-section__bio">
              {teachers[Math.abs(index) % teachers.length]?.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
