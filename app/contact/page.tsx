import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { branches, site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call, WhatsApp or message Bakay Pharmacy. Wholesale and clinic supply enquiries welcome.",
};

export default function ContactPage() {
  return (
    <>
      <PageHead crumb="Contact" title="We're here to help" lead="Call, WhatsApp or send a message. A pharmacist replies at any hour, day or night." />
      <section className="section">
        <div className="container two-col">
          <div className="card" style={{ padding: 28 }} id="wholesale">
            <h2 style={{ fontSize: "1.5rem" }}>Send us a message</h2>
            <ContactForm />
          </div>
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <a className="card card-hover" href={site.phoneHref} style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div className="icon-tile" style={{ margin: 0 }}><Icon name="phone" /></div>
              <div><strong>Call us</strong><div className="muted">{site.phone}</div></div>
            </a>
            <a className="card card-hover" href={waLink("Hello Bakay Pharmacy")} target="_blank" rel="noopener" style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div className="icon-tile" style={{ margin: 0, background: "#dcf8e6", color: "#128c4b" }}><Icon name="whatsapp" /></div>
              <div><strong>WhatsApp</strong><div className="muted">Fastest for orders &amp; prescriptions</div></div>
            </a>
            <a className="card card-hover" href={`mailto:${site.email}`} style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div className="icon-tile" style={{ margin: 0 }}><Icon name="chat" /></div>
              <div><strong>Email</strong><div className="muted">{site.email}</div></div>
            </a>
            <div className="card">
              <strong>Branches</strong>
              <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "grid", gap: 8 }}>
                {branches.map((b) => (
                  <li key={b.id} style={{ display: "flex", gap: 8 }}>
                    <Icon name="pin" size={18} />
                    <Link href={`/branches#${b.id}`}>{b.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
