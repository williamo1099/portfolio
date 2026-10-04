const rawApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

export const isApiEnabled = Boolean(rawApiUrl);

export const API_URL = rawApiUrl ?? "";

const API_ORIGIN = API_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");

export function resolveAssetUrl(path?: string | null): string {
  if (!path) return "";
  if (/^(?:https?:)?\/\//.test(path) || path.startsWith("/")) return path;

  const normalized = path.replace(/^\/+/, "");

  return isApiEnabled ? `${API_ORIGIN}/storage/${normalized}` : `/${normalized}`;
}
