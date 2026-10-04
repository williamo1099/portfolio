import { API_URL, isApiEnabled } from "@/lib/env";
import { ApiResponse } from "@/types/api";

const REQUEST_TIMEOUT_MS = 5000;

export class ApiNotConfiguredError extends Error {
  constructor() {
    super("NEXT_PUBLIC_API_URL is not set, running in local mode.");
    this.name = "ApiNotConfiguredError";
  }
}

export async function getJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  if (!isApiEnabled) {
    throw new ApiNotConfiguredError();
  }

  const url = `${API_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...init,
    signal: init?.signal ?? AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Request to ${url} failed with ${response.status} ${response.statusText}`);
  }

  const body = (await response.json()) as ApiResponse<T> | null;

  if (!body || typeof body !== "object") {
    throw new Error(`Request to ${url} returned an unexpected payload.`);
  }

  if (!body.success) {
    throw new Error(body.message || `Request to ${url} was not successful.`);
  }

  return body.data;
}
