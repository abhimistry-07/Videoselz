import { apiFetch } from "@/lib/api";
import type { PaginatedAnalyticsResponse } from "@/types/analytics";

export function getVideoAnalytics(
  page = 1,
  limit = 10,
): Promise<PaginatedAnalyticsResponse> {
  return apiFetch<PaginatedAnalyticsResponse>(
    `/analytics/videos?page=${page}&limit=${limit}`,
  );
}
