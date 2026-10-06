import { branches, site, waLink } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");
const SERVES: Record<string, string> = {
  "nsukka-odenigbo": "Odenigbo, UNN, Nsukka town",
  "nsukka-fen-park": "Fen Park, Obukpa, Nsukka",
  "enugu-nike-lake": "Nike Lake Rd, Trans-Ekulu, Abakpa",
};

/** Each outlet printed as a pharmacy dispensing label. */
export function OutletLabels() {
  return (
    <div className="bk-labels">
      {branches.map((b, i) => (
        <article className="bk-label" key={b.id} id={`label-${b.id}`}>
          <div className="top"><span>BAKAY PHARMACY NIG. LTD</span><span>No. {pad(i + 1)}/{pad(branches.length)}</span></div>
          {b.isNew && <span className="new">NEW OUTLET</span>}
          {i === 0 && (
            <figure className="photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/store.jpg" alt="The Bakay Pharmacy storefront on Odenigbo Road, Nsukka" width={680} height={510} />
              <figcaption>Photo on file · flagship store</figcaption>
            </figure>
          )}
          <div className="body">
            <h3>{b.area === "Odenigbo" ? "Odenigbo Road" : b.area}<small>{b.city.toUpperCase()}{i === 0 ? " · FLAGSHIP" : ""}</small></h3>
            <dl>
              <dt>Hours</dt><dd><b>00:00–24:00</b>, Mon–Sun</dd>
              <dt>Directions</dt><dd>Walk in at any hour. No appointment.</dd>
              <dt>Address</dt><dd>{b.address}</dd>
              <dt>Serves</dt><dd>{SERVES[b.id] ?? b.city}</dd>
              <dt>Tel</dt><dd>{site.phone}</dd>
            </dl>
            <div className="acts">
              <a href={b.mapsUrl} target="_blank" rel="noopener">Directions ↗</a>
              <a className="wa" href={waLink(`Hello Bakay Pharmacy (${b.area}), `)} target="_blank" rel="noopener">WhatsApp ↗</a>
            </div>
          </div>
          <div className="warn"><span>Pharmacist on duty</span><span>24/7</span></div>
        </article>
      ))}
    </div>
  );
}
