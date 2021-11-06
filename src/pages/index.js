import * as React from "react";
import HeroSection from "../sections/HeroSection";
import MiddleSection from "../sections/MiddleSection";
import TeachersSection from "../sections/TeachersSection";
import FindusSection from "../sections/FindusSection";
import Navbar from "../commons/Navbar";
import Footer from "../commons/Footer";
import { NavProvider } from "../context/NavContext";
import "./index.scss";
import ContactSection from "../sections/ContactSection";

const IndexPage = () => {
  return (
    <main>
      <title>Brisa Sonora</title>
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
