export const auditors = [
  {
    id: "AUD-001", name: "Sarah Chen", title: "Senior Lead Auditor", photo: null,
    skills: ["Sterile Manufacturing", "Aseptic Processing", "Environmental Monitoring", "Quality Systems"],
    certifications: ["ASQ CQA", "GMP Lead Auditor", "ISO 13485 Lead Auditor"],
    yearsExperience: 14, totalAudits: 87, avgRating: 4.8,
    availability: { Q1: true, Q2: true, Q3: false, Q4: true },
    conflicts: ["AU-019"],
    currentLoad: { Q1: 2, Q2: 1, Q3: 0, Q4: 1 },
    region: "Americas", email: "s.chen@company.com"
  },
  {
    id: "AUD-002", name: "Dr. Marcus Weber", title: "Lead Auditor — Biologics", photo: null,
    skills: ["Biologics", "Monoclonal Antibodies", "Cell Therapy", "Quality Control"],
    certifications: ["ASQ CQA", "GMP Lead Auditor", "Biologics Specialist"],
    yearsExperience: 11, totalAudits: 62, avgRating: 4.7,
    availability: { Q1: true, Q2: false, Q3: true, Q4: true },
    conflicts: ["AU-002"],
    currentLoad: { Q1: 1, Q2: 0, Q3: 2, Q4: 1 },
    region: "Europe", email: "m.weber@company.com"
  },
  {
    id: "AUD-003", name: "Priya Sharma", title: "Lead Auditor — API & Chemistry", photo: null,
    skills: ["API Synthesis", "Chemical Manufacturing", "Process Chemistry", "Analytical Methods"],
    certifications: ["GMP Lead Auditor", "Chemistry SME", "ASQ CQA"],
    yearsExperience: 9, totalAudits: 48, avgRating: 4.6,
    availability: { Q1: true, Q2: true, Q3: true, Q4: false },
    conflicts: [],
    currentLoad: { Q1: 1, Q2: 2, Q3: 1, Q4: 0 },
    region: "APAC", email: "p.sharma@company.com"
  },
  {
    id: "AUD-004", name: "James O'Sullivan", title: "Lead Auditor — Clinical GCP", photo: null,
    skills: ["Clinical GCP", "Pharmacovigilance", "Safety Reporting", "Informed Consent"],
    certifications: ["GCP Certified", "Lead Auditor ISO 9001", "Pharmacovigilance Specialist"],
    yearsExperience: 12, totalAudits: 71, avgRating: 4.9,
    availability: { Q1: true, Q2: true, Q3: true, Q4: true },
    conflicts: ["AU-012"],
    currentLoad: { Q1: 2, Q2: 2, Q3: 1, Q4: 1 },
    region: "Europe", email: "j.osullivan@company.com"
  },
  {
    id: "AUD-005", name: "Akiko Tanaka", title: "Senior Auditor — Data Integrity", photo: null,
    skills: ["Data Integrity", "Computer System Validation", "21 CFR Part 11", "Electronic Records"],
    certifications: ["ASQ CQA", "ISPE GAMP5 Specialist", "Data Integrity Lead"],
    yearsExperience: 8, totalAudits: 39, avgRating: 4.5,
    availability: { Q1: false, Q2: true, Q3: true, Q4: true },
    conflicts: ["AU-020"],
    currentLoad: { Q1: 0, Q2: 1, Q3: 2, Q4: 1 },
    region: "APAC", email: "a.tanaka@company.com"
  },
  {
    id: "AUD-006", name: "Elena Rodriguez", title: "Auditor — Quality Systems", photo: null,
    skills: ["Quality Systems", "CAPA Management", "Deviation Handling", "Document Control"],
    certifications: ["GMP Certified", "ASQ CQA"],
    yearsExperience: 6, totalAudits: 28, avgRating: 4.4,
    availability: { Q1: true, Q2: true, Q3: true, Q4: false },
    conflicts: [],
    currentLoad: { Q1: 2, Q2: 1, Q3: 2, Q4: 0 },
    region: "Americas", email: "e.rodriguez@company.com"
  },
  {
    id: "AUD-007", name: "Dr. Hans Müller", title: "Lead Auditor — Packaging & Labeling", photo: null,
    skills: ["Packaging & Labeling", "Serialization", "Supply Chain/GDP", "Quality Systems"],
    certifications: ["GMP Lead Auditor", "GDP Certified", "Serialization Expert"],
    yearsExperience: 15, totalAudits: 94, avgRating: 4.8,
    availability: { Q1: true, Q2: true, Q3: false, Q4: true },
    conflicts: ["AU-018"],
    currentLoad: { Q1: 1, Q2: 2, Q3: 0, Q4: 2 },
    region: "Europe", email: "h.muller@company.com"
  },
  {
    id: "AUD-008", name: "David Kim", title: "Auditor — IT/CSV", photo: null,
    skills: ["IT/Computer System Validation", "Data Integrity", "Cloud Validation", "GAMP5"],
    certifications: ["ISPE GAMP5 Certified", "CISA", "ISO 27001 Lead Auditor"],
    yearsExperience: 7, totalAudits: 32, avgRating: 4.5,
    availability: { Q1: true, Q2: true, Q3: true, Q4: true },
    conflicts: [],
    currentLoad: { Q1: 1, Q2: 1, Q3: 2, Q4: 1 },
    region: "APAC", email: "d.kim@company.com"
  },
  {
    id: "AUD-009", name: "Marie Dubois", title: "Senior Auditor — Environmental Monitoring", photo: null,
    skills: ["Environmental Monitoring", "Sterile Manufacturing", "Microbiology", "Cleanroom Qualification"],
    certifications: ["GMP Certified", "Microbiology Specialist", "ASQ CQA"],
    yearsExperience: 10, totalAudits: 53, avgRating: 4.7,
    availability: { Q1: true, Q2: false, Q3: true, Q4: true },
    conflicts: [],
    currentLoad: { Q1: 2, Q2: 0, Q3: 1, Q4: 2 },
    region: "Europe", email: "m.dubois@company.com"
  },
  {
    id: "AUD-010", name: "Robert Thompson", title: "Lead Auditor — Supply Chain", photo: null,
    skills: ["Supply Chain/GDP", "Warehousing", "Cold Chain Management", "Logistics"],
    certifications: ["GDP Lead Auditor", "GMP Certified", "Cold Chain Specialist"],
    yearsExperience: 13, totalAudits: 76, avgRating: 4.6,
    availability: { Q1: false, Q2: true, Q3: true, Q4: true },
    conflicts: ["AU-017"],
    currentLoad: { Q1: 0, Q2: 2, Q3: 1, Q4: 2 },
    region: "Americas", email: "r.thompson@company.com"
  },
  {
    id: "AUD-011", name: "Dr. Fatima Al-Rashid", title: "Lead Auditor — Analytical & Stability", photo: null,
    skills: ["Analytical Methods", "Stability Studies", "Method Validation", "Laboratory Controls"],
    certifications: ["ASQ CQA", "GMP Lead Auditor", "Analytical Chemistry Expert"],
    yearsExperience: 11, totalAudits: 58, avgRating: 4.8,
    availability: { Q1: true, Q2: true, Q3: true, Q4: false },
    conflicts: [],
    currentLoad: { Q1: 1, Q2: 2, Q3: 1, Q4: 0 },
    region: "Europe", email: "f.alrashid@company.com"
  },
  {
    id: "AUD-012", name: "Carlos Mendez", title: "Auditor — Process Validation", photo: null,
    skills: ["Process Validation", "Equipment Qualification", "Cleaning Validation", "Statistics"],
    certifications: ["GMP Certified", "Six Sigma Black Belt", "Validation Specialist"],
    yearsExperience: 5, totalAudits: 21, avgRating: 4.3,
    availability: { Q1: true, Q2: true, Q3: false, Q4: true },
    conflicts: [],
    currentLoad: { Q1: 2, Q2: 1, Q3: 0, Q4: 1 },
    region: "Americas", email: "c.mendez@company.com"
  },
  {
    id: "AUD-013", name: "Lisa Nkomo", title: "Senior Auditor — Pharmacovigilance", photo: null,
    skills: ["Pharmacovigilance", "Safety Reporting", "Clinical GCP", "Risk Management"],
    certifications: ["GVP Certified", "GCP Certified", "ASQ CQA"],
    yearsExperience: 9, totalAudits: 44, avgRating: 4.6,
    availability: { Q1: true, Q2: true, Q3: true, Q4: true },
    conflicts: [],
    currentLoad: { Q1: 1, Q2: 2, Q3: 1, Q4: 1 },
    region: "Europe", email: "l.nkomo@company.com"
  },
  {
    id: "AUD-014", name: "Wei Zhang", title: "Auditor — Biologics Manufacturing", photo: null,
    skills: ["Biologics", "Cell Culture", "Purification", "Quality Control"],
    certifications: ["GMP Certified", "Biologics Specialist"],
    yearsExperience: 4, totalAudits: 16, avgRating: 4.2,
    availability: { Q1: true, Q2: true, Q3: true, Q4: true },
    conflicts: [],
    currentLoad: { Q1: 1, Q2: 1, Q3: 2, Q4: 1 },
    region: "APAC", email: "w.zhang@company.com"
  },
  {
    id: "AUD-015", name: "Dr. Anna Kowalski", title: "Lead Auditor — Quality Assurance", photo: null,
    skills: ["Quality Assurance", "Quality Systems", "Regulatory Compliance", "Sterile Manufacturing"],
    certifications: ["ASQ CQA", "GMP Lead Auditor", "ISO 13485 Lead Auditor", "Regulatory Affairs Certified"],
    yearsExperience: 16, totalAudits: 102, avgRating: 4.9,
    availability: { Q1: true, Q2: true, Q3: false, Q4: true },
    conflicts: [],
    currentLoad: { Q1: 2, Q2: 1, Q3: 0, Q4: 2 },
    region: "Europe", email: "a.kowalski@company.com"
  }
];
