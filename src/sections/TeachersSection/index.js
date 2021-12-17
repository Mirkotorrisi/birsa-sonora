import React from "react";
import "./index.scss";

import { teachers } from "./resources.js";
import { instruments } from "../HeroSection/res";
import Teacher from "./Teacher";

export default function TeachersSection() {
  return (
    <section className="teachers-section  pt-36 lg:pb-10 px-10 lg:px-36 xl:px-48">
      <h2 className="title mb-10 lg:mt-20">I docenti</h2>
      <Teacher teacher={teachers[0]} instrument={instruments[0]} />
      <Teacher teacher={teachers[1]} instrument={instruments[1]} />
    </section>
  );
}
