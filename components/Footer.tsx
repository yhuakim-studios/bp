import Link from "next/link";
import { BakayLogo } from "./BakayLogo";
import { branches, site, waLink } from "@/lib/site";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 14 }}><BakayLogo light /></div>
            <p>
              A pharmacist-owned community pharmacy serving Nsukka and Enugu with genuine medicines and
              friendly professional advice.
            </p>
            <p style={{ marginBottom: 0 }}>
              {site.legalName} · {site.rcNumber}
            </p>
          </div>
          <div>
            <h4>Pharmacy</h4>
            <ul>
              <li><Link href="/shop">Shop medicines</Link></li>
              <li><Link href="/prescription">Send a prescription</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/health-hub">Health Hub</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/branches">Branches</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/contact#wholesale">Wholesale enquiries</Link></li>
            </ul>
          </div>
          <div>
            <h4>Visit or call</h4>
            <ul>
              {branches.map((b) => (
                <li key={b.id}>
                  <Link href={`/branches#${b.id}`}>{b.name}</Link>
                </li>
              ))}
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={waLink("Hello Bakay Pharmacy")} target="_blank" rel="noopener">WhatsApp us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <span>Always read the label. If symptoms persist, consult your doctor or pharmacist.</span>
        </div>
      </div>
    </footer>
  );
}
