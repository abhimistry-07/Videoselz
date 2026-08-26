import type { VideoAnalytics } from "@/types/analytics";
import styles from "./VideoAnalyticsTable.module.css";
import { calculateConversionRate, formatPercentage } from "../../../utils";

interface Props {
  videos: VideoAnalytics[];
}

interface TableRow {
  id: number;
  title: string;
  views: number;
  clicks: number;
  addToCarts: number;
  conversionRateLabel: string;
}

function buildTableRows(videos: VideoAnalytics[]): TableRow[] {
  return videos.map((video) => ({
    id: video.id,
    title: video.title,
    views: video.views,
    clicks: video.clicks,
    addToCarts: video.addToCarts,
    conversionRateLabel: formatPercentage(
      calculateConversionRate(video.views, video.addToCarts),
    ),
  }));
}

export default function VideoAnalyticsTable({ videos }: Props) {
  if (videos.length === 0) {
    return <div className={styles.emptyState}>No video data available.</div>;
  }

  const rows = buildTableRows(videos);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th className={styles.numericCell}>Views</th>
            <th className={styles.numericCell}>Clicks</th>
            <th className={styles.numericCell}>Add To Cart</th>
            <th className={styles.numericCell}>Conversion Rate</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td className={styles.numericCell}>
                {row.views.toLocaleString()}
              </td>
              <td className={styles.numericCell}>
                {row.clicks.toLocaleString()}
              </td>
              <td className={styles.numericCell}>
                {row.addToCarts.toLocaleString()}
              </td>
              <td className={styles.numericCell}>{row.conversionRateLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
