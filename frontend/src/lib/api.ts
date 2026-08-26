import {
  CreateEventPayload,
  EngagementEvent,
  PaginatedAnalyticsResponse,
  Video,
} from "@/types/analytics";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(
      errorBody?.message || `Request failed with status ${res.status}`,
    );
  }

  return res.json();
}

export function getVideoAnalytics(
  page = 1,
  limit = 10,
): Promise<PaginatedAnalyticsResponse> {
  return apiFetch<PaginatedAnalyticsResponse>(
    `/analytics/videos?page=${page}&limit=${limit}`,
  );
}

export function createEvent(
  payload: CreateEventPayload,
): Promise<EngagementEvent> {
  return apiFetch<EngagementEvent>("/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getVideos(): Promise<Video[]> {
  return apiFetch<Video[]>("/videos");
}
