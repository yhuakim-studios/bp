import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Bakay Pharmacy is a pharmacist-owned community pharmacy founded in Nsukka in 2020, now serving Nsukka and Enugu from three outlets.",
};

const values = [
  { icon: "shield", title: "Integrity", text: "Genuine products only, honest prices and honest advice, even when that means telling you that you don't need to buy anything." },
  { icon: "heart", title: "Care", text: "We take time to listen, explain and follow up, because every customer is a neighbour." },
  { icon: "check", title: "Excellence", text: "Neat, well-organised stores, properly stored medicines and trained staff." },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHead crumb="About" title="Caring for Nsukka and Enugu since 2020" lead="A family-owned, pharmacist-led community pharmacy that's growing with the community it serves." />
      <section className="section">
        <div className="container why">
          <div>
            <span className="eyebrow">Our story</span>
            <h2>From one store on Odenigbo Road to three outlets</h2>
            <p>
              Bakay Pharmacy Nigeria Limited was founded in 2020 with a simple idea: people in Nsukka deserve a pharmacy where the
              medicines are genuine, the shelves are well organised and a qualified pharmacist always has time to talk.
            </p>
            <p>
              Our first store on Odenigbo Road quickly became a go-to for UNN students, staff and families. We have since opened in
              Enugu (off Nike Lake Road) and, most recently, at Fen Park in Nsukka.
            </p>
            <p className="muted" style={{ fontSize: "0.9rem" }}>[Client to expand: founding story, milestones, community work.]</p>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <div className="icon-tile" style={{ width: 64, height: 64 }}><Icon name="user" size={32} /></div>
            <h3>{site.superintendent}</h3>
            <p className="muted" style={{ marginBottom: 12 }}>Co-founder &amp; Superintendent Pharmacist</p>
            <p>
              Pharm. Francisca leads Bakay&apos;s pharmacy practice, making sure every branch meets the standards of the
              Pharmacists Council of Nigeria (PCN) and NAFDAC.
            </p>
            <p className="muted" style={{ fontSize: "0.9rem", margin: 0 }}>[Photo + short bio, qualifications and years of practice: to be supplied by client.]</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center"><span className="eyebrow">What we stand for</span><h2>Our values</h2></div>
          <div className="grid grid-3">
            {values.map((v) => (
              <div key={v.title} className="card">
                <div className="icon-tile"><Icon name={v.icon} /></div>
                <h3>{v.title}</h3>
                <p className="muted" style={{ margin: 0 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Licensed &amp; registered</span><h2>Credentials</h2></div>
          <div className="grid grid-3">
            <div className="card"><strong>Corporate Affairs Commission</strong><p className="muted" style={{ margin: 0 }}>{site.legalName}, {site.rcNumber}</p></div>
            <div className="card"><strong>Pharmacists Council of Nigeria</strong><p className="muted" style={{ margin: 0 }}>Premises licence no. [to be supplied]</p></div>
            <div className="card"><strong>NAFDAC-registered products</strong><p className="muted" style={{ margin: 0 }}>We stock only products with valid NAFDAC registration.</p></div>
          </div>
          <div className="btn-row" style={{ marginTop: 28 }}>
            <Link href="/branches" className="btn btn-primary">Visit a branch</Link>
            <Link href="/contact" className="btn btn-outline">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
