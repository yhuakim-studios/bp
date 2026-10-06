"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/site";
import { Icon } from "./Icon";

/** Floating WhatsApp button. Hidden while the hero (which has its own order control) is on screen. */
export function WaFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 640);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a className={`wa-fab${show ? " show" : ""}`} href={waLink("Hello Bakay Pharmacy, I'd like to order / ask about a medicine.")}
      target="_blank" rel="noopener" aria-label="Chat with Bakay Pharmacy on WhatsApp" tabIndex={show ? 0 : -1}>
      <Icon name="whatsapp" size={24} />
      <span>Order on WhatsApp</span>
    </a>
  );
}
