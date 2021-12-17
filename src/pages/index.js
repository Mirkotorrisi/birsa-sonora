import * as React from "react";
import HeroSection from "../sections/HeroSection";
import MiddleSection from "../sections/MiddleSection";
import TeachersSection from "../sections/TeachersSection";
import FindusSection from "../sections/FindusSection";
import Navbar from "../commons/Navbar";
import Footer from "../commons/Footer";
import { Helmet } from "react-helmet";
import { NavProvider } from "../context/NavContext";
import logo from "../images/logo_brisa.webp";
import "./index.scss";
import ContactSection from "../sections/ContactSection";
import { GatsbySeo } from "gatsby-plugin-next-seo";

const IndexPage = () => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Brisa Sonora corsi di musica, lezioni di pianoforte, chitarra, violino, sassofono a Catania. associazione musicale."
        />
        <meta
          name="google-site-verification"
          content="1PIQqEL0OgbiTPjG0fiPZ9rOcO30wM00ZIqtViP6IWo"
        />
        <meta
          name="keywords"
          content="musica lezioni online corsi pianoforte violino sassofono chitarra catania san gregorio strumenti musicali aci sant'antonio paesi etnei valverde aci catena corsi di musica associazione musicale conservatorio"
        />
        <title>Brisa Sonora</title>
      </Helmet>
      <GatsbySeo
        title="BrisaSonora lezioni di musica"
        description="Lezioni di violino e pianoforte online o in sede, per ogni livello ed ogni età. Impara a suonare con noi!"
        canonical="https://brisasonora.it/"
        openGraph={{
          url: "https://brisasonora.it",
          title: "BrisaSonora - Lezioni di musica online e in sede",
          description:
            "Lezioni di violino e pianoforte online o in sede, per ogni livello ed ogni età.",
          images: [
            {
              url: logo,
              width: 800,
              height: 600,
              alt: "Logo BrisaSonora",
            },
          ],
          locale: "it_IT",
          language: "it",
          site_name: "BrisaSonora",
        }}
        twitter={{
          handle: "@handle",
          site: "@brisasonora",
          cardType: "summary_large_image",
        }}
      />
      <NavProvider>
        <Navbar />
        <HeroSection />
        <MiddleSection />
        <TeachersSection />
        <FindusSection />
        <ContactSection />
        <Footer />
      </NavProvider>
    </main>
  );
};

export default IndexPage;
