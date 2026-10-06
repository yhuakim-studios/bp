import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Icon } from "@/components/Icon";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Health Hub — Advice from our Pharmacists",
  description: "Practical health tips from Bakay Pharmacy's pharmacists: malaria prevention, spotting fake drugs, storing medicines safely and more.",
};

export default function HealthHubPage() {
  return (
    <>
      <PageHead crumb="Health Hub" title="Health Hub" lead="Practical, trustworthy health tips from our pharmacists, written for families in Nsukka and Enugu." />
      <section className="section">
        <div className="container grid grid-3">
          {articles.map((a) => (
            <Link key={a.slug} href={`/health-hub/${a.slug}`} className="card card-hover article-card">
              <div className="thumb"><Icon name="book" size={36} /></div>
              <div className="article-meta">
                <span className="tag">{a.tag}</span>
                <time dateTime={a.date}>{new Date(a.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</time>
                · {a.readMins} min
              </div>
              <h3>{a.title}</h3>
              <p className="muted" style={{ margin: 0 }}>{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
