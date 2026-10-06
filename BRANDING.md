# Bakay Pharmacy: brand and site direction (October 2026, v2)

## The idea

The website is the shop. Everything on the page comes from Bakay's own street front on Odenigbo Road and from pharmacy vernacular, not from a website template:

| On the street | On the site |
|---|---|
| Scrolling LED sign in the window | LED strip at the top of every page (Doto dot-matrix font, warm white, no glow): "OPEN 24 HOURS • 7 DAYS A WEEK • PHARMACIST ON DUTY" |
| White fascia with raised crimson BAKAY and sky-blue PHARMACY letters | Home hero: the same fascia, with extruded letters that cast a shadow. At night (7pm–6am Nigerian time) the sign switches to its night colours (no glow effects). Visitors can flip day/night |
| Glass shop front with aluminium frames, "SLIDE TO OPEN" sticker on the door | The brand film plays behind the glass; three panes show the outlets "OPEN · 24H"; the order button is a slide-to-open control |
| Nsukka red laterite at the kerb | A laterite strip under the hero with the hours and RC number |
| Dispensing labels on every medicine | Each outlet is printed as a dispensing label (hours, directions, address, tel) |
| Lime-green shelving inside | Shop categories and products sit on lime shelf edges |
| Prescription pad | The prescription form is a ℞ pad with ruled lines |

**Bakay is open 24 hours, 7 days a week at all three outlets.** That is the main message: the hero says it, the 24-hour dial shows it (lit all the way round with a live "now" hand), and the JSON-LD tells Google (`opens 00:00`, `closes 23:59`, every day).

## Logo

No logo file exists online, so the emblem is redrawn from the sign photo: a white disc, a red ring open on the right, a green arc, and a blue **P** over a green **B**. Files: `public/bakay-mark.svg`, `components/BakayLogo.tsx`. **Ask the owner for the original logo file and confirm the redraw.**

## Colour

| Token | Hex | Source |
|---|---|---|
| `--crimson` | `#A83C46` (muted from the sign's brighter red) | BAKAY letters |
| `--sky` | `#3A86C8` (text-safe `#1F69AC`) | PHARMACY letters |
| emblem green | `#2E9B57` | emblem ring |
| `--lime` | `#A9CC2E` | interior shelving |
| `--laterite` | `#B0603A` | the red earth in front of the shop |
| ink | `#0E1A2B` | night sky / text |

## Type

- **Archivo**, variable, at 125% width and weight 900: wide, heavy capitals like the raised sign letters
- **Instrument Sans** for reading
- **IBM Plex Mono** for anything that would be printed by a label printer or till: hours, addresses, order slips
- **Doto** for the LED strip only

All four are self-hosted in `app/fonts/` (`next/font/local`).

## Photos (`public/media/`)

| File | What | Source / licence |
|---|---|---|
| `store.jpg` | Real Bakay storefront, Odenigbo Road | Google Maps business photo. Ask the owner for a high-res original or permission. |
| `pharmacy.jpg` | Pharmacist with customer | Unsplash `uNawp6qgpcE` (Ninthgrid, Lagos) |
| `doctor.jpg` | Pharmacist portrait | Unsplash `TPT4pevJEmQ` (Ato Aikins, Accra) |
| `counter.jpg` | Counter payment | Unsplash `H1KbBGUs4bM` (Ali Mkumbwa) |
| `rider.jpg` | Delivery rider | Unsplash `079sJy679Zw` (Habila Mazawaje, Abuja) |

Best next step: a half-day shoot at Odenigbo Road, ideally at night with the sign lit.

## Brand film (Remotion)

`public/media/bakay-brand-loop.mp4`, 15 s, 1280×720, about 815 KB. Scenes: the fascia with the LED strip → a 24-hour dial sweeping a full day ("We're open.") → storefront → pharmacist → WhatsApp delivery "day or night" → the sign at night with "OPEN 24 HRS × 7 DAYS". Source in `../video` (`npx remotion studio`; render with `npx remotion render BakayBrandLoop out/bakay-brand-loop.mp4 --crf=28`).

## Motion

Emblem draws itself on load; LED strip scrolls; sign switches to night colours after 7pm; dial hand follows Nigerian time; photos zoom slowly on hover; slide-to-order. All of it stops for `prefers-reduced-motion`.

## To confirm with the client

- Original logo file
- Update the Google Business Profile hours to 24 hours (it still shows 7am–10pm)
- Delivery areas and fees at night
- Permission to use the storefront photo, or a new shoot
