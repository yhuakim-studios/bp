import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { PrescriptionForm } from "@/components/PrescriptionForm";

export const metadata: Metadata = {
  title: "Send a Prescription",
  description: "Upload your prescription to Bakay Pharmacy and we'll prepare it for pickup or delivery in Nsukka and Enugu. Checked by a registered pharmacist.",
};

export default function PrescriptionPage() {
  return (
    <>
      <PageHead
        crumb="Prescriptions"
        title="Send us your prescription"
        lead="Skip the queue. Upload a photo of your prescription and we'll have it ready when you arrive, or deliver it to you."
      />
      <section className="section">
        <div className="container two-col">
          <div className="card" style={{ padding: 28 }}>
            <PrescriptionForm />
          </div>
          <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
            <div className="card">
              <h3>How it works</h3>
              <div className="steps" style={{ marginTop: 14 }}>
                <div className="step"><div><strong>Upload</strong><p>Send a clear photo of your prescription with your details.</p></div></div>
                <div className="step"><div><strong>We check</strong><p>A pharmacist reviews it and confirms availability and price on WhatsApp.</p></div></div>
                <div className="step"><div><strong>Pick up or delivery</strong><p>Collect from your chosen branch, or we&apos;ll bring it to you.</p></div></div>
              </div>
            </div>
            <div className="notice">
              <strong>Your privacy matters.</strong> Only our pharmacists see your prescription. We never share your health information.
            </div>
            <div className="notice" style={{ background: "#fdeee2", borderColor: "#f5c6a5" }}>
              <strong>Emergency?</strong> Don&apos;t wait for a reply. Go to the nearest hospital emergency unit, or call <a href="tel:112">112</a>.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
