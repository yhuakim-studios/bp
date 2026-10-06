"use client";

import { useEffect, useState } from "react";
import { branches, openStatus } from "@/lib/site";

/** Live "Open now / Closed" badge. Renders nothing on the server to avoid hydration mismatch. */
export function OpenStatus({ branchId }: { branchId: string }) {
  const branch = branches.find((b) => b.id === branchId)!;
  const [status, setStatus] = useState<ReturnType<typeof openStatus> | null>(null);

  useEffect(() => {
    const tick = () => setStatus(openStatus(branch));
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, [branch]);

  if (!status) return <span className="status open" style={{ visibility: "hidden" }}>Open now</span>;
  return <span className={`status ${status.open ? "open" : "closed"}`}>{status.label}</span>;
}
