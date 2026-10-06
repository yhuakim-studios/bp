"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { branches, fmt, lagosNow, openStatus } from "@/lib/site";
import { Icon } from "./Icon";

const toH = (t: string) => { const [h, m] = t.split(":").map(Number); return h + m / 60; };

/** Outlet cards with a 24-hour bar of today's opening window and a live "now" needle (Lagos time). */
export function OutletMeters() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { const tick = () => setNow(lagosNow(new Date())); tick(); const t = setInterval(tick, 30_000); return () => clearInterval(t); }, []);
  const nowH = now ? now.getHours() + now.getMinutes() / 60 : null;

  return (
    <div className="outlets">
      {branches.map((b, i) => {
        const today = b.hours[(now ?? new Date()).getDay()];
        const st = now ? openStatus(b) : null;
        return (
          <article className="outlet" key={b.id}>
            <div className="outlet-ph">
              {i === 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/media/store.jpg" alt={`Bakay Pharmacy storefront, ${b.area}`} loading="lazy" />
              ) : (
                <div className="outlet-map" aria-hidden="true"><span className="pin" /></div>
              )}
              {(i === 0 || b.isNew) && <span className="outlet-tag">{i === 0 ? "FLAGSHIP" : "NEW"}</span>}
            </div>
            <div className="outlet-body">
              <div><h3>{b.name}</h3><p className="muted">{b.address}</p></div>
              <span className={`status ${st?.open ? "open" : "closed"}`} style={{ visibility: st ? "visible" : "hidden" }}>{st?.label ?? "Open now"}</span>
              {today && (
                <div className="meter" role="img" aria-label={`Open today ${fmt(today.open)} to ${fmt(today.close)}`}>
                  <div className="meter-bar"><div className="meter-fill" style={{ left: `${(toH(today.open) / 24) * 100}%`, right: `${100 - (toH(today.close) / 24) * 100}%` }} /></div>
                  {nowH !== null && <div className="meter-now" style={{ left: `${(nowH / 24) * 100}%` }} />}
                  <div className="meter-ticks"><span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>12am</span></div>
                </div>
              )}
              <div className="outlet-row">
                <a href={b.mapsUrl} target="_blank" rel="noopener"><Icon name="pin" size={16} /> Directions</a>
                <Link href={`/branches#${b.id}`}>Hours &amp; services →</Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
