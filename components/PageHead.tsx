import Link from "next/link";

export function PageHead({ title, lead, crumb }: { title: string; lead?: string; crumb: string }) {
  return (
    <section className="page-head">
      <div className="container">
        <div className="crumbs">
          <Link href="/">Home</Link> / {crumb}
        </div>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
