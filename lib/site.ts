// Central business data. Edit this file to update phone numbers, branches and hours site-wide.
// Items marked TODO need confirmation from the client before launch.

export type Hours = { open: string; close: string } | null; // 24h "HH:MM"; null = closed

export type Branch = {
  id: string;
  name: string;
  area: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  whatsapp: string; // digits only, international format
  hours: Hours[]; // index 0 = Sunday … 6 = Saturday
  services: string[];
  mapsUrl: string;
  geo?: { lat: number; lng: number };
  isNew?: boolean;
  note?: string;
};

const daily = (open: string, close: string): Hours[] => Array.from({ length: 7 }, () => ({ open, close }));

export const site = {
  name: "Bakay Pharmacy",
  legalName: "Bakay Pharmacy Nigeria Limited",
  rcNumber: "RC 1701182",
  tagline: "Genuine medicines. Caring pharmacists. Open 24 hours, 7 days a week.",
  url: "https://www.bakaypharmacy.com.ng", // TODO: confirm domain
  phone: "+234 916 570 8369",
  phoneHref: "tel:+2349165708369",
  whatsapp: "2349165708369", // TODO: confirm this line is on WhatsApp
  email: "hello@bakaypharmacy.com.ng", // TODO: placeholder
  superintendent: "Pharm. Francisca Ifeyinwa Onyishi",
  social: {
    facebook: "https://www.facebook.com/", // TODO
    instagram: "https://www.instagram.com/", // TODO
  },
};

export const branches: Branch[] = [
  {
    id: "nsukka-odenigbo",
    name: "Nsukka — Odenigbo Road",
    area: "Odenigbo",
    city: "Nsukka",
    state: "Enugu",
    address: "Odenigbo Road, Nsukka, Enugu State",
    phone: site.phone,
    whatsapp: site.whatsapp,
    hours: daily("00:00", "24:00"),
    services: ["Prescriptions", "Pharmacist consultation", "Health checks", "Delivery to UNN & environs"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bakay+pharmacy+and+Store+Odenigbo+road+Nsukka",
    geo: { lat: 6.8542535, lng: 7.3914855 },
    note: "Main store",
  },
  {
    id: "nsukka-fen-park",
    name: "Nsukka — Fen Park",
    area: "Fen Park",
    city: "Nsukka",
    state: "Enugu",
    address: "Fen Park, Nsukka, Enugu State", // TODO: full street address
    phone: site.phone,
    whatsapp: site.whatsapp,
    hours: daily("00:00", "24:00"),
    services: ["Prescriptions", "Pharmacist consultation", "Personal care & baby store"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fen+Park+Nsukka",
    isNew: true,
  },
  {
    id: "enugu-nike-lake",
    name: "Enugu — Nike Lake Road",
    area: "Nike Lake Road",
    city: "Enugu",
    state: "Enugu",
    address: "Plot 1, Anike Nwanni Close, via Nike Lake Road, Enugu",
    phone: site.phone,
    whatsapp: site.whatsapp,
    hours: daily("00:00", "24:00"),
    services: ["Prescriptions", "Pharmacist consultation", "Wholesale enquiries"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Anike+Nwanni+Close+Nike+Lake+Road+Enugu",
  },
];

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Current time in Lagos (UTC+1, no DST). */
export function lagosNow(d = new Date()) {
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  return new Date(utc + 60 * 60000);
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** True when a day runs midnight to midnight. */
export const is24h = (h: { open: string; close: string }) => h.open === "00:00" && h.close === "24:00";

export function openStatus(branch: Branch, d = new Date()) {
  const now = lagosNow(d);
  const today = branch.hours[now.getDay()];
  if (today && is24h(today)) return { open: true, label: "Open 24 hours" };
  const mins = now.getHours() * 60 + now.getMinutes();
  if (today && mins >= toMin(today.open) && mins < toMin(today.close)) {
    return { open: true, label: `Open now · closes ${fmt(today.close)}` };
  }
  if (today && mins < toMin(today.open)) return { open: false, label: `Closed · opens ${fmt(today.open)}` };
  const tomorrow = branch.hours[(now.getDay() + 1) % 7];
  return { open: false, label: tomorrow ? `Closed · opens ${fmt(tomorrow.open)} tomorrow` : "Closed" };
}

export function fmt(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
}

export function waLink(message: string, number = site.whatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
