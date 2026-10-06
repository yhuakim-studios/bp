"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { BakayLogo } from "./BakayLogo";
import { useCart } from "./CartProvider";
import { site, waLink } from "@/lib/site";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/prescription", label: "Prescriptions" },
  { href: "/services", label: "Services" },
  { href: "/branches", label: "Branches" },
  { href: "/health-hub", label: "Health Hub" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <div className="topbar led" role="note" aria-label={`Open 24 hours, 7 days a week. Pharmacist on duty. Call or WhatsApp ${site.phone}.`}>
        <div className="led-run" aria-hidden="true">
          {`OPEN 24 HOURS • 7 DAYS A WEEK • PHARMACIST ON DUTY • WHATSAPP ${site.phone} • ODENIGBO RD • FEN PARK • NIKE LAKE RD • `.repeat(4)}
        </div>
      </div>
      <header className="header">
        <div className="container">
          <Link href="/" className="brand" aria-label="Bakay Pharmacy home">
            <BakayLogo />
          </Link>

          <nav className="nav" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={pathname.startsWith(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="header-cta">
            <Link href="/shop#basket" className="btn btn-outline btn-sm cart-pill" aria-label={`Order basket, ${count} items`}>
              <Icon name="cart" size={18} />
              {count > 0 && <span className="cart-count">{count}</span>}
            </Link>
            <a className="btn btn-wa btn-sm btn-call" href={waLink("Hello Bakay Pharmacy, I'd like to make an enquiry.")} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={18} /> Chat with us
            </a>
            <button className="menu-btn" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
              <Icon name={open ? "close" : "menu"} size={26} />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
        <div id="mobile-nav" className={`mobile-nav ${open ? "open" : ""}`}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <div className="btn-row">
            <a className="btn btn-primary" href={site.phoneHref}>
              <Icon name="phone" size={18} /> Call
            </a>
            <a className="btn btn-outline" href={waLink("Hello Bakay Pharmacy, I'd like to make an enquiry.")} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
