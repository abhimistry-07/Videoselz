// "use client";

// import { useEffect, useState } from "react";
// import DashboardLayout from "@/components/layout/DashboardLayout";
// import VideoAnalyticsTable from "@/components/analytics/VideoAnalyticsTable";
// import Pagination from "@/components/analytics/Pagination";
// import type { VideoAnalytics } from "@/types/analytics";
// import { getVideoAnalytics } from "@/lib/api";

// const PAGE_LIMIT = 10;

// export default function Home() {
//   const [videos, setVideos] = useState<VideoAnalytics[]>([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchData(page);
//   }, [page]);

//   async function fetchData(pageToFetch: number) {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getVideoAnalytics(pageToFetch, PAGE_LIMIT);
//       setVideos(response.data);
//       setTotal(response.total);
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Failed to load analytics data",
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <DashboardLayout>
//       {loading && <p>Loading analytics...</p>}
//       {error && <p role="alert">Error: {error}</p>}
//       {!loading && !error && (
//         <>
//           <VideoAnalyticsTable videos={videos} />
//           <Pagination
//             page={page}
//             limit={PAGE_LIMIT}
//             total={total}
//             onPageChange={setPage}
//           />
//         </>
//       )}
//     </DashboardLayout>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VideoAnalyticsTable from "@/components/analytics/VideoAnalyticsTable";
import Pagination from "@/components/analytics/Pagination";
import SimulateTrafficButton from "@/components/analytics/SimulateTrafficButton";
import { getVideoAnalytics } from "@/lib/api";
import type { VideoAnalytics } from "@/types/analytics";
import SummaryCards from "@/components/analytics/SummaryCards";

const PAGE_LIMIT = 10;

export default function Home() {
  const [videos, setVideos] = useState<VideoAnalytics[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  async function fetchData(pageToFetch: number) {
    setLoading(true);
    setError(null);
    try {
      const response = await getVideoAnalytics(pageToFetch, PAGE_LIMIT);
      setVideos(response.data);
      setTotal(response.total);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load analytics data",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <SimulateTrafficButton onEventCreated={() => fetchData(page)} />
      {loading && <p>Loading analytics...</p>}
      {error && <p role="alert">Error: {error}</p>}
      {!loading && !error && (
        <>
          <SummaryCards videos={videos} totalVideos={total} />
          <VideoAnalyticsTable videos={videos} />
          <Pagination
            page={page}
            limit={PAGE_LIMIT}
            total={total}
            onPageChange={setPage}
          />
        </>
      )}
    </DashboardLayout>
  );
}
