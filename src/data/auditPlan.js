import { auditableUnits } from './auditableUnits';

export const auditPlan2026 = [
  { id: "AP-001", auId: "AU-015", auName: "Teva API — Goa, India", auType: "API Supplier", auditType: "For-Cause", status: "Planned", quarter: "Q1", startDate: "2026-01-19", endDate: "2026-01-23", duration: 5, riskScore: 68, stateOfControl: "red", teamSize: 4, leadAuditor: "AUD-003", teamMembers: ["AUD-005", "AUD-006", "AUD-012"], priority: 1, aiReasoning: "For-cause audit urgently recommended: (1) Risk score 68 — HIGH, (2) Critical data integrity finding open from 2024 audit, (3) WHO Major Actions inspection outcome Sept 2025, (4) Cpk 0.78 — OUT OF CONTROL, (5) 4 overdue CAPAs, (6) Audit overdue since Oct 2025" },
  { id: "AP-002", auId: "AU-006", auName: "Patheon (Thermo Fisher) — Greenville, NC", auType: "CMO", auditType: "For-Cause", status: "Planned", quarter: "Q1", startDate: "2026-02-09", endDate: "2026-02-13", duration: 5, riskScore: 71, stateOfControl: "red", teamSize: 4, leadAuditor: "AUD-001", teamMembers: ["AUD-009", "AUD-005", "AUD-012"], priority: 2, aiReasoning: "For-cause audit required: (1) Risk score 71 — HIGH, (2) FDA OAI classification Aug 2025 with 5 Form 483 observations, (3) Cpk 0.92 — OUT OF CONTROL, (4) 3 overdue CAPAs, (5) Media fill failure findings open, (6) Must precede potential FDA re-inspection" },
  { id: "AP-003", auId: "AU-001", auName: "Indianapolis Parenteral Plant", auType: "Manufacturing Site", auditType: "For-Cause", status: "Planned", quarter: "Q1", startDate: "2026-03-02", endDate: "2026-03-06", duration: 5, riskScore: 78, stateOfControl: "red", teamSize: 4, leadAuditor: "AUD-015", teamMembers: ["AUD-001", "AUD-009", "AUD-006"], priority: 3, aiReasoning: "For-cause audit scheduled Q1: (1) Highest risk score 78, (2) Cpk 0.87 — OUT OF CONTROL on primary sterile filling line, (3) 3 critical open deviations in aseptic processing, (4) FDA VAI 2025 with 3 Form 483 observations, (5) Must audit before anticipated FDA re-inspection Q3 2026" },
  { id: "AP-004", auId: "AU-014", auName: "National Cancer Institute — Bethesda", auType: "Clinical Site", auditType: "Routine", status: "Planned", quarter: "Q2", startDate: "2026-04-13", endDate: "2026-04-15", duration: 3, riskScore: 50, stateOfControl: "yellow", teamSize: 3, leadAuditor: "AUD-004", teamMembers: ["AUD-013", "AUD-006"], priority: 4, aiReasoning: "Routine audit Q2: (1) Risk score 50, (2) SAE reporting delays findings open, (3) 1 overdue CAPA, (4) FDA VAI outcome, (5) High-complexity oncology trials active" },
  { id: "AP-005", auId: "AU-005", auName: "Sesto Fiorentino Inhalation", auType: "Manufacturing Site", auditType: "Routine", status: "Planned", quarter: "Q2", startDate: "2026-05-04", endDate: "2026-05-08", duration: 5, riskScore: 61, stateOfControl: "yellow", teamSize: 3, leadAuditor: "AUD-015", teamMembers: ["AUD-012", "AUD-007"], priority: 5, aiReasoning: "Routine audit Q2: (1) Risk score 61 — elevated, (2) Cpk declining to 1.08 — MARGINAL, (3) Critical dose uniformity finding open, (4) Cleaning validation incomplete, (5) AIFA inspection noted 2 observations" },
  { id: "AP-006", auId: "AU-003", auName: "Kinsale API Synthesis Plant", auType: "Manufacturing Site", auditType: "Routine", status: "Planned", quarter: "Q3", startDate: "2026-07-06", endDate: "2026-07-10", duration: 5, riskScore: 52, stateOfControl: "yellow", teamSize: 3, leadAuditor: "AUD-003", teamMembers: ["AUD-011", "AUD-012"], priority: 6, aiReasoning: "Routine audit Q3: (1) Risk score 52, (2) Cpk declining to 1.12 — approaching threshold, (3) Crystallization temperature control finding, (4) Facility expansion project ongoing" },
  { id: "AP-007", auId: "AU-016", auName: "Dr. Reddy's — Hyderabad, India", auType: "API Supplier", auditType: "Routine", status: "Planned", quarter: "Q3", startDate: "2026-07-20", endDate: "2026-07-24", duration: 5, riskScore: 56, stateOfControl: "yellow", teamSize: 3, leadAuditor: "AUD-003", teamMembers: ["AUD-005", "AUD-011"], priority: 7, aiReasoning: "Routine audit Q3: (1) Risk score 56, (2) Cpk declining to 1.05 — near threshold, (3) Critical process control finding, (4) CDSCO noted 2 observations" },
  { id: "AP-008", auId: "AU-007", auName: "Catalent — Bloomington, IN", auType: "CMO", auditType: "Routine", status: "Planned", quarter: "Q3", startDate: "2026-08-10", endDate: "2026-08-14", duration: 5, riskScore: 55, stateOfControl: "yellow", teamSize: 3, leadAuditor: "AUD-002", teamMembers: ["AUD-014", "AUD-010"], priority: 8, aiReasoning: "Routine audit Q3: (1) Risk score 55, (2) Cold chain management concerns, (3) FDA VAI outcome, (4) High product complexity (biologics/cell therapy)" },
  { id: "AP-009", auId: "AU-010", auName: "Eurofins — Lancaster, PA", auType: "Contract Lab", auditType: "Routine", status: "Planned", quarter: "Q3", startDate: "2026-08-24", endDate: "2026-08-26", duration: 3, riskScore: 48, stateOfControl: "yellow", teamSize: 2, leadAuditor: "AUD-005", teamMembers: ["AUD-008"], priority: 9, aiReasoning: "Routine audit Q3: (1) Risk score 48, (2) Data integrity findings, (3) FDA VAI, (4) OOS rate warrants monitoring" },
  { id: "AP-010", auId: "AU-012", auName: "Johns Hopkins Clinical Research Unit", auType: "Clinical Site", auditType: "Routine", status: "Planned", quarter: "Q3", startDate: "2026-09-07", endDate: "2026-09-09", duration: 3, riskScore: 44, stateOfControl: "green", teamSize: 2, leadAuditor: "AUD-013", teamMembers: ["AUD-006"], priority: 10, aiReasoning: "Routine audit Q3: (1) Risk score 44, (2) GCP protocol deviation finding, (3) Due for follow-up" },
  { id: "AP-011", auId: "AU-019", auName: "SAP ERP — Global Instance", auType: "IT System", auditType: "Routine", status: "Planned", quarter: "Q3", startDate: "2026-09-14", endDate: "2026-09-18", duration: 5, riskScore: 40, stateOfControl: "green", teamSize: 2, leadAuditor: "AUD-008", teamMembers: ["AUD-005"], priority: 11, aiReasoning: "Routine CSV audit Q3: (1) Risk score 40, (2) Post S/4HANA migration validation, (3) Access control segregation finding" },
  { id: "AP-012", auId: "AU-002", auName: "Cork Biologics Facility", auType: "Manufacturing Site", auditType: "Routine", status: "Planned", quarter: "Q4", startDate: "2026-10-05", endDate: "2026-10-09", duration: 5, riskScore: 45, stateOfControl: "green", teamSize: 3, leadAuditor: "AUD-015", teamMembers: ["AUD-014", "AUD-009"], priority: 12, aiReasoning: "Routine audit Q4: (1) Risk score 45, (2) Due per audit cycle, (3) Focus on warehousing and facilities systems per coverage rotation" },
  { id: "AP-013", auId: "AU-008", auName: "Samsung Biologics — Songdo", auType: "CMO", auditType: "Routine", status: "Planned", quarter: "Q4", startDate: "2026-10-19", endDate: "2026-10-23", duration: 5, riskScore: 42, stateOfControl: "green", teamSize: 3, leadAuditor: "AUD-002", teamMembers: ["AUD-014", "AUD-008"], priority: 13, aiReasoning: "Routine audit Q4: (1) Risk score 42, (2) Due per audit cycle, (3) Good compliance track record" },
  { id: "AP-014", auId: "AU-004", auName: "Fegersheim Insulin Production", auType: "Manufacturing Site", auditType: "Routine", status: "Planned", quarter: "Q4", startDate: "2026-11-02", endDate: "2026-11-06", duration: 5, riskScore: 38, stateOfControl: "green", teamSize: 3, leadAuditor: "AUD-007", teamMembers: ["AUD-009", "AUD-012"], priority: 14, aiReasoning: "Routine audit Q4: (1) Risk score 38 — low, (2) Due per audit cycle, (3) Focus on production and packaging" },
  { id: "AP-015", auId: "AU-020", auName: "Veeva Vault QMS — Global", auType: "IT System", auditType: "Routine", status: "Planned", quarter: "Q4", startDate: "2026-11-09", endDate: "2026-11-11", duration: 3, riskScore: 36, stateOfControl: "green", teamSize: 2, leadAuditor: "AUD-008", teamMembers: ["AUD-005"], priority: 15, aiReasoning: "Routine CSV audit Q4: (1) Risk score 36, (2) Post-platform upgrade validation, (3) E-signature config review" },
  { id: "AP-016", auId: "AU-009", auName: "Lonza — Visp, Switzerland", auType: "CMO", auditType: "Routine", status: "Planned", quarter: "Q4", startDate: "2026-11-16", endDate: "2026-11-20", duration: 5, riskScore: 35, stateOfControl: "green", teamSize: 2, leadAuditor: "AUD-011", teamMembers: ["AUD-003"], priority: 16, aiReasoning: "Routine audit Q4: (1) Risk score 35 — low, (2) Due per audit cycle, (3) Excellent track record" },
  { id: "AP-017", auId: "AU-017", auName: "McKesson Distribution — Memphis, TN", auType: "Distribution Center", auditType: "Routine", status: "Planned", quarter: "Q4", startDate: "2026-11-30", endDate: "2026-12-02", duration: 3, riskScore: 33, stateOfControl: "green", teamSize: 2, leadAuditor: "AUD-010", teamMembers: ["AUD-007"], priority: 17, aiReasoning: "Routine GDP audit Q4: (1) Risk score 33 — low, (2) Due per audit cycle" },
  { id: "AP-018", auId: "AU-018", auName: "Movianto — Oss, Netherlands", auType: "Distribution Center", auditType: "Routine", status: "Planned", quarter: "Q4", startDate: "2026-12-07", endDate: "2026-12-09", duration: 3, riskScore: 29, stateOfControl: "green", teamSize: 2, leadAuditor: "AUD-010", teamMembers: ["AUD-007"], priority: 18, aiReasoning: "Routine GDP audit Q4: (1) Risk score 29 — low, (2) Due per audit cycle, (3) Travel cluster with European sites" },
  { id: "AP-019", auId: "AU-011", auName: "SGS — Geneva, Switzerland", auType: "Contract Lab", auditType: "Routine", status: "Planned", quarter: "Q4", startDate: "2026-12-14", endDate: "2026-12-16", duration: 3, riskScore: 30, stateOfControl: "green", teamSize: 2, leadAuditor: "AUD-011", teamMembers: ["AUD-009"], priority: 19, aiReasoning: "Routine audit Q4: (1) Risk score 30 — low, (2) Due per audit cycle, (3) Travel cluster with Lonza Visp" },
  { id: "AP-020", auId: "AU-013", auName: "Charité Research — Berlin", auType: "Clinical Site", auditType: "Routine", status: "Planned", quarter: "Q4", startDate: "2026-12-14", endDate: "2026-12-16", duration: 3, riskScore: 37, stateOfControl: "green", teamSize: 2, leadAuditor: "AUD-004", teamMembers: ["AUD-013"], priority: 20, aiReasoning: "Routine GCP audit Q4: (1) Risk score 37 — low, (2) Due per audit cycle, (3) Strong compliance" }
];

