"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import HighlightedText from "@/app/components/highlighted-text";
import Title from "@/app/components/title";

import { curriculumVitaePath } from "@/data/curriculum-vitae";
import { fetchCurriculumVitaePath } from "@/services/curriculum-vitae-service";

export default function AboutMeStory() {
  const [path, setPath] = useState(curriculumVitaePath);

  useEffect(() => {
    const fetchCV = async () => {
      setPath(await fetchCurriculumVitaePath());
    };

    fetchCV();
  }, []);

  return (
    <div className="mx-5 w-4/6 lg:w-2/6">
      {/* Title */}
      <Title>
        A Bit about <HighlightedText>Me</HighlightedText>
      </Title>

      {/* Background */}
      <p className="text-sm lg:text-base mt-2">
        A graduate of the Computer Science from Parahyangan Catholic University
        with a deep passion for{" "}
        <HighlightedText>front-end development</HighlightedText> and{" "}
        <HighlightedText>clean code architecture</HighlightedText>. Currently
        employed as a <HighlightedText>full-stack web</HighlightedText> and{" "}
        <HighlightedText>mobile developer</HighlightedText>, designing and
        building business application solutions for clients.
      </p>

      {/* CV */}
      <motion.div
        initial={{ x: "-10%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
        className="mt-3"
      >
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Curriculum Vitae in a new tab"
          className="text-primary text-lg font-bold cursor-pointer hover:underline"
        >
          Curriculum Vitae
        </a>
      </motion.div>
    </div>
  );
}
