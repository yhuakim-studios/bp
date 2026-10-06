"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { categories, products } from "@/lib/products";
import { branches, waLink } from "@/lib/site";
import { Icon, categoryIcon } from "./Icon";
import { useCart } from "./CartProvider";

export function ShopClient() {
  const params = useSearchParams();
  const [cat, setCat] = useState<string>(params.get("category") ?? "all");
  const [q, setQ] = useState("");
  const [branchId, setBranchId] = useState(branches[0].id);
  const { cart, add, remove, clear, count } = useCart();

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter(
      (p) => (cat === "all" || p.category === cat) && (!term || p.name.toLowerCase().includes(term)),
    );
  }, [cat, q]);

  const basket = Object.entries(cart)
    .map(([id, qty]) => ({ p: products.find((x) => x.id === id), qty }))
    .filter((x): x is { p: (typeof products)[number]; qty: number } => Boolean(x.p));

  const branch = branches.find((b) => b.id === branchId)!;
  const message =
    `Hello Bakay Pharmacy (${branch.name}), I'd like to order:\n` +
    basket.map(({ p, qty }) => `• ${qty} x ${p.name} (${p.pack})`).join("\n") +
    `\n\nPlease confirm price and availability. Thank you.`;

  return (
    <div className="shop-layout">
      <div>
        <label className="search">
          <Icon name="search" />
          <span className="sr-only">Search products</span>
          <input type="search" placeholder="Search e.g. paracetamol, vitamin C…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <div className="chips" role="group" aria-label="Filter by category">
          <button className="chip-btn" aria-pressed={cat === "all"} onClick={() => setCat("all")}>All</button>
          {categories.map((c) => (
            <button key={c.id} className="chip-btn" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.name}
            </button>
          ))}
        </div>

        <p className="muted" style={{ fontSize: "0.9rem" }} aria-live="polite">
          {list.length} product{list.length === 1 ? "" : "s"}
        </p>

        <div className="grid grid-3">
          {list.map((p) => {
            const qty = cart[p.id] ?? 0;
            return (
              <article key={p.id} className="card product">
                <div className="product-img"><Icon name={categoryIcon[p.category]} size={40} /></div>
                <div>
                  <h3>{p.name}</h3>
                  <div className="pack">{p.pack}</div>
                </div>
                <div className="meta">
                  {p.rx ? <span className="tag tag-rx">Rx required</span> : <span className="tag">{categories.find((c) => c.id === p.category)?.name}</span>}
                  {p.rx ? (
                    <Link className="btn btn-outline btn-sm" href="/prescription">Upload Rx</Link>
                  ) : qty === 0 ? (
                    <button className="btn btn-primary btn-sm" onClick={() => add(p.id)}>Add</button>
                  ) : (
                    <span className="qty">
                      <button onClick={() => remove(p.id)} aria-label={`Remove one ${p.name}`}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => add(p.id)} aria-label={`Add one ${p.name}`}>+</button>
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        {list.length === 0 && (
          <div className="card center" style={{ marginTop: 16 }}>
            <p>Can&apos;t find it? We stock far more than we list online.</p>
            <a className="btn btn-primary" href={waLink(`Hello Bakay Pharmacy, do you have ${q || "this item"}?`)} target="_blank" rel="noopener">
              Ask us on WhatsApp
            </a>
          </div>
        )}
      </div>

      <aside id="basket" className="card basket" aria-label="Order basket">
        <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="cart" /> Your order ({count})</h3>
        {basket.length === 0 ? (
          <p className="basket-empty">Your basket is empty. Add items and we&apos;ll send your order to the branch on WhatsApp. There&apos;s no payment online.</p>
        ) : (
          <ul>
            {basket.map(({ p, qty }) => (
              <li key={p.id}>
                <span>{p.name}</span>
                <span className="qty">
                  <button onClick={() => remove(p.id)} aria-label={`Remove one ${p.name}`}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => add(p.id)} aria-label={`Add one ${p.name}`}>+</button>
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="field" style={{ marginBottom: 14 }}>
          <label htmlFor="branch">Send to branch</label>
          <select id="branch" value={branchId} onChange={(e) => setBranchId(e.target.value)}>
            {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <a
          className={`btn btn-primary btn-block ${basket.length ? "" : "is-disabled"}`}
          href={basket.length ? waLink(message, branch.whatsapp) : undefined}
          aria-disabled={!basket.length}
          target="_blank"
          rel="noopener"
          style={basket.length ? undefined : { opacity: 0.5, pointerEvents: "none" }}
        >
          <Icon name="whatsapp" size={20} /> Send order on WhatsApp
        </a>
        {basket.length > 0 && (
          <button className="btn btn-sm btn-block" style={{ marginTop: 8, background: "none", color: "var(--ink-2)" }} onClick={clear}>
            Clear basket
          </button>
        )}
        <p className="muted" style={{ fontSize: "0.82rem", marginTop: 12, marginBottom: 0 }}>
          Prices are confirmed by our pharmacist on WhatsApp. Prescription-only medicines need a valid prescription.
        </p>
      </aside>
    </div>
  );
}
