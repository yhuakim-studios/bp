import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section center">
      <div className="container">
        <h1>Page not found</h1>
        <p className="lead" style={{ margin: "0 auto 24px" }}>The page you&apos;re looking for has moved or doesn&apos;t exist.</p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary">Go home</Link>
          <Link href="/shop" className="btn btn-outline">Browse the shop</Link>
        </div>
      </div>
    </section>
  );
}
