/** Bakay emblem + wordmark, redrawn from the Odenigbo Road shop sign (crimson BAKAY, sky-blue PHARMACY, red/green ring with a P-B monogram). */
export function BakayMark({ size = 40, animate = false, className = "" }: { size?: number; animate?: boolean; className?: string }) {
  return (
    <svg className={`mark${animate ? " mark-anim" : ""} ${className}`} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="#fff" />
      <path className="ring" pathLength={200} d="M80.6 21.8 A41 41 0 1 0 80.6 78.2" fill="none" stroke="#A83C46" strokeWidth="7.5" strokeLinecap="round" />
      <path className="arc" pathLength={40} d="M87.5 33 A41 41 0 0 1 87.5 67" fill="none" stroke="#2E9B57" strokeWidth="7.5" strokeLinecap="round" />
      <path className="lb" d="M40 24 h20 a12.5 12.5 0 0 1 7.5 22.5 a14 14 0 0 1 -7.5 27.5 h-20 z" fill="#2E9B57" />
      <g className="lp">
        <path d="M27 21 h22 a14.5 14.5 0 0 1 0 29 h-9 v27 h-13 z" fill="#3A86C8" stroke="#fff" strokeWidth="3.5" strokeLinejoin="round" paintOrder="stroke" />
        <path d="M40 31 v9 h8 a4.5 4.5 0 0 0 0 -9 z" fill="#fff" />
      </g>
    </svg>
  );
}

export function BakayLogo({ light = false }: { light?: boolean }) {
  return (
    <span className={`lockup${light ? " lockup-light" : ""}`}>
      <BakayMark />
      <span className="lockup-w">
        <span className="lockup-b">BAKAY</span>
        <span className="lockup-p">PHARMACY</span>
      </span>
    </span>
  );
}
