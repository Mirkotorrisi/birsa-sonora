import React, { useState, useEffect } from "react";
import { requestSendMessage } from "../../services";
import { gsap } from "gsap";
import { useNav } from "../../hooks/useNav";
import "./index.scss";
import { PHONE_NUMBER, LAURA_NUMBER, EMAIL } from "./resources.js";

export default function ContactSection() {
  const ref = useNav("#contact");
  const [input, setInput] = useState("");
  const [contact, setContact] = useState("");
  const [modalMsg, setModalMsg] = useState("");

  const handleInput = (e) => setInput(e.target.value);
  const handleContact = (e) => setContact(e.target.value);
  const q = gsap.utils.selector(ref);

  const sendMessage = async (e) => {
    e.preventDefault();
    const res = await requestSendMessage({ input, contact });
    typeof window !== "undefined" &&
      window.gtag("event", "click", { input, contact });

    setModalMsg(res);
  };

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top center",
        },
      })
      .from(q(".title"), { xPercent: -50, opacity: 0 }, 0)
      .from(q("textarea"), { xPercent: -50, opacity: 0 }, 0)
      .from(q("button"), { xPercent: 50, opacity: 0 }, 0)
      .from(q("h3"), { xPercent: -50, opacity: 0 }, 0);
  }, []);

  return (
    <section
      className="contact-section py-36 lg:py-20 px-10 lg:px-36 xl:px-48"
      ref={ref}
      id="contact"
    >
      <h2 className="title">Contattaci</h2>
      <div className="contact-section__form mt-20">
        <h3 className="contact-section__form__title">
          Prenota ora la tua lezione di prova gratuita, ti risponderemo il prima
          possibile!
        </h3>
        <form className="flex flex-col items-start mt-5" onSubmit={sendMessage}>
          <input
            type="text"
            id="contact"
            placeholder="Il tuo numero o la tua email"
            className="contact-section__form__email mt-5"
            required
            pattern="^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|(\d{3}\d{3}\d{4})$"
            onChange={handleContact}
          />
          <div className="contact-section__form__input__container">
            <textarea
              id="message"
              type="text"
              required
              className={`contact-section__form__input mt-10`}
              style={{
                minHeight: "3rem",
                height: `${input.length / 10}rem`,
              }}
              placeholder="Salve, vorrei avere maggiori informazioni..."
              ref={ref}
              onChange={handleInput}
              value={input}
            />
          </div>
          <input
            type="submit"
            className="contact-section__form__submit mt-10"
            value="Prenota"
          />
          {/* <a
              href={whatsappLink}
              className="hero-section__ctas__contact"
              target="_blank"
            > */}
          {/* </a> */}
          <p className="contact-section__form__privacy">
            Cliccando su Prenota aderisci alla nostra
            <a
              href="https://www.iubenda.com/privacy-policy/10563366"
              title="Privacy Policy"
              className="ml-2 hoverable"
              target="_blank"
            >
              Privacy Policy
            </a>
          </p>
        </form>
        <h3 className="mt-20">
          In alternativa, puoi chiamare uno di questi numeri:
          <a href={`tel:${PHONE_NUMBER}`} className="phone_number hoverable">
            +39 {PHONE_NUMBER}
          </a>
          <a href={`tel:${LAURA_NUMBER}`} className="phone_number hoverable">
            +39 {LAURA_NUMBER}
          </a>
          O mandare un'email a{" "}
          <a href={`mailto:${EMAIL}`} className="phone_number hoverable">
            {EMAIL}
          </a>
        </h3>
      </div>
      {modalMsg && (
        <div className="modalContainer">
          <div className="contactmodal">
            <div className="overlay">
              <h3 className="modal__msg">{modalMsg}</h3>
              <button
                className="contact-section__form__submit mt-10"
                onClick={() => setModalMsg("")}
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
