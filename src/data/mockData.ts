export type Opportunity = {
  id: string;
  category: string;
  title: string;
  organization: string;
  location: string;
  benefit: string;
  deadline: string;
  eligibility: string;
  description: string;
  tags: string[];
};

export const opportunities: Opportunity[] = [
  {
    id: "research-sustainable-ai-energy",
    category: "Research Fellowship",
    title: "Research Fellowship in Sustainable AI & Energy Systems",
    organization: "Panjab University DIC (Design Innovation Centre)",
    location: "Sector 14 Campus, Chandigarh",
    benefit: "Rs. 22,000 / month + Lab access",
    deadline: "15 Sept 2026",
    eligibility: "Pre-final & final year UG/PG students in Engg, Physics, Computing or Maths",
    description: "Collaborate with senior faculty on funded projects tackling energy grid optimization and lightweight AI models for edge devices.",
    tags: ["Research", "AI/ML", "On-Campus", "Stipend"],
  },
  {
    id: "software-product-internship",
    category: "Internship",
    title: "Software Development & Product Internship (Summer/Fall)",
    organization: "Chandigarh Tech Innovation Hub",
    location: "IT Park / Hybrid",
    benefit: "Rs. 30,000 / month stipend",
    deadline: "28 Aug 2026",
    eligibility: "Students with proficiency in TypeScript, Python or React",
    description: "Build production-grade mobile and web applications solving civic and educational technology challenges.",
    tags: ["Internship", "Tech", "Full Stack", "Hybrid"],
  },
  {
    id: "generative-tools-research-workshop",
    category: "Workshop",
    title: "AI & Generative Tools for Academic Research Workshop",
    organization: "PU Computer Centre & DCSA",
    location: "CIL Auditorium & Online",
    benefit: "Free Certificate & Compute Credits",
    deadline: "05 Sept 2026",
    eligibility: "Open to all PU students, scholars and research fellows",
    description: "Hands-on masterclass covering literature discovery tools, data visualisations, prompt engineering, and ethical research citation frameworks.",
    tags: ["Workshop", "Skill Building", "Certificate"],
  },
  {
    id: "annual-student-innovation-startup",
    category: "Innovation Challenge",
    title: "PU Annual Student Innovation & Startup Challenge",
    organization: "PU Incubation Centre (CIIPP)",
    location: "Golden Jubilee Hall",
    benefit: "Rs. 2.5 Lakh Grant Pool + Mentorship",
    deadline: "20 Sept 2026",
    eligibility: "Teams of 2-4 PU enrolled students across any department",
    description: "Pitch innovative solutions for campus sustainability, healthcare accessibility, agritech, or smart governance.",
    tags: ["Startup", "Grant", "Pitch Competition"],
  },
  {
    id: "international-exchange-semester-abroad",
    category: "Exchange Programme",
    title: "International Student Exchange & Semester Abroad",
    organization: "Office of International Affairs, PU",
    location: "Partner university campus",
    benefit: "Tuition Waiver + Travel Grant",
    deadline: "10 Oct 2026",
    eligibility: "PU enrolled students nominated through the Office of International Affairs",
    description: "Spend one semester studying at an accredited international partner university with full credit transfer to your PU transcript.",
    tags: ["Global", "Exchange", "Scholarship"],
  },
];

export const notices = [
  "Prototype notice: PU Connect is a frontend student platform prototype for stakeholder review.",
  "Examination deadline preview: semester form correction window closes this week.",
  "Grievance preview: latest service request moved to department review.",
];

export const campusLocations = ["Student Centre", "UIET Gate", "AC Joshi Library", "Hostel No. 7", "Administrative Block", "Sector 14 Gate"];

export const libraryZones = ["AC Joshi Library", "Law Reading Hall", "UIET Reading Room", "Department Library"];
