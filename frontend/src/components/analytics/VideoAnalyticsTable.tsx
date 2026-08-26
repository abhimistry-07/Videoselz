import type { VideoAnalytics } from "@/types/analytics";
import styles from "./VideoAnalyticsTable.module.css";
import { calculateConversionRate, formatPercentage } from "../../../utils";

interface Props {
  videos: VideoAnalytics[];
}

export default function VideoAnalyticsTable({ videos }: Props) {
  if (videos.length === 0) {
    return <div className={styles.emptyState}>No video data available.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th className={styles.numericCell}>Views</th>
            <th className={styles.numericCell}>Clicks</th>
            <th className={styles.numericCell}>Conversions</th>
            <th className={styles.numericCell}>Conversion Rate</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.title}</td>
              <td className={styles.numericCell}>
                {video.views.toLocaleString()}
              </td>
              <td className={styles.numericCell}>
                {video.clicks.toLocaleString()}
              </td>
              <td className={styles.numericCell}>
                {video.addToCarts.toLocaleString()}
              </td>
              <td className={styles.numericCell}>
                {formatPercentage(
                  calculateConversionRate(video.views, video.addToCarts),
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
