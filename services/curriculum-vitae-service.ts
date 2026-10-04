import { isApiEnabled, resolveAssetUrl } from "@/lib/env";
import { curriculumVitaePath } from "@/data/curriculum-vitae";
import { getJson } from "@/services/http";

export async function fetchCurriculumVitaePath(): Promise<string> {
  if (!isApiEnabled) {
    return curriculumVitaePath;
  }

  try {
    const data = await getJson<Record<string, unknown>>("/curriculum-vitae");
    const path = typeof data?.path === "string" ? data.path.trim() : "";

    if (!path) {
      throw new Error("API returned an empty curriculum vitae path.");
    }

    return resolveAssetUrl(path);
  } catch (ex) {
    console.warn("[curriculum-vitae] API gagal, pakai file lokal:", ex);
    return curriculumVitaePath;
  }
}
