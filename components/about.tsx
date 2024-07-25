"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I am currently a{" "}
        <span className="font-medium">high school student</span> with a passion
        for programming. My journey began with enrolling in a coding bootcamp,
        where I honed my skills in{" "}
        <span className="font-medium">
          full-stack web development and mobile apps with flutter
        </span>
        .<span className="italic"> My favorite part of programming</span> is the
        problem-solving aspect and creating innovative projects. I
        <span className="underline"> love</span> the feeling of finally figuring
        out a solution to a problem. My core stack includes
        <span className="font-medium"> React, Next.js, Node.js, Flutter</span>.
        For mobile apps, I use <span className="font-medium">Flutter</span>. I
        am also proficient in TypeScript and Prisma. I am always eager to learn
        new technologies and am currently focused on doing
        <span className="font-medium"> Open-Source</span> contributions and
        building network with like minded people.
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy playing
        video games, watching movies, and exploring different cultures. I also
        enjoy <span className="font-medium">learning new things</span>.
        Currently, I am learning about{" "}
        <span className="font-medium">Mathematics and IOT</span>
        and working on becoming more available.
      </p>
    </motion.section>
  );
}
