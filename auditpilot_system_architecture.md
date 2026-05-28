# AuditPilot — Full System Architecture & Process Flow

## Executive Summary

AuditPilot replaces the traditional manual, Excel/email-driven audit planning cycle (**weeks** of fragmented effort across 5+ disconnected systems) with a unified AI-first platform that continuously ingests quality data, computes risk scores via ML, auto-generates audit plans, and AI-assists all preparation artifacts — reducing the planning cycle to **hours** while improving risk coverage and auditability.

---

## The Three Phases

```
┌─────────────────────────┐    ┌─────────────────────────┐    ┌─────────────────────────┐
│  PHASE 1                │    │  PHASE 2                │    │  PHASE 3                │
│  Continuous Risk        │───▶│  Audit Plan Generation  │───▶│  Audit Preparation      │
│  Assessment             │    │  & Team Assignment      │    │  & Scoping              │
│                         │    │                         │    │                         │
│  Input: Raw quality     │    │  Input: Risk scores     │    │  Input: Approved plan   │
│  data from source       │    │  + resource pool +      │    │  + AU profiles +        │
│  systems                │    │  constraints            │    │  historical data        │
│                         │    │                         │    │                         │
│  Output: Ranked AU      │    │  Output: Optimized      │    │  Output: Scope, agenda  │
│  risk profiles with     │    │  annual plan with       │    │  notifications,         │
│  AI narratives          │    │  team assignments       │    │  briefing package       │
└─────────────────────────┘    └─────────────────────────┘    └─────────────────────────┘
```

---

## Phase 1: AI-Powered Continuous Risk Assessment

### What Happens

Traditional audit risk assessment is performed **once per year** using a static Excel-based risk matrix where QA managers manually score each auditable unit (AU) on 5-8 factors. This is inherently subjective, outdated by the time the plan is finalized, and blind to emerging signals.

AuditPilot replaces this with **continuous, ML-driven risk scoring** that ingests live data from quality systems and recomputes composite risk scores in near-real-time.

### Data Sources Required

