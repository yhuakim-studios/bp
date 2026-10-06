import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Icon, type IconName } from "@/components/Icon";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pharmacy Services",
  description: "Prescription dispensing, pharmacist consultations, blood pressure and blood sugar checks, refill reminders, delivery and wholesale supply at Bakay Pharmacy, Nsukka & Enugu.",
};

// TODO (client): confirm which services each branch offers.
const services: { id: string; icon: IconName; title: string; text: string; points: string[] }[] = [
  { id: "dispensing", icon: "pill", title: "Prescription dispensing", text: "Accurate dispensing of prescriptions from any hospital or clinic, with clear instructions on how to take each medicine.", points: ["Checked by a registered pharmacist", "Generic alternatives explained", "Upload in advance to skip the queue"] },
  { id: "consultation", icon: "stethoscope", title: "Pharmacist consultation", text: "Private, free advice for minor ailments, medicine interactions and side effects, or when you're not sure whether you need a doctor.", points: ["No appointment needed", "Confidential", "Referral to a doctor when needed"] },
  { id: "health-checks", icon: "activity", title: "Health checks", text: "Quick in-store checks to help you keep track of your health between doctor visits.", points: ["Blood pressure", "Blood sugar (glucose)", "Malaria rapid test (RDT)"] },
  { id: "chronic-care", icon: "heart", title: "Chronic-care refills", text: "Living with hypertension, diabetes or asthma? We'll keep your regular medicines in stock and remind you before you run out.", points: ["Refill reminders on WhatsApp", "Medicine reviews", "Same brand every time"] },
  { id: "delivery", icon: "truck", title: "Home & hostel delivery", text: "Order on WhatsApp and we'll deliver around Nsukka, including UNN hostels and nearby lodges.", points: ["Same-day delivery on most orders", "Pay on delivery or by transfer", "Fees vary by distance"] },
  { id: "wholesale", icon: "building", title: "Wholesale & institutional supply", text: "Reliable supply of genuine products for clinics, hospitals, schools and patent medicine vendors.", points: ["Competitive trade pricing", "Invoices & receipts", "Scheduled deliveries"] },
];

export default function ServicesPage() {
  return (
    <>
      <PageHead crumb="Services" title="More than a medicine shop" lead="Our pharmacists offer professional services that help you stay well, not just get well." />
      <section className="section">
        <div className="container grid grid-3">
          {services.map((s) => (
            <article id={s.id} key={s.id} className="card" style={{ display: "flex", flexDirection: "column", scrollMarginTop: 100 }}>
              <div className="icon-tile"><Icon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "grid", gap: 6 }}>
                {s.points.map((p) => (
                  <li key={p} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: "0.93rem" }}>
                    <Icon name="check" size={18} className="" /> {p}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "auto" }}>
                {s.id === "dispensing" ? (
                  <Link href="/prescription" className="btn btn-outline btn-sm">Upload prescription</Link>
                ) : s.id === "wholesale" ? (
                  <Link href="/contact#wholesale" className="btn btn-outline btn-sm">Make an enquiry</Link>
                ) : (
                  <a href={waLink(`Hello Bakay Pharmacy, I'd like to ask about ${s.title.toLowerCase()}.`)} target="_blank" rel="noopener" className="btn btn-outline btn-sm">
                    Ask on WhatsApp
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
