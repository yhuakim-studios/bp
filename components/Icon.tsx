// Lightweight inline icon set (stroke icons, 24px grid). No icon library needed.
type Props = { name: IconName; size?: number; className?: string };

export type IconName =
  | "cross" | "pill" | "upload" | "pin" | "chat" | "phone" | "clock" | "shield" | "truck" | "heart"
  | "baby" | "thermo" | "bug" | "drop" | "bandage" | "sparkle" | "search" | "cart" | "menu" | "close"
  | "whatsapp" | "check" | "stethoscope" | "building" | "book" | "arrow" | "user" | "activity";

const paths: Record<IconName, React.ReactNode> = {
  cross: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />,
  pill: <><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)" /><path d="M8.5 8.5l7 7" /></>,
  upload: <><path d="M12 16V4" /><path d="M7 9l5-5 5 5" /><path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" /></>,
  pin: <><path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  chat: <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  truck: <><path d="M3 6h11v10H3z" /><path d="M14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />,
  baby: <><circle cx="12" cy="8" r="4" /><path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M10.5 8h.01M13.5 8h.01" /></>,
  thermo: <><path d="M14 14.8V5a2 2 0 10-4 0v9.8a4 4 0 104 0z" /><path d="M12 9v7" /></>,
  bug: <><ellipse cx="12" cy="13" rx="4" ry="6" /><path d="M12 7V4M8 9L5 7M16 9l3-2M8 13H4M16 13h4M8 17l-3 2M16 17l3 2" /></>,
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" />,
  bandage: <><rect x="2" y="8" width="20" height="8" rx="4" transform="rotate(-45 12 12)" /><path d="M10.5 10.5h.01M13.5 13.5h.01M13.5 10.5h.01M10.5 13.5h.01" /></>,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  cart: <><path d="M3 4h2l2.4 11h10.2L20 8H6.2" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  whatsapp: <><path d="M20.5 12a8.5 8.5 0 01-12.6 7.4L3.5 20.5l1.1-4.3A8.5 8.5 0 1120.5 12z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a5 5 0 01-2.8-2.8l.8-1-1-2z" /></>,
  check: <path d="M5 12l5 5 9-10" />,
  stethoscope: <><path d="M6 3v6a4 4 0 008 0V3" /><path d="M10 13v2a5 5 0 0010 0v-2" /><circle cx="20" cy="11" r="2" /></>,
  building: <><path d="M4 21V5l8-2v18M12 8l8 2v11M4 21h16" /><path d="M8 8v.01M8 12v.01M8 16v.01M16 13v.01M16 17v.01" /></>,
  book: <><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z" /><path d="M4 19V5" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  activity: <path d="M3 12h4l3-8 4 16 3-8h4" />,
};

export function Icon({ name, size = 22, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

export const categoryIcon: Record<string, IconName> = {
  "pain-fever": "thermo",
  malaria: "bug",
  "cough-cold": "drop",
  vitamins: "sparkle",
  "baby-mother": "baby",
  "personal-care": "heart",
  "first-aid": "bandage",
  "chronic-care": "activity",
};
