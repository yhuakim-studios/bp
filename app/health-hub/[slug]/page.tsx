import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import { Icon } from "@/components/Icon";
import { site, waLink } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt, openGraph: { type: "article", title: a.title, description: a.excerpt } };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="crumbs"><Link href="/">Home</Link> / <Link href="/health-hub">Health Hub</Link></div>
          <h1 style={{ maxWidth: "22ch" }}>{a.title}</h1>
          <p className="lead" style={{ marginBottom: 0 }}>
            {a.readMins} min read · Reviewed by {site.superintendent}
          </p>
        </div>
      </section>
      <article className="section">
        <div className="container prose">
          {a.body.map((b, i) => (
            <div key={i}>
              {b.heading && <h2>{b.heading}</h2>}
              {b.text && <p>{b.text}</p>}
              {b.list && <ul>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>}
            </div>
          ))}
          <div className="notice" style={{ marginTop: 32 }}>
            This article is general information, not a diagnosis. For advice about your own health, speak to our pharmacist or your doctor.
          </div>
          <div className="btn-row" style={{ marginTop: 24 }}>
            <a className="btn btn-primary" href={waLink(`Hello Bakay Pharmacy, I have a question about "${a.title}".`)} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={20} /> Ask a pharmacist
            </a>
            <Link className="btn btn-outline" href="/health-hub">More articles</Link>
          </div>
        </div>
      </article>
    </>
  );
}
