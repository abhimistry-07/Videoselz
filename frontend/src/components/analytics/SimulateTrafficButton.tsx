import { useState } from "react";
import { createEvent, getVideos } from "@/lib/api";
import type { EventType } from "@/types/analytics";
import styles from "./SimulateTrafficButton.module.css";

const EVENT_TYPES: EventType[] = [
  "view",
  "view",
  "view",
  "click",
  "click",
  "add_to_cart",
];

function getRandomEventType(): EventType {
  return EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
}

interface Props {
  onEventCreated: () => void;
}

export default function SimulateTrafficButton({ onEventCreated }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const videos = await getVideos();
      if (videos.length === 0) {
        throw new Error("No videos available to simulate traffic for");
      }

      const randomVideo = videos[Math.floor(Math.random() * videos.length)];
      const eventType = getRandomEventType();

      await createEvent({ videoId: randomVideo.id, eventType });
      onEventCreated();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to simulate traffic",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Simulating..." : "Simulate Traffic"}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
