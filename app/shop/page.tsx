import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHead } from "@/components/PageHead";
import { ShopClient } from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop Medicines & Health Products",
  description: "Browse medicines, vitamins, baby care and first aid at Bakay Pharmacy. Build your basket and order on WhatsApp for pickup or delivery in Nsukka and Enugu.",
};

export default function ShopPage() {
  return (
    <>
      <PageHead
        crumb="Shop"
        title="Shop medicines & health products"
        lead="Add items to your basket and send the order to your nearest branch on WhatsApp. We'll confirm price and availability, then you choose pickup or delivery."
      />
      <section className="section-sm">
        <div className="container">
          <Suspense>
            <ShopClient />
          </Suspense>
        </div>
      </section>
    </>
  );
}
