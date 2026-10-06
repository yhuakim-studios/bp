"use client";

import { useEffect, useState } from "react";
import { lagosNow } from "@/lib/site";

const MOMENTS = [
  { h: 2, t: "02:00", title: "A fever in the hostel", text: "Walk in, or send a WhatsApp message and a pharmacist replies." },
  { h: 7.5, t: "07:30", title: "A refill before lectures", text: "Your monthly BP or diabetes medicines, packed and waiting." },
  { h: 13, t: "13:00", title: "A lunch-break pickup", text: "Order from the office and collect in five minutes." },
  { h: 21, t: "21:00", title: "A child's cough after dark", text: "ORS, paediatric syrups and advice when the clinics are shut." },
];
const C = 200, R = 160;
const A = (h: number) => (h / 24) * Math.PI * 2 - Math.PI / 2;
const pad = (n: number) => String(n).padStart(2, "0");

/** 24-hour dial: the open ring is lit all the way round; the red hand is the time in Nsukka now. */
export function HourDial() {
  const [hours, setHours] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => { const n = lagosNow(new Date()); setHours(n.getHours() + n.getMinutes() / 60); };
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);
  const near = hours === null ? null : MOMENTS.reduce((best, m) => {
    const d = Math.min(Math.abs(m.h - hours), 24 - Math.abs(m.h - hours));
    return d < best.d ? { m, d } : best;
  }, { m: MOMENTS[0], d: 99 }).m;

  return (
    <div className="bk-hours">
      <svg className="bk-dial" viewBox="0 0 400 400" role="img" aria-label="24-hour clock: open all 24 hours">
        <circle className="face" cx={C} cy={C} r={R + 26} />
        <circle cx={C} cy={C} r={R} fill="none" stroke="#A9CC2E" strokeWidth={26} />
        <circle cx={C} cy={C} r={R} fill="none" stroke="#7E9A1B" strokeWidth={26} strokeDasharray={`2 ${(2 * Math.PI * R / 24 - 2).toFixed(2)}`} transform={`rotate(-90 ${C} ${C})`} />
        {Array.from({ length: 24 }, (_, h) => {
          const a = A(h), big = h % 6 === 0;
          return (
            <g key={h}>
              <line className="tick" x1={C + Math.cos(a) * (R - 22)} y1={C + Math.sin(a) * (R - 22)} x2={C + Math.cos(a) * (R - (big ? 42 : 32))} y2={C + Math.sin(a) * (R - (big ? 42 : 32))} strokeWidth={big ? 3 : 1.5} />
              {big && <text className="lbl" x={C + Math.cos(a) * (R - 62)} y={C + Math.sin(a) * (R - 62) + 5} textAnchor="middle">{pad(h)}</text>}
            </g>
          );
        })}
        {MOMENTS.map((m) => <circle key={m.t} cx={C + Math.cos(A(m.h)) * R} cy={C + Math.sin(A(m.h)) * R} r={7} fill="#fff" stroke="#0E1A2B" strokeWidth={2.5} />)}
        {hours !== null && (
          <g transform={`rotate(${(hours / 24) * 360} ${C} ${C})`}>
            <line x1={C} y1={C} x2={C} y2={C - R + 52} stroke="#A83C46" strokeWidth={6} strokeLinecap="round" />
          </g>
        )}
        <circle cx={C} cy={C} r={10} fill="#A83C46" />
        <text x={C} y={C + 44} textAnchor="middle" className="open">OPEN</text>
      </svg>
      <ol className="bk-moments">
        {MOMENTS.map((m) => (
          <li key={m.t} className={near?.t === m.t ? "near" : undefined}>
            <span className="t">{m.t}</span>
            <div><strong>{m.title}</strong><p>{m.text}</p></div>
          </li>
        ))}
      </ol>
    </div>
  );
}
