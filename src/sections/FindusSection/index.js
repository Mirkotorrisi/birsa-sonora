import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNav } from "../../hooks/useNav";
import "./index.scss";
import NoteRighe from "../../../public/static/svg/note_with_righe.svg";
export default function FindusSection() {
  const ref = useNav("#findus");
  const q = gsap.utils.selector(ref);

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".find-us",
          start: "top center",
        },
      })
      .from(q(".title"), { xPercent: -50, opacity: 0 }, 0)
      .from(q("address"), { xPercent: 50, opacity: 0 }, 0);
    gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: ".notes_cover",
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(q(".notes_cover"), { x: "100%" });
  }, []);

  return (
    <section className="find-us" id="findus" ref={ref}>
      <div className="notes_cont">
        <div className="notes_cover"></div>
        <NoteRighe
          style={{
            transform: "translateX(-30px)",
            width: "100vw",
            height: 264,
          }}
        />
      </div>
      <div className="lg:pt-20 mb-5 px-10 lg:px-60 xl:px-96">
        <h1 className="title">Dove ci troviamo</h1>
        <address className="mt-20 pl-2 ">
          La nostra sede è in Via Tenente Garozzo, 2 95025
          <p>Aci Sant'Antonio (CT)</p>
        </address>
      </div>

      <div
        style={{
          height: 380,
          overflow: "hidden",
          clipPath: "polygon(0 20%, 100% 20%, 100% 100%, 0% 100%)",
        }}
      >
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=18inuwOcaxrVr2UiiT0nQYhG3k1Ww9w8s"
          width="100%"
          height="380"
        ></iframe>
      </div>
    </section>
  );
}
