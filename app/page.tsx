import Link from "next/link";
import { Icon } from "@/components/Icon";
import { HeroFascia } from "@/components/HeroFascia";
import { HourDial } from "@/components/HourDial";
import { OutletLabels } from "@/components/OutletLabels";
import { branches, site, waLink } from "@/lib/site";
import { categories, products } from "@/lib/products";
import { articles } from "@/lib/articles";

const reasons = [
  { title: "Genuine, NAFDAC-registered products", text: "We buy only from approved manufacturers and distributors, so there are no grey-market medicines on our shelves." },
  { title: "Owned and run by pharmacists", text: "A registered pharmacist supervises every branch, on every shift, including the night one." },
  { title: "Open 24 hours, 7 days", text: "Every outlet, every hour, including Sundays and public holidays. No closing time." },
  { title: "Delivery around Nsukka and Enugu", text: "Order on WhatsApp and we deliver to your home, hostel or lodge, day or night (fees vary by distance)." },
];

export default function Home() {
  return (
    <>
      <HeroFascia />

      {/* 24-HOUR DIAL */}
      <section className="section bk-sec">
        <div className="container">
          <div className="bk-head">
            <h2>No closing time.</h2>
            <p>The ring is the whole day. It is lit all the way round because every Bakay outlet is open every hour. The red hand is the time in Nsukka right now.</p>
          </div>
          <HourDial />
        </div>
      </section>

      {/* OUTLETS */}
      <section className="section bk-sec bk-concrete">
        <div className="container">
          <div className="bk-head">
            <h2>Three counters. Same hours.</h2>
            <p>Odenigbo Road is the flagship. Fen Park is new. Enugu is off Nike Lake Road. One WhatsApp number reaches all three.</p>
          </div>
          <OutletLabels />
        </div>
      </section>

      {/* BEHIND THE COUNTER */}
      <section className="section bk-sec">
        <div className="container">
          <div className="bk-head">
            <h2>Behind the counter.</h2>
            <p>A registered pharmacist runs every shift, including the night one.</p>
          </div>
          <div className="bk-care">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="ph"><img src="/media/pharmacy.jpg" alt="Pharmacist helping a customer choose a product from the shelf" /></div>
              <h3>Ask before you buy</h3>
              <p>Dosage, side effects, what is safe in pregnancy or for a child. Ask at the counter or on WhatsApp, at 3pm or 3am.</p>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="ph"><img src="/media/counter.jpg" alt="Attendant taking a payment by phone at a shop counter" style={{ objectPosition: "40% 50%" }} /></div>
              <h3>Packed before you arrive</h3>
              <p>Send your list, we confirm price and stock, then you collect without waiting. Cash, transfer or POS.</p>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="ph"><img src="/media/rider.jpg" alt="Delivery rider on a motorcycle" style={{ objectPosition: "50% 40%" }} /></div>
              <h3>Delivered, day or night</h3>
              <p>Around Nsukka, UNN and Nike Lake Road. Send your address on WhatsApp for the fee.</p>
            </figure>
          </div>
        </div>
      </section>

      {/* SHELVES */}
      <section className="section bk-sec bk-concrete">
        <div className="container">
          <div className="bk-head">
            <h2>From the shelves.</h2>
            <p>Pick a shelf, add what you need to the basket and send it on WhatsApp. We reply with prices.</p>
          </div>
          <div className="bk-shelf-links">
            {categories.map((c) => (
              <Link key={c.id} href={`/shop?category=${c.id}`} className="bk-strip">
                <span className="n">{c.name.toUpperCase()}</span>
                <span className="c">{products.filter((p) => p.category === c.id).length} items · {c.blurb}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BAKAY */}
      <section className="section bk-sec">
        <div className="container why">
          <div>
            <div className="bk-head" style={{ display: "block" }}>
              <h2>A pharmacy that knows you by name.</h2>
            </div>
            <p className="lead">Bakay is a family-owned community pharmacy led by {site.superintendent}. Good healthcare starts with genuine medicines and time to listen.</p>
            <ol className="bk-reasons">
              {reasons.map((r) => (
                <li key={r.title}><strong>{r.title}</strong><p>{r.text}</p></li>
              ))}
            </ol>
          </div>
          <div className="why-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/doctor.jpg" alt="Smiling pharmacist in a white coat" />
            <div className="photo-note">Stock photo. Replace with Pharm. Francisca Onyishi at the Odenigbo Road counter.</div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section bk-sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="bk-quotes">
            <figure><blockquote>“This is the best pharmacy in Nsukka.”</blockquote><figcaption>Google review · Odenigbo Road</figcaption></figure>
            <figure><blockquote className="s">“Neatly arranged and busy.”</blockquote><figcaption>Google review · Odenigbo Road</figcaption></figure>
          </div>
          <div className="bk-rating">
            <b>3.8</b><span className="muted">out of 5, from 4 Google reviews.</span>
            <a href={branches[0].mapsUrl} target="_blank" rel="noopener">Add your review</a>
          </div>
        </div>
      </section>

      {/* HEALTH HUB */}
      <section className="section bk-sec bk-concrete">
        <div className="container">
          <div className="bk-head">
            <h2>Advice from our pharmacists.</h2>
            <p><Link href="/health-hub">All articles in the Health Hub →</Link></p>
          </div>
          <div className="grid grid-3">
            {articles.map((a) => (
              <Link key={a.slug} href={`/health-hub/${a.slug}`} className="card card-hover article-card">
                <div className="article-meta"><span className="tag">{a.tag}</span> {a.readMins} min read</div>
                <h3>{a.title}</h3>
                <p className="muted" style={{ margin: 0 }}>{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Need something right now?</h2>
              <p>It doesn&apos;t matter what time it is. Message us your list or prescription and we&apos;ll confirm price and stock.</p>
            </div>
            <div className="btn-row">
              <a className="btn btn-wa" href={waLink("Hello Bakay Pharmacy, I need some medicines now.")} target="_blank" rel="noopener">
                <Icon name="whatsapp" size={20} /> WhatsApp us
              </a>
              <a className="btn btn-ghost-light" href={site.phoneHref}><Icon name="phone" size={20} /> {site.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
