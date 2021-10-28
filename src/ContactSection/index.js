import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "./index.scss";
import { PHONE_NUMBER, LAURA_NUMBER, EMAIL } from "./resources.js";

export default function ContactSection() {
  const ref = useRef();
  const [interacted, setInteracted] = useState(false);
  const [input, setInput] = useState("");

  const handleInput = (e) => setInput(e.target.value);
  const whatsappLink = `https://wa.me/+39${PHONE_NUMBER}/?text=${input}`;
  const q = gsap.utils.selector(ref);

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top center",
        },
      })
      .from(q(".title"), { xPercent: -50, opacity: 0 }, 0)
      .from(q(".contact-section__form__title"), { xPercent: 50, opacity: 0 }, 0)
      .from(q("textarea"), { xPercent: -50, opacity: 0 }, 0)
      .from(q("button"), { xPercent: 50, opacity: 0 }, 0)
      .from(q("h3"), { xPercent: -50, opacity: 0 }, 0);
  }, []);

  return (
    <section
      className="contact-section py-20 px-10 lg:px-60 xl:px-96"
      ref={ref}
      id="contact"
    >
      <h1 className="title">Contattaci</h1>
      <div className="contact-section__form mt-20">
        <h2 className="contact-section__form__title">
          Scrivici su WhatsApp per avere maggiori informazioni, ti risponderemo
          il prima possibile!
        </h2>
        <form className="flex flex-col items-start mt-5">
          <div className="contact-section__form__input__container">
            <textarea
              type="text"
              className={`contact-section__form__input${
                !interacted ? "--anim" : ""
              } mt-10`}
              style={{
                minHeight: "3rem",
                height: `${input.length / 10}rem`,
              }}
              placeholder="Salve, vorrei avere maggiori informazioni..."
              onFocus={() => setInteracted(true)}
              ref={ref}
              onChange={handleInput}
              value={input}
            />
          </div>
          <button className="contact-section__form__submit mt-10">
            <a href={whatsappLink} className="hero-section__ctas__contact">
              Invia
            </a>
          </button>
        </form>
        <h3 className="mt-10">
          In alternativa, puoi chiamare uno di questi numeri:
          <a href={`tel:${PHONE_NUMBER}`} className="phone_number">
            +39 {PHONE_NUMBER}
          </a>
          <a href={`tel:${LAURA_NUMBER}`} className="phone_number">
            +39 {LAURA_NUMBER}
          </a>
          O mandare un'email a{" "}
          <a href={`mailto:${EMAIL}`} className="phone_number">
            {EMAIL}
          </a>
        </h3>
      </div>
    </section>
  );
}
