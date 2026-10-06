# Bakay Pharmacy — Website Plan

Prepared by GidConsult Global · October 2026
Status: proposal + working prototype (this repository)

---

## 1. The business today

| | |
|---|---|
| Legal name | Bakay Pharmacy Nigeria Limited (CAC RC-1701182, incorporated Aug 2020) |
| Trading name | Bakay Pharmacy & Store |
| Directors | Pharm. Francisca Ifeyinwa Onyishi (Director / Secretary), Dr. Oliver Chibueze Onyishi (Director) |
| Outlets | **Nsukka – Odenigbo Road** (main store) · **Nsukka – Fen Park** (new branch) · **Enugu – Plot 1 Anike Nwanni Close, via Nike Lake Road** |
| Phone | +234 916 570 8369 |
| Hours | **24 hours, 7 days a week**, all three outlets (per GidConsult, Oct 2026; the Google listing still says 7am–10pm and must be updated) |
| Online presence | Google Maps listing (3.8★, 4 reviews: "neatly arranged and busy", "best pharmacy in Nsukka"); Facebook mentions. **The old Weebly site returns 404, so they have no working website.** |

**What this means:** customers searching "pharmacy in Nsukka" or "pharmacy near UNN" find a sparse Google listing and nothing else. The long opening hours, three outlets and the fact that a pharmacist owns the business are strong selling points that nobody can see online.

## 2. Goals for the website

1. **Get found locally.** Rank for "pharmacy Nsukka", "pharmacy near UNN", "pharmacy Nike Lake Road Enugu", "24/7 / late-night pharmacy Nsukka".
2. **Turn visits into orders.** Get people to message on WhatsApp, call, or send a prescription in one tap.
3. **Build trust.** Show the licensed pharmacist owners, PCN/NAFDAC compliance, real photos and reviews.
4. **Support growth.** The catalogue, prescription intake and branch pages must scale as more branches open.

### Success metrics (first 6 months)
- Google Business Profile linked to the site, with 25+ new reviews
- 150+ WhatsApp or phone enquiries a month that come from the site (tracked with UTM-tagged wa.me links and call clicks)
- 40+ prescription uploads a month
- Page 1 of Google for "pharmacy Nsukka"

## 3. Who uses the site

| Audience | What they need | Key page |
|---|---|---|
| UNN students and staff (Nsukka) | Cheap, quick, late-night meds; delivery to hostels and lodges | Shop, Branches |
| Families and older patients | Refills for chronic conditions (BP, diabetes); advice from a pharmacist | Prescription, Services |
| Enugu residents (Nike Lake / Trans-Ekulu) | The nearest open pharmacy, directions | Branches |
| Hospitals, clinics, patent medicine vendors | Bulk or wholesale supply enquiries | Contact (B2B form) |

## 4. Sitemap

```
/                       Home
/shop                   Product catalogue  → WhatsApp order basket
/prescription           Send a prescription (upload + details)
/services               Pharmacy services
/branches               All outlets, hours, directions
/about                  Story, pharmacist-owners, licences
/health-hub             Health tips (SEO content)
/health-hub/[slug]      Article page
/contact                Contact + wholesale / B2B enquiry
/privacy                Privacy & NDPR notice   (phase 2)
```

Global elements: sticky header with click-to-call, a floating WhatsApp button, an "Open now" badge worked out from today's hours, and a footer with all branches.

## 5. Page-by-page specification

### Home
1. **Hero:** the shop fascia, then "Open 24 hours. Every day." with a live Nsukka clock. Main button: *Order on WhatsApp*. Second button: *Send a prescription*. Live "Open now / Closed" badge.
2. **Quick actions** (4 tiles): Order medicines · Upload prescription · Find a branch · Talk to a pharmacist.
3. **Shop by category:** pain & fever, malaria, cough & cold, vitamins, baby & mother, personal care, first aid, chronic care.
4. **Why Bakay:** owned by pharmacists, genuine NAFDAC-registered products, long opening hours, 3 outlets.
5. **Branches strip** with a directions link for each.
6. **Reviews** (pulled from Google once permission is given).
7. **Latest from the Health Hub** (3 cards).
8. **Final call to action** plus WhatsApp.

### Shop (`/shop`)
- Search, category filter chips, product cards (name, pack size, category, "Rx required" badge).
- **No online payment in phase 1.** Customers add items to a basket, which builds a WhatsApp message to the chosen branch, and staff confirm price and stock. This avoids building payments and live stock sync on day one.
- Prescription-only medicines show "Requires prescription", and their button sends people to `/prescription` instead.
- Phase 2: prices, Paystack checkout and a delivery-fee calculator.

### Prescription (`/prescription`)
- Form: name, phone, branch, pickup or delivery, delivery address, photo of the prescription, notes, consent tick-box.
- Phase 1 (prototype): the form checks the inputs, builds a WhatsApp message and asks the customer to attach the photo in the chat.
- Production: a Next.js API route uploads the file to private storage (e.g. Supabase or Cloudinary signed uploads), notifies staff by WhatsApp Business API or email, and returns a reference number.
- Compliance: handle data under NDPR, retain files for a limited time only, and never show prescriptions publicly.

### Services
Prescription dispensing · Pharmacist consultation · Health checks (blood pressure, blood sugar) · Chronic-care refill reminders · Home and hostel delivery · Wholesale supply.
⚠️ *Confirm with the client which services are offered at each branch.*

