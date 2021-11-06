import * as React from "react";
import HeroSection from "../sections/HeroSection";
import MiddleSection from "../sections/MiddleSection";
import TeachersSection from "../sections/TeachersSection";
import FindusSection from "../sections/FindusSection";
import Navbar from "../commons/Navbar";
import Footer from "../commons/Footer";
import { Helmet } from "react-helmet";
import { NavProvider } from "../context/NavContext";
import "./index.scss";
import ContactSection from "../sections/ContactSection";

const IndexPage = () => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Brisa Sonora corsi di musica, lezioni di pianoforte, chitarra, violino, sassofono a Catania. associazione musicale."
        />
        <title>Brisa Sonora</title>
      </Helmet>
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
