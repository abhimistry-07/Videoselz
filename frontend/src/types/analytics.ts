export interface VideoAnalytics {
  id: number;
  title: string;
  videoUrl: string;
  productId: number;
  views: number;
  clicks: number;
  addToCarts: number;
}

export interface PaginatedAnalyticsResponse {
  data: VideoAnalytics[];
  total: number;
  page: number;
  limit: number;
}

export type EventType = "view" | "click" | "add_to_cart";

export interface CreateEventPayload {
  videoId: number;
  eventType: EventType;
}

export interface EngagementEvent {
  id: number;
  videoId: number;
  eventType: EventType;
  timestamp: string;
}

export interface Video {
  id: number;
  productId: number;
  videoUrl: string;
  title: string;
}
