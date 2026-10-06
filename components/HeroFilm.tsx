"use client";

import { useEffect, useRef, useState } from "react";
import { branches, openStatus } from "@/lib/site";

/** The Remotion brand film playing in the "shop window", with the real storefront photo and a live open/closed badge. */
export function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [status, setStatus] = useState<ReturnType<typeof openStatus> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pause();
      setPlaying(false);
    }
    const tick = () => setStatus(openStatus(branches[0]));
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <div className="film-window">
      <div className="film-screen">
        <video ref={ref} autoPlay muted loop playsInline preload="metadata" poster="/media/poster.jpg"
          aria-label="Bakay Pharmacy brand film: the logo, the Odenigbo Road store, a pharmacist with a customer, delivery and the three outlets">
          <source src="/media/bakay-brand-loop.mp4" type="video/mp4" />
        </video>
        <button type="button" className="film-toggle" onClick={toggle}>{playing ? "Pause film" : "Play film"}</button>
      </div>
      <figure className="polaroid">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/store.jpg" alt="Bakay Pharmacy storefront on Odenigbo Road, Nsukka" width={680} height={510} />
        <figcaption>Odenigbo Rd, Nsukka</figcaption>
      </figure>
      <div className={`float-badge ${status?.open ? "is-open" : "is-closed"}`} style={{ visibility: status ? "visible" : "hidden" }}>
        <span className="dot" />
        <div><strong>{status?.open ? "Open now" : "Closed now"}</strong><span>{status?.label.replace(/^(Open now|Closed) · /, "")}</span></div>
      </div>
    </div>
  );
}
