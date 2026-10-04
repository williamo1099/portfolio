"use client";
import React, { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";

import ProjectSelector from "./project-selector";
import ProjectCard from "./project-card";

import { Project } from "@/types/project";
import { fetchProjects } from "@/services/project-service";

type ProjectType = "personal" | "professional";

const EMPTY_MESSAGES: Record<ProjectType, string> = {
  professional: "No professional projects to show yet.",
  personal: "No personal projects to show yet.",
};

export default function ProjectGrid() {
  const [showPersonal, setShowPersonal] = useState(false);
  const [projects, setProjects] = useState<Record<ProjectType, Project[]>>({
    personal: [],
    professional: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const activeType: ProjectType = showPersonal ? "personal" : "professional";

  const loadedTypes = useRef<ProjectType[]>([]);

  useEffect(() => {
    if (loadedTypes.current.includes(activeType)) return;
    loadedTypes.current.push(activeType);

    setIsLoading(true);

    fetchProjects({ type: activeType })
      .then((data) =>
        setProjects((previous) => ({ ...previous, [activeType]: data }))
      )
      .finally(() => setIsLoading(false));
  }, [activeType]);

  const visibleProjects = projects[activeType];

  return (
    <React.Fragment>
      {/* Selector */}
      <ProjectSelector
        showPersonal={() => setShowPersonal(true)}
        showProfessional={() => setShowPersonal(false)}
        isShowingPersonal={showPersonal}
      />

      {/* Grid */}
      <div className="mt-8 px-5 overflow-auto max-h-[60vh] w-screen">
        {isLoading ? (
          <p className="text-center text-sm lg:text-base opacity-70">
            Loading projects…
          </p>
        ) : visibleProjects.length === 0 ? (
          <p className="text-center text-sm lg:text-base opacity-70">
            {EMPTY_MESSAGES[activeType]}
          </p>
        ) : (
          <Masonry
            breakpointCols={{ default: 5, 640: 2 }}
            className="flex gap-4"
            columnClassName="masonry-column"
          >
            {visibleProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </Masonry>
        )}
      </div>
    </React.Fragment>
  );
}
