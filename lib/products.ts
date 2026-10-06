// SAMPLE catalogue for the prototype. Replace with the store's real product list (no prices are shown in phase 1).

export type Category = { id: string; name: string; blurb: string };

export const categories: Category[] = [
  { id: "pain-fever", name: "Pain & Fever", blurb: "Headache, body pain, fever" },
  { id: "malaria", name: "Malaria", blurb: "Treatment & prevention" },
  { id: "cough-cold", name: "Cough, Cold & Allergy", blurb: "Syrups, lozenges, antihistamines" },
  { id: "vitamins", name: "Vitamins & Supplements", blurb: "Immunity, energy, wellness" },
  { id: "baby-mother", name: "Baby & Mother", blurb: "Infant care, prenatal" },
  { id: "personal-care", name: "Personal Care", blurb: "Skin, oral and hygiene" },
  { id: "first-aid", name: "First Aid", blurb: "Dressings, antiseptics" },
  { id: "chronic-care", name: "Chronic Care", blurb: "BP, diabetes, refills" },
];

export type Product = {
  id: string;
  name: string;
  pack: string;
  category: string;
  rx?: boolean; // prescription-only
};

export const products: Product[] = [
  { id: "p1", name: "Paracetamol 500mg Tablets", pack: "Pack of 96", category: "pain-fever" },
  { id: "p2", name: "Ibuprofen 400mg Tablets", pack: "Pack of 24", category: "pain-fever" },
  { id: "p3", name: "Paracetamol Paediatric Suspension", pack: "100ml bottle", category: "pain-fever" },
  { id: "p4", name: "Artemether/Lumefantrine 80/480mg", pack: "6 tablets (adult course)", category: "malaria" },
  { id: "p5", name: "Artemether/Lumefantrine Dispersible (Child)", pack: "6 tablets", category: "malaria" },
  { id: "p6", name: "Malaria Rapid Test Kit (RDT)", pack: "1 test", category: "malaria" },
  { id: "p7", name: "Insecticide-Treated Mosquito Net", pack: "Double size", category: "malaria" },
  { id: "p8", name: "Loratadine 10mg Tablets", pack: "Pack of 10", category: "cough-cold" },
  { id: "p9", name: "Dry Cough Syrup", pack: "100ml", category: "cough-cold" },
  { id: "p10", name: "Menthol Throat Lozenges", pack: "Pack of 16", category: "cough-cold" },
  { id: "p11", name: "Vitamin C 1000mg Effervescent", pack: "Tube of 20", category: "vitamins" },
  { id: "p12", name: "Multivitamin Tablets", pack: "Pack of 30", category: "vitamins" },
  { id: "p13", name: "Zinc 20mg Tablets", pack: "Pack of 30", category: "vitamins" },
  { id: "p14", name: "Folic Acid 5mg Tablets", pack: "Pack of 28", category: "baby-mother" },
  { id: "p15", name: "Oral Rehydration Salts (ORS)", pack: "Sachet x 10", category: "baby-mother" },
  { id: "p16", name: "Baby Diaper Rash Cream", pack: "50g tube", category: "baby-mother" },
  { id: "p17", name: "Antiseptic Liquid", pack: "500ml", category: "first-aid" },
  { id: "p18", name: "Sterile Gauze & Plaster Kit", pack: "1 kit", category: "first-aid" },
  { id: "p19", name: "Medicated Toothpaste (Sensitive)", pack: "100ml", category: "personal-care" },
  { id: "p20", name: "Hand Sanitiser 70% Alcohol", pack: "250ml", category: "personal-care" },
  { id: "p21", name: "Digital Blood Pressure Monitor", pack: "1 unit", category: "chronic-care" },
  { id: "p22", name: "Glucometer Test Strips", pack: "Box of 50", category: "chronic-care" },
  { id: "p23", name: "Amlodipine 5mg Tablets", pack: "Pack of 28", category: "chronic-care", rx: true },
  { id: "p24", name: "Metformin 500mg Tablets", pack: "Pack of 56", category: "chronic-care", rx: true },
  { id: "p25", name: "Amoxicillin 500mg Capsules", pack: "Pack of 21", category: "cough-cold", rx: true },
];
