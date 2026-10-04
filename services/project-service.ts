import { isApiEnabled } from "@/lib/env";
import { personalProjects, professionalProjects } from "@/data/projects";
import { Project } from "@/types/project";
import { getJson } from "@/services/http";

interface FetchProjectsProps {
  type: "personal" | "professional";
}

const fallbackProjects: Record<FetchProjectsProps["type"], Project[]> = {
  personal: personalProjects,
  professional: professionalProjects,
};

function mapProject(api: Record<string, unknown>): Project {
  const imagePath = typeof api["image_path"] === "string" ? api["image_path"] : "";
  const title = typeof api["title"] === "string" ? api["title"] : "";
  const stacks = Array.isArray(api["stacks"])
    ? api["stacks"].filter((stack): stack is string => typeof stack === "string")
    : [];

  if (!imagePath || !title || stacks.length === 0) {
    throw new Error("Project payload is missing required fields.");
  }

  return {
    imagePath,
    title,
    stacks,
    url: typeof api["url"] === "string" && api["url"] ? api["url"] : undefined,
  };
}

export async function fetchProjects({
  type,
}: FetchProjectsProps): Promise<Project[]> {
  if (!isApiEnabled) {
    return fallbackProjects[type];
  }

  try {
    const data = await getJson<Record<string, unknown>[]>(`/projects/${type}`);

    // Throw error if request is not successful.
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error(`API returned no ${type} projects.`);
    }

    return data.map(mapProject);
  } catch (ex) {
    console.warn(`[projects:${type}] API gagal, pakai data lokal:`, ex);
    return fallbackProjects[type];
  }
}
