(self.webpackChunkbrisa_sonora = self.webpackChunkbrisa_sonora || []).push([
  [678],
  {
    5969: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, {
          default: function () {
            return q;
          },
        });
      var r,
        a = n(7294),
        i = n(5586),
        o = n.n(i),
        l = n(563),
        s = n.n(l),
        c = n.p + "static/violin-ee73e65e293f4e6a0d0be160f4bc071f.webp",
        u = a.createContext(),
        d = function (e) {
          var t = e.children,
            n = (0, a.useState)(""),
            r = { activeNavLinkId: n[0], setActiveNavLinkId: n[1] };
          return a.createElement(u.Provider, { value: r }, t);
        },
        m = function (e) {
          var t = (0, a.useRef)(null),
            n = (0, a.useContext)(u).setActiveNavLinkId,
            r = (function (e) {
              var t = (0, a.useState)(!1),
                n = t[0],
                r = t[1],
                i = new IntersectionObserver(
                  function (e) {
                    var t = e[0];
                    return r(t.isIntersecting);
                  },
                  { threshold: [0.25, 0.5, 0.75] }
                );
              return (
                (0, a.useEffect)(function () {
                  return (
                    i.observe(e.current),
                    function () {
                      i.disconnect();
                    }
                  );
                }),
                n
              );
            })(t);
          return (
            (0, a.useEffect)(
              function () {
                r && n(e);
              },
              [r, n, e]
            ),
            t
          );
        },
        f = [
          {
            imgSrc:
              "data:image/png;base64,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",
            alt: "piano",
            title: "Pianoforte",
          },
          {
            imgSrc:
              n.p + "static/violinIcon-8a523d2690890fff903ecc8cc74dbb1a.webp",
            alt: "violin",
            title: "Violino",
          },
          {
            imgSrc:
              n.p + "static/saxIcon-edc6e61a66c5b3d37080fda3fc5d9b97.webp",
            alt: "sax",
            title: "Sassofono",
          },
          {
            imgSrc:
              n.p + "static/guitarIcon-8e4849a13075d8d73b58366194521d66.webp",
            alt: "guitar",
            title: "Chitarra",
          },
        ],
        h = [
          {
            quote: "Il 20% dei ragazzi impara a suonare.",
            secondline: "Il 70% degli adulti vorrebbe averlo fatto.",
            author: "Anonimo",
          },
          {
            quote: "Se apprendi la musica,",
            secondline: "impari quasi tutto quello che c'è da conoscere.",
            author: "Edgar Cayce",
          },
          {
            quote: "Quando suoni scopri una parte di te",
            secondline: "che non sapevi esistesse.",
            author: "Bill Evans",
          },
          {
            quote: "E' fuori moda ammetterlo, ma suonare",
            secondline: "ci rende felici e ci fa sorridere.",
            author: "Chris Hesse",
          },
          {
            quote: "La terra ha musica per coloro che ascoltano.",
            author: "William Shakespeare",
          },
          {
            quote: "C'è musica in tutto, se sai come trovarla.",
            author: "Terry Pratchett",
          },
          {
            quote: "I fiori, la musica e i bambini,",
            secondline: "sono i gioielli della vita.",
            author: "Pyotr Ilyich Tchaikovsky",
          },
          {
            quote: "Sai cos'è la musica?",
            secondline: "Una connessione armonica fra tutte le creature.",
            author: "Maxwell Wallace",
          },
          {
            quote: "La musica è intorno a noi.",
            secondline: "Tutto ciò che devi fare è ascoltare.",
            author: "August Rush",
          },
        ],
        g = n(5732);
      function C() {
        var e = m("#home"),
          t = g.p8.utils.selector(e),
          n = g.p8.timeline({ delay: 1 }),
          i = (0, a.useState)(Math.round(Math.random() * (h.length - 1))),
          l = i[0],
          u = i[1];
        return (
          (0, a.useEffect)(function () {
            return (
              (r = setInterval(function () {
                u(function (e) {
                  return e < h.length - 1 ? e + 1 : 0;
                }),
                  n.fromTo(
                    t(".text"),
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
              }, 5e3)),
              g.p8.to(t(".ond-even"), {
                x: 300,
                opacity: 0,
                duration: 1,
                delay: 0.5,
              }),
              g.p8.to(t(".ond-odd"), {
                x: -300,
                opacity: 0,
                duration: 1,
                delay: 0.5,
              }),
              g.p8.from(t(".hero-section__list__icon"), {
                opacity: 0,
                x: -1e3,
                stagger: 0.2,
                delay: 1,
              }),
              n
                .from(t(".hero-section__title"), { opacity: 0, duration: 0.5 })
                .from(t(".hero-section__list__instr"), {
                  opacity: 0,
                  duration: 0.2,
                }),
              function () {
                return clearInterval(r);
              }
            );
          }, []),
          a.createElement(
            "header",
            {
              className: "hero-section h-screen px-10 lg:px-40 xl:px-60",
              id: "hero-section",
            },
            a.createElement(
              "div",
              {
                className:
                  "hero-section__main h-full flex flex-col justify-between items-start py-36 lg:px-20 xl:px-36",
                ref: e,
              },
              a.createElement(s(), { className: "ondine" }),
              a.createElement("img", {
                src: c,
                alt: "violin",
                "aria-hidden": "true",
                className: "hero-section__violin",
              }),
              a.createElement(
                "div",
                { className: "hero-section__title mt-20" },
                a.createElement(
                  "div",
                  { className: "hidden md:inline logo" },
                  a.createElement(o(), {
                    style: { width: 150, maxWidth: "15vw", marginRight: 10 },
                  })
                ),
                a.createElement(
                  "div",
                  { className: "hero-section__title__logotipo" },
                  a.createElement(
                    "h1",
                    null,
                    "Brisa",
                    a.createElement("span", null, "Sonora")
                  ),
                  a.createElement(
                    "p",
                    { className: "hero-section__title__sublogo" },
                    "Corsi di musica"
                  )
                )
              ),
              a.createElement(
                "div",
                null,
                a.createElement(
                  "p",
                  {
                    className:
                      "hero-section__subtitle hide " +
                      (h[l].secondline ? "" : "mb-5"),
                  },
                  a.createElement("span", { className: "text" }, h[l].quote)
                ),
                h[l].secondline &&
                  a.createElement(
                    "p",
                    { className: "hero-section__subtitle hide mb-5" },
                    a.createElement(
                      "span",
                      { className: "text" },
                      h[l].secondline
                    )
                  ),
                a.createElement(
                  "p",
                  { className: "hero-section__subtitle__author hide mb-5" },
                  a.createElement("span", { className: "text" }, h[l].author)
                )
              ),
              a.createElement(
                "div",
                { className: "hero-section__ctas " },
                a.createElement(
                  "button",
                  { className: "hero-section__ctas__contact my-36 lg:mt-0" },
                  a.createElement(
                    "a",
                    { href: "#contact", className: "contact_cta" },
                    "Contattaci"
                  )
                )
              )
            )
          )
        );
      }
      var p = [
          {
            src: n.p + "static/foto-1-d419c1bef663b44d326025705563deb1.webp",
            alt: "alt_foto",
            desc: "Qui va scritto qualcosa e la foto va sostituita. Le foto devono avere tutte le stesse dimensioni. Il messaggio deve essere sintetico ma efficace, comunicare il valore aggiunto della scuola. La foto deve trasmettere PROFESSIONALITA'",
          },
          {
            alt: "alt_foto",
            src: n.p + "static/foto-2-91b28472918746e6458059de9bfe0ff2.webp",
            desc: "Qui va scritto qualcosa e la foto va sostituita. Le foto devono avere tutte le stesse dimensioni. Il messaggio deve essere sintetico ma efficace, comunicare il valore aggiunto della scuola. La foto deve trasmettere PROFESSIONALITA'",
          },
          {
            alt: "alt_foto",
            src: n.p + "static/foto-3-9e0161f1c00f7078508e5f9887de5235.webp",
            desc: "Qui va scritto qualcosa e la foto va sostituita. Le foto devono avere tutte le stesse dimensioni. Il messaggio deve essere sintetico ma efficace, comunicare il valore aggiunto della scuola. La foto deve trasmettere PROFESSIONALITA'",
          },
        ],
        v = n(1687),
        L = n.n(v);
      function A() {
        var e = m("#about"),
          t = g.p8.utils.selector(e);
        return (
          (0, a.useEffect)(function () {
            g.p8
              .timeline({
                scrollTrigger: {
                  trigger: ".middle-section__picture",
                  start: "top center",
                },
              })
              .from(t("img"), { xPercent: -50, opacity: 0 }, 0)
              .from(t("p"), { xPercent: 50, opacity: 0 }, 0);
          }, []),
          a.createElement(
            a.Fragment,
            null,
            a.createElement(
              "section",
              {
                className: "middle-section px-10 pt-20 lg:px-60 xl:px-96",
                ref: e,
                id: "about",
              },
              a.createElement("h1", { className: "title mb-20" }, "La scuola "),
              p.map(function (e, t) {
                return a.createElement(
                  "div",
                  {
                    className:
                      "middle-section__picture items-center " +
                      (t !== p.length - 1 ? "pb-36" : "") +
                      " flex-col xl:flex-row" +
                      (t % 2 == 0 ? "-reverse" : ""),
                    key: e.alt + t + "o",
                  },
                  a.createElement("img", {
                    src: e.src,
                    alt: e.alt,
                    className:
                      "middle-section__picture__img " +
                      (t % 2 == 0 ? "xl:ml-10" : "xl:mr-10"),
                    id: "img-" + t,
                  }),
                  a.createElement(
                    "p",
                    {
                      className: "middle-section__picture__desc mt-10 xl:mt-0 ",
                      id: "p-" + t,
                    },
                    e.desc
                  )
                );
              })
            ),
            a.createElement(
              "div",
              { className: "svgContainer" },
              a.createElement(L(), null)
            )
          )
        );
      }
      var y,
        k = n.p + "static/anninaPng-0274424aefcab1a6ed9bf3a4647675b7.webp",
        E = n.p + "static/lauraPng-4b7d39aa6f51412ea583ab12433d2efa.webp",
        b = n.p + "static/pianoPng-efe16aeb6bf8a4b087af39e1835417f3.webp",
        N = n.p + "static/saxPng-c9433b3912b370df537c441faa01be85.webp",
        B = n.p + "static/guitarPng-df4406f0da3b1c53a97e689a0e43ee5b.webp",
        w = [
          {
            src: k,
            instrument: b,
            name: "Annalisa Pennisi",
            bio: "Studia pianoforte da quando ha 5 anni. Entra al Conservatorio Vincenzo Bellini di Catania conseguendo la laurea triennale e la biennale specialistica con il massimo dei voti. \n\nHa fatto parte di svariate formazioni da camera, principalmente in duo con contrabbassisti e con cantanti; è stata pianista accompagnatrice del coro lirico NAMAE diretto dal maestro Carmelo Pappalardo. Attualmente frequenta la classe di fisarmonica classica presso il Conservatorio Arcangelo Corelli di Messina con il Maestro Ivano Biscardi.",
            alt: "annina",
            altInstr: "piano",
          },
          {
            src: E,
            instrument: c,
            name: "Laura Pennisi",
            bio: "Nata a Catania nel 1997, comincia a studiare violino all’età di 7 anni. \n\n A 15 anni entra al conservatorio di Catania conseguendo la laurea triennale nel 2019. \n\nAttualmente frequenta l’ultimo anno del biennio specialistico sempre al conservatorio di Catania. \n\nHa fatto parte di diverse importanti orchestre tra cui l’orchestra giovanile del teatro dell’opera di Roma e la prima orchestra giovanile del maestro Beppe Vessicchio.",
            alt: "alura",
            altInstr: "violin",
          },
          {
            src: k,
            instrument: N,
            name: "Giorgio Garozzo",
            bio: "Studia pianoforte da quando ha 5 anni. Entra al Conservatorio Vincenzo Bellini di Catania conseguendo la laurea triennale e la biennale specialistica con il massimo dei voti. \n\nHa fatto parte di svariate formazioni da camera, principalmente in duo con contrabbassisti e con cantanti; è stata pianista accompagnatrice del coro lirico NAMAE diretto dal maestro Carmelo Pappalardo. Attualmente frequenta la classe di fisarmonica classica presso il Conservatorio Arcangelo Corelli di Messina con il Maestro Ivano Biscardi.",
            alt: "giorgio",
            altInstr: "sax",
          },
          {
            src: E,
            instrument: B,
            name: "Ivan Rinaldi",
            bio: "Nata a Catania nel 1997, comincia a studiare violino all’età di 7 anni. \n\n A 15 anni entra al conservatorio di Catania conseguendo la laurea triennale nel 2019. \n\nAttualmente frequenta l’ultimo anno del biennio specialistico sempre al conservatorio di Catania. \n\nHa fatto parte di diverse importanti orchestre tra cui l’orchestra giovanile del teatro dell’opera di Roma e la prima orchestra giovanile del maestro Beppe Vessicchio.",
            alt: "ivan",
            altInstr: "guitar",
          },
          {
            src: k,
            instrument: b,
            name: "Annalisa Pennisi",
            bio: "Studia pianoforte da quando ha 5 anni. Entra al Conservatorio Vincenzo Bellini di Catania conseguendo la laurea triennale e la biennale specialistica con il massimo dei voti. \n\nHa fatto parte di svariate formazioni da camera, principalmente in duo con contrabbassisti e con cantanti; è stata pianista accompagnatrice del coro lirico NAMAE diretto dal maestro Carmelo Pappalardo. Attualmente frequenta la classe di fisarmonica classica presso il Conservatorio Arcangelo Corelli di Messina con il Maestro Ivano Biscardi.",
            alt: "annina",
            altInstr: "piano",
          },
          {
            src: E,
            instrument: c,
            name: "Laura Pennisi",
            bio: "Nata a Catania nel 1997, comincia a studiare violino all’età di 7 anni. \n\n A 15 anni entra al conservatorio di Catania conseguendo la laurea triennale nel 2019. \n\nAttualmente frequenta l’ultimo anno del biennio specialistico sempre al conservatorio di Catania. \n\nHa fatto parte di diverse importanti orchestre tra cui l’orchestra giovanile del teatro dell’opera di Roma e la prima orchestra giovanile del maestro Beppe Vessicchio.",
            alt: "alura",
            altInstr: "violin",
          },
          {
            src: k,
            instrument: N,
            name: "Giorgio Garozzo",
            bio: "Studia pianoforte da quando ha 5 anni. Entra al Conservatorio Vincenzo Bellini di Catania conseguendo la laurea triennale e la biennale specialistica con il massimo dei voti. \n\nHa fatto parte di svariate formazioni da camera, principalmente in duo con contrabbassisti e con cantanti; è stata pianista accompagnatrice del coro lirico NAMAE diretto dal maestro Carmelo Pappalardo. Attualmente frequenta la classe di fisarmonica classica presso il Conservatorio Arcangelo Corelli di Messina con il Maestro Ivano Biscardi.",
            alt: "giorgio",
            altInstr: "sax",
          },
          {
            src: E,
            instrument: B,
            name: "Ivan Rinaldi",
            bio: "Nata a Catania nel 1997, comincia a studiare violino all’età di 7 anni. \n\n A 15 anni entra al conservatorio di Catania conseguendo la laurea triennale nel 2019. \n\nAttualmente frequenta l’ultimo anno del biennio specialistico sempre al conservatorio di Catania. \n\nHa fatto parte di diverse importanti orchestre tra cui l’orchestra giovanile del teatro dell’opera di Roma e la prima orchestra giovanile del maestro Beppe Vessicchio.",
            alt: "ivan",
            altInstr: "guitar",
          },
        ];
      function M(e) {
        var t = e.index,
          n = e.setIndex,
          r = e.interval,
          i = (0, a.useState)(!1),
          o = i[0],
          l = i[1],
          s = (0, a.useState)(0),
          c = s[0],
          u = s[1],
          d = Math.round(250 / Math.tan(Math.PI / w.length)),
          m = 360 / w.length,
          f = function (e) {
            clearInterval(r), u({ x: e.clientX, y: e.clientY });
          },
          h = function (e, r) {
            e.clientX - c.x > 100
              ? n(t - 1)
              : e.clientX - c.x < -100
              ? n(t + 1)
              : n(r);
          };
        return a.createElement(
          "div",
          {
            className: "mb-10 teacher-carousel",
            style: { perspective: "1000px", maxwidth: "50%", height: 500 },
          },
          a.createElement(
            "div",
            {
              style: {
                width: 500,
                height: 500,
                position: "absolute",
                transform:
                  "translateZ(-" +
                  d +
                  "px) rotateY(" +
                  (360 / w.length) * t * -1 +
                  "deg)",
                WebkitTransform:
                  "translateZ(-" +
                  d +
                  "px) rotateY(" +
                  (360 / w.length) * t * -1 +
                  "deg)",
                MozTransform:
                  "translateZ(-" +
                  d +
                  "px) rotateY(" +
                  (360 / w.length) * t * -1 +
                  "deg)",
                transformStyle: "preserve-3d",
                transition: "transform 0.5s",
              },
            },
            w.map(function (e, t) {
              return a.createElement(
                "div",
                {
                  className: "teachers-section__picture",
                  style: {
                    position: "absolute",
                    transform:
                      "rotateY(" +
                      m * t +
                      "deg) translateZ(" +
                      (d - 100) +
                      "px)",
                    WebkitTransform:
                      "rotateY(" +
                      m * t +
                      "deg) translateZ(" +
                      (d - 100) +
                      "px)",
                    width: 500,
                    height: 300,
                  },
                  key: "div_parent" + t,
                },
                a.createElement("div", {
                  onMouseDown: function (e) {
                    return !o && f(e);
                  },
                  onTouchStart: function (e) {
                    l(!0), f(e.changedTouches[0]);
                  },
                  onMouseUp: function (e) {
                    !o && h(e, t);
                  },
                  onTouchEnd: function (e) {
                    return h(e.changedTouches[0], t);
                  },
                  style: { position: "absolute", width: 500, height: 300 },
                  key: "div_child_touch" + t,
                }),
                a.createElement("img", {
                  src: null == e ? void 0 : e.instrument,
                  alt: null == e ? void 0 : e.altInstr,
                  className: "teachers-section__picture__instrument noselect",
                  style: {
                    position: "absolute",
                    transform: "rotateY(180deg)",
                    WebkitTransform: "rotateY(180deg)",
                    width: 400,
                    height: 400,
                  },
                  key: "img" + t,
                })
              );
            })
          ),
          a.createElement(
            "div",
            {
              style: {
                width: 500,
                height: 500,
                position: "absolute",
                transform:
                  "translateZ(-" +
                  d +
                  "px) rotateY(" +
                  (360 / w.length) * t +
                  "deg)",
                WebkitTransform:
                  "translateZ(-" +
                  d +
                  "px) rotateY(" +
                  (360 / w.length) * t +
                  "deg)",
                MozTransform:
                  "translateZ(-" +
                  d +
                  "px) rotateY(" +
                  (360 / w.length) * t +
                  "deg)",
                transformStyle: "preserve-3d",
                transition: "transform 1s",
              },
            },
            w.map(function (e, t) {
              return a.createElement(
                "div",
                {
                  className: "teachers-section__picture",
                  style: {
                    transform:
                      "rotateY(" +
                      m * t +
                      "deg) translateZ(" +
                      (d - 250) +
                      "px)",
                    WebkitTransform:
                      "rotateY(" +
                      m * t +
                      "deg) translateZ(" +
                      (d - 250) +
                      "px)",
                    position: "absolute",
                    width: 500,
                    height: 300,
                  },
                  key: "div_child" + t + "2",
                },
                a.createElement("div", {
                  onMouseDown: function (e) {
                    return !o && f(e);
                  },
                  onTouchStart: function (e) {
                    l(!0), f(e.changedTouches[0]);
                  },
                  onMouseUp: function (e) {
                    !o && h(e, t);
                  },
                  onTouchEnd: function (e) {
                    return h(e.changedTouches[0], t);
                  },
                  style: { position: "absolute", width: 500, height: 300 },
                  key: "div_touch" + t + "2",
                }),
                a.createElement("img", {
                  src: null == e ? void 0 : e.src,
                  alt: null == e ? void 0 : e.alt,
                  className: "teachers-section__picture__face noselect",
                  style: {
                    position: "absolute",
                    backfaceVisibility: "hidden",
                    margin: 20,
                    width: 200,
                    height: 300,
                    transform: "translateZ(" + d / 3 + "px) translateY(100}px)",
                    WebkitTransform:
                      "translateZ(" + d / 3 + "px) translateY(100px)",
                    transition: "transform 0.2s",
                  },
                  key: "img" + t + "2",
                })
              );
            })
          )
        );
      }
      function x() {
        var e,
          t,
          n = (0, a.useState)(0),
          r = n[0],
          i = n[1],
          o = (0, a.useRef)(null),
          l = g.p8.utils.selector(o);
        return (
          (0, a.useEffect)(function () {
            y = setInterval(function () {
              i(function (e) {
                return e < f.length - 1 ? e + 1 : 0;
              });
            }, 5e3);
          }, []),
          (0, a.useEffect)(function () {
            g.p8
              .timeline({
                scrollTrigger: {
                  trigger: ".teachers-section",
                  start: "top center",
                },
              })
              .from(l("img"), { xPercent: -50, opacity: 0, stagger: 0.1 }, 0)
              .from(l("p"), { xPercent: 50, opacity: 0, stagger: 0.1 }, 0);
          }, []),
          a.createElement(
            "section",
            {
              className:
                "teachers-section  pt-36 lg:pb-10 px-10 lg:px-60 xl:px-96",
              ref: o,
            },
            a.createElement(
              "h1",
              { className: "title mb-10 lg:mt-20" },
              "I docenti"
            ),
            a.createElement(
              "div",
              { className: "teachers-section__instruments flex space-around" },
              f.map(function (e, t) {
                var n = e.imgSrc,
                  o = e.title,
                  l = e.alt;
                return a.createElement(
                  "li",
                  {
                    className:
                      "hero-section__list__item" +
                      (r % f.length === t ? "--selected" : ""),
                    key: l + o,
                    onClick: function () {
                      i(t), clearInterval(y);
                    },
                  },
                  a.createElement("img", {
                    src: n,
                    "aria-hidden": "true",
                    alt: l,
                    className: "hero-section__list__icon",
                  })
                );
              })
            ),
            a.createElement(
              "h2",
              { className: "teachers-section__name mt-10" },
              null === (e = w[Math.abs(r) % w.length]) || void 0 === e
                ? void 0
                : e.name
            ),
            a.createElement(
              "div",
              {
                className:
                  "flex flex-col md:flex-row space-between mt-20 lg:mt-0",
              },
              a.createElement(M, { index: r, setIndex: i, interval: y }),
              a.createElement(
                "div",
                { className: "flex space-between" },
                a.createElement("div", { className: "w-1/2 h-1/2" }),
                a.createElement(
                  "div",
                  { className: "teachers-section__desc p-10" },
                  a.createElement(
                    "p",
                    { className: "teachers-section__bio" },
                    null === (t = w[Math.abs(r) % w.length]) || void 0 === t
                      ? void 0
                      : t.bio
                  )
                )
              )
            )
          )
        );
      }
      var V = n(298),
        Q = n.n(V);
      function S() {
        var e = m("#findus"),
          t = g.p8.utils.selector(e);
        return (
          (0, a.useEffect)(function () {
            g.p8
              .timeline({
                scrollTrigger: { trigger: ".find-us", start: "top center" },
              })
              .from(t(".title"), { xPercent: -50, opacity: 0 }, 0)
              .from(t("address"), { xPercent: 50, opacity: 0 }, 0),
              g.p8
                .timeline({
                  defaults: { duration: 1 },
                  scrollTrigger: {
                    trigger: ".notes_cover",
                    start: "top center",
                    end: "bottom top",
                    scrub: !0,
                  },
                })
                .to(t(".notes_cover"), { x: "100%" });
          }, []),
          a.createElement(
            "section",
            { className: "find-us", id: "findus", ref: e },
            a.createElement(
              "div",
              { className: "notes_cont" },
              a.createElement("div", { className: "notes_cover" }),
              a.createElement(Q(), {
                style: {
                  transform: "translateX(-30px)",
                  width: "100vw",
                  height: 264,
                },
              })
            ),
            a.createElement(
              "div",
              { className: "lg:pt-20 mb-5 px-10 lg:px-60 xl:px-96" },
              a.createElement("h1", { className: "title" }, "Dove ci troviamo"),
              a.createElement(
                "address",
                { className: "pt-20 lg:pt-5 pl-2 " },
                "La nostra sede è in Via Tenente Garozzo, 2 95025",
                a.createElement("p", null, "Aci Sant'Antonio (CT)")
              )
            ),
            a.createElement(
              "div",
              {
                style: {
                  height: 380,
                  overflow: "hidden",
                  clipPath: "polygon(0 20%, 100% 20%, 100% 100%, 0% 100%)",
                },
              },
              a.createElement("iframe", {
                src: "https://www.google.com/maps/d/u/0/embed?mid=18inuwOcaxrVr2UiiT0nQYhG3k1Ww9w8s",
                width: "100%",
                height: "380",
              })
            )
          )
        );
      }
      var U = function (e) {
          var t = e.link,
            n = e.children,
            r = (0, a.useContext)(u),
            i = r.activeNavLinkId,
            o = r.setActiveNavLinkId;
          return a.createElement(
            "a",
            {
              href: t,
              className:
                "block nav__item p-6 lg:inline-block " +
                (i === t ? "activeClass" : ""),
              onClick: function () {
                o(t);
              },
              id: t,
            },
            n
          );
        },
        O = function () {
          var e = a.useState(!1),
            t = e[0],
            n = e[1];
          return a.createElement(
            "nav",
            {
              className:
                "navbar flex fixed items-center justify-between flex-wrap w-screen py-4 lg:py-0 px-10 lg:px-60 xl:px-96 ",
            },
            a.createElement(
              "a",
              { href: "#hero-section" },
              a.createElement("img", {
                src: "data:image/png;base64,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",
                className: "lg:hidden navbar__logo",
              })
            ),
            a.createElement(
              "div",
              { className: "flex align-center justify-between lg:hidden" },
              a.createElement(
                "button",
                {
                  className: "mr-10 w-0",
                  onClick: function () {
                    return n(!t);
                  },
                },
                a.createElement(
                  "div",
                  {
                    id: "hamburger",
                    className: "hamburglar " + (t ? "is-open" : "is-closed"),
                  },
                  a.createElement(
                    "div",
                    { className: "burger-icon" },
                    a.createElement(
                      "div",
                      { className: "burger-container" },
                      a.createElement("span", { className: "burger-bun-top" }),
                      a.createElement("span", { className: "burger-filling" }),
                      a.createElement("span", { className: "burger-bun-bot" })
                    )
                  ),
                  a.createElement(
                    "div",
                    { className: "path-burger" },
                    a.createElement("div", { className: "animate-path" })
                  )
                )
              )
            ),
            a.createElement(
              "div",
              {
                className:
                  "w-full block flex-grow lg:flex lg:items-right lg:w-auto " +
                  (t ? "" : "h-0") +
                  " lg:h-full",
              },
              a.createElement(
                "div",
                {
                  className:
                    " " +
                    (t ? "" : "hidden") +
                    " lg:flex flex-col lg:flex-row flexitems-center mt-5 lg:mt-0 justify-between lg:flex-grow w-full",
                },
                a.createElement(U, { link: "#about" }, "La scuola"),
                a.createElement(U, { link: "#contact" }, "Contatti"),
                a.createElement(U, { link: "#findus" }, "Dove Trovarci"),
                a.createElement(U, { link: "#video" }, "Video Didattici")
              )
            )
          );
        },
        I = [
          {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACLklEQVRYw82Xv4sTQRTHPzMscoVF8G06i8NC0ghXXMCrr0hzYKGc/hGCWFhcYRXkykuR/8AuB4KQxiKtBjzkwGaxuuLKHQlyxRUhYzGTuFn22Nn89NNl38y877zMvPdGEUiapjWl1BFwCOwBu0DNm0fAFXAJDKy1/TiORyHrqrIBxpgGcAIcAzuBem+BHnAqIslCAowx94E28BqIQiOVYwx0gfcichMswBjzGPgMNBZ0nCcBnonIr1IBxph94AvwYEXOp/wGWiJycacAv/Nva3CeFXGQjcRMgP/Pv1Mt7CnwA/iT+faiZE5irW3GcXwD84erXdH5u8lk0qnX6+NcFG3JvIZSqg28nUXAX7WfhJ/2TyLyvMgQIADc7XgiIon2H04qOAd3SJch8j6J0jSt4ZJMFeaynDHmkVJq39qQzc84TtP0TeTTa2iGu4sP1tpXFefsKKWONC63L8uimfIwwhWWEIbAGYBSapiznQHnwD3gYwUBexGuqoVwLSK9IoOIfAUwxoSuNWVX86+kroKHFcfXVOC9zfMyGw1jzDnlGbAQTe5KbZiRxnUy2+JK49qobXGpgcEWBQy0tbaP6+E2za21tq9999pbernq9OI4Hk2r4SmuRG6KsfeJBvCtc3eDArrTdn3RlmwIXGd+PyU8C861ZFtvSnXW6g0tP3Adzlv5t4HOj/J9+wHuMbEqEr/zi7xBF432KptAh+VuxxjoWGubRa8i+J8fp3nW9Tz/C0UbxUpIx3oNAAAAAElFTkSuQmCC",
            href: "https://www.facebook.com/brisasonorascuoladimusica",
          },
          {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAADmElEQVRYw82XwWsbRxTGf7MWIZiqLnpiD8UkJg6tEYlDSyClOaTHUpekzr2XHhpyKvlDCskpJAf/A4HahBp6Kukh0FCowS0iFXEFxuQgdpa6yMYUr6eHfSNNpF1JAZvkA6HZ2TfzffNm5u17hgJYaz8AbgJXgfNADZgGTgMVY0zRMJxzAIfAAbAPpMAL4Cnwg4i0BseYAeIzwD3gK04Ga8B3IrI9JMBa+wmwrqsdxKGu6EDbHkf6HwV9FfXUtLYHkQJLIvJrT4CufCMg3wdWgFXn3Ga3203n5uaOeA202+2oWq3WjDGLwDLwjYryIj4SkW0vYDVw+3NV+Pdx+t5ae049vOC3Q0SWjR64v4KVXzwucmttA/gceCIiv6uIPwJPfBiRn3aPlWMkPwf8BnwPPLPWfqxzrwRmNyPyq+axOilBkiSxtfaytfZykiRxgcmnwUorwGcFHFcr5PccAOfc5hjS08aYb4FbQMP3G2Ow1jaBB865h/V6/QB4AvwDvEe+tT95jiCOnI/on/zDvb29dIRLLxhjNsjjRKPApAHcM8ZsWGsviMgOcBH4mvxcNQHSNE3pX+Wasdbuqav+FZGZMnLgF16NETuA99giMBu8S4FrIvJnyXy7wLvAfgSc0v6DMrcDjwLyl8CNLMvOisiSiCxlWXYWuKHvUNtHOrYInutURD9aHRZZ6p77u/sSuCIij+M47gWmOI6PROQxcCUQsaBji+C5KlHZhyXAraB9W/e2EPrudsnYosW9EsOL3B/TP3A7WZb9OE6t2niRjZIr2kMoYCjWG2POBI+bodvLoDabJXMMcUXjJjxpRCVtAJxz28HjYqfTGStYbRZL5hjiGjlhvV7vAE19nJ2amvpynAC18TGhqXOUe0DTqFF4ELTvW2tnywz13f2SsUNwzhER3MkSo4fkOQLA++RftuvhdnQ6nchaex14pjYAz3VsEXqx560IxV3tn26324VnQie6BoRZ7Szwhf5C8tYo8larFdH/THcjVQtQqVarRQlpT4Rz7hJwh/7BDNEE7jjnLpWRA9RqtVqwBWmFPG9fANAE8ueywfqdvwvcTZIk9kHGObc97rR7KIfHiwp50eCv1/IoAQNiOsBEpANYDtpPTzQpHURhUqrl0pp2TAPrangS5OsB+ZqItCYqTHZ3d9P5+fnXKky2traimZmZyQoTFfHmSrNAxJsrTgeEFJXn75Dnj5OU5/+RB7ix5fn/2J2dG8Nh1xMAAAAASUVORK5CYII=",
            href: "https://www.instagram.com/brisasonora_corsidimusica/",
          },
          {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABfElEQVRYw+2WsUoDQRCGvx2OEESCOAkEq4AYnyCttWDAl1AbsRbfQ2x8BRshgnXaPIEBwUJESFYkSAhBbi1uT1KZbHLcFeaDgWO5//5/rphZWPPfMenDYDAQETkEjoAmsA1sAhtA2VfkSwAxJpE75wBiX9++Jr7GwBfwAfSBhziOH2u1WvwbwFq7BdwDBzk13gWOVfVT/MFtjuZ4r1sAY61tAk85ms+yL0C7IHOAtgCtAgO0BGgEit4yDNAQoB6icM7tAhcZBakLUAlRVKvViapezwR5XSFARUgGTTBpEGAPOF8yyIYApRU6QFUnqnrjnFsmSEmMMRIgmPdHQoNIJuaz+IbSfTGXyDkXL/ryXwyHw7Ix5gy4BHYWlMURMCXZdHkap0wjknUZHMBaWwZOgKsljFPGETAi2f0hHa9qnDKKgHcCxrEx5jkD45R3AV4CRVmZA7wI0Mvwg6H0BOgUGKAjqtoH7gowv1PVfjqATkkuinnR9Z7FX8vXrPkB7O59QlImUPAAAAAASUVORK5CYII=",
            href: "https://www.youtube.com/channel/UCU_019OjoMwkLuTgLX9fRnQ/",
          },
          {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAD80lEQVRYw62XT2gdVRTGf3cSki5CCJxJDXlp0C5aEamYSJUKRST+WQUJtYvWShfqw4WK6KYUl0qhSBal0lTauKgBWwlYutCAIthCBa21lGgfFILWh743R4KEEB+PuS7mPPsymeTNMx4YuHPud8757jn3nrnjaFNUdQQoAk8C95p6AfgKmBKRa+34c3mBURT1OOdOAIdbQD8CXhORpf+NgKr2Al8Cj+Tk+x3wlIgstgIGrQBzc3MBMN1GcAx7xmw3lwFVfRr4oo3gzfKMiMxtKgMkGy5Lrtlc0cbt2LaVgT+ArRnBHxeRFcNsAa4AIylcRUTu2WwGtmbophrBAWw8ldO2bQK5jtN/tc1D4GaGrmhpB/4tQTGn7SrpzEHgAvBYSjcCXFHVRtqLrK1/w3ZDybMJe4FbwEAOss3yO7BTRP7aCNSyBOag5XHKkGKr4LkIGImLwLE2gh8zm5aSiwBAHMdHgdkc0FnD5pLcX0MAVe0haTi71oHcIGlQuY9uWwSMxA7ge6AnNbUEjIpIqR1/uUtQrVa7ACzAkQzIkUbwKIq25PW7YQaq1WoQBMEYySnYCzwsIneiKOp0zv0IPGDQee/9Q2EY1lV1CPgBuAx8GMfxXH9/f70tAqo6QHLzeRnY3jT1qYg8b5gDwMemPygiM6a/AOxrsrkDnAXOiMgvLQnY6m4Dw6mp68DUysrK6UKhEEdR1OWc+w3Ae18Iw7BWLpeD7u7ul8jujIve+21hGK7aoGv2gHNuoin4srF/tFQqjYrIqUKhEAOEYVgjOZazNmZwcDAWkdMiMgqMAqeARjPqc8692HJTqOq3qurtadSYKIoGMrATqjqRkcXhJsygqv5t/m5VKpVViw5SDvcAu+31kojMm37IObcnHch7f9V7fzUji3ttHyEiZeC8Te3o6Oh4dqMSvNU0nmwavwvMpwOFYVgOw7CckcgS8M46vt7MJKCq24Hn7PV6rVb72vS7gfF6vZ67wcRxfAM4bE0L+1m5bNNjqvpgVgbeaHo/2dXVNa6qn5G03lpnZ+d4tVpddX9Q1WE79826viAIXjdf36jqpP1NTaZiJeVqGAG/cre9LgJ9GYtbAE4CZ0XkT1V9AaiJyHlVHTbHr7C2TQP8DNxv4xVgm4hEDQJvA8fXyegCd/8BG7IMzJBcUur2vp/VN6xle8J1/B4VkffcOo2nApwDpkXkpqrustUdAFr1+QpwAvjAe7/knBsDDpHsr2bbsvf+Pqeq+4FPbCWXgGnv/eeN5pKq71ZL8avAYGq6BLzvvT8XhuFy2jaKol5rcoeAJ0j2yEFnF8ufgBkRqZBDrA3vs6zEwPE4ji9u9NFJLWTIsrnzHwVrnCzOLYGxAAAAAElFTkSuQmCC",
            href: "https://goo.gl/maps/qynhq2d1iGtmYobo9",
          },
        ],
        W = n.p + "static/logocompleto-083906e5e42a55fc702fda693f218bf2.webp",
        j = function () {
          return a.createElement(
            "footer",
            {
              className:
                "footer flex flex-col md:flex-row items-center justify-between flex-wrap w-screen p-3 lg:px-60 xl:px-96 py-20",
            },
            a.createElement(
              "div",
              { className: "footer__section" },
              a.createElement("img", {
                src: W,
                alt: "brisa sonora logo",
                className: "footer__section__logo",
              })
            ),
            a.createElement(
              "div",
              { className: "footer__section flex justify-between" },
              I.map(function (e, t) {
                var n = e.src,
                  r = e.href;
                return a.createElement(
                  "a",
                  { href: r },
                  a.createElement("img", {
                    src: n,
                    alt: r.slice(12, 20),
                    className:
                      "footer__section__social " + (0 !== t ? "ml-3" : ""),
                  })
                );
              })
            ),
            a.createElement(
              "div",
              { className: "footer__section mt-20 md:mt-0" },
              "Developed by",
              a.createElement(
                "a",
                { href: "https://www.linkedin.com/in/mirko-torrisi/" },
                " Mirko Torrisi"
              )
            )
          );
        },
        G = 3473208541,
        D = 3461016578,
        R = "info.brisasonora@gmail.com";
      function T() {
        var e = m("#contact"),
          t = (0, a.useState)(!1),
          n = t[0],
          r = t[1],
          i = (0, a.useState)(""),
          o = i[0],
          l = i[1],
          s = "https://wa.me/+393473208541/?text=" + o,
          c = g.p8.utils.selector(e);
        return (
          (0, a.useEffect)(function () {
            g.p8
              .timeline({
                scrollTrigger: {
                  trigger: ".contact-section",
                  start: "top center",
                },
              })
              .from(c(".title"), { xPercent: -50, opacity: 0 }, 0)
              .from(c("textarea"), { xPercent: -50, opacity: 0 }, 0)
              .from(c("button"), { xPercent: 50, opacity: 0 }, 0)
              .from(c("h3"), { xPercent: -50, opacity: 0 }, 0);
          }, []),
          a.createElement(
            "section",
            {
              className:
                "contact-section py-36 lg:py-20 px-10 lg:px-60 xl:px-96",
              ref: e,
              id: "contact",
            },
            a.createElement("h1", { className: "title" }, "Contattaci"),
            a.createElement(
              "div",
              { className: "contact-section__form mt-20" },
              a.createElement(
                "h3",
                { className: "contact-section__form__title" },
                "Scrivici su WhatsApp per avere maggiori informazioni, ti risponderemo il prima possibile!"
              ),
              a.createElement(
                "form",
                { className: "flex flex-col items-start mt-5" },
                a.createElement(
                  "div",
                  { className: "contact-section__form__input__container" },
                  a.createElement("textarea", {
                    type: "text",
                    className:
                      "contact-section__form__input" +
                      (n ? "" : "--anim") +
                      " mt-10",
                    style: { minHeight: "3rem", height: o.length / 10 + "rem" },
                    placeholder: "Salve, vorrei avere maggiori informazioni...",
                    onFocus: function () {
                      return r(!0);
                    },
                    ref: e,
                    onChange: function (e) {
                      return l(e.target.value);
                    },
                    value: o,
                  })
                ),
                a.createElement(
                  "button",
                  { className: "contact-section__form__submit mt-10" },
                  a.createElement(
                    "a",
                    { href: s, className: "hero-section__ctas__contact" },
                    "Invia"
                  )
                )
              ),
              a.createElement(
                "h3",
                { className: "mt-20" },
                "In alternativa, puoi chiamare uno di questi numeri:",
                a.createElement(
                  "a",
                  { href: "tel:3473208541", className: "phone_number" },
                  "+39 ",
                  G
                ),
                a.createElement(
                  "a",
                  { href: "tel:3461016578", className: "phone_number" },
                  "+39 ",
                  D
                ),
                "O mandare un'email a",
                " ",
                a.createElement(
                  "a",
                  { href: "mailto:" + R, className: "phone_number" },
                  R
                )
              )
            )
          )
        );
      }
      var q = function () {
        return a.createElement(
          "main",
          null,
          a.createElement("title", null, "Home Page"),
          a.createElement(
            d,
            null,
            a.createElement(O, null),
            a.createElement(C, null),
            a.createElement(A, null),
            a.createElement(x, null),
            a.createElement(S, null),
            a.createElement(T, null),
            a.createElement(j, null)
          )
        );
      };
    },
    5586: function (e, t, n) {
      var r = n(7294);
      function a(e) {
        return r.createElement("svg", e, [
          r.createElement(
            "defs",
            { key: 0 },
            r.createElement("style", null, ".cls-1{fill:#30b8c6;}\n")
          ),
          r.createElement(
            "g",
            { id: "Livello_2", "data-name": "Livello 2", key: 1 },
            r.createElement(
              "g",
              { id: "Livello_2-2", "data-name": "Livello 2" },
              [
                r.createElement("path", {
                  className: "cls-1",
                  d: "M20.11,90.48v10H10.05a10.05,10.05,0,0,1-10-10,9.9,9.9,0,0,1,3-7.1,10,10,0,0,1,17.16,7.1Z",
                  key: 0,
                }),
                r.createElement("path", {
                  className: "cls-1",
                  d: "M20.09,40.21V50.28a10,10,0,1,1-10-10.07Z",
                  key: 1,
                }),
                r.createElement("path", {
                  className: "cls-1",
                  d: "M35,140.72A4.71,4.71,0,0,1,30.33,136V4.77a4.63,4.63,0,1,1,9.26,0V136A4.7,4.7,0,0,1,35,140.72Z",
                  key: 2,
                }),
                r.createElement("path", {
                  className: "cls-1",
                  d: "M178.82,74.82a35.1,35.1,0,0,0-19-9c-.15,0-.58-.06-1.2-.09a3.49,3.49,0,0,0,.35-.32,38.41,38.41,0,0,0,1.2-54.37,35.59,35.59,0,0,0-25.84-11h-32V0H86.46C77.67,0,70.54,7.4,70.54,16.46a16.59,16.59,0,0,0,4.63,11.6,15.54,15.54,0,0,0,11.29,4.82,16.17,16.17,0,0,0,15.91-16.42V9.59h32a26.57,26.57,0,0,1,19.27,8.21,28.53,28.53,0,0,1,8,19.88A28.05,28.05,0,0,1,143.9,64a25.5,25.5,0,0,1-5.55,1.49H91.11l-7.81.22c-.32,0-.64,0-1,.07A35.86,35.86,0,0,0,59.69,78.11V4.77a4.63,4.63,0,1,0-9.25,0V136a4.73,4.73,0,0,0,3.69,4.66,4.17,4.17,0,0,0,.94.1A4.7,4.7,0,0,0,59.69,136V102.43c.31-13.46,10-24.9,22.37-27a9.63,9.63,0,0,1,1.52-.11h74.77c13.46,1.81,23.59,13.75,23.59,27.79a28.5,28.5,0,0,1-8,19.89,26.39,26.39,0,0,1-19.24,8.23H102.38v-7a16.59,16.59,0,0,0-4.63-11.59,15.57,15.57,0,0,0-22.53,0,16.41,16.41,0,0,0-4.67,11.59,16.17,16.17,0,0,0,15.91,16.42h7.77a3.88,3.88,0,0,0,1,.12H154.7a35.51,35.51,0,0,0,25.81-11.07,38.51,38.51,0,0,0-1.69-54.86Z",
                  key: 3,
                }),
              ]
            )
          ),
        ]);
      }
      (a.defaultProps = { viewBox: "0 0 200 140.75" }),
        (e.exports = a),
        (a.default = a);
    },
    298: function (e, t, n) {
      var r = n(7294);
      function a(e) {
        return r.createElement("svg", e, [
          r.createElement("path", {
            d: "M92.7009 106.399C91.8542 105.019 91.325 104.147 91.325 104.147C87.6208 96.8116 83.7048 89.4045 79.683 82.0689C81.3764 81.851 83.599 81.6331 85.9274 81.6331C87.0916 81.6331 88.3616 81.7058 89.5258 81.851C90.69 81.9963 91.9601 82.2868 93.1243 82.5773C97.7811 83.8846 101.591 86.6446 102.226 91.9465C102.438 93.2538 102.438 95.7948 101.274 98.5547C100.639 99.9347 99.7919 101.387 98.4161 102.695C97.7811 103.348 96.9344 104.002 95.9818 104.656C95.0293 105.237 93.9709 105.818 92.7009 106.399ZM89.7375 107.561C87.3033 108.36 84.5515 108.941 81.0589 109.376C78.7305 109.74 75.5554 109.885 72.0628 109.74C70.2636 109.667 68.4644 109.522 66.5593 109.231C64.6543 109.013 62.6434 108.65 60.7383 108.214C53.0123 106.399 45.9212 102.549 43.8045 95.2864C42.852 91.9465 43.5928 87.8066 46.0271 83.3036C47.1913 81.0521 48.8847 78.728 50.8956 76.4038C52.9064 74.0797 55.4465 71.6829 58.4099 69.4314C60.2092 67.9789 62.7492 66.1631 65.501 64.1295C66.4535 65.7274 68.9936 70.0851 71.957 75.1691C63.0667 78.2196 56.0815 85.9909 57.7749 92.237C58.7274 95.8675 61.2675 98.5547 64.5484 100.443C67.9352 102.331 72.2745 103.276 77.143 103.421C77.143 103.421 76.8255 103.276 76.1904 102.912C75.5554 102.549 74.8146 102.114 73.862 101.46C72.0628 100.225 69.8403 98.4821 68.2527 96.5211C65.1835 92.5275 64.7601 87.3708 76.4021 83.0131C81.0589 91.2202 85.504 99.4263 89.7375 107.633V107.561ZM56.8224 35.9504C56.5049 31.8832 58.3041 28.4696 61.2675 26.0728C64.1251 23.6761 67.8294 22.2961 70.5811 22.1509C72.592 22.0782 74.1795 22.514 75.4496 23.1677C76.7196 23.894 77.5663 24.9108 78.2013 26.0002C79.4714 28.1791 79.683 30.6485 79.8947 31.8832C80.2122 34.4978 79.4714 36.6041 78.3072 38.565C77.0371 40.526 75.2379 42.1239 73.227 43.6491C69.2052 46.6269 64.2309 48.7331 61.6909 50.9846C59.1508 45.9732 57.2457 40.5987 56.8224 35.8778V35.9504ZM109.741 90.7844C109.529 87.6614 108.788 84.9741 107.412 82.65C106.142 80.3258 104.131 78.3648 101.591 76.9849C96.4052 74.1523 88.2558 72.9176 76.8255 74.1523C76.2963 74.225 75.7671 74.2976 75.2379 74.3702C72.9095 70.303 70.4753 66.1631 68.041 62.0959C72.8037 58.6097 77.9897 54.3982 81.9056 49.3868C85.9274 44.5206 88.6791 38.7829 87.8324 32.1737C87.4091 28.1791 84.6573 22.8045 80.6356 18.5204C78.6247 16.3415 76.2963 14.5258 73.7562 13.2185C71.322 11.9111 68.6761 11.2575 66.136 11.4754L64.5484 11.8385C64.5484 11.8385 59.7858 13.9448 55.5523 17.7215C51.6364 21.5698 48.3555 27.1623 50.0489 34.1347C52.0598 42.2691 55.8699 51.0573 57.8807 53.5267C55.6582 55.2698 52.5889 57.375 49.5197 59.8444C46.5563 62.3138 43.3812 65.219 40.7353 68.5599C35.4434 75.1692 32.0567 83.5941 34.9143 94.0527C36.1843 98.7 39.9944 102.404 44.4395 105.091C48.7788 107.779 53.7531 109.594 57.5632 110.466C59.4683 110.902 61.3733 111.265 63.3842 111.628C65.3951 111.919 67.406 112.209 69.3111 112.427C73.227 112.863 77.3546 112.863 81.7998 112.209C84.234 111.919 87.4091 111.047 90.9017 109.667C93.7593 114.678 96.2993 119.327 96.2993 119.327C97.0402 120.997 98.8394 125.573 98.4161 130.003C98.2044 132.182 97.4635 134.36 95.876 136.103C95.0293 136.975 94.0768 137.773 92.7009 138.355C92.0659 138.645 91.325 138.936 90.5842 139.153C89.7375 139.371 88.6791 139.662 87.6208 139.807C82.2231 140.679 76.9313 142.059 75.7671 137.773C79.048 137.556 85.8215 134.069 84.7632 129.495C83.8107 125.5 81.1647 122.886 72.4862 124.193C71.1103 124.411 69.6286 124.919 68.3586 125.718C67.0885 126.444 66.0301 127.461 65.0776 128.478C63.2784 130.584 62.4317 132.981 62.9609 134.796C63.4901 136.757 65.6068 139.299 69.5228 141.042C71.4278 141.913 73.862 142.567 76.7196 142.858C79.3655 143.221 82.3289 143.221 85.8215 142.64C86.7741 142.494 87.8324 142.276 88.8908 141.986C89.42 141.841 89.9492 141.695 90.4783 141.478C91.0075 141.332 91.4309 141.187 91.8542 140.969C93.7593 140.243 95.5585 139.226 97.0402 137.846C98.5219 136.466 99.8978 134.796 100.639 132.763C101.379 130.729 101.591 128.333 101.168 125.5C100.109 121.07 96.1935 113.153 93.4418 108.432C97.4635 106.544 101.485 104.292 104.555 101.242C105.295 100.516 106.036 99.7168 106.671 98.9179C107.306 98.119 107.836 97.32 108.259 96.4485C109.106 94.7064 109.529 92.8907 109.423 90.857L109.741 90.7844Z",
            fill: "#25B8C9",
            key: 0,
          }),
          r.createElement("path", {
            d: "M401.528 68.1969L389.886 63.9844C387.981 63.2581 386.076 62.5319 384.065 61.8782L377.927 59.9172L365.544 56.0689L362.475 55.1247L359.3 54.2531L352.844 52.5827C335.91 48.2249 318.977 44.8113 302.044 42.0514C268.07 36.5316 234.414 33.5538 201.605 31.6655C193.456 31.1571 185.306 30.7939 177.157 30.4308C169.007 30.0676 161.175 29.7771 152.816 29.5592L140.433 29.1961L137.364 29.1234H134.083L127.627 29.0508C123.288 29.0508 119.054 28.9782 114.503 29.0508L100.85 29.414C96.2993 29.4866 91.6425 29.7771 86.9857 30.0676C82.3289 30.3581 77.6721 30.576 73.227 31.0118L59.6799 32.2465L47.0854 33.6264L40.841 34.3527L34.9142 35.079L23.0605 36.5316L0.305728 39.2915L0.0940552 38.6379L22.8489 35.878L34.7025 34.498L40.6294 33.7717L46.8737 33.0454L59.5741 31.6655L73.1211 30.4308C77.5663 29.995 82.3289 29.7771 86.9857 29.4866C91.6425 29.1961 96.2993 28.9056 100.85 28.8329L114.503 28.4698C118.948 28.3972 123.288 28.4698 127.627 28.4698L134.189 28.5424H137.47L140.539 28.615L152.922 28.9782C161.281 29.1961 169.219 29.4866 177.263 29.8497C185.306 30.2129 193.456 30.576 201.711 31.0844C234.52 32.9728 268.282 35.9506 302.255 41.543C319.295 44.3029 336.227 47.7891 353.161 52.1469L359.617 53.8174L362.792 54.6889L365.861 55.6331L378.244 59.4814L384.383 61.4424C386.394 62.0961 388.299 62.8224 390.204 63.5487L401.846 67.7612L401.528 68.1969Z",
            fill: "#25B8C9",
            key: 1,
          }),
          r.createElement("path", {
            d: "M392.109 81.4156L380.996 77.5662C379.091 76.9126 377.292 76.2589 375.387 75.6779L369.566 73.9348L357.924 70.4486L354.96 69.577L351.997 68.8507L345.964 67.3255C329.984 63.4762 313.897 60.4258 297.704 58.029C265.318 53.2365 232.827 50.8397 200.864 49.4598C192.821 49.0966 184.883 48.8787 176.945 48.6608C169.007 48.443 161.175 48.2251 153.133 48.1524L141.068 48.0072L138.105 47.9345H135.035L128.791 48.0072C124.663 48.0798 120.536 48.0798 116.408 48.1524L103.708 48.6608C99.4743 48.7335 95.135 49.0966 90.9016 49.4598C86.6681 49.7503 82.223 50.0408 78.0954 50.4766L65.5009 51.7839L53.4355 53.3091L47.4029 54.0354L41.5819 54.8343L29.9399 56.4322L7.2909 59.5542L7.07922 58.9005L29.7282 55.7785L41.3702 54.1807L47.1912 53.3817L53.2239 52.6554L65.2892 51.1302L77.8837 49.8229C82.0113 49.3145 86.4565 49.0966 90.6899 48.8061C95.0292 48.5156 99.2627 48.1524 103.496 48.0798L116.302 47.5714C120.536 47.4988 124.558 47.4988 128.791 47.4261L135.035 47.3535H138.105L141.174 47.4261L153.239 47.5714C161.387 47.644 169.113 47.8619 177.051 48.0798C184.989 48.2977 192.926 48.5882 200.97 48.8787C232.932 50.2587 265.53 52.6554 297.916 57.5206C314.109 59.9173 330.3 62.9678 346.282 66.8897L352.314 68.415L355.278 69.1413L358.241 70.0128L369.883 73.499L375.704 75.2421C377.609 75.8231 379.408 76.5494 381.314 77.1305L392.426 80.9798L392.109 81.4156Z",
            fill: "#25B8C9",
            key: 2,
          }),
          r.createElement("path", {
            d: "M382.69 94.6339L372 91.1477C370.201 90.5667 368.507 89.9857 366.708 89.4046L361.205 87.8794L350.198 84.829L347.446 84.0301L344.588 83.3764L338.979 82.0691C323.952 78.7281 308.606 76.0409 293.259 74.0072C262.355 69.8674 231.133 68.0517 199.912 67.2527C184.354 66.8896 168.796 66.6717 153.239 66.7443C145.407 66.7443 137.681 66.7443 129.744 66.9622C125.828 67.1075 121.912 67.1075 117.996 67.2527L106.142 67.9064C90.3725 68.9232 74.6029 70.5937 59.3625 72.9178C44.0162 75.0967 28.9874 77.5661 13.9587 79.8902L13.747 79.2366C28.7758 76.9124 43.8045 74.5157 59.1508 72.3368C74.3912 70.0126 90.2667 68.3422 106.036 67.3254L117.89 66.7443C121.806 66.5991 125.722 66.5264 129.744 66.4538C137.576 66.2359 145.407 66.2359 153.239 66.2359C168.902 66.1633 184.354 66.3812 199.912 66.817C231.028 67.6159 262.461 69.5042 293.365 73.6441C308.817 75.6777 324.164 78.365 339.191 81.7786L344.8 83.0859L347.658 83.7396L350.409 84.5385L361.416 87.5889L366.92 89.1141C368.719 89.6225 370.518 90.2762 372.318 90.8572L383.007 94.3434L382.69 94.7792V94.6339Z",
            fill: "#25B8C9",
            key: 3,
          }),
          r.createElement("path", {
            d: "M373.27 107.851L363.11 104.728C361.416 104.22 359.723 103.639 358.03 103.203L352.844 101.896L342.578 99.2085L340.037 98.5548L337.392 97.9738L332.207 96.8843C318.131 93.9802 303.631 91.7287 289.026 90.0582C259.709 86.6446 229.546 85.4099 199.277 85.1194C191.656 85.0468 184.036 85.0468 176.416 85.1194C168.796 85.1921 161.071 85.192 153.557 85.4099L142.232 85.6278L139.375 85.7005L136.623 85.8457L131.014 86.0636C127.309 86.2089 123.605 86.3541 119.901 86.572L109 87.3709C105.295 87.5888 101.803 88.0246 98.2044 88.3877C94.6059 88.7509 91.0075 89.0414 87.4091 89.6224L76.6138 91.075L65.7126 92.8181L60.2091 93.6897L54.5998 94.6338L43.487 96.5212L20.9439 100.443L20.7322 99.7895L43.2753 95.8675L54.3881 93.9802L59.9975 93.036L65.5009 92.1644L76.5079 90.4213L87.3032 88.9688C90.9017 88.4604 94.5001 88.1698 98.0985 87.7341C101.697 87.3709 105.295 86.9352 109 86.7173L119.901 85.991C123.605 85.7731 127.309 85.7004 131.014 85.4826L136.623 85.2647L139.375 85.1194L142.232 85.0468L153.557 84.8289C161.071 84.6836 168.796 84.611 176.416 84.5384C184.036 84.4658 191.656 84.5384 199.277 84.611C229.652 84.9015 259.709 86.2089 289.132 89.6224C303.843 91.2929 318.342 93.5444 332.419 96.4486L337.709 97.538L340.355 98.119L342.895 98.7727L353.161 101.46L358.347 102.767C360.04 103.203 361.734 103.784 363.427 104.293L373.588 107.416L373.27 107.851Z",
            fill: "#25B8C9",
            key: 4,
          }),
          r.createElement("path", {
            d: "M363.851 121.07L354.114 118.31C352.526 117.874 350.938 117.366 349.245 116.93L344.377 115.768L334.745 113.517L332.311 112.936L329.878 112.5L325.01 111.556C311.886 109.159 298.233 107.27 284.369 105.963C256.534 103.276 227.641 102.622 198.218 102.84C190.81 102.913 183.401 103.058 175.887 103.203C168.478 103.348 160.753 103.566 153.557 103.857L142.55 104.293L139.798 104.365L137.152 104.511L131.86 104.801C128.368 105.019 124.769 105.164 121.382 105.455L111.328 106.399C107.941 106.617 104.766 107.125 101.485 107.488C98.2042 107.924 95.0291 108.215 91.7482 108.796L81.9054 110.321L71.5335 112.209L66.3475 113.153L60.844 114.17L49.9429 116.204L27.5056 120.489L27.2939 119.835L49.7312 115.55L60.6323 113.517L66.1358 112.5L71.3218 111.556L81.6938 109.74L91.6424 108.215C95.0291 107.634 98.2042 107.343 101.485 106.907C104.766 106.544 107.941 106.036 111.328 105.818L121.382 104.946C124.769 104.656 128.368 104.511 131.86 104.293L137.152 104.002L139.798 103.857L142.55 103.784L153.557 103.348C160.859 103.058 168.478 102.84 175.887 102.695C183.401 102.55 190.81 102.404 198.218 102.332C227.746 102.114 256.64 102.767 284.475 105.527C298.339 106.835 312.098 108.723 325.222 111.12L330.09 112.064L332.524 112.5L334.957 113.081L344.588 115.405L349.457 116.567C351.044 117.003 352.632 117.511 354.325 117.947L364.062 120.707L363.745 121.143L363.851 121.07Z",
            fill: "#25B8C9",
            key: 5,
          }),
          r.createElement("path", {
            d: "M-0.0133057 38.5654L4.74933 37.9844L32.4784 119.763L27.8216 120.634L-0.0133057 38.5654Z",
            fill: "#25B8C9",
            key: 6,
          }),
          r.createElement("path", {
            d: "M708.557 205.681C701.889 204.156 695.433 202.413 689.188 200.525L684.638 199.072C683.156 198.564 681.568 198.128 679.981 197.547L670.561 194.206C657.862 189.558 645.48 184.401 633.097 178.881C608.331 167.842 584.095 155.568 559.223 142.858C546.734 136.539 534.14 130.149 521.016 123.758L511.279 119.037L502.177 114.534L483.657 105.31L464.501 95.868C461.326 94.2711 457.939 92.6733 454.658 91.1481L444.604 86.3545C441.217 84.7567 437.619 83.2315 434.232 81.6336C430.739 80.1084 427.352 78.5106 423.648 76.9854L412.641 72.4824C408.937 70.9572 405.338 69.4319 401.423 68.052L401.74 67.6162C405.656 68.9962 409.254 70.5214 412.959 72.0466L423.966 76.5496C427.564 78.0748 430.951 79.6727 434.549 81.1979C438.042 82.7957 441.534 84.3209 444.921 85.9188L454.976 90.7123C458.257 92.3101 461.643 93.908 464.818 95.5048L483.975 104.947L502.495 114.17L511.597 118.674L521.334 123.394C534.351 129.713 547.052 136.176 559.435 142.495C584.306 155.132 608.543 167.479 633.308 178.518C645.691 184.038 658.074 189.194 670.773 193.843L680.192 197.184C681.78 197.765 683.262 198.2 684.849 198.709L689.4 200.161C695.644 202.05 702.1 203.793 708.768 205.318L708.662 205.609L708.557 205.681Z",
            fill: "#25B8C9",
            key: 7,
          }),
          r.createElement("path", {
            d: "M705.276 213.887C698.29 212.435 691.411 210.692 684.743 208.877L679.769 207.424C678.076 206.916 676.488 206.48 674.795 205.899L664.848 202.631C651.618 198.128 638.6 192.971 625.794 187.596C600.076 176.847 575.204 164.792 549.909 152.59C537.209 146.489 524.509 140.316 511.385 134.288L501.649 129.786L492.23 125.355L473.285 116.422C447.779 104.365 421.531 91.8742 392.109 81.343L392.426 80.9072C421.849 91.4385 448.202 104.002 473.603 116.059L492.548 124.992L501.967 129.422L511.703 133.925C524.72 139.953 537.527 146.126 550.227 152.227C575.522 164.429 600.499 176.484 626.112 187.306C638.918 192.68 651.936 197.765 665.165 202.34L675.112 205.608C676.806 206.19 678.393 206.625 680.087 207.134L685.061 208.586C691.729 210.401 698.608 212.071 705.593 213.597L705.487 213.887H705.276Z",
            fill: "#25B8C9",
            key: 8,
          }),
          r.createElement("path", {
            d: "M701.995 222.095C694.692 220.642 687.389 219.044 680.298 217.229L675.006 215.776C673.207 215.268 671.515 214.832 669.716 214.323C666.223 213.234 662.731 212.217 659.238 211.128C645.374 206.698 631.827 201.687 618.597 196.385C592.032 185.854 566.314 174.088 540.596 162.323C527.684 156.44 514.877 150.557 501.755 144.819L491.912 140.534L482.175 136.249C475.719 133.416 469.263 130.512 462.807 127.607C436.983 115.986 410.842 104.221 382.583 94.6345L382.901 94.1987C411.159 103.785 437.301 115.623 463.125 127.171C469.581 130.077 476.037 132.982 482.493 135.813L492.23 140.098L502.073 144.383C515.195 150.121 528.001 156.077 540.913 161.96C566.631 173.725 592.244 185.491 618.809 196.094C632.144 201.396 645.585 206.408 659.45 210.837C662.942 211.927 666.435 213.016 669.928 214.033C671.621 214.614 673.42 215.05 675.219 215.485L680.51 216.938C687.601 218.754 694.904 220.352 702.206 221.804L702.1 222.095H701.995Z",
            fill: "#25B8C9",
            key: 9,
          }),
          r.createElement("path", {
            d: "M698.714 230.301C690.988 228.921 683.367 227.396 675.853 225.581L670.245 224.201C668.34 223.765 666.435 223.256 664.636 222.748C661.037 221.659 657.333 220.642 653.629 219.552C639.129 215.195 625.159 210.328 611.4 205.173C583.883 194.859 557.53 183.384 531.388 172.054C518.264 166.39 505.352 160.725 492.23 155.278L482.387 151.21L472.439 146.998C465.771 144.238 459.209 141.405 452.647 138.573C426.4 127.389 400.47 116.349 373.482 107.779L373.799 107.343C400.893 115.914 426.823 127.026 453.071 138.21C459.632 141.042 466.194 143.802 472.862 146.635L482.811 150.847L492.653 154.914C505.776 160.362 518.793 166.027 531.811 171.691C557.953 183.021 584.2 194.496 611.718 204.81C625.476 209.965 639.447 214.904 653.946 219.262C657.545 220.351 661.249 221.368 664.848 222.457C666.647 223.038 668.552 223.474 670.455 223.91L676.065 225.29C683.579 227.106 691.199 228.631 698.925 230.011L698.82 230.301H698.714Z",
            fill: "#25B8C9",
            key: 10,
          }),
          r.createElement("path", {
            d: "M695.433 238.581C687.389 237.274 679.346 235.749 671.409 234.006L665.377 232.626C663.366 232.19 661.355 231.681 659.45 231.173C655.64 230.156 651.83 229.139 648.02 228.05C632.991 223.765 618.385 218.971 604.097 213.96C575.627 203.865 548.639 192.681 522.074 181.786C508.845 176.339 495.723 170.964 482.599 165.809L472.65 161.959L462.384 157.892L442.169 149.758C415.499 139.009 389.78 128.696 363.956 121.143L364.274 120.707C390.204 128.333 415.922 138.645 442.593 149.395L462.807 157.529L473.074 161.596L483.022 165.446C496.146 170.602 509.268 175.976 522.498 181.423C549.063 192.317 576.051 203.502 604.521 213.597C618.703 218.608 633.308 223.474 648.337 227.687C652.147 228.776 655.957 229.793 659.767 230.81C661.672 231.318 663.683 231.827 665.694 232.262L671.727 233.642C679.769 235.385 687.707 236.911 695.75 238.218L695.644 238.509L695.433 238.581Z",
            fill: "#25B8C9",
            key: 11,
          }),
          r.createElement("path", {
            d: "M401.846 67.834L402.481 68.0519L364.38 121.215L363.85 121.07L401.846 67.834Z",
            fill: "#25B8C9",
            key: 12,
          }),
          r.createElement("path", {
            d: "M1033.89 167.915C1014.63 183.674 991.244 196.675 965.314 205.826C939.384 214.977 910.914 220.424 882.55 222.022C879.057 222.24 875.459 222.312 871.966 222.385C870.273 222.385 868.474 222.385 866.78 222.385C865.934 222.385 865.087 222.385 864.24 222.312C863.499 222.312 862.547 222.239 862.018 222.239L850.481 221.731L839.051 221.223C823.918 220.496 808.783 219.552 793.966 218.245C764.332 215.703 735.227 211.926 708.556 205.681L708.662 205.391C735.333 211.636 764.332 215.412 794.072 218.027C808.889 219.334 824.024 220.279 839.157 221.005L850.587 221.513L862.123 222.022C862.653 222.094 863.605 222.094 864.346 222.094C865.193 222.094 866.039 222.094 866.78 222.167C868.474 222.167 870.167 222.167 871.966 222.167C875.459 222.094 878.951 222.022 882.444 221.804C910.808 220.206 939.278 214.831 965.208 205.681C991.138 196.602 1014.53 183.602 1033.79 167.842L1033.89 167.915Z",
            fill: "#25B8C9",
            key: 13,
          }),
          r.createElement("path", {
            d: "M1036.65 169.295C1017.81 185.635 994.419 199.29 968.172 209.094C942.03 218.971 912.925 225.145 883.608 227.323C879.904 227.614 876.306 227.832 872.601 227.904C869.003 228.05 865.299 228.05 862.018 227.977L850.482 227.687L838.947 227.323C823.601 226.815 808.466 226.161 793.331 225.145C763.168 223.111 733.322 219.77 705.276 213.814L705.381 213.524C733.428 219.479 763.168 222.82 793.331 224.854C808.466 225.871 823.706 226.597 838.947 227.105L850.482 227.469L862.018 227.759C865.299 227.832 869.003 227.759 872.601 227.687C876.2 227.541 879.904 227.396 883.503 227.105C912.819 224.927 941.818 218.826 968.066 208.949C994.313 199.144 1017.6 185.49 1036.54 169.149L1036.65 169.222V169.295Z",
            fill: "#25B8C9",
            key: 14,
          }),
          r.createElement("path", {
            d: "M1039.4 170.675C1020.88 187.524 997.7 201.904 971.135 212.435C944.676 223.038 915.042 229.866 884.773 232.698C877.258 233.424 869.532 233.86 862.018 233.86C854.292 233.788 846.567 233.715 838.841 233.642C823.389 233.424 808.043 232.989 792.696 232.19C762.004 230.664 731.417 227.832 701.995 222.167L702.1 221.876C731.523 227.541 762.004 230.374 792.696 231.972C808.043 232.771 823.389 233.207 838.841 233.424C846.567 233.57 854.292 233.57 862.018 233.642C869.532 233.642 877.152 233.207 884.667 232.553C914.936 229.72 944.464 222.966 970.923 212.362C997.488 201.832 1020.66 187.451 1039.19 170.675L1039.29 170.747L1039.4 170.675Z",
            fill: "#25B8C9",
            key: 15,
          }),
          r.createElement("path", {
            d: "M1042.04 172.054C1023.95 189.412 1000.77 204.519 973.887 215.775C947.11 227.106 916.947 234.659 885.725 238.073C881.809 238.508 877.893 238.872 873.977 239.089C869.955 239.38 866.039 239.525 861.912 239.598C854.186 239.67 846.46 239.743 838.629 239.743C823.071 239.743 807.513 239.598 791.955 239.089C760.84 238 729.406 235.676 698.608 230.301L698.714 230.011C729.512 235.385 760.84 237.782 791.955 238.872C807.513 239.38 823.071 239.598 838.629 239.598C846.354 239.598 854.186 239.525 861.912 239.453C866.039 239.38 869.955 239.235 873.977 238.944C877.893 238.654 881.809 238.363 885.725 237.927C916.947 234.514 947.004 226.96 973.781 215.703C1000.56 204.446 1023.73 189.412 1041.94 172.054L1042.04 172.126V172.054Z",
            fill: "#25B8C9",
            key: 16,
          }),
          r.createElement("path", {
            d: "M1044.8 173.433C1027.02 191.373 1003.94 207.133 976.85 219.116C949.756 231.173 919.169 239.38 886.995 243.447C882.973 243.955 878.846 244.391 874.824 244.754C872.813 244.9 870.696 245.045 868.58 245.19C866.463 245.335 864.452 245.408 862.018 245.481L850.376 245.771L838.629 245.989C822.966 246.28 807.196 246.352 791.426 246.062C759.781 245.481 727.713 243.665 695.539 238.508L695.645 238.218C727.819 243.302 759.887 245.19 791.532 245.771C807.408 246.062 823.071 245.989 838.735 245.699L850.482 245.481L862.124 245.19C864.452 245.117 866.569 245.045 868.685 244.9C870.802 244.754 872.813 244.609 874.93 244.464C879.057 244.101 883.079 243.665 887.101 243.229C919.275 239.162 949.862 230.955 976.956 218.971C1004.05 206.988 1027.12 191.3 1044.9 173.361L1045.01 173.433H1044.8Z",
            fill: "#25B8C9",
            key: 17,
          }),
          r.createElement("path", {
            d: "M708.662 205.463L709.297 205.608L696.068 238.653L695.433 238.581L708.662 205.463Z",
            fill: "#25B8C9",
            key: 18,
          }),
          r.createElement("path", {
            d: "M1030.72 170.312L1033.89 167.842L1044.8 173.434L1041.94 176.194L1030.72 170.312Z",
            fill: "#25B8C9",
            key: 19,
          }),
          r.createElement("path", {
            d: "M980.554 195.295C976.744 195.513 974.522 195.585 973.781 195.658L971.77 194.714L971.347 195.15L990.397 203.647C988.916 203.865 987.54 204.882 987.222 206.335C986.905 208.005 988.069 209.529 989.974 209.674C991.879 209.892 993.678 208.659 993.996 206.988C994.313 205.681 993.572 204.519 992.408 203.938L977.697 197.401C983.835 195.44 987.857 197.038 987.857 197.038C991.985 198.854 993.149 201.686 993.149 201.686C992.726 198.999 988.704 196.675 988.704 196.675C986.587 195.731 984.894 194.932 980.343 195.15L980.554 195.295Z",
            fill: "#25B8C9",
            key: 20,
          }),
          r.createElement("path", {
            d: "M807.831 255.503C812.594 258.626 815.345 260.441 816.298 261.095L816.933 264L818.203 263.855L812.382 237.056C814.499 238.218 817.991 238.145 821.061 236.838C824.659 235.24 826.035 232.407 824.236 230.519C822.436 228.631 818.097 228.34 814.499 229.938C811.747 231.173 810.265 233.134 810.583 234.804L815.028 255.357C804.233 252.089 802.751 246.715 802.751 246.715C801.481 240.978 805.503 236.62 805.503 236.62C800.952 240.106 801.057 246.28 801.057 246.28C801.692 249.184 802.116 251.726 807.831 255.43V255.503Z",
            fill: "#25B8C9",
            key: 21,
          }),
          r.createElement("path", {
            d: "M550.015 157.456C544.512 153.316 541.337 150.92 540.278 150.048L539.855 146.417L538.267 146.489L542.289 180.043C539.749 178.518 535.41 178.372 531.494 179.825C526.837 181.568 524.72 185.054 526.731 187.451C528.742 189.92 534.14 190.429 538.691 188.686C542.289 187.306 544.3 184.982 544.194 182.875L541.125 157.093C554.143 161.741 555.307 168.496 555.307 168.496C556.154 175.685 550.65 180.842 550.65 180.842C556.789 176.774 557.212 169.077 557.212 169.077C556.789 165.373 556.471 162.25 549.91 157.311L550.015 157.456Z",
            fill: "#25B8C9",
            key: 22,
          }),
          r.createElement("path", {
            d: "M338.027 81.1244C344.588 83.0128 348.399 84.1022 349.669 84.4654L351.891 87.2253L353.161 86.7169L332.1 61.3693C334.851 61.9503 338.45 60.9335 340.672 58.8273C343.318 56.2863 343.213 53.0179 340.355 51.638C337.497 50.1854 332.946 51.1296 330.301 53.6716C328.291 55.6326 327.868 58.0283 329.138 59.6262L345.329 79.0908C332.629 78.7277 328.079 73.7162 328.079 73.7162C323.528 68.2691 325.116 62.8219 325.116 62.8219C322.47 67.5428 326.174 73.7162 326.174 73.7162C328.503 76.4762 330.408 78.8729 338.132 81.1244H338.027Z",
            fill: "#25B8C9",
            key: 23,
          }),
          r.createElement("path", {
            d: "M197.054 24.0392C190.386 14.5258 186.47 9.00602 185.094 7.11766L187.105 0.435775L184.142 0L165.515 62.1686C162.234 58.4645 154.403 56.5771 146.254 57.8834C136.517 59.4086 130.061 64.8558 131.754 70.0125C133.448 75.1692 142.761 78.147 152.498 76.6218C160.013 75.4597 165.515 71.9735 166.891 68.0515L181.284 20.3352C201.182 33.481 198.112 46.1185 198.112 46.1185C194.091 59.4086 180.12 66.8168 180.12 66.8168C194.302 61.7328 201.182 47.9342 201.182 47.9342C203.192 41.1071 205.098 35.3694 197.16 24.0392H197.054Z",
            fill: "#25B8C9",
            key: 24,
          }),
          r.createElement("path", {
            d: "M771.106 217.809L743.8 201.904L742.953 201.396L739.99 203.792L723.691 216.937C723.585 215.339 721.469 213.741 718.505 213.16C714.907 212.434 711.414 213.451 710.673 215.339C709.932 217.228 712.155 219.334 715.753 219.988C718.505 220.496 721.257 220.06 722.633 218.971L740.837 204.228L768.142 220.133L751.844 233.279C751.738 231.681 749.621 230.083 746.658 229.502C743.059 228.776 739.567 229.793 738.826 231.681C738.085 233.569 740.307 235.675 743.906 236.329C746.658 236.838 749.409 236.402 750.785 235.312L768.989 220.569L771.953 218.172L771.106 217.663V217.809Z",
            fill: "#25B8C9",
            key: 25,
          }),
          r.createElement("path", {
            d: "M525.038 127.025L486.409 117.801L485.139 117.511L483.446 120.924L473.92 139.516C472.862 137.846 469.687 136.756 466.194 136.974C461.961 137.265 458.786 139.298 459.103 141.477C459.421 143.729 463.019 145.327 467.253 145.036C470.534 144.818 473.074 143.584 474.026 141.986L484.61 121.142L523.239 130.366L513.713 148.958C512.655 147.288 509.48 146.198 505.987 146.416C501.754 146.707 498.58 148.74 498.898 150.919C499.215 153.171 502.812 154.769 507.046 154.478C510.327 154.26 512.867 153.025 513.819 151.428L524.403 130.584L526.096 127.17L524.826 126.88L525.038 127.025Z",
            fill: "#25B8C9",
            key: 26,
          }),
          r.createElement("path", {
            d: "M310.299 83.8118L270.399 62.1683L269.129 61.5146L265.001 65.0735L242.775 84.3202C242.458 82.0687 239.388 79.8898 235.155 79.1635C230.075 78.292 225.101 79.8172 224.148 82.5045C223.196 85.1918 226.476 88.0969 231.662 88.9685C235.578 89.6221 239.388 88.8958 241.399 87.298L266.271 65.7271L306.171 87.3706L283.946 106.616C283.628 104.365 280.559 102.186 276.325 101.46C271.245 100.588 266.271 102.113 265.318 104.801C264.366 107.488 267.647 110.393 272.833 111.265C276.749 111.918 280.559 111.192 282.57 109.594L307.441 88.0243L311.569 84.4655L310.299 83.8118Z",
            fill: "#25B8C9",
            key: 27,
          }),
          r.createElement("path", {
            d: "M1025.22 204.228L1025.32 184.982C1025.43 183.892 1026.59 182.73 1028.6 182.076C1031.14 181.277 1033.89 181.713 1034.85 183.093C1035.69 184.473 1034.42 186.144 1031.88 186.943C1029.77 187.596 1027.44 187.378 1026.27 186.507L1026.17 204.228H1025.32H1025.22ZM1026.91 186.434C1027.44 186.943 1029.45 186.434 1031.25 185.345C1033.05 184.255 1034.11 183.021 1033.58 182.585C1033.05 182.076 1031.04 182.585 1029.24 183.674C1027.44 184.764 1026.38 185.998 1026.91 186.434Z",
            fill: "#25B8C9",
            key: 28,
          }),
          r.createElement("path", {
            d: "M897.579 213.451L914.936 226.597C915.888 227.396 916.1 228.703 915.359 229.938C914.301 231.536 912.078 232.407 910.279 231.899C908.48 231.391 907.845 229.648 908.797 227.977C909.644 226.597 911.443 225.798 913.031 225.871L897.049 213.814L897.579 213.451ZM912.607 226.234C911.761 226.161 910.914 227.323 910.597 228.849C910.279 230.374 910.702 231.609 911.549 231.681C912.396 231.754 913.243 230.592 913.56 229.066C913.878 227.541 913.454 226.307 912.607 226.234Z",
            fill: "#25B8C9",
            key: 29,
          }),
          r.createElement("path", {
            d: "M376.128 104.874L377.292 100.661L378.033 97.7558L379.197 93.5444L384.171 75.0966C384.806 73.1356 387.558 71.3925 391.262 70.7388C396.131 69.8673 400.787 71.3198 401.74 73.8619C402.693 76.4039 399.517 79.1638 394.755 80.0353C390.733 80.7616 386.817 79.8901 385.018 78.0744L380.784 93.8349L428.093 99.7895L432.962 81.3427C433.597 79.3817 436.348 77.6386 440.053 76.9849C444.921 76.1134 449.578 77.5659 450.531 80.108C451.483 82.65 448.308 85.4099 443.545 86.2814C439.524 87.0077 435.608 86.1362 433.808 84.3205L429.575 100.08L428.411 104.292L427.67 107.198L426.506 111.41L425.024 111.192L377.715 105.237L376.233 105.019L376.128 104.874ZM378.774 100.879L426.082 106.834L426.823 103.929L379.514 97.9737L378.774 100.879Z",
            fill: "#25B8C9",
            key: 30,
          }),
          r.createElement("path", {
            d: "M853.763 254.413L853.233 252.234L852.916 250.709L852.387 248.53L850.164 238.944C849.952 237.927 850.905 236.692 852.493 235.966C854.609 235.022 857.255 235.167 858.419 236.257C859.478 237.419 858.631 239.089 856.514 240.106C854.715 240.905 852.598 240.978 851.223 240.251L853.128 248.457L877.787 245.844L875.565 236.257C875.353 235.24 876.306 234.005 877.893 233.279C880.01 232.335 882.656 232.48 883.82 233.569C884.878 234.731 884.032 236.402 881.915 237.419C880.116 238.218 877.999 238.29 876.623 237.564L878.528 245.771L879.057 247.949L879.375 249.474L879.904 251.653L879.163 251.726L854.503 254.34L853.763 254.413ZM854.08 252.161L878.74 249.547L878.422 248.022L853.763 250.636L854.08 252.161Z",
            fill: "#25B8C9",
            key: 31,
          }),
          r.createElement("path", {
            d: "M975.262 208.15L974.733 210.11L974.416 211.418L973.887 213.379L971.558 221.876C971.241 222.748 969.971 223.619 968.277 223.837C966.055 224.2 963.938 223.547 963.515 222.385C963.091 221.223 964.573 219.915 966.796 219.552C968.701 219.262 970.5 219.625 971.241 220.496L973.252 213.306L960.022 211.563L957.694 220.061C957.376 220.932 956.106 221.804 954.413 222.022C952.19 222.385 950.074 221.731 949.65 220.569C949.227 219.407 950.709 218.1 952.931 217.736C954.836 217.446 956.635 217.809 957.376 218.681L959.387 211.49L946.158 209.747L943.829 218.245C943.512 219.116 942.242 219.988 940.548 220.206C938.326 220.569 936.209 219.915 935.786 218.753C935.362 217.591 936.844 216.284 939.067 215.921C940.972 215.63 942.771 215.993 943.512 216.865L945.523 209.675L946.052 207.715L946.369 206.407L946.899 204.446L947.639 204.519L960.869 206.262L961.504 206.335L974.733 208.078L975.474 208.15H975.262ZM959.81 209.529L960.128 208.223L946.899 206.48L946.581 207.787L959.81 209.529ZM974.098 210.038L960.869 208.296L960.551 209.602L973.781 211.345L974.098 210.038Z",
            fill: "#25B8C9",
            key: 32,
          }),
          r.createElement("path", {
            d: "M576.368 218.535L595.419 221.513L596.372 221.658L615.422 224.636L616.375 224.781L617.327 222.021L622.407 206.915C623.466 208.15 626.112 208.804 628.757 208.44C632.038 208.005 634.261 206.189 633.732 204.446C633.203 202.703 630.133 201.686 626.958 202.122C624.418 202.485 622.619 203.574 622.09 204.882L616.48 221.731L597.43 218.753L602.51 203.647C603.568 204.882 606.108 205.535 608.86 205.172C612.141 204.736 614.364 202.921 613.834 201.177C613.305 199.434 610.236 198.418 606.955 198.853C604.415 199.216 602.616 200.306 602.087 201.613L596.477 218.462L577.427 215.484L582.507 200.379C583.565 201.613 586.211 202.267 588.857 201.904C592.138 201.468 594.361 199.652 593.831 197.909C593.302 196.166 590.233 195.149 587.058 195.585C584.518 195.948 582.719 197.038 582.189 198.345L576.58 215.194L575.628 217.954L576.58 218.099L576.368 218.535Z",
            fill: "#25B8C9",
            key: 33,
          }),
          r.createElement("path", {
            d: "M681.357 199.508C680.933 201.541 679.663 202.631 678.287 203.793C678.287 203.793 673.207 206.988 667.282 206.698C667.282 206.698 673.631 206.335 677.547 202.848C677.547 202.848 678.499 201.977 678.711 200.234C677.335 200.524 675.747 200.67 674.161 200.597C674.161 200.597 676.276 200.452 678.817 199.725C678.922 198.055 678.499 195.803 676.488 192.898L663.789 204.083C662.308 205.318 659.344 205.899 656.275 205.39C652.359 204.737 649.713 202.558 650.454 200.452C651.195 198.345 655.005 197.183 658.921 197.837C662.202 198.345 664.53 200.016 664.848 201.759L687.918 181.423L688.871 181.931L687.283 183.311C687.389 184.038 687.707 186.216 688.342 189.993C688.977 194.496 687.283 195.949 685.167 197.692C685.167 197.692 683.685 198.636 681.357 199.435V199.508ZM681.462 198.709C682.521 198.2 683.473 197.619 684.426 196.82C684.426 196.82 687.918 193.407 683.368 186.87L680.404 189.485C680.51 190.211 680.827 192.39 681.462 196.167C681.568 197.183 681.674 197.982 681.568 198.709H681.462Z",
            fill: "#25B8C9",
            key: 34,
          }),
        ]);
      }
      (a.defaultProps = { fill: "none" }), (e.exports = a), (a.default = a);
    },
    563: function (e, t, n) {
      var r = n(7294);
      function a(e) {
        return r.createElement("svg", e, [
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB2",
            d: "M219,114.116C258.944,87.4589,280.633,87.1312,318,114.116C358.687,140.866,381.032,141.238,420,114.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 0,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB3",
            d: "M419,114.731C458.944,88.0745,480.633,87.7469,518,114.731C558.687,141.482,581.032,141.854,620,114.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 1,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB4",
            d: "M234,166.116C273.944,139.459,295.633,139.131,333,166.116C373.687,192.866,396.032,193.238,435,166.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 2,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB5",
            d: "M434,166.731C473.944,140.075,495.633,139.747,533,166.731C573.687,193.482,596.032,193.854,635,166.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 3,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB6",
            d: "M242,219.116C281.944,192.459,303.633,192.131,341,219.116C381.687,245.866,404.032,246.238,443,219.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 4,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB7",
            d: "M442,219.731C481.944,193.075,503.633,192.747,541,219.731C581.687,246.482,604.032,246.854,643,219.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 5,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB8",
            d: "M251,273.116C290.944,246.459,312.633,246.131,350,273.116C390.687,299.866,413.032,300.238,452,273.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 6,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB9",
            d: "M451,273.731C490.944,247.075,512.633,246.747,550,273.731C590.687,300.482,613.032,300.854,652,273.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 7,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB10",
            d: "M837,107.731C876.944,81.0745,898.633,80.7469,936,107.731C976.687,134.482,999.032,134.854,1038,107.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 8,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB11",
            d: "M660,212.116C699.944,185.459,721.633,185.131,759,212.116C799.687,238.866,822.032,239.238,861,212.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 9,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB12",
            d: "M860,212.731C899.944,186.075,921.633,185.747,959,212.731C999.687,239.482,1022.03,239.854,1061,212.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 10,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB13",
            d: "M669,266.116C708.944,239.459,730.633,239.131,768,266.116C808.687,292.866,831.032,293.238,870,266.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 11,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB14",
            d: "M869,266.731C908.944,240.075,930.633,239.747,968,266.731C1008.69,293.482,1031.03,293.854,1070,266.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 12,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB15",
            d: "M219,114.116C258.944,87.4589,280.633,87.1312,318,114.116C358.687,140.866,381.032,141.238,420,114.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 13,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB16",
            d: "M419,114.731C458.944,88.0745,480.633,87.7469,518,114.731C558.687,141.482,581.032,141.854,620,114.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 14,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB17",
            d: "M234,166.116C273.944,139.459,295.633,139.131,333,166.116C373.687,192.866,396.032,193.238,435,166.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 15,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB18",
            d: "M434,166.731C473.944,140.075,495.633,139.747,533,166.731C573.687,193.482,596.032,193.854,635,166.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 16,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB19",
            d: "M242,219.116C281.944,192.459,303.633,192.131,341,219.116C381.687,245.866,404.032,246.238,443,219.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 17,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB20",
            d: "M442,219.731C481.944,193.075,503.633,192.747,541,219.731C581.687,246.482,604.032,246.854,643,219.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 18,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB21",
            d: "M251,273.116C290.944,246.459,312.633,246.131,350,273.116C390.687,299.866,413.032,300.238,452,273.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 19,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB22",
            d: "M451,273.731C490.944,247.075,512.633,246.747,550,273.731C590.687,300.482,613.032,300.854,652,273.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 20,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB23",
            d: "M637,107.116C676.944,80.4589,698.633,80.1312,736,107.116C776.687,133.866,799.032,134.238,838,107.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 21,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB24",
            d: "M652,159.116C691.944,132.459,713.633,132.131,751,159.116C791.687,185.866,814.032,186.238,853,159.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 22,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB25",
            d: "M660,212.116C699.944,185.459,721.633,185.131,759,212.116C799.687,238.866,822.032,239.238,861,212.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 23,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB26",
            d: "M272,326.116C311.944,299.459,333.633,299.131,371,326.116C411.687,352.866,434.032,353.238,473,326.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 24,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB27",
            d: "M487,378.731C526.944,352.075,548.633,351.747,586,378.731C626.687,405.482,649.032,405.854,688,378.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 25,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB28",
            d: "M495,431.731C534.944,405.075,556.633,404.747,594,431.731C634.687,458.482,657.032,458.854,696,431.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 26,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB29",
            d: "M504,485.731C543.944,459.075,565.633,458.747,603,485.731C643.687,512.482,666.032,512.854,705,485.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 27,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB30",
            d: "M890,319.731C929.944,293.075,951.633,292.747,989,319.731C1029.69,346.482,1052.03,346.854,1091,319.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 28,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB31",
            d: "M905,371.731C944.944,345.075,966.633,344.747,1004,371.731C1044.69,398.482,1067.03,398.854,1106,371.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 29,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB32",
            d: "M913,424.731C952.944,398.075,974.633,397.747,1012,424.731C1052.69,451.482,1075.03,451.854,1114,424.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 30,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB33",
            d: "M722,478.116C761.944,451.459,783.633,451.131,821,478.116C861.687,504.866,884.032,505.238,923,478.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 31,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB34",
            d: "M922,478.731C961.944,452.075,983.633,451.747,1021,478.731C1061.69,505.482,1084.03,505.854,1123,478.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 32,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB35",
            d: "M272,326.116C311.944,299.459,333.633,299.131,371,326.116C411.687,352.866,434.032,353.238,473,326.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 33,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB36",
            d: "M472,326.731C511.944,300.075,533.633,299.747,571,326.731C611.687,353.482,634.032,353.854,673,326.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 34,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB37",
            d: "M287,378.116C326.944,351.459,348.633,351.131,386,378.116C426.687,404.866,449.032,405.238,488,378.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 35,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB38",
            d: "M295,431.116C334.944,404.459,356.633,404.131,394,431.116C434.687,457.866,457.032,458.238,496,431.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 36,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB39",
            d: "M304,485.116C343.944,458.459,365.633,458.131,403,485.116C443.687,511.866,466.032,512.238,505,485.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 37,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB40",
            d: "M690,319.116C729.944,292.459,751.633,292.131,789,319.116C829.687,345.866,852.032,346.238,891,319.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 38,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB41",
            d: "M705,371.116C744.944,344.459,766.633,344.131,804,371.116C844.687,397.866,867.032,398.238,906,371.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 39,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB42",
            d: "M713,424.116C752.944,397.459,774.633,397.131,812,424.116C852.687,450.866,875.032,451.238,914,424.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 40,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB43",
            d: "M317,546.116C356.944,519.459,378.633,519.131,416,546.116C456.687,572.866,479.032,573.238,518,546.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 41,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB44",
            d: "M332,598.116C371.944,571.459,393.633,571.131,431,598.116C471.687,624.866,494.032,625.238,533,598.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 42,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB45",
            d: "M340,651.116C379.944,624.459,401.633,624.131,439,651.116C479.687,677.866,502.032,678.238,541,651.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 43,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB46",
            d: "M349,705.116C388.944,678.459,410.633,678.131,448,705.116C488.687,731.866,511.032,732.238,550,705.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 44,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB47",
            d: "M735,539.116C774.944,512.459,796.633,512.131,834,539.116C874.687,565.866,897.032,566.238,936,539.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 45,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB48",
            d: "M750,591.116C789.944,564.459,811.633,564.131,849,591.116C889.687,617.866,912.032,618.238,951,591.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 46,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB49",
            d: "M950,591.731C989.944,565.075,1011.63,564.747,1049,591.731C1089.69,618.482,1112.03,618.854,1151,591.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 47,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB50",
            d: "M758,644.116C797.944,617.459,819.633,617.131,857,644.116C897.687,670.866,920.032,671.238,959,644.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 48,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB51",
            d: "M958,644.731C997.944,618.075,1019.63,617.747,1057,644.731C1097.69,671.482,1120.03,671.854,1159,644.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 49,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB52",
            d: "M767,698.116C806.944,671.459,828.633,671.131,866,698.116C906.687,724.866,929.032,725.238,968,698.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 50,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB53",
            d: "M967,698.731C1006.94,672.075,1028.63,671.747,1066,698.731C1106.69,725.482,1129.03,725.854,1168,698.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 51,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB54",
            d: "M517,546.731C556.944,520.075,578.633,519.747,616,546.731C656.687,573.482,679.032,573.854,718,546.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 52,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB55",
            d: "M532,598.731C571.944,572.075,593.633,571.747,631,598.731C671.687,625.482,694.032,625.854,733,598.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 53,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB56",
            d: "M540,651.731C579.944,625.075,601.633,624.747,639,651.731C679.687,678.482,702.032,678.854,741,651.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 54,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB57",
            d: "M549,705.731C588.944,679.075,610.633,678.747,648,705.731C688.687,732.482,711.032,732.854,750,705.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 55,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB58",
            d: "M935,539.731C974.944,513.075,996.633,512.747,1034,539.731C1074.69,566.482,1097.03,566.854,1136,539.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 56,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB59",
            d: "M370,758.116C409.944,731.459,431.633,731.131,469,758.116C509.687,784.866,532.032,785.238,571,758.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 57,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB60",
            d: "M385,810.116C424.944,783.459,446.633,783.131,484,810.116C524.687,836.866,547.032,837.238,586,810.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 58,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB61",
            d: "M393,863.116C432.944,836.459,454.633,836.131,492,863.116C532.687,889.866,555.032,890.238,594,863.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 59,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB62",
            d: "M402,917.116C441.944,890.459,463.633,890.131,501,917.116C541.687,943.866,564.032,944.238,603,917.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 60,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB63",
            d: "M788,751.116C827.944,724.459,849.633,724.131,887,751.116C927.687,777.866,950.032,778.238,989,751.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 61,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB64",
            d: "M803,803.116C842.944,776.459,864.633,776.131,902,803.116C942.687,829.866,965.032,830.238,1004,803.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 62,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB65",
            d: "M1003,803.731C1042.94,777.075,1064.63,776.747,1102,803.731C1142.69,830.482,1165.03,830.854,1204,803.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 63,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB66",
            d: "M811,856.116C850.944,829.459,872.633,829.131,910,856.116C950.687,882.866,973.032,883.238,1012,856.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 64,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB67",
            d: "M1011,856.731C1050.94,830.075,1072.63,829.747,1110,856.731C1150.69,883.482,1173.03,883.854,1212,856.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 65,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB68",
            d: "M820,910.116C859.944,883.459,881.633,883.131,919,910.116C959.687,936.866,982.032,937.238,1021,910.116",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 66,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB69",
            d: "M1020,910.731C1059.94,884.075,1081.63,883.747,1119,910.731C1159.69,937.482,1182.03,937.854,1221,910.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 67,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB70",
            d: "M570,758.731C609.944,732.075,631.633,731.747,669,758.731C709.687,785.482,732.032,785.854,771,758.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 68,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB71",
            d: "M585,810.731C624.944,784.075,646.633,783.747,684,810.731C724.687,837.482,747.032,837.854,786,810.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 69,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB72",
            d: "M593,863.731C632.944,837.075,654.633,836.747,692,863.731C732.687,890.482,755.032,890.854,794,863.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 70,
          }),
          r.createElement("path", {
            className: "ond-odd",
            id: "eULQaNdhcVB73",
            d: "M602,917.731C641.944,891.075,663.633,890.747,701,917.731C741.687,944.482,764.032,944.854,803,917.731",
            transform: "matrix(1.051447 0 0 1 -36.141517 0)",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 71,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB74",
            d: "M988,751.731C1027.94,725.075,1049.63,724.747,1087,751.731C1127.69,778.482,1150.03,778.854,1189,751.731",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 72,
          }),
          r.createElement("path", {
            className: "ond-even",
            id: "eULQaNdhcVB75",
            d: "M988,751.731C1027.94,725.075,1049.63,724.747,1087,751.731C1127.69,778.482,1150.03,778.854,1189,751.731",
            transform: "matrix(1 0 0 1 -137.5 -592.615676)",
            fill: "none",
            stroke: "rgb(37,184,201)",
            strokeWidth: "5",
            key: 73,
          }),
          r.createElement("rect", {
            id: "eULQaNdhcVB76",
            width: "553.165229",
            height: "890.139349",
            rx: "0",
            ry: "0",
            transform: "matrix(1.040967 0 0 0.39725 182.586626 76.202725)",
            fill: "rgb(238,238,238)",
            stroke: "none",
            strokeWidth: "0",
            key: 74,
          }),
          r.createElement("rect", {
            id: "eULQaNdhcVB77",
            width: "553.165229",
            height: "890.139349",
            rx: "0",
            ry: "0",
            transform: "matrix(1.040967 0 0 0.39725 297.086646 414.357235)",
            fill: "rgb(238,238,238)",
            stroke: "none",
            strokeWidth: "0",
            key: 75,
          }),
          r.createElement("rect", {
            id: "eULQaNdhcVB78",
            width: "553.165229",
            height: "890.139349",
            rx: "0",
            ry: "0",
            transform: "matrix(1.040967 0 0 0.39725 374.528875 598.161164)",
            fill: "rgb(238,238,238)",
            stroke: "none",
            strokeWidth: "0",
            key: 76,
          }),
          r.createElement("rect", {
            id: "eULQaNdhcVB79",
            width: "553.165229",
            height: "890.139349",
            rx: "0",
            ry: "0",
            transform: "matrix(0.69884 0 0 0.39725 742.713006 76.202725)",
            fill: "rgb(238,238,238)",
            stroke: "none",
            strokeWidth: "0",
            key: 77,
          }),
          r.createElement("rect", {
            id: "eULQaNdhcVB80",
            width: "553.165229",
            height: "890.139349",
            rx: "0",
            ry: "0",
            transform: "matrix(0.808598 0 0 0.39725 720 335.196072)",
            fill: "rgb(238,238,238)",
            stroke: "none",
            strokeWidth: "0",
            key: 78,
          }),
          r.createElement("rect", {
            id: "eULQaNdhcVB81",
            width: "553.165229",
            height: "890.139349",
            rx: "0",
            ry: "0",
            transform: "matrix(0.808598 0 0 0.39725 858.5 598.776886)",
            fill: "rgb(238,238,238)",
            stroke: "none",
            strokeWidth: "0",
            key: 79,
          }),
          r.createElement(
            "script",
            { key: 80 },
            '!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("vue")):"function"==typeof define&&define.amd?define(["vue"],n):((t="undefined"!=typeof globalThis?globalThis:t||self).__SVGATOR_PLAYER__=t.__SVGATOR_PLAYER__||{},t.__SVGATOR_PLAYER__["5c7f360c"]=n())}(this,(function(){"use strict";function t(t,n){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);n&&(e=e.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),r.push.apply(r,e)}return r}function n(n){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?t(Object(e),!0).forEach((function(t){u(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):t(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function i(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function o(t,n,r){return n&&i(t.prototype,n),r&&i(t,r),t}function u(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,n){return(l=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function f(t,n){if(n&&("object"==typeof n||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");return t}(t)}function s(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,e=a(t);if(n){var i=a(this).constructor;r=Reflect.construct(e,arguments,i)}else r=e.apply(this,arguments);return f(this,r)}}function c(t,n,r){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,n,r){var e=function(t,n){for(;!Object.prototype.hasOwnProperty.call(t,n)&&null!==(t=a(t)););return t}(t,n);if(e){var i=Object.getOwnPropertyDescriptor(e,n);return i.get?i.get.call(r):i.value}})(t,n,r||t)}var h=v(Math.pow(10,-6));function v(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6;if(Number.isInteger(t))return t;var r=Math.pow(10,n);return Math.round((+t+Number.EPSILON)*r)/r}function y(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h;return Math.abs(t-n)<r}var g=Math.PI/180;function d(t){return t}function p(t,n,r){var e=1-r;return 3*r*e*(t*e+n*r)+r*r*r}function m(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;return t<0||t>1||r<0||r>1?null:y(t,n)&&y(r,e)?d:function(i){if(i<=0)return t>0?i*n/t:0===n&&r>0?i*e/r:0;if(i>=1)return r<1?1+(i-1)*(e-1)/(r-1):1===r&&t<1?1+(i-1)*(n-1)/(t-1):1;for(var o,u=0,a=1;u<a;){var l=p(t,r,o=(u+a)/2);if(y(i,l))break;l<i?u=o:a=o}return p(n,e,o)}}function b(){return 1}function w(t){return 1===t?1:0}function x(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(1===t){if(0===n)return w;if(1===n)return b}var r=1/t;return function(t){return t>=1?1:(t+=n*r)-t%r}}var A="undefined"!=typeof window&&/(Mac|iPhone|iPod|iPad)/i.test(window.navigator.platform);Object.freeze({Meta:A?"Control":"Meta",Ctrl:"Control",Down:"ArrowDown",Up:"ArrowUp",Left:"ArrowLeft",Right:"ArrowRight",Esc:"Escape",Delete:"Backspace",Space:"Space"});var k=Math.sin,_=Math.cos,S=Math.acos,O=Math.asin,j=Math.tan,P=Math.atan2,M=Math.PI/180,E=180/Math.PI,R=Math.sqrt,I=function(){function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;e(this,t),this.m=[n,r,i,o,u,a],this.i=null,this.w=null,this.s=null}return o(t,[{key:"determinant",get:function(){var t=this.m;return t[0]*t[3]-t[1]*t[2]}},{key:"isIdentity",get:function(){if(null===this.i){var t=this.m;this.i=1===t[0]&&0===t[1]&&0===t[2]&&1===t[3]&&0===t[4]&&0===t[5]}return this.i}},{key:"point",value:function(t,n){var r=this.m;return{x:r[0]*t+r[2]*n+r[4],y:r[1]*t+r[3]*n+r[5]}}},{key:"translateSelf",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!t&&!n)return this;var r=this.m;return r[4]+=r[0]*t+r[2]*n,r[5]+=r[1]*t+r[3]*n,this.w=this.s=this.i=null,this}},{key:"rotateSelf",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(t%=360){var n=k(t*=M),r=_(t),e=this.m,i=e[0],o=e[1];e[0]=i*r+e[2]*n,e[1]=o*r+e[3]*n,e[2]=e[2]*r-i*n,e[3]=e[3]*r-o*n,this.w=this.s=this.i=null}return this}},{key:"scaleSelf",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(1!==t||1!==n){var r=this.m;r[0]*=t,r[1]*=t,r[2]*=n,r[3]*=n,this.w=this.s=this.i=null}return this}},{key:"skewSelf",value:function(t,n){if(n%=360,(t%=360)||n){var r=this.m,e=r[0],i=r[1],o=r[2],u=r[3];t&&(t=j(t*M),r[2]+=e*t,r[3]+=i*t),n&&(n=j(n*M),r[0]+=o*n,r[1]+=u*n),this.w=this.s=this.i=null}return this}},{key:"resetSelf",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,u=this.m;return u[0]=t,u[1]=n,u[2]=r,u[3]=e,u[4]=i,u[5]=o,this.w=this.s=this.i=null,this}},{key:"recomposeSelf",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;return this.isIdentity||this.resetSelf(),t&&(t.x||t.y)&&this.translateSelf(t.x,t.y),n&&this.rotateSelf(n),r&&(r.x&&this.skewSelf(r.x,0),r.y&&this.skewSelf(0,r.y)),!e||1===e.x&&1===e.y||this.scaleSelf(e.x,e.y),i&&(i.x||i.y)&&this.translateSelf(i.x,i.y),this}},{key:"decompose",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=this.m,e=r[0]*r[0]+r[1]*r[1],i=[[r[0],r[1]],[r[2],r[3]]],o=R(e);if(0===o)return{origin:{x:v(r[4]),y:v(r[5])},translate:{x:v(t),y:v(n)},scale:{x:0,y:0},skew:{x:0,y:0},rotate:0};i[0][0]/=o,i[0][1]/=o;var u=r[0]*r[3]-r[1]*r[2]<0;u&&(o=-o);var a=i[0][0]*i[1][0]+i[0][1]*i[1][1];i[1][0]-=i[0][0]*a,i[1][1]-=i[0][1]*a;var l=R(i[1][0]*i[1][0]+i[1][1]*i[1][1]);if(0===l)return{origin:{x:v(r[4]),y:v(r[5])},translate:{x:v(t),y:v(n)},scale:{x:v(o),y:0},skew:{x:0,y:0},rotate:0};i[1][0]/=l,i[1][1]/=l,a/=l;var f=0;return i[1][1]<0?(f=S(i[1][1])*E,i[0][1]<0&&(f=360-f)):f=O(i[0][1])*E,u&&(f=-f),a=P(a,R(i[0][0]*i[0][0]+i[0][1]*i[0][1]))*E,u&&(a=-a),{origin:{x:v(r[4]),y:v(r[5])},translate:{x:v(t),y:v(n)},scale:{x:v(o),y:v(l)},skew:{x:v(a),y:0},rotate:v(f)}}},{key:"toString",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:" ";return null===this.s&&(this.s="matrix("+this.m.map((function(t){return v(t)})).join(t)+")"),this.s}}]),t}();function N(t,n,r){return t>=.5?r:n}function B(t,n,r){return 0===t||n===r?n:t*(r-n)+n}function F(t,n,r){var e=B(t,n,r);return e<=0?0:e}function T(t,n,r){var e=B(t,n,r);return e<=0?0:e>=1?1:e}function q(t,n,r){return 0===t?n:1===t?r:{x:B(t,n.x,r.x),y:B(t,n.y,r.y)}}function L(t,n,r){var e=function(t,n,r){return Math.round(B(t,n,r))}(t,n,r);return e<=0?0:e>=255?255:e}function C(t,n,r){return 0===t?n:1===t?r:{r:L(t,n.r,r.r),g:L(t,n.g,r.g),b:L(t,n.b,r.b),a:B(t,null==n.a?1:n.a,null==r.a?1:r.a)}}function D(t,n){for(var r=[],e=0;e<t;e++)r.push(n);return r}function z(t,n){if(--n<=0)return t;var r=(t=Object.assign([],t)).length;do{for(var e=0;e<r;e++)t.push(t[e])}while(--n>0);return t}var V,G=function(){function t(n){e(this,t),this.list=n,this.length=n.length}return o(t,[{key:"setAttribute",value:function(t,n){for(var r=this.list,e=0;e<this.length;e++)r[e].setAttribute(t,n)}},{key:"removeAttribute",value:function(t){for(var n=this.list,r=0;r<this.length;r++)n[r].removeAttribute(t)}},{key:"style",value:function(t,n){for(var r=this.list,e=0;e<this.length;e++)r[e].style[t]=n}}]),t}(),Y=/-./g,U=function(t,n){return n.toUpperCase()};function $(t){return"function"==typeof t?t:N}function Q(t){return t?"function"==typeof t?t:Array.isArray(t)?function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d;if(!Array.isArray(t))return n;switch(t.length){case 1:return x(t[0])||n;case 2:return x(t[0],t[1])||n;case 4:return m(t[0],t[1],t[2],t[3])||n}return n}(t,null):function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:d;switch(t){case"linear":return d;case"steps":return x(n.steps||1,n.jump||0)||r;case"bezier":case"cubic-bezier":return m(n.x1||0,n.y1||0,n.x2||0,n.y2||0)||r}return r}(t.type,t.value,null):null}function H(t,n,r){var e=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=n.length-1;if(t<=n[0].t)return e?[0,0,n[0].v]:n[0].v;if(t>=n[i].t)return e?[i,1,n[i].v]:n[i].v;var o,u=n[0],a=null;for(o=1;o<=i;o++){if(!(t>n[o].t)){a=n[o];break}u=n[o]}return null==a?e?[i,1,n[i].v]:n[i].v:u.t===a.t?e?[o,1,a.v]:a.v:(t=(t-u.t)/(a.t-u.t),u.e&&(t=u.e(t)),e?[o,t,r(t,u.v,a.v)]:r(t,u.v,a.v))}function J(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return t&&t.length?"function"!=typeof n?null:("function"!=typeof r&&(r=null),function(e){var i=H(e,t,n);return null!=i&&r&&(i=r(i)),i}):null}function Z(t,n){return t.t-n.t}function K(t,n,e,i,o){var u,a="@"===e[0],l="#"===e[0],f=V[e],s=N;switch(a?(u=e.substr(1),e=u.replace(Y,U)):l&&(e=e.substr(1)),r(f)){case"function":if(s=f(i,o,H,Q,e,a,n,t),l)return s;break;case"string":s=J(i,$(f));break;case"object":if((s=J(i,$(f.i),f.f))&&"function"==typeof f.u)return f.u(n,s,e,a,t)}return s?function(t,n,r){if(arguments.length>3&&void 0!==arguments[3]&&arguments[3])return t instanceof G?function(e){return t.style(n,r(e))}:function(e){return t.style[n]=r(e)};if(Array.isArray(n)){var e=n.length;return function(i){var o=r(i);if(null==o)for(var u=0;u<e;u++)t[u].removeAttribute(n);else for(var a=0;a<e;a++)t[a].setAttribute(n,o)}}return function(e){var i=r(e);null==i?t.removeAttribute(n):t.setAttribute(n,i)}}(n,e,s,a):null}function W(t,n,e,i){if(!i||"object"!==r(i))return null;var o=null,u=null;return Array.isArray(i)?u=function(t){if(!t||!t.length)return null;for(var n=0;n<t.length;n++)t[n].e&&(t[n].e=Q(t[n].e));return t.sort(Z)}(i):(u=i.keys,o=i.data||null),u?K(t,n,e,u,o):null}function X(t,n,r){if(!r)return null;var e=[];for(var i in r)if(r.hasOwnProperty(i)){var o=W(t,n,i,r[i]);o&&e.push(o)}return e.length?e:null}function tt(t,n){if(!n.duration||n.duration<0)return null;var r=function(t,n){if(!n)return null;var r=[];if(Array.isArray(n))for(var e=n.length,i=0;i<e;i++){var o=n[i];if(2===o.length){var u=null;if("string"==typeof o[0])u=t.getElementById(o[0]);else if(Array.isArray(o[0])){u=[];for(var a=0;a<o[0].length;a++)if("string"==typeof o[0][a]){var l=t.getElementById(o[0][a]);l&&u.push(l)}u=u.length?1===u.length?u[0]:new G(u):null}if(u){var f=X(t,u,o[1]);f&&(r=r.concat(f))}}}else for(var s in n)if(n.hasOwnProperty(s)){var c=t.getElementById(s);if(c){var h=X(t,c,n[s]);h&&(r=r.concat(h))}}return r.length?r:null}(t,n.elements);return r?function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,u=t.length,a=e>0?n:0;i&&r%2==0&&(a=n-a);var l=null;return function(f,s){var c=f%n,h=1+(f-c)/n;s*=e,i&&h%2==0&&(s=-s);var v=!1;if(h>r)c=a,v=!0,-1===o&&(c=e>0?0:n);else if(s<0&&(c=n-c),c===l)return!1;l=c;for(var y=0;y<u;y++)t[y](c);return v}}(r,n.duration,n.iterations||1/0,n.direction||1,!!n.alternate,n.fill||1):null}function nt(t){return+("0x"+(t.replace(/[^0-9a-fA-F]+/g,"")||27))}function rt(t,n,r){return!t||!r||n>t.length?t:t.substring(0,n)+rt(t.substring(n+1),r,r)}function et(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:27;return!t||t%n?t%n:et(t/n,n)}function it(t,n,r){if(t&&t.length){var e=nt(r),i=nt(n),o=et(e)+5,u=rt(t,et(e,5),o);return u=u.replace(/\\x7c$/g,"==").replace(/\\x2f$/g,"="),u=function(t,n,r){var e=+("0x"+t.substring(0,4));t=t.substring(4);for(var i=n%e+r%27,o=[],u=0;u<t.length;u+=2)if("|"!==t[u]){var a=+("0x"+t[u]+t[u+1])-i;o.push(a)}else{var l=+("0x"+t.substring(u+1,u+1+4))-i;u+=3,o.push(l)}return String.fromCharCode.apply(String,o)}(u=(u=atob(u)).replace(/[\\x41-\\x5A]/g,""),i,e),u=JSON.parse(u)}}Number.isInteger||(Number.isInteger=function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t}),Number.EPSILON||(Number.EPSILON=2220446049250313e-31);var ot=function(){function t(n,r){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e(this,t),this._id=0,this._running=!1,this._rollingBack=!1,this._animations=n,this.duration=r.duration,this.alternate=r.alternate,this.fill=r.fill,this.iterations=r.iterations,this.direction=i.direction||1,this.speed=i.speed||1,this.fps=i.fps||100,this.offset=i.offset||0,this.rollbackStartOffset=0}return o(t,[{key:"_rollback",value:function(){var t=this,n=1/0,r=null;this.rollbackStartOffset=this.offset,this._rollingBack||(this._rollingBack=!0,this._running=!0);this._id=window.requestAnimationFrame((function e(i){if(t._rollingBack){null==r&&(r=i);var o=i-r,u=t.rollbackStartOffset-o,a=Math.round(u*t.speed);if(a>t.duration&&n!=1/0){var l=!!t.alternate&&a/t.duration%2>1,f=a%t.duration;a=(f+=l?t.duration:0)||t.duration}var s=t.fps?1e3/t.fps:0,c=Math.max(0,a);if(c<n-s){t.offset=c,n=c;for(var h=t._animations,v=h.length,y=0;y<v;y++)h[y](c,t.direction)}var g=!1;if(t.iterations>0&&-1===t.fill){var d=t.iterations*t.duration,p=d==a;a=p?0:a,t.offset=p?0:t.offset,g=a>d}a>0&&t.offset>=a&&!g?t._id=window.requestAnimationFrame(e):t.stop()}}))}},{key:"_start",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=-1/0,e=null,i={},o=function o(u){t._running=!0,null==e&&(e=u);var a=Math.round((u-e+n)*t.speed),l=t.fps?1e3/t.fps:0;if(a>r+l&&!t._rollingBack){t.offset=a,r=a;for(var f=t._animations,s=f.length,c=0,h=0;h<s;h++)i[h]?c++:(i[h]=f[h](a,t.direction),i[h]&&c++);if(c===s)return void t._stop()}t._id=window.requestAnimationFrame(o)};this._id=window.requestAnimationFrame(o)}},{key:"_stop",value:function(){this._id&&window.cancelAnimationFrame(this._id),this._running=!1,this._rollingBack=!1}},{key:"play",value:function(){!this._rollingBack&&this._running||(this._rollingBack=!1,this.rollbackStartOffset>this.duration&&(this.offset=this.rollbackStartOffset-(this.rollbackStartOffset-this.offset)%this.duration,this.rollbackStartOffset=0),this._start(this.offset))}},{key:"stop",value:function(){this._stop(),this.offset=0,this.rollbackStartOffset=0;var t=this.direction,n=this._animations;window.requestAnimationFrame((function(){for(var r=0;r<n.length;r++)n[r](0,t)}))}},{key:"reachedToEnd",value:function(){return this.iterations>0&&this.offset>=this.iterations*this.duration}},{key:"restart",value:function(){this._stop(),this.offset=0,this._start()}},{key:"pause",value:function(){this._stop()}},{key:"reverse",value:function(){this.direction=-this.direction}}],[{key:"build",value:function(r,e){return delete r.animationSettings,r.options=it(r.options,r.root,"5c7f360c"),r.animations.map((function(t){var e=it(t.s,r.root,"5c7f360c");for(var i in delete t.s,r.animationSettings||(r.animationSettings=n({},e)),e)e.hasOwnProperty(i)&&(t[i]=e[i])})),(r=function(t,n){if(V=n,!t||!t.root||!Array.isArray(t.animations))return null;for(var r=document.getElementsByTagName("svg"),e=!1,i=0;i<r.length;i++)if(r[i].id===t.root&&!r[i].svgatorAnimation){(e=r[i]).svgatorAnimation=!0;break}if(!e)return null;var o=t.animations.map((function(t){return tt(e,t)})).filter((function(t){return!!t}));return o.length?{element:e,animations:o,animationSettings:t.animationSettings,options:t.options||void 0}:null}(r,e))?{el:r.element,options:r.options||{},player:new t(r.animations,r.animationSettings,r.options)}:null}},{key:"push",value:function(t){return this.build(t)}},{key:"init",value:function(){var t=this,n=window.__SVGATOR_PLAYER__&&window.__SVGATOR_PLAYER__["5c7f360c"];Array.isArray(n)&&n.splice(0).forEach((function(n){return t.build(n)}))}}]),t}();function ut(t){return v(t)+""}function at(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";return t&&t.length?t.map(ut).join(n):""}function lt(t){return t?null==t.a||t.a>=1?"rgb("+t.r+","+t.g+","+t.b+")":"rgba("+t.r+","+t.g+","+t.b+","+t.a+")":"transparent"}function ft(t){return t?"url(#"+t+")":"none"}!function(){for(var t=0,n=["ms","moz","webkit","o"],r=0;r<n.length&&!window.requestAnimationFrame;++r)window.requestAnimationFrame=window[n[r]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n[r]+"CancelAnimationFrame"]||window[n[r]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(n){var r=Date.now(),e=Math.max(0,16-(r-t)),i=window.setTimeout((function(){n(r+e)}),e);return t=r+e,i},window.cancelAnimationFrame=window.clearTimeout)}();var st={f:null,i:function(t,n,r){return 0===t?n:1===t?r:{x:F(t,n.x,r.x),y:F(t,n.y,r.y)}},u:function(t,n){return function(r){var e=n(r);t.setAttribute("rx",ut(e.x)),t.setAttribute("ry",ut(e.y))}}},ct={f:null,i:function(t,n,r){return 0===t?n:1===t?r:{width:F(t,n.width,r.width),height:F(t,n.height,r.height)}},u:function(t,n){return function(r){var e=n(r);t.setAttribute("width",ut(e.width)),t.setAttribute("height",ut(e.height))}}};Object.freeze({M:2,L:2,Z:0,H:1,V:1,C:6,Q:4,T:2,S:4,A:7});var ht={},vt=null;function yt(t){var n=function(){if(vt)return vt;if("object"!==("undefined"==typeof document?"undefined":r(document))||!document.createElementNS)return{};var t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t&&t.style?(t.style.position="absolute",t.style.opacity="0.01",t.style.zIndex="-9999",t.style.left="-9999px",t.style.width="1px",t.style.height="1px",vt={svg:t}):{}}().svg;if(!n)return function(t){return null};var e=document.createElementNS(n.namespaceURI,"path");e.setAttributeNS(null,"d",t),e.setAttributeNS(null,"fill","none"),e.setAttributeNS(null,"stroke","none"),n.appendChild(e);var i=e.getTotalLength();return function(t){var n=e.getPointAtLength(i*t);return{x:n.x,y:n.y}}}function gt(t){return ht[t]?ht[t]:ht[t]=yt(t)}function dt(t,n,r,e){if(!t||!e)return!1;var i=["M",t.x,t.y];if(n&&r&&(i.push("C"),i.push(n.x),i.push(n.y),i.push(r.x),i.push(r.y)),n?!r:r){var o=n||r;i.push("Q"),i.push(o.x),i.push(o.y)}return n||r||i.push("L"),i.push(e.x),i.push(e.y),i.join(" ")}function pt(t,n,r,e){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=dt(t,n,r,e),u=gt(o);try{return u(i)}catch(t){return null}}function mt(t,n,r,e){var i=1-e;return i*i*t+2*i*e*n+e*e*r}function bt(t,n,r,e){return 2*(1-e)*(n-t)+2*e*(r-n)}function wt(t,n,r,e){var i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=pt(t,n,null,r,e);return o||(o={x:mt(t.x,n.x,r.x,e),y:mt(t.y,n.y,r.y,e)}),i&&(o.a=xt(t,n,r,e)),o}function xt(t,n,r,e){return Math.atan2(bt(t.y,n.y,r.y,e),bt(t.x,n.x,r.x,e))}function At(t,n,r,e,i){var o=i*i;return i*o*(e-t+3*(n-r))+3*o*(t+r-2*n)+3*i*(n-t)+t}function kt(t,n,r,e,i){var o=1-i;return 3*(o*o*(n-t)+2*o*i*(r-n)+i*i*(e-r))}function _t(t,n,r,e,i){var o=arguments.length>5&&void 0!==arguments[5]&&arguments[5],u=pt(t,n,r,e,i);return u||(u={x:At(t.x,n.x,r.x,e.x,i),y:At(t.y,n.y,r.y,e.y,i)}),o&&(u.a=St(t,n,r,e,i)),u}function St(t,n,r,e,i){return Math.atan2(kt(t.y,n.y,r.y,e.y,i),kt(t.x,n.x,r.x,e.x,i))}function Ot(t,n,r){return t+(n-t)*r}function jt(t,n,r){var e=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i={x:Ot(t.x,n.x,r),y:Ot(t.y,n.y,r)};return e&&(i.a=Pt(t,n)),i}function Pt(t,n){return Math.atan2(n.y-t.y,n.x-t.x)}function Mt(t,n,r){var e=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(Rt(n)){if(It(r))return wt(n,r.start,r,t,e)}else if(Rt(r)){if(n.end)return wt(n,n.end,r,t,e)}else{if(n.end)return r.start?_t(n,n.end,r.start,r,t,e):wt(n,n.end,r,t,e);if(r.start)return wt(n,r.start,r,t,e)}return jt(n,r,t,e)}function Et(t,n,r){var e=Mt(t,n,r,!0);return e.a=function(t){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]?t+Math.PI:t}(e.a)/g,e}function Rt(t){return!t.type||"corner"===t.type}function It(t){return null!=t.start&&!Rt(t)}var Nt=new I;var Bt={f:ut,i:B},Ft={f:ut,i:T};function Tt(t,n,r){return t.map((function(t){return function(t,n,r){var e=t.v;if(!e||"g"!==e.t||e.s||!e.v||!e.r)return t;var i=r.getElementById(e.r),o=i&&i.querySelectorAll("stop")||[];return e.s=e.v.map((function(t,n){var r=o[n]&&o[n].getAttribute("offset");return{c:t,o:r=v(parseInt(r)/100)}})),delete e.v,t}(t,0,r)}))}var qt={gt:"gradientTransform",c:{x:"cx",y:"cy"},rd:"r",f:{x:"x1",y:"y1"},to:{x:"x2",y:"y2"}};function Lt(t,n,e,i,o,u,a,l){return Tt(t,0,l),n=function(t,n,r){for(var e,i,o,u=t.length-1,a={},l=0;l<=u;l++)(e=t[l]).e&&(e.e=n(e.e)),e.v&&"g"===(i=e.v).t&&i.r&&(o=r.getElementById(i.r))&&(a[i.r]={e:o,s:o.querySelectorAll("stop")});return a}(t,i,l),function(i){var o=e(i,t,Ct);if(!o)return"none";if("c"===o.t)return lt(o.v);if("g"===o.t){if(!n[o.r])return ft(o.r);var u=n[o.r];return function(t,n){for(var r=t.s,e=r.length;e<n.length;e++){var i=r[r.length-1].cloneNode();i.id=Vt(i.id),t.e.appendChild(i),r=t.s=t.e.querySelectorAll("stop")}for(var o=0,u=r.length,a=n.length-1;o<u;o++)r[o].setAttribute("stop-color",lt(n[Math.min(o,a)].c)),r[o].setAttribute("offset",n[Math.min(o,a)].o)}(u,o.s),Object.keys(qt).forEach((function(t){if(void 0!==o[t])if("object"!==r(qt[t])){var n,e="gt"===t?(n=o[t],Array.isArray(n)?"matrix("+n.join(" ")+")":""):o[t],i=qt[t];u.e.setAttribute(i,e)}else Object.keys(qt[t]).forEach((function(n){if(void 0!==o[t][n]){var r=o[t][n],e=qt[t][n];u.e.setAttribute(e,r)}}))})),ft(o.r)}return"none"}}function Ct(t,r,e){if(0===t)return r;if(1===t)return e;if(r&&e){var i=r.t;if(i===e.t)switch(r.t){case"c":return{t:i,v:C(t,r.v,e.v)};case"g":if(r.r===e.r){var o={t:i,s:Dt(t,r.s,e.s),r:r.r};return r.gt&&e.gt&&(o.gt=function(t,n,r){var e=n.length;if(e!==r.length)return N(t,n,r);for(var i=new Array(e),o=0;o<e;o++)i[o]=B(t,n[o],r[o]);return i}(t,r.gt,e.gt)),r.c?(o.c=q(t,r.c,e.c),o.rd=F(t,r.rd,e.rd)):r.f&&(o.f=q(t,r.f,e.f),o.to=q(t,r.to,e.to)),o}}if("c"===r.t&&"g"===e.t||"c"===e.t&&"g"===r.t){var u="c"===r.t?r:e,a="g"===r.t?n({},r):n({},e),l=a.s.map((function(t){return{c:u.v,o:t.o}}));return a.s="c"===r.t?Dt(t,l,a.s):Dt(t,a.s,l),a}}return N(t,r,e)}function Dt(t,n,r){if(n.length===r.length)return n.map((function(n,e){return zt(t,n,r[e])}));for(var e=Math.max(n.length,r.length),i=[],o=0;o<e;o++){var u=zt(t,n[Math.min(o,n.length-1)],r[Math.min(o,r.length-1)]);i.push(u)}return i}function zt(t,n,r){return{o:T(t,n.o,r.o||0),c:C(t,n.c,r.c||{})}}function Vt(t){return t.replace(/-fill-([0-9]+)$/,(function(t,n){return"-fill-"+(+n+1)}))}var Gt={fill:Lt,"fill-opacity":Ft,stroke:Lt,"stroke-opacity":Ft,"stroke-width":Bt,"stroke-dashoffset":{f:ut,i:B},"stroke-dasharray":{f:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";return t&&t.length>0&&(t=t.map((function(t){return v(t,4)}))),at(t,n)},i:function(t,n,r){var e,i,o,u=n.length,a=r.length;if(u!==a)if(0===u)n=D(u=a,0);else if(0===a)a=u,r=D(u,0);else{var l=(o=(e=u)*(i=a)/function(t,n){for(var r;n;)r=n,n=t%n,t=r;return t||1}(e,i))<0?-o:o;n=z(n,Math.floor(l/u)),r=z(r,Math.floor(l/a)),u=a=l}for(var f=[],s=0;s<u;s++)f.push(v(F(t,n[s],r[s])));return f}},opacity:Ft,transform:function(t,n,e,i){if(!(t=function(t,n){if(!t||"object"!==r(t))return null;var e=!1;for(var i in t)t.hasOwnProperty(i)&&(t[i]&&t[i].length?(t[i].forEach((function(t){t.e&&(t.e=n(t.e))})),e=!0):delete t[i]);return e?t:null}(t,i)))return null;var o=function(r,i,o){var u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t[r]?e(i,t[r],o):n&&n[r]?n[r]:u};return n&&n.a&&t.o?function(n){var r=e(n,t.o,Et);return Nt.recomposeSelf(r,o("r",n,B,0)+r.a,o("k",n,q),o("s",n,q),o("t",n,q)).toString()}:function(t){return Nt.recomposeSelf(o("o",t,Mt,null),o("r",t,B,0),o("k",t,q),o("s",t,q),o("t",t,q)).toString()}},r:Bt,"#size":ct,"#radius":st,_:function(t,n){if(Array.isArray(t))for(var r=0;r<t.length;r++)this[t[r]]=n;else this[t]=n}},Yt=function(t){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&l(t,n)}(r,t);var n=s(r);function r(){return e(this,r),n.apply(this,arguments)}return o(r,null,[{key:"build",value:function(t){var n=c(a(r),"build",this).call(this,t,Gt);if(!n)return null;n.el,n.options,function(t,n,r){t.play()}(n.player)}}]),r}(ot);return Yt.init(),Yt}));\n(function(s,i,o,w){w[o]=w[o]||{};w[o][s]=w[o][s]||[];w[o][s].push(i);})(\'5c7f360c\',{"root":"eULQaNdhcVB1","animations":[{"elements":{"eULQaNdhcVB76":{"#size":[{"t":500,"v":{"width":553.165229,"height":890.139349}},{"t":1000,"v":{"width":0,"height":890.139349}}]},"eULQaNdhcVB77":{"#size":[{"t":300,"v":{"width":553.165229,"height":890.139349}},{"t":1000,"v":{"width":0,"height":890.139349}}]},"eULQaNdhcVB78":{"#size":[{"t":500,"v":{"width":553.165229,"height":890.139349}},{"t":1000,"v":{"width":0,"height":890.139349}}]},"eULQaNdhcVB79":{"#size":[{"t":300,"v":{"width":553.165229,"height":890.139349}},{"t":1000,"v":{"width":0,"height":890.139349}}]},"eULQaNdhcVB80":{"#size":[{"t":0,"v":{"width":553.165229,"height":890.139349}},{"t":1000,"v":{"width":0,"height":890.139349}}]},"eULQaNdhcVB81":{"#size":[{"t":0,"v":{"width":553.165229,"height":890.139349}},{"t":1000,"v":{"width":0,"height":890.139349}}]}},"s":"MIDA1M2NjNzNiNWM2YzGNiMmM1YmFIYzBiZjcRzOGJKODQ4MTgxODE3FZDczYjViYVNjM2I2YEjRjNWJhYzBiZjczOGRI4Mkw3ZDczYmFjNWIO2YzNiMmM1YmFjMGJmUYzQ3MzhiODI3ZDczYKjdiYWJkYmQ3M0o4YjYgyN2Q3M2IyYmRjNWIY2YzNiZmIyYzViNjczDOGJiN2IyYmRHYzRiNYjdkNzNjNEVjMVNiNmTI2SWI1QjczOGI4MmNTl"}],"options":"MBDAxMDg4MmY4MDgxNmLU3ZjgxVDJmNDcyZjcR5N2M2ZTcxMmY4YQ|"},\'__SVGATOR_PLAYER__\',window)'
          ),
        ]);
      }
      (a.defaultProps = {
        id: "eULQaNdhcVB1",
        viewBox: "0 0 1440 1024",
        shapeRendering: "geometricPrecision",
        textRendering: "geometricPrecision",
      }),
        (e.exports = a),
        (a.default = a);
    },
    1687: function (e, t, n) {
      var r = n(7294);
      function a(e) {
        return r.createElement(
          "svg",
          e,
          r.createElement("path", {
            fill: "#30b8c6",
            fillOpacity: "1",
            d: "M0,32L40,37.3C80,43,160,53,240,74.7C320,96,400,128,480,133.3C560,139,640,117,720,112C800,107,880,117,960,133.3C1040,149,1120,171,1200,186.7C1280,203,1360,213,1400,218.7L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z",
          })
        );
      }
      (a.defaultProps = { width: "100%", viewBox: "0 0 1440 320" }),
        (e.exports = a),
        (a.default = a);
    },
  },
]);
//# sourceMappingURL=component---src-pages-index-js-fdd17a484c0f683c5903.js.map
