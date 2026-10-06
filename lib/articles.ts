// Health Hub articles. Draft copy for the prototype — to be reviewed and signed off by the superintendent pharmacist.

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMins: number;
  tag: string;
  body: { heading?: string; text?: string; list?: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "malaria-rainy-season",
    title: "Staying ahead of malaria this rainy season",
    excerpt: "More rain means more mosquitoes. Here's how to protect your household, and why you should test before you treat.",
    date: "2026-09-15",
    readMins: 4,
    tag: "Prevention",
    body: [
      { text: "Malaria cases rise during and just after the rainy season because standing water gives mosquitoes more places to breed. Children under five and pregnant women are at the highest risk of severe illness." },
      { heading: "Prevent bites", list: [
        "Sleep under an insecticide-treated net every night, and tuck the edges in.",
        "Clear stagnant water around the house: old tyres, buckets and blocked gutters.",
        "Use window and door screens, and repellent in the evenings.",
      ] },
      { heading: "Test before you treat", text: "Fever doesn't always mean malaria. A quick rapid diagnostic test (RDT), available at any Bakay branch, confirms it before you start treatment, so you don't waste money on the wrong medicine." },
      { heading: "Finish the full course", text: "If you test positive, take the full course of your antimalarial exactly as directed, even if you feel better after a day or two. Stopping early can let the infection come back." },
      { heading: "Go to hospital immediately if you notice", list: [
        "Convulsions, confusion or extreme drowsiness",
        "Repeated vomiting, or being unable to keep medicine down",
        "Difficulty breathing, dark urine or yellow eyes",
      ] },
    ],
  },
  {
    slug: "spot-fake-medicines",
    title: "How to spot fake medicines before you buy",
    excerpt: "Counterfeit drugs are a real risk. Five quick checks can help you make sure what you're taking is genuine.",
    date: "2026-08-28",
    readMins: 3,
    tag: "Safety",
    body: [
      { text: "Fake and substandard medicines can fail to treat an illness, or cause harm. You can protect yourself with a few simple checks." },
      { heading: "Five checks", list: [
        "Look for a NAFDAC registration number on the pack.",
        "If the pack has a scratch-off authentication code, scratch it and text the code to the number printed on the pack.",
        "Check the expiry date, and that the batch number on the box matches the one on the blister or bottle.",
        "Watch for poor printing, spelling mistakes or broken seals.",
        "Be cautious of prices that are far below normal.",
      ] },
      { heading: "Buy from a licensed pharmacy", text: "Licensed pharmacies are supervised by a registered pharmacist and buy from approved suppliers. Every Bakay branch is supervised by a pharmacist, so ask us if you're ever unsure about a product." },
    ],
  },
  {
    slug: "storing-medicines-in-the-heat",
    title: "Storing medicines safely in hot weather",
    excerpt: "Heat and humidity can weaken medicines before their expiry date. Here's where (and where not) to keep them.",
    date: "2026-08-10",
    readMins: 3,
    tag: "Everyday care",
    body: [
      { text: "Most tablets and syrups should be kept in a cool, dry place, away from direct sunlight. Always follow the instructions on the label." },
      { heading: "Do", list: [
        "Keep medicines in their original packaging, with the leaflet.",
        "Store them in a cupboard away from the kitchen stove and the bathroom.",
        "Keep insulin and some eye drops in the fridge as directed, never in the freezer.",
        "Keep all medicines out of children's reach.",
      ] },
      { heading: "Don't", list: [
        "Leave medicines in a parked car or on a sunny windowsill.",
        "Use tablets that have changed colour or smell, or syrups that look different.",
        "Mix different medicines in one container.",
      ] },
      { text: "Not sure if a medicine is still safe to use? Bring it to any Bakay branch and our pharmacist will check it for you, free of charge." },
    ],
  },
];