export const planSummary = {
  totalAudits: 20,
  forCause: 3,
  routine: 17,
  q1: 3, q2: 2, q3: 6, q4: 9,
  totalAuditDays: 82,
  auditorsUtilized: 15,
  avgRiskScore: 48.4,
  highRisk: 3,
  mediumRisk: 8,
  lowRisk: 9,
  outOfControl: 3,
  marginal: 5,
  inControl: 12,
  optimizationMetrics: {
    conflictsResolved: 12,
    travelClustersCreated: 3,
    workloadVarianceBefore: 40,
    workloadVarianceAfter: 8
  }
};

export const preValidationChecks = [
  { id: 1, label: "All AUs have documented risk scores", status: "pass" },
  { id: 2, label: "No blank/missing fields in any audit record", status: "pass" },
  { id: 3, label: "All team members verified independent", status: "pass" },
  { id: 4, label: "GMP system coverage balanced across consecutive audits", status: "pass" },
  { id: 5, label: "Regulatory commitment audits scheduled before deadlines", status: "pass" },
  { id: 6, label: "All AUs with 🔴 Out of Control status prioritized in Q1/Q2", status: "pass" },
  { id: 7, label: "No auditor double-booked across overlapping audit dates", status: "pass" },
  { id: 8, label: "Travel optimization applied — regional clusters validated", status: "pass" },
  { id: 9, label: "Audit duration aligned with scope complexity", status: "pass" },
  { id: 10, label: "Senior Leader approval routing configured", status: "pass" }
];
