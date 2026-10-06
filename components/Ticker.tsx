const words = ["Prescriptions", "Malaria care", "Vitamins", "Mother & baby", "Pain relief", "First aid", "Personal care", "Chronic care refills", "WhatsApp orders", "Delivery in Nsukka & Enugu"];

export function Ticker() {
  const all = [...words, ...words];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {all.map((w, i) => (
          <span key={i}>{w}<i>✚</i></span>
        ))}
      </div>
    </div>
  );
}
