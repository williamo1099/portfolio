"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

import Introduction from "@/app/home/components/introduction";
import SocialMediaList from "@/app/home/components/social-media-list";
import AboutMePicture from "@/app/about-me/components/about-me-picture";
import AboutMeStory from "@/app/about-me/components/about-me-story";
import TraitList from "@/app/about-me/components/trait-list";
import Separator from "@/app/components/separator";
import Title from "@/app/components/title";
import HighlightedText from "@/app/components/highlighted-text";
import ProjectGrid from "@/app/projects/components/project-grid";
import ContactForm from "@/app/contact/components/contact-form";

export type ScrollSectionPath = "/" | "/about-me" | "/projects" | "/contact";

interface ScrollSectionsProps {
  initialSection?: ScrollSectionPath;
}

const SECTION_IDS: Record<ScrollSectionPath, string> = {
  "/": "home",
  "/about-me": "about-me",
  "/projects": "projects",
  "/contact": "contact",
};

const ID_TO_PATH: Record<string, ScrollSectionPath> = {
  home: "/",
  "about-me": "/about-me",
  projects: "/projects",
  contact: "/contact",
};

const sectionMotionProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.35 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

export default function ScrollSections({
  initialSection = "/",
}: ScrollSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReadyRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targetId = SECTION_IDS[initialSection];
    const targetEl = document.getElementById(targetId);

    if (targetEl && initialSection !== "/") {
      targetEl.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    }

    const readyTimer = window.setTimeout(() => {
      isReadyRef.current = true;
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!isReadyRef.current) return;

        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const path = ID_TO_PATH[entry.target.id];
            if (path && window.location.pathname.replace(/\/+$/, "") !== (path === "/" ? "" : path)) {
              window.history.replaceState(null, "", path);
            }
          }
        }
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    const sections = container.querySelectorAll<HTMLElement>("[data-scroll-section]");
    sections.forEach((section) => observer.observe(section));

    const handleScrollToSection = (event: Event) => {
      const customEvent = event as CustomEvent<ScrollSectionPath>;
      const sectionId = SECTION_IDS[customEvent.detail];
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("scroll-to-section", handleScrollToSection);

    return () => {
      window.clearTimeout(readyTimer);
      observer.disconnect();
      window.removeEventListener("scroll-to-section", handleScrollToSection);
    };
  }, [initialSection]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
    >
      {/* Home */}
      <section
        id="home"
        data-scroll-section
        className="h-full w-full shrink-0 snap-start snap-always flex flex-col justify-center items-center overflow-y-auto"
      >
        <motion.div
          {...sectionMotionProps}
          className="relative z-10 m-5 lg:m-0 text-left"
        >
          <Introduction />
          <SocialMediaList />
        </motion.div>
      </section>

      {/* About Me */}
      <section
        id="about-me"
        data-scroll-section
        className="h-full w-full shrink-0 snap-start snap-always flex flex-col justify-center items-center overflow-y-auto"
      >
        <motion.div
          {...sectionMotionProps}
          className="flex flex-col justify-center items-center w-full"
        >
          <div className="flex flex-col lg:flex-row justify-center items-center mt-28 mb-5">
            <AboutMePicture />
            <Separator isVertical={true} additionalClassNames="m-5" />
            <AboutMeStory />
          </div>
          <TraitList />
        </motion.div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        data-scroll-section
        className="h-full w-full shrink-0 snap-start snap-always flex flex-col justify-center items-center overflow-y-auto"
      >
        <motion.div
          {...sectionMotionProps}
          className="flex flex-col justify-center items-center w-full"
        >
          <Title>
            Some of <HighlightedText>My</HighlightedText> Projects
          </Title>
          <ProjectGrid />
        </motion.div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        data-scroll-section
        className="h-full w-full shrink-0 snap-start snap-always flex flex-col justify-center items-center overflow-y-auto"
      >
        <motion.div
          {...sectionMotionProps}
          className="flex flex-col justify-center items-center w-full"
        >
          <Title>
            Contact <HighlightedText>Me</HighlightedText>
          </Title>
          <ContactForm />
        </motion.div>
      </section>
    </div>
  );
}