### Branches
A card for each outlet: address, phone, hours, "Get directions" (Google Maps link), the services offered there, and a photo. Each branch also gets its own **LocalBusiness/Pharmacy JSON-LD** so it can appear in Google's local results.

### About
Founding story, a pharmacist-owner profile (Pharm. Francisca Onyishi), mission and values, licences (PCN premises licence number, CAC RC-1701182), and team photos.

### Health Hub
Short, locally relevant articles written or reviewed by the superintendent pharmacist, e.g. malaria prevention in the rainy season, safe storage of medicines in hot weather, how to spot fake drugs (NAFDAC number and Mas-code checks), and exam-season wellness for students. Target: 2 posts a month.

### Contact
Phone, WhatsApp, email, branch list, and a general enquiry form with an "I'm a hospital/clinic (wholesale)" option.

## 6. Design direction

- **Personality:** clean, clinical and warm. It should feel like a well-lit, well-organised store (that's what reviewers praised).
- **Colour:** deep pharmacy green `#0F5E47` (trust, health), fresh mint `#E8F5EF` for surfaces, warm amber `#F2A33A` for calls to action and "open now", ink `#13201B` for text.
- **Type:** a modern humanist sans (system UI stack in the prototype; *Plus Jakarta Sans* in production).
- **Mobile-first:** over 80% of visitors will be on Android phones on 3G/4G. The page budget is under 200 KB of JS on first load. Images are WebP with lazy loading, and nothing blocks rendering.
- **Accessibility:** WCAG AA contrast, tap targets of 44px or more, visible focus rings, alt text and semantic headings.
- **Photography:** a half-day shoot at both Nsukka stores (shelves, the pharmacist at the counter, the storefront with signage). Stock photos are placeholders only.

## 7. Technology

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19 + TypeScript** | Static and server pages are good for SEO, and it can grow into ordering and an admin area |
| Styling | Plain CSS with design tokens (custom properties) | No build dependencies; easy to restyle |
| Hosting | Vercel (Hobby → Pro) or Netlify | Free to start, global CDN, preview links for client review |
| Content | `lib/*.ts` data files in phase 1 → **Sanity** or **Payload CMS** in phase 2 | Lets staff edit products and articles themselves |
| Forms / files | Next.js Route Handlers + Supabase Storage (private bucket) | Secure prescription uploads |
| Messaging | WhatsApp click-to-chat (`wa.me`) → WhatsApp Business API (phase 2) | How Nigerians already buy from pharmacies |
| Payments (phase 2) | Paystack | Local cards, transfers, USSD |
| Analytics | Plausible or GA4 + Google Search Console | Track WhatsApp and call clicks as conversions |
| Domain | `bakaypharmacy.com.ng` or `bakaypharmacy.ng` (check availability) | Local trust signal |

## 8. SEO & local search checklist

- [ ] Claim and complete the **Google Business Profile** for all 3 branches; link each one to its `/branches#…` anchor
- [ ] `Pharmacy` JSON-LD per branch (address, geo, phone, opening hours) — included in the prototype
- [ ] Unique title and meta description per page; `sitemap.xml` and `robots.txt` — included
- [ ] Use the area names in the copy: Nsukka, UNN, Odenigbo, Fen Park, Nike Lake Road, Enugu
- [ ] Ask happy customers for reviews (QR code at the till)
- [ ] Consistent business details (name, address, phone) on Facebook, Instagram and directories (Finelib, GoAfricaOnline)

## 9. Delivery timeline (6 weeks)

| Week | Milestone |
|---|---|
| 1 | Kickoff, brand assets, confirm services, branch details and licences; photo shoot booked |
| 2 | Design sign-off (based on this prototype); content drafting |
| 3–4 | Build: all pages, catalogue data (top 150 products), prescription upload with storage |
| 5 | Content load, SEO setup, Google Business Profile, analytics; client review on preview URL |
| 6 | Launch, staff training (handling WhatsApp orders and prescriptions), 30-day support |

**Phase 2 (months 2–4):** prices and Paystack checkout, delivery zones, CMS, refill reminders by SMS or WhatsApp, and a staff dashboard for prescriptions.

## 10. Open questions for the client

1. Is the Enugu (Nike Lake Road) outlet still trading? What are the exact hours for each branch?
2. Does each branch have its own WhatsApp number, or is there one central line?
3. Which services are offered (health checks, delivery radius and fees)?
4. PCN premises licence numbers for the "Licences" section.
5. Logo files and brand colours (if any exist).
6. Who will reply to WhatsApp orders, and what is the target response time?
7. Is there appetite for online payment now, or later?

## 11. Prototype — what's in this repo

Run `npm install && npm run dev`, then open http://localhost:3000.

- All pages in the sitemap (except `/privacy`) are implemented with realistic content.
- The basket in the shop builds a pre-filled WhatsApp order addressed to the chosen branch.
- The prescription form checks the inputs and hands off to WhatsApp.
- The "Open now" badge is calculated live from the branch hours.
- SEO: per-page metadata, Pharmacy JSON-LD, `sitemap.xml`, `robots.txt`.
- Business data lives in `lib/site.ts`, products in `lib/products.ts` and articles in `lib/articles.ts`. Edit those files to update the content.

**Placeholders to replace before launch:** product list (sample data, no prices), the Fen Park street address, photos, the email address, and licence numbers.
