import { apiFetch } from "@/lib/api";
import type { CreateEventPayload, EngagementEvent } from "@/types/analytics";

export function createEvent(
  payload: CreateEventPayload,
): Promise<EngagementEvent> {
  return apiFetch<EngagementEvent>("/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
