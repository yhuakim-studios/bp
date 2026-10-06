import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Icon } from "@/components/Icon";
import { OpenStatus } from "@/components/OpenStatus";
import { branches, days, fmt, is24h, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Branches & Opening Hours",
  description: "Find Bakay Pharmacy in Nsukka (Odenigbo Road, Fen Park) and Enugu (Nike Lake Road). Opening hours, phone numbers and directions.",
};

export default function BranchesPage() {
  return (
    <>
      <PageHead crumb="Branches" title="Find a Bakay branch" lead="Three outlets, all open 24 hours, 7 days a week." />
      <section className="section">
        <div className="container grid grid-3">
          {branches.map((b) => (
            <article key={b.id} id={b.id} className="card branch-card" style={{ scrollMarginTop: 100 }}>
              <a className="map-placeholder" href={b.mapsUrl} target="_blank" rel="noopener" aria-label={`Open ${b.name} in Google Maps`}>
                <span style={{ display: "grid", placeItems: "center", gap: 6, fontWeight: 700 }}>
                  <Icon name="pin" size={34} />
                  View on map
                </span>
              </a>
              <header>
                <div>
                  <h3 style={{ marginBottom: 4 }}>{b.name}</h3>
                  {b.note && <span className="tag">{b.note}</span>} {b.isNew && <span className="pill-new">New</span>}
                </div>
                <OpenStatus branchId={b.id} />
              </header>
              <dl>
                <dt>Address</dt><dd>{b.address}</dd>
                <dt>Phone</dt><dd><a href={`tel:${b.phone.replace(/\s/g, "")}`}>{b.phone}</a></dd>
                <dt>Services</dt><dd>{b.services.join(" · ")}</dd>
              </dl>
              <details>
                <summary style={{ cursor: "pointer", fontWeight: 700 }}>Opening hours</summary>
                <table className="hours-table" style={{ marginTop: 8 }}>
                  <tbody>
                    {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                      const h = b.hours[d];
                      return (
                        <tr key={d}>
                          <td>{days[d]}</td>
                          <td>{h ? (is24h(h) ? "Open 24 hours" : `${fmt(h.open)} – ${fmt(h.close)}`) : "Closed"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </details>
              <div className="btn-row" style={{ marginTop: "auto" }}>
                <a className="btn btn-primary btn-sm" href={b.mapsUrl} target="_blank" rel="noopener"><Icon name="pin" size={18} /> Directions</a>
                <a className="btn btn-outline btn-sm" href={waLink(`Hello Bakay Pharmacy (${b.name}), `, b.whatsapp)} target="_blank" rel="noopener"><Icon name="whatsapp" size={18} /> WhatsApp</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
