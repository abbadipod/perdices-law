// Matches the order the sections actually appear on the page.
export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#credentials", label: "Credentials" },
  { href: "#practice-areas", label: "Practice" },
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
    title: "Appellate Litigation",
    description:
      "Appeals, petitions for review, and certiorari before the Court of Appeals and higher courts.",
    detail:
      "Atty. Perdices served as Court Attorney IV at the Court of Appeals – Mindanao Station from 2008 to 2010, researching appealed cases and drafting the decisions and resolutions the court issued. That vantage point shapes how appeals are handled here: identifying which errors are genuinely reviewable, framing assignments of error the court can act on, and building a record that survives scrutiny rather than restating the trial below. Work covers appeals and petitions for review, petitions for certiorari, motions for reconsideration, and appellate briefs and memoranda. Where an adverse decision has just been received, the first question is usually the remedy and the period left to take it — both worth establishing quickly, since appellate deadlines are unforgiving.",
  },
  {
    title: "Civil Litigation",
    description:
      "Contract, property, collection, and damages disputes before Philippine trial courts.",
    detail:
      "Representation in civil disputes — breach of contract, collection of sums due, property and boundary disputes, damages, and enforcement of judgments already obtained. The work begins with an assessment that is often worth more than the filing itself: the strength of the evidence, the likely cost and timeline, whether the claim is still within the prescriptive period, and whether the matter should first go through barangay conciliation or is better resolved by settlement. Where litigation is the right route, it covers the pleadings, representation through pre-trial and trial, and execution after judgment.",
  },
  {
    title: "Criminal Law & Preliminary Investigation",
    description:
      "Representation from inquest and preliminary investigation through arraignment, trial, and appeal.",
    detail:
      "Criminal matters are often decided long before trial, at preliminary investigation, where the question is simply whether probable cause exists. Work at that stage covers counter-affidavits, motions for reconsideration of a prosecutor's resolution, and petitions for review — the points at which a case can end without a courtroom. Where an information has been filed, representation continues through applications for bail, arraignment, pre-trial, trial, and appeal. Years as a Public Attorney II in Cagayan de Oro built this practice on frontline criminal defence. Clients abroad with a pending case or an outstanding warrant should raise it early: what can be handled remotely and what requires a personal appearance differs case to case.",
  },
  {
    title: "Land Registration & Property",
    description:
      "Title verification, registration proceedings, and due diligence for Philippine real property.",
    detail:
      "Property matters here turn on the quality of the title, so the work starts with verification: the certificate of title and tax declaration, checks for liens, adverse claims and unpaid real property tax, and confirmation that the seller has authority to sell. It extends to original and subsequent registration proceedings, reconstitution of lost or destroyed titles, correction of entries, and the transfer itself — deed preparation, the taxes and fees that fall due, and follow-through to issuance of a new title. Inherited property and purchases made from abroad get particular attention; the latter usually needs a special power of attorney arranged before anything can be signed.",
  },
  {
    title: "Estate Settlement & Planning",
    description:
      "Judicial and extrajudicial settlement of estates, and planning to keep succession straightforward.",
    detail:
      "When someone dies owning property in the Philippines, the estate has to be settled before title can move to the heirs. Where the heirs agree and the conditions are met, this can be done extrajudicially — a settlement agreement, publication, estate tax clearance with the BIR, and transfer of the titles. Where there is a will, a dispute, or a minor among the heirs, it goes to court instead. The work covers both routes, along with the estate tax filings that gate the transfer. Planning ahead is the cheaper conversation: how property is titled and documented during a lifetime determines how difficult the settlement becomes later, particularly for families with heirs living abroad.",
  },
  {
    title: "Transactional & Corporate",
    description:
      "Contracts, business registration, and corporate compliance for companies operating in the Philippines.",
    detail:
      "Contract drafting and review across the arrangements a business or an individual actually signs — sale, lease, services, loan and security, and agency. On the corporate side: registration of the entity, constitutive documents, local business and tax registration, and the housekeeping that keeps a company in good standing, including board and stockholder resolutions and annual filings. Atty. Perdices has served as corporate secretary and advised a company chairman on contract negotiation and review, so the perspective is a practical one. For businesses with foreign shareholders, the first question is usually structural — which vehicle fits what the business actually intends to do here, and what ownership restrictions apply to the sector.",
  },
];

