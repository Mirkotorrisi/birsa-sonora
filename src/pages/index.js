import * as React from "react";
import HeroSection from "../HeroSection";
import MiddleSection from "../MiddleSection";
import TeachersSection from "../TeachersSection";
import FindusSection from "../FindusSection";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.scss";
import ContactSection from "../ContactSection";

const IndexPage = () => {
  return (
    <main>
      <title>Home Page</title>
      <Navbar />
      <HeroSection />
      <MiddleSection />
      <TeachersSection />
      <FindusSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default IndexPage;