| Source System                                                     | Data Extracted                                                                                                                                            | Update Frequency                       | Integration Method       |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------ |
| **QMS** (Veeva Vault QMS, TrackWise, MasterControl)               | Deviations (open, closed, severity, trending), CAPAs (open, overdue, effectiveness), Change Controls (complexity, volume), Complaints (product, trending) | Near-real-time (event-driven)          | REST API / Webhook       |
| **LIMS** (LabWare, STARLIMS, Empower)                             | OOS/OOT rates, environmental monitoring data, stability trending, analytical method failures                                                              | Daily batch or event-driven            | REST API / Database view |
| **MES/Historian** (OSIsoft PI, Emerson DeltaV)                    | Process performance data: Cpk values, batch yield, cycle times, equipment alarms, process parameter trends                                                | Continuous (streaming) or hourly batch | OPC-UA / REST API / MQTT |
| **ERP** (SAP S/4HANA, Oracle EBS)                                 | Production volumes, supplier qualification status, material traceability, batch genealogy                                                                 | Daily batch                            | SAP RFC / REST API       |
| **Regulatory Intelligence** (proprietary or Cortellis/GlobalData) | FDA 483 observations, Warning Letters, import alerts, EU non-compliance reports (for the AU's product/site type), inspection schedules                    | Weekly batch                           | Web scraping / API       |
| **Document Management** (Veeva Vault, Documentum)                 | SOP currency, training compliance, document change frequency, overdue periodic reviews                                                                    | Daily batch                            | REST API                 |
| **Audit Management System** (existing, if any)                    | Previous audit reports, findings, severity classifications, CAPA closure timelines, auditor notes                                                         | On-demand (historical)                 | Database / API           |
| **HR/Training** (SuccessFactors, Cornerstone)                     | Personnel turnover at site, training compliance rates, new hire ratios (a proxy for institutional knowledge loss)                                         | Monthly batch                          | API                      |

### The 8-Axis Risk Model

Each AU is scored on **8 risk factors**, each with a configurable weight (totaling 100%):

| #   | Risk Factor                       | Weight | What It Measures                                                                                       | Data Sources                                |
| --- | --------------------------------- | ------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| 1   | **Regulatory Inspection History** | 15%    | Prior FDA/EMA findings, 483s, Warning Letters, inspection frequency, repeat observations               | Regulatory Intelligence + Audit Mgmt System |
| 2   | **Supplier Qualification Score**  | 12%    | Qualification status, audit history, supply chain complexity, geographic risk                          | ERP + QMS + Regulatory Intel                |
| 3   | **Historical Audit Findings**     | 14%    | Volume/severity of prior audit observations, CAPA closure rates, repeat findings                       | Audit Management System                     |
| 4   | **Process Performance**           | 15%    | Cpk indices, batch success rates, yield trending, equipment reliability                                | MES/Historian + LIMS                        |
| 5   | **Deviation & CAPA Trends**       | 14%    | Open deviation volume, CAPA overdue %, root cause adequacy, trending direction                         | QMS                                         |
| 6   | **Change Control Complexity**     | 10%    | Volume of changes, complexity (major/minor), change clustering, impact scope                           | QMS                                         |
| 7   | **Product Criticality**           | 12%    | Product type (sterile vs. oral solid), patient population, market importance, supply chain criticality | ERP + Business context                      |
| 8   | **Environmental / External Risk** | 8%     | Geopolitical risk, natural disaster exposure, pandemic impact, regulatory climate changes              | External data + Regulatory Intel            |

### ML Scoring Algorithm

**In the demo**: The composite risk score is a **weighted linear combination** — we pre-calculated each factor score (0-100) and applied weights.

**In production**: The scoring would use a **Gradient Boosted Decision Tree** (XGBoost/LightGBM) trained on:

- **Features**: All 8 raw factor scores + 50+ sub-features extracted from source systems
- **Labels**: Expert QA assessments of historical risk levels + actual audit outcomes (findings predited correctly vs. not)
- **Calibration**: Platt scaling to produce calibrated probability scores (the "AI Confidence %" you see in the UI)
- **Retraining**: Monthly retraining on new data, with A/B comparison against the current production model
- **Explainability**: SHAP values to generate the factor-level breakdown shown in the spider chart

### State of Control Classification

This is a pharma GMP-specific concept (ICH Q10 / EU Annex 15):

| State                 | Criteria                                                        | Visual |
| --------------------- | --------------------------------------------------------------- | ------ |
| 🟢 **In Control**     | Cpk ≥ 1.33, OOS < 1%, no critical deviations, batch yield ≥ 97% | Green  |
| 🟡 **Marginal**       | Cpk 1.0-1.33, OOS 1-2%, non-critical deviations trending up     | Amber  |
| 🔴 **Out of Control** | Cpk < 1.0, OOS > 2%, critical deviations open, yield declining  | Red    |

### NLP-Generated Risk Narratives

The "AI Risk Intelligence Summary" shown for each AU is generated by an **LLM** (GPT-4 / Claude / Gemini) that receives:

- The structured risk factor scores
- Recent deviation/CAPA summaries from the QMS
- Process performance snapshots from MES
- Prior audit observation text from the AMS
- Regulatory intelligence alerts

The LLM synthesizes these into a coherent narrative explaining **why** the risk score is what it is, what's driving it, and what to watch. This is critical for QA directors who need human-readable context, not just numbers.

### Real-Time Alerts

Event-driven alerts triggered by:

- Risk score increase > 10 points in 30 days
- New critical deviation opened
- State of Control status change (green → yellow, yellow → red)
- CAPA overdue threshold exceeded
- Regulatory inspection announced for an AU
- OOS rate exceeding action limit

**Architecture**: Source system webhooks → Message queue (Kafka/RabbitMQ) → Alert engine → Push notification to UI + email

---

## Phase 2: AI-Optimized Audit Plan Generation

### What Happens

Traditionally, a QA VP or Head of Audit spends **2-4 weeks** building the annual audit plan in Excel: manually selecting which AUs to audit, deciding audit types (routine vs. for-cause), scheduling across quarters, assigning teams by checking availability via email, and routing through 5-7 approval gates.

AuditPilot generates a **complete draft plan in minutes** by solving this as a multi-objective optimization problem.

### Input Data

| Input                  | Source                       | Purpose                                                                 |
| ---------------------- | ---------------------------- | ----------------------------------------------------------------------- |
| AU Risk Rankings       | Phase 1 output               | Determines priority, audit type, and frequency                          |
| Regulatory Commitments | QMS / Regulatory Affairs     | Must-do audits (e.g., pre-approval inspections, annual GMP requirement) |
| Auditor Pool           | HR + Audit Management System | Who's available, what they're skilled in, their certifications          |
| Calendar Constraints   | HR / Travel system           | Public holidays, blackout dates, audit moratoriums                      |
| Travel Logistics       | Travel management system     | Site locations, travel time, cost optimization                          |
| Budget                 | Finance / ERP                | Total audit days budget, travel budget constraints                      |
| Previous Audit Dates   | Audit Management System      | Last audit date per AU — drives frequency requirements                  |

### Optimization Algorithm

The plan generation solves a **constrained multi-objective optimization** (in production, using OR-Tools, Gurobi, or a custom genetic algorithm):

**Objectives** (to maximize/minimize):

1. **Risk coverage**: High-risk AUs get audited first and more frequently
2. **Workload balance**: Even distribution across auditors and quarters
3. **Travel efficiency**: Cluster geographically proximate audits (e.g., 3 sites in Germany in the same trip)
4. **Cost minimization**: Minimize total travel days and associated costs

**Hard constraints**:

- All "Out of Control" AUs must be audited (for-cause)
- All AUs with risk > 60 must be audited at least annually
- Regulatory commitment audits are non-negotiable
- No auditor conflicts of interest (e.g., auditor previously employed at site)
- No auditor exceeds max annual workload (configurable, e.g., 8 audits/year)
- Independence requirements: auditor cannot audit same site 2 consecutive years

**Soft constraints** (penalized but not forbidden):

- Avoid scheduling audits during site shutdowns
- Prefer experienced auditors for complex audits
- Prefer local auditors for routine audits (reduce travel)

### AI Team Matching

For each planned audit, the algorithm picks the optimal team using a **weighted multi-factor score**:

| Factor                | Weight | How Scored                                                                                                                      |
| --------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **Skill Match**       | 30%    | Overlap between auditor's skills/certs and AU's required expertise (e.g., sterile manufacturing, data integrity, API synthesis) |
| **Experience Level**  | 20%    | Years of experience, total audits conducted, specific experience with AU type                                                   |
| **Availability**      | 20%    | Is the auditor free during the planned dates? No scheduling conflicts?                                                          |
| **Independence**      | 15%    | No conflict of interest, meets independence rotation requirements                                                               |
| **Travel Efficiency** | 10%    | Is the auditor already traveling to a nearby site that quarter?                                                                 |
| **Language/Region**   | 5%     | Language capabilities, regional regulatory expertise                                                                            |

### Pre-Validation Checks

Before the plan is presented to the user, the AI runs **automated validation**:

1. ✅ All high-risk AUs covered (risk > 60 → audit scheduled)
2. ✅ Regulatory commitment audits included (all mandatory audits present)
3. ✅ No auditor independence violations (conflict checks passed)
4. ✅ Workload balanced (variance < 15% across auditors)
5. ✅ Travel clusters optimized (geographic grouping where possible)
6. ✅ No scheduling conflicts (no overlapping assignments)
7. ✅ Budget within limits (total audit days ≤ allocated budget)
8. ✅ All required competencies covered (each team has necessary expertise)
9. ✅ Frequency requirements met (based on risk tier → audit cycle mapping)
10. ✅ No blackout date violations

### Approval Workflow

```
AI Generates Plan  ──▶  QA Manager Review  ──▶  Head of QA Approval  ──▶  VP Quality Sign-off
      │                       │                        │                        │
   [Draft]            [Can modify,            [Reviews AI              [Final e-signature
                       override teams,         reasoning, validates     with 21 CFR Part 11
                       adjust dates]           completeness]            compliance]
```

Each approval step creates an **audit trail entry** with timestamp, user ID, action, and any comments — critical for regulatory compliance.

---

## Phase 3: AI-Assisted Audit Preparation

### What Happens

After the plan is approved, each individual audit needs preparation: defining scope, drafting agendas, notifying stakeholders, and compiling briefing packages. Traditionally this takes **3-5 days per audit** of manual document compilation.

AuditPilot auto-generates all preparation artifacts using AI + data from the same source systems.

### AI Scope Generation

The scope document is generated by combining:

1. **Risk profile** from Phase 1 (which factors are driving the risk)
2. **Open findings** from prior audits (what needs follow-up)
3. **GMP systems matrix**: Which quality systems were covered last time vs. which are due (rotating coverage model)
4. **Regulatory commitments**: Any specific inspection readiness items
5. **Process performance alerts**: Any KPIs that have deteriorated

The AI (LLM) synthesizes all of this into a structured scope narrative, with:

- Scope objectives
- GMP systems to cover (with priority)
- Specific focus areas driven by risk data
- Open items requiring verification
- Exclusions (what's out of scope, with justification)

### AI Agenda Generation

The daily agenda is generated by an optimization algorithm that considers:

- **Activities needed** based on scope (document reviews, interviews, walkthroughs, etc.)
- **Logical sequencing** (facility tour first, then document review of what was observed)
- **Personnel availability** at the audit site (e.g., QA Director interview time)
- **Activity durations** based on historical audit data (how long does a typical EM data review take?)
- **Breaks and logistics** (realistic daily structure)

### Automated Notifications

AI drafts context-specific emails for:

- **Site Quality Director**: Formal audit notification with logistics requirements, document preparation requests, and access needs
- **Audit Team Members**: Assignment notification with scope summary, travel instructions, and briefing package link
- **Qualified Person** (EU requirement): Awareness notification
- **Site management**: Logistics coordination

Each email is generated by the LLM using templates + audit-specific context, then presented for human review before sending. The draft emails are populated with:

- Correct names, titles, dates
- Specific document/data requests based on the audit scope
- Appropriate formality level per recipient type

### Intelligent Briefing Package

The briefing package is auto-compiled from source systems:

| Section                 | Source                  | Content                                                              |
| ----------------------- | ----------------------- | -------------------------------------------------------------------- |
| AU Profile              | ERP + QMS + Master Data | Site overview, products manufactured, regulatory licenses, org chart |
| Risk Summary            | Phase 1 output          | AI narrative, spider chart snapshot, factor breakdown                |
| Process Performance     | MES/LIMS                | Cpk trends, batch yield analysis, OOS rate charts                    |
| Previous Audit Report   | Audit Mgmt System       | Prior findings (AI-extracted summaries), CAPA status                 |
| Open CAPAs              | QMS                     | Full CAPA details with effectiveness check status                    |
| Regulatory Intelligence | External sources        | Recent FDA/EMA actions for similar product types/sites               |
| Key Contacts            | HR + Site directory     | Names, titles, contact details for key site personnel                |
| Logistics               | Travel system           | Flight bookings, hotel, site access procedures, badge requirements   |

---

## Key Assumptions Made in the Demo

| #   | Assumption                         | Reality                                                                                                                                         |
| --- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Risk scores are pre-calculated** | In production, scores would be continuously computed from live data                                                                             |
| 2   | **20 AUs are representative**      | A typical pharma company has 50-200+ AUs depending on supply chain complexity                                                                   |
| 3   | **ML model exists and is trained** | Building the ML model requires 2-3 years of historical audit data + expert labeling                                                             |
| 4   | **All data is accessible via API** | In reality, many pharma companies run on-prem legacy systems (LIMS from the 90s, MES that predates REST APIs) — integration is the hardest part |
| 5   | **Cpk/process data is available**  | Not all AU types have Cpk (e.g., contract labs, IT systems) — the model handles this with type-specific scoring                                 |
| 6   | **NLP narratives are pre-written** | In production, these are LLM-generated per-AU based on live data                                                                                |
| 7   | **Optimization runs in seconds**   | Real optimization with 200+ AUs, 50+ auditors, and complex constraints might take minutes                                                       |
| 8   | **Single-tenant deployment**       | Production would need multi-tenant architecture with role-based access                                                                          |
| 9   | **Audit trail is implied**         | Production needs full 21 CFR Part 11 compliant audit trail (every click, every change)                                                          |
| 10  | **Email sending is simulated**     | Would integrate with Exchange/O365 API or SMTP relay in production                                                                              |

---

## Integration Architecture (Production Vision)

```
                         ┌─────────────────────────────────────────┐
                         │           AuditPilot Platform            │
                         │  ┌──────────┐ ┌──────────┐ ┌─────────┐ │
                         │  │ Risk     │ │ Plan     │ │ Prep    │ │
                         │  │ Engine   │ │ Optimizer│ │ AI      │ │
                         │  └────┬─────┘ └────┬─────┘ └────┬────┘ │
                         │       │             │            │      │
                         │  ┌────▼─────────────▼────────────▼────┐ │
                         │  │        Unified Data Lake            │ │
                         │  │   (Snowflake / Databricks / Azure) │ │
                         │  └────┬────────────┬─────────────┬────┘ │
                         └───────┼────────────┼─────────────┼──────┘
                                 │            │             │
              ┌──────────────────┼────────────┼─────────────┼──────────────────┐
              │                  │            │             │                  │
    ┌─────────▼──┐    ┌─────────▼──┐   ┌─────▼────┐  ┌────▼──────┐   ┌───────▼────┐
    │    QMS     │    │    LIMS    │   │   MES    │  │   ERP    │   │  Regulatory│
    │ TrackWise/ │    │ LabWare/  │   │  OSIsoft │  │  SAP/    │   │  Intel DB  │
    │ Veeva Vault│    │ STARLIMS  │   │  PI/DeltaV│  │  Oracle  │   │  Cortellis │
    └────────────┘    └───────────┘   └──────────┘  └──────────┘   └────────────┘
```

---

## Nano Banana Pro — Process Flow Diagram Prompt

> [!IMPORTANT]
> Use the prompt below in Nano Banana Pro to generate the full system/process flow diagram.

```
Create a detailed, professional process flow diagram for "AuditPilot" — an AI-augmented pharmaceutical audit planning platform. The diagram should be horizontal, flowing left to right across three major phases, with a modern dark navy (#1B2A4A) background and teal (#00ACC1) accent colors. Use clean, rounded rectangles for process steps and database cylinder icons for data sources.

PHASE 1 — AI-POWERED CONTINUOUS RISK ASSESSMENT (left section, labeled with a red-orange header):

Data Sources (bottom layer, shown as cylinder/database icons feeding upward):
- QMS (Veeva Vault / TrackWise): Deviations, CAPAs, Change Controls, Complaints
- LIMS (LabWare / STARLIMS): OOS/OOT rates, EM data, stability trending
- MES / Historian (OSIsoft PI): Cpk, batch yield, process parameters, equipment data
- ERP (SAP): Supplier qualification, production volumes, material traceability
- Regulatory Intelligence: FDA 483s, Warning Letters, inspection schedules
- Document Management: SOP currency, training compliance
- HR/Training: Personnel turnover, training compliance rates

These data sources feed into a central "Data Ingestion & Normalization Layer" (shown as a wide horizontal bar).

From the ingestion layer, data flows into the "ML Risk Scoring Engine" (prominent AI-styled box with a sparkle/brain icon):
- 8-Axis Risk Model shown as a small spider/radar chart icon
- Outputs: Composite Risk Score (0-100) per AU, AI Confidence %, State of Control classification (green/yellow/red)
- Side output: NLP Risk Narrative Generation (LLM) producing human-readable summaries

The ML engine outputs to a "Dynamic Risk Dashboard" showing a ranked list of 20 AUs with risk scores, plus a "Real-Time Alert Engine" that generates critical/high/medium alerts.

An arrow labeled "Human Override" loops back from the dashboard to the risk scores, showing a QA manager can adjust scores with justification (audit trail logged).

PHASE 2 — AI-OPTIMIZED AUDIT PLAN GENERATION (middle section, labeled with an orange header):

Input from Phase 1: Ranked AU risk profiles flow into Phase 2.

Additional inputs entering from the top:
- Auditor Pool Database (15+ auditors with skills, certifications, availability, conflicts)
- Regulatory Commitments (mandatory audits)
- Calendar & Budget Constraints

These feed into the "Multi-Objective Optimization Engine" (prominent box with gear/algorithm icon):
- Objectives listed: Risk Coverage, Workload Balance, Travel Efficiency, Cost Minimization
- Constraints listed: Independence rules, max workload, regulatory mandates

The optimizer produces:
1. "Draft Annual Audit Plan" — show as a Gantt chart icon with 20 audit bars across Q1-Q4
2. "AI Team Matching" — show auditor-to-audit assignments with match % scores
3. "Pre-Validation Checks" — a checklist of 10 automated validations (all green checkmarks)

Below the plan output, show an "Optimization Results" callout: "3 conflicts resolved, 4 travel clusters created, workload variance reduced from 40% to 8%"

The plan flows into an "Approval Workflow" (4 sequential steps with checkmarks):
QA Manager Review → Head of QA Approval → VP Quality Sign-off → Plan Finalized
Each step has an audit trail icon (21 CFR Part 11 compliant e-signature).

PHASE 3 — AI-ASSISTED AUDIT PREPARATION (right section, labeled with a green header):

Input from Phase 2: Approved plan entries flow into Phase 3, one audit at a time.

The preparation engine (LLM-powered, show with AI/sparkle icon) generates 4 outputs in parallel:

1. "AI-Generated Audit Scope" — document icon showing: scope narrative, GMP systems to cover (with priority), process performance focus areas, open items from prior audits, regulatory commitments
2. "AI-Drafted Agenda" — calendar icon showing: 3-5 day daily schedule with interviews, document reviews, facility walkthroughs, team debriefs, color-coded by activity type
3. "Automated Notifications" — email icon showing: site notification, team assignment, QP awareness, each AI-drafted and human-reviewed before sending
4. "Intelligent Briefing Package" — package/folder icon showing: AU profile, risk summary, process performance data, previous audit report, open CAPAs, regulatory intelligence, key contacts, logistics

All 4 outputs flow into "Lead Auditor Review & Approval" (human-in-the-loop step with edit capability).

Final output: "Audit Ready" — a green checkmark badge indicating the audit is fully prepared for execution.

OVERALL STYLING:
- Professional enterprise look, pharma/healthcare aesthetic
- Use consistent color coding: red for high risk, amber for medium, green for low/complete
- AI/ML elements should have a purple (#7C4DFF) glow or accent
- Show data flow arrows as clean lines with directional indicators
- Include a legend showing: Data Source, AI/ML Process, Human Decision Point, Output/Artifact
- Add a compliance banner at the bottom: "21 CFR Part 11 | EU Annex 11 | Full Audit Trail | Electronic Signatures"
- Title at top: "AuditPilot — AI-Augmented Intelligent Audit Planning Platform"
- Subtitle: "End-to-End System Architecture & Process Flow"
```

---

## Data Flow Summary (Machine-Readable)

For reference, here is the complete data flow in structured form:

```
SOURCE SYSTEMS
    ├── QMS ──────────────┐
    ├── LIMS ─────────────┤
    ├── MES/Historian ─────┤──▶ DATA INGESTION LAYER ──▶ UNIFIED DATA LAKE
    ├── ERP ──────────────┤
    ├── Regulatory Intel ──┤
    ├── DMS ──────────────┤
    └── HR/Training ───────┘
                                        │
                                        ▼
                              ML RISK SCORING ENGINE
                              ├── 8-Axis Factor Model
                              ├── Gradient Boost Classifier
                              ├── SHAP Explainability
                              └── NLP Narrative Generator (LLM)
                                        │
                                        ▼
                              RISK DASHBOARD + ALERTS
                              ├── Ranked AU Table (20+ AUs)
                              ├── State of Control (🟢🟡🔴)
                              ├── Real-Time Alert Feed
                              └── Human Override (with audit trail)
                                        │
                        ┌───────────────┘
                        │    + Auditor Pool
                        │    + Regulatory Commitments
                        │    + Calendar/Budget Constraints
                        ▼
                  PLAN OPTIMIZATION ENGINE
                  ├── Multi-objective solver
                  ├── Team matching algorithm
                  ├── Pre-validation checks (10)
                  └── Schedule optimization
                        │
                        ▼
                  APPROVAL WORKFLOW (3 gates)
                  ├── QA Manager Review
                  ├── Head of QA Approval
                  └── VP Quality Sign-off (e-signature)
                        │
                        ▼
                  AI PREPARATION ENGINE (per audit)
                  ├── Scope Generation (LLM)
                  ├── Agenda Drafting (Optimizer + LLM)
                  ├── Notification Drafting (LLM)
                  └── Briefing Package Compilation (data aggregation)
                        │
                        ▼
                  LEAD AUDITOR REVIEW
                        │
                        ▼
                  ✅ AUDIT READY FOR EXECUTION
```
