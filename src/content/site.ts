export const navLinks = [
  { href: "#practice-areas", label: "Practice" },
  { href: "#credentials", label: "Credentials" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export const practiceIntro =
  "Six areas of Philippine law, handled directly by Atty. Perdices.";

/**
 * `detail` is revealed when a practice card is expanded.
 *
 * DRAFT — needs Atty. Perdices to review before this is public. Unlike the
 * rest of the placeholder copy, these describe Philippine legal procedure
 * (agencies, filings, sequence), so an inaccuracy here reads as the firm
 * stating the law incorrectly.
 */
export const practiceAreas = [
  {
    title: "Philippine Immigration (US → Philippines)",
    description:
      "Dual citizenship (RA 9225), balikbayan and long-term visas, and residency matters for US citizens and Filipino-Americans relocating to the Philippines.",
    detail:
      "Most clients arrive in one of three situations: a Filipino-American reacquiring citizenship under RA 9225, a retiree weighing a long-term resident visa, or a family settling the status of a spouse or child ahead of a move. The work covers an eligibility review, preparation and filing of the petition with the Bureau of Immigration or the appropriate consulate, coordination of civil registry documents, and appearance at interviews or hearings where these are required. Dual citizenship is often quicker than clients expect. Resident visa applications vary considerably by category and by how complete the supporting documents are at the point of filing — you will get an assessment of both at the consultation.",
  },
  {
    title: "Real Estate Law",
    description:
      "Property due diligence, land title verification, and sale or lease agreements for real property located in the Philippines.",
    detail:
      "Property transactions here turn on the quality of the title, so the work starts with verification: the title and tax declaration, checks for liens, adverse claims and unpaid real property tax, and confirmation that the seller actually has authority to sell. From there it covers drafting or reviewing the deed of sale, lease, or contract to sell; computing and coordinating the taxes and transfer fees that fall due; and following the transfer through to issuance of a new title. Inherited property and purchases made from abroad get particular attention — the latter usually needs a special power of attorney arranged before anything can be signed.",
  },
  {
    title: "Criminal Law",
    description:
      "Representation and counsel in criminal proceedings before Philippine courts, from arraignment through trial.",
    detail:
      "Representation in criminal proceedings before Philippine courts, from the earliest stage through to trial. That includes assistance during inquest and preliminary investigation, preparation of counter-affidavits, applications for bail, and appearance at arraignment, pre-trial and trial. Where a matter is still at the complaint stage, the work often centres on whether there is probable cause at all. Clients abroad with a pending case or an outstanding warrant in the Philippines should raise it early: what can be handled remotely and what genuinely requires a personal appearance differs case to case, and is one of the first things worth establishing.",
  },
  {
    title: "Family Law",
    description:
      "Annulment, legal separation, custody, and support matters under Philippine family law.",
    detail:
      "Petitions for declaration of nullity and annulment of marriage, legal separation, and the custody and support questions that usually travel with them. Annulment in the Philippines is a court proceeding rather than an administrative one, and it takes time. The work covers assessing which ground realistically applies, preparing the petition and its supporting evidence, coordinating expert evaluation where the ground calls for it, and representation through hearings to decision and registration of the decree. Also handled: judicial recognition of a foreign divorce, a separate proceeding often needed by Filipinos whose marriage to a foreign spouse ended abroad.",
  },
  {
    title: "Business & Corporate Law",
    description:
      "Business registration, contracts, and corporate compliance for entities operating in the Philippines.",
    detail:
      "Setting up a Philippine entity and keeping it compliant: registration with the appropriate agency, drafting of constitutive documents, local business and tax registration, and advice on the ownership structures open to a business with foreign shareholders. Ongoing work covers contracts with suppliers, customers and staff; corporate housekeeping such as board and stockholder resolutions and annual filings; and review of arrangements that carry a compliance dimension, including the restrictions that apply to foreign investment in certain sectors. The question that comes up first is usually structural — whether a corporation, a branch, or a representative office actually fits what the business intends to do here.",
  },
  {
    title: "Civil Litigation",
    description:
      "Representation in civil disputes, including contract, property, and collection cases, before Philippine courts.",
    detail:
      "Representation in civil disputes before Philippine courts — breach of contract, collection of sums due, property and boundary disputes, damages, and enforcement of judgments already obtained. The work begins with an assessment that is often worth more than the filing itself: the strength of the evidence, the likely cost and timeline, whether the claim is still within the prescriptive period, and whether the matter is better resolved through settlement or barangay conciliation before it reaches a courtroom at all. Where litigation is the right route, it covers pleadings, representation through pre-trial and trial, and execution after judgment.",
  },
];

export const credentials = [
  { label: "United States Bar Admission", detail: "State Bar of California, admitted 2015" },
  { label: "Philippine Bar Admission", detail: "Integrated Bar of the Philippines, admitted 2012" },
  {
    label: "Education",
    detail: "J.D., University of California, Hastings College of the Law; LL.B., University of the Philippines",
  },
  { label: "Years of Practice", detail: "12+ years across both jurisdictions" },
];

export const faqItems = [
  {
    question: "I live in the US but need help with a matter in the Philippines — can you still represent me?",
    answer:
      "Yes. As a dual-qualified attorney, I can advise on and handle Philippine legal matters directly, and coordinate with US counsel when a matter touches both jurisdictions — you don't need to manage two separate lawyers yourself.",
  },
  {
    question: "What does a consultation involve?",
    answer:
      "An initial consultation is a focused conversation about your situation — what's happened, what you're trying to accomplish, and which country's laws and courts are involved — followed by a plain-language explanation of your options and likely next steps.",
  },
  {
    question: "How do you determine which country's law applies to my case?",
    answer:
      "It depends on the subject matter and where the relevant facts, property, or parties are located. Immigration matters are generally governed by the receiving country's law; property, family, and criminal matters are generally governed by Philippine law if the matter arises there. This is one of the first things we sort out together.",
  },
  {
    question: "How much does a consultation cost?",
    answer:
      "Consultation fees are discussed and agreed upon before we begin, based on the nature and complexity of your matter. There are no hidden charges — you'll know the cost before any work starts.",
  },
  {
    question: "How long does a typical case take?",
    answer:
      "Timelines vary widely: immigration petitions can take months to years depending on the visa category and government processing times, while real estate or contract matters often resolve in weeks. You'll get a realistic estimate specific to your case during the consultation.",
  },
  {
    question: "Can I retain you without visiting the office in person?",
    answer:
      "In most cases, yes. Consultations, document review, and case updates can be handled remotely by phone or video call, with in-person appearances arranged only where a court or agency specifically requires it.",
  },
];

export const contactInfo = {
  email: "info@perdiceslaw.com",
  offices: [
    {
      city: "Makati City, Philippines",
      address: "Unit 1500, 6750 Ayala Avenue, Makati City, 1226 Metro Manila",
      hours: "Monday–Friday, 9:00 AM–6:00 PM (PHT)",
      phone: "+63 917 000 0000",
    },
    {
      city: "San Francisco, United States",
      address: "100 Market Street, Suite 300, San Francisco, CA 94105",
      hours: "Monday–Friday, 9:00 AM–5:00 PM (PT)",
      phone: "+1 415 000 0000",
    },
  ],
};
