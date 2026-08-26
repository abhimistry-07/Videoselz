import type { VideoAnalytics } from "@/types/analytics";
import styles from "./SummaryCards.module.css";

interface Props {
  videos: VideoAnalytics[];
  totalVideos: number;
}

export default function SummaryCards({ videos, totalVideos }: Props) {
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
  const totalClicks = videos.reduce((sum, v) => sum + v.clicks, 0);
  const totalConversions = videos.reduce((sum, v) => sum + v.addToCarts, 0);

  const cards = [
    { label: "Total Videos", value: totalVideos },
    { label: "Total Views", value: totalViews },
    { label: "Total Clicks", value: totalClicks },
    { label: "Total Conversions", value: totalConversions },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <div key={card.label} className={styles.card}>
          <p className={styles.label}>{card.label}</p>
          <p className={styles.value}>{card.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
