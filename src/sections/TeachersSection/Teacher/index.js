import "./index.scss";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Teacher({ teacher, instrument }) {
  const ref = useRef(null);
  const q = gsap.utils.selector(ref);
  const name = teacher?.name.split(" ")[0];
  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: `#${name}`,
          start: "top center",
        },
      })

      .from(q(`#${name}-desc`), { yPercent: 50, opacity: 0, stagger: 0.5 }, 0);
    gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: q(`#${name}`),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(q(`#${name}-instrument`), { y: "10%", x: "30%" });
    gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: q(".teacher"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(q(`#${name}-picture`), { y: "10%" });
  }, []);
  return (
    <div className="flex flex-col mt-20 lg:mt-0 teacher" ref={ref} id={name}>
      <h2 className="teachers-section__name mt-10">
        <img
          src={instrument.imgSrc}
          aria-hidden="true"
          alt={instrument.imgSrc}
          className="hero-section__list__icon"
        />
        {teacher?.name}
      </h2>
      <div className="flex space-between flex-col md:flex-row md:items-center">
        <div
          className="mb-10 teacher-carousel"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={teacher?.instrument}
            alt={teacher?.altInstr}
            className={`teachers-section__picture__instrument noselect`}
            id={`${name}-instrument`}
            style={{
              transform: `rotateY(180deg) translateX(-30%) rotateX(-200deg) translateZ(-1px)`,
              WebkitTransform: `rotateY(180deg)`,
            }}
          />
          <img
            src={teacher?.src}
            alt={teacher?.alt}
            className={`teachers-section__picture__face noselect`}
            id={`${name}-picture`}
            style={{
              position: "absolute",
              backfaceVisibility: "hidden",
              margin: 20,
              transform: `translateZ(100px) translateY(100}px)`,
              WebkitTransform: `translateZ(100px) translateY(100px)`,
              transition: "transform 0.2s",
            }}
          />
        </div>
        <div className="teachers-section__desc p-10" id={`${name}-desc`}>
          <p className="teachers-section__bio">{teacher?.bio}</p>
        </div>
      </div>
    </div>
  );
}
