"use client";
import { Project } from "@/types/project";
import { motion } from "motion/react";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      key={index}
      initial={{ y: "-10%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: index * 0.2, ease: "easeInOut" }}
      className="flex flex-col justify-between rounded-lg bg-background-light dark:bg-background-dark border-2 border-primary h-fit p-3 mb-4"
    >
      {/* Image */}
      <div className="w-full h-24 lg:h-56 relative mb-3">
        <Image
          className="rounded"
          src={
            process.env.NEXT_PUBLIC_API_URL.replace("/api", "/") +
            "storage/" +
            project.imagePath
          }
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          objectFit="cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-base lg:text-xl font-semibold mb-2">
        {project.title}
      </h3>

      {/* Stacks */}
      <div className="flex flex-row flex-wrap gap-2">
        {project.stacks.map((stack, index) => (
          <span key={index} className="bg-primary text-white px-3 py-0 rounded">
            {stack}
          </span>
        ))}
      </div>

      {/* URL */}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary mt-2 hover:underline"
        >
          View Project ↗
        </a>
      )}
    </motion.div>
  );
}