/**
 * Structured so the Credentials list and the JSON-LD `alumniOf` both derive
 * from one source — the schema needs the bare institution name, the page
 * wants the full line.
 *
 * Reverse chronological, as credentials are conventionally listed.
 */
export const education = [
  {
    degree: "Master of Laws (LL.M.)",
    school: "University of Washington",
    year: "2017",
  },
  {
    degree: "Advanced Paralegal Certificate",
    school: "Edmonds College",
    year: "2016",
    note: "academic honors",
  },
  {
    degree: "Bachelor of Laws (LL.B.)",
    school: "Xavier University – Ateneo de Cagayan",
    year: "2005",
  },
  {
    degree: "Bachelor of Science in Accounting",
    school: "University of Santo Tomas",
    year: "1996",
  },
];

/**
 * The three facts worth reading at a glance, set as display figures above
 * the detailed list. Only facts with a genuine numeral belong here —
 * education and honours have none, so they stay in the list below.
 */
export const credentialStats = [
  { figure: "2006", label: "Admitted, Philippines" },
  { figure: "2023", label: "Admitted, Washington State" },
  { figure: "6+", label: "Years, Philippine practice" },
];

export const credentials = [
  {
    label: "Philippine Bar Admission",
    detail: "Roll of Attorneys No. 51416",
  },
  {
    label: "Washington State Bar Admission",
    detail: "WSBA No. 61514",
  },
  {
    label: "Education",
    // An array renders as one line per entry.
    detail: education.map(
      (e) =>
        `${e.degree}${e.note ? ` (${e.note})` : ""} — ${e.school}, ${e.year}`
    ),
  },
  {
    label: "Honors",
    detail:
      "CALI Excellence for the Future Awards — Constitutional Law I (Federalism) and Constitutional Law II (Individual Rights)",
  },
  {
    label: "Practice",
    detail:
      "Appellate and civil litigation, criminal law representation, land registration and property transfers, estate settlement and planning, transactional law and corporate matters, and legal advisory work",
  },
  { label: "Languages", detail: "English, Tagalog, and Cebuano" },
];

export const faqItems = [
  {
    question: "I live in the US but need help with a matter in the Philippines — can you still represent me?",
    answer:
      "Yes. Perdices Law handles Philippine legal matters for clients in the Philippines and overseas; most consultations and case updates can be handled remotely. If a matter also involves another jurisdiction's law, the Philippine-law issues are handled here, and any separate foreign-law representation can be identified and coordinated as needed.",
  },
  {
    question: "What does a consultation involve?",
    answer:
      "An initial consultation is a focused conversation about your situation — what's happened, what you're trying to accomplish, and which country's laws and courts are involved — followed by a plain-language explanation of your options and likely next steps.",
  },
  {
    question: "How much does a consultation cost?",
    answer:
      "Consultation fees are discussed and agreed upon before we begin, based on the nature and complexity of your matter. There are no hidden charges — you'll know the cost before any work starts.",
  },
  {
    question: "Can I retain you without visiting the office in person?",
    answer:
      "In most cases, yes. Consultations, document review, and case updates can be handled remotely by phone or video call, with in-person appearances arranged only where a court or agency specifically requires it.",
  },
];

export const contactInfo = {
  email: "chemaperdices@gmail.com",
  offices: [
    {
      city: "Dumaguete City, Philippines",
      address: "Bricktown Center, Daro, Dumaguete City, Negros Oriental",
      // `hours` is optional and deliberately unset: office hours were not in
      // the source material, and inventing them on a law firm's site is worse
      // than omitting them.
      phone: "+63 945 779 5260",
    },
  ],
} as {
  email: string;
  offices: {
    city: string;
    address: string;
    hours?: string;
    phone: string;
  }[];
};
