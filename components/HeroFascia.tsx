"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { branches, lagosNow, waLink } from "@/lib/site";
import { BakayMark } from "./BakayLogo";
import { Icon } from "./Icon";

const DOOR: Record<string, string> = { "nsukka-odenigbo": "ODENIGBO RD", "nsukka-fen-park": "FEN PARK", "enugu-nike-lake": "NIKE LAKE RD" };
const pad = (n: number) => String(n).padStart(2, "0");
const partOfDay = (h: number) => (h < 5 ? "the middle of the night" : h < 12 ? "the morning" : h < 17 ? "the afternoon" : h < 21 ? "the evening" : "late at night");
const isNight = (h: number) => h >= 19 || h < 6;

/**
 * The shop front as the hero: the white fascia with raised BAKAY / PHARMACY letters, then the glass front
 * (brand film, the three "doors", window lettering with a slide-to-order control) on a strip of Nsukka laterite.
 * After 7pm Nigerian time the sign lights up; visitors can also flip day/night themselves.
 */
export function HeroFascia() {
  const [now, setNow] = useState<Date | null>(null);
  const [manual, setManual] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(true);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const tick = () => setNow(lagosNow(new Date()));
    tick();
    const t = setInterval(tick, 20_000);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { video.current?.pause(); setPlaying(false); }
    return () => clearInterval(t);
  }, []);

  const h = now?.getHours() ?? 12;
  const night = manual ?? (now ? isNight(h) : false);
  const time = now ? `${pad(h)}:${pad(now.getMinutes())}` : "--:--";

  const toggleFilm = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <header className="bk-hero" data-sky={night ? "night" : "day"}>
      <div className="bk-fascia">
        <div className="container">
          <BakayMark animate className="bk-emblem" size={150} />
          <p className="bk-word" aria-label="Bakay Pharmacy">
            <span className="b" aria-hidden="true">BAKAY</span>
            <span className="p" aria-hidden="true">PHARMACY</span>
          </p>
          <div className="bk-clock">
            Nsukka, now<strong>{time}</strong>
            <button type="button" className="bk-skybtn" onClick={() => setManual(!night)}>{night ? "See it by day" : "See it at night"}</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="bk-front">
          <div className="bk-left">
            <div className="bk-pane">
              <video ref={video} autoPlay muted loop playsInline preload="metadata" poster="/media/poster.jpg"
                aria-label="Bakay Pharmacy film: the shop sign, a 24-hour clock, the Odenigbo Road store, a pharmacist with a customer, delivery and the three outlets">
                <source src="/media/bakay-brand-loop.mp4" type="video/mp4" />
              </video>
              <button type="button" className="bk-pause" onClick={toggleFilm}>{playing ? "Pause film" : "Play film"}</button>
            </div>
            <div className="bk-doors">
              {branches.map((b) => (
                <Link key={b.id} href={`/branches#${b.id}`} className="bk-pane bk-door">
                  <span><b>{DOOR[b.id] ?? b.area.toUpperCase()}</b>{b.city.toUpperCase()}</span>
                  <span className="on"><i />OPEN · 24H</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="bk-pane bk-vinyl">
            <h1>Open 24 hours. <em>Every day.</em></h1>
            <p className="bk-now">
              {now ? <>It&apos;s <b>{time}</b> in Nsukka, {partOfDay(h)}. All three outlets are open and a pharmacist is on duty.</> : "All three outlets are open and a pharmacist is on duty."}
            </p>
            <SlideToOrder />
            <p className="bk-alt">
              Prefer to tap? <a href={waLink("Hello Bakay Pharmacy, I'd like to order.")} target="_blank" rel="noopener">Open WhatsApp</a> or{" "}
              <Link href="/prescription">send a prescription</Link>.
            </p>
          </div>
        </div>
      </div>
      <div className="bk-kerb">
        <div className="container"><span>00:00 – 24:00</span><span>Monday to Sunday</span><span>3 outlets · Nsukka &amp; Enugu</span><span>RC 1701182 · since 2020</span></div>
      </div>
    </header>
  );
}

/** "Slide to open" sticker from the real shop door, turned into the order button. Keyboard: Enter/Space completes it. */
function SlideToOrder() {
  const track = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);
  const [anim, setAnim] = useState(false);
  const drag = useRef<{ x0: number; max: number } | null>(null);

  const finish = useCallback(() => {
    window.open(waLink("Hello Bakay Pharmacy, I'd like to order."), "_blank", "noopener");
    setTimeout(() => { setAnim(true); setPos(0); setTimeout(() => setAnim(false), 320); }, 700);
  }, []);
  const maxOf = () => (track.current ? track.current.clientWidth - 64 : 0);

  return (
    <div className="bk-slide" ref={track}>
      <div className="fill" style={{ width: pos + 60, transition: anim ? "width .3s" : undefined }} />
      <span className="txt">Slide to order on WhatsApp</span>
      <button
        type="button"
        className="knob"
        aria-label="Order on WhatsApp"
        style={{ transform: `translateX(${pos}px)`, transition: anim ? "transform .3s" : undefined }}
        onPointerDown={(e) => { drag.current = { x0: e.clientX - pos, max: maxOf() }; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { const d = drag.current; if (d) setPos(Math.max(0, Math.min(d.max, e.clientX - d.x0))); }}
        onPointerUp={() => {
          const d = drag.current; drag.current = null; if (!d) return;
          if (pos > d.max * 0.82) { setPos(d.max); finish(); } else { setAnim(true); setPos(0); setTimeout(() => setAnim(false), 260); }
        }}
        onClick={(e) => { if (e.detail === 0) { setPos(maxOf()); finish(); } }}
      >
        <Icon name="arrow" size={20} />
      </button>
    </div>
  );
}
