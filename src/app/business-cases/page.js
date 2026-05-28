'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert, Calendar, FileText, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle2, Clock, DollarSign, Users, Zap,
  ArrowRight, ChevronRight, Sparkles, Target, Award, Shield
} from 'lucide-react';

const useCases = [
  {
    id: 1,
    tag: 'HIGHEST IMPACT',
    tagColor: '#E53935',
    icon: '🛡️',
    title: 'Preventing Regulatory Enforcement Through Early Signal Detection',
    subtitle: 'Continuous cross-system monitoring catches deteriorating quality signals months before annual reviews',
    value: '$50M–$500M',
    valueLabel: 'Risk Avoidance per Event',
    buyer: 'VP/SVP Quality',
    buyerQuote: '"Show me how this prevents the next Warning Letter."',
    demoLink: '/risk-assessment',
    demoLabel: 'See Live Risk Monitoring →',
    timeline: [
      { month: 'Month 1', event: 'EM excursions spike from 2/mo to 5/mo', system: 'LIMS', withTool: 'Alert fires: "EM excursion rate increased 150%"', withoutTool: 'No visibility — data sits in LIMS', riskDelta: '+6' },
      { month: 'Month 2', event: 'Cpk drops from 1.28 → 1.05', system: 'MES', withTool: 'State of Control shifts 🟢→🟡. AI correlates with EM excursions.', withoutTool: 'QA has no MES access — signal invisible', riskDelta: '+8' },
      { month: 'Month 3', event: 'OOS result on batch release', system: 'QMS', withTool: 'State of Control shifts 🟡→🔴. Auto-recommends for-cause audit.', withoutTool: 'OOS investigated in isolation', riskDelta: '+12' },
      { month: 'Month 4', event: 'Gowning qualification failures', system: 'QMS', withTool: 'QA VP approves re-prioritization. Team assigned.', withoutTool: 'Deviation logged — not linked to pattern', riskDelta: '+5' },
      { month: 'Month 5', event: 'Second OOS + overdue CAPA', system: 'QMS', withTool: 'For-cause audit executed. Root cause found.', withoutTool: 'Still 4 months until scheduled routine audit', riskDelta: '+7' },
      { month: 'Month 8', event: 'FDA inspection of CMO', system: 'FDA', withTool: '✅ CAPAs 80% implemented. Clean inspection.', withoutTool: '❌ 483 with 6 observations → Warning Letter', riskDelta: '—' },
    ],
    beforeAfter: [
      { metric: 'Time to detect emerging risk', before: '8+ months', after: '2–4 weeks' },
      { metric: 'Response type', before: 'Reactive (after FDA 483)', after: 'Proactive (for-cause audit)' },
      { metric: 'Supply disruption', before: '$50–100M+', after: 'Avoided entirely' },
      { metric: 'Regulatory exposure', before: 'Warning Letter', after: 'Clean inspection' },
      { metric: 'Drug shortage risk', before: 'Possible', after: 'No impact' },
    ],
    contextStats: [
      { label: 'Consent Decree Avg Cost', value: '$300M–$1B+', examples: 'Ranbaxy: $500M, J&J McNeil: $900M' },
      { label: 'Warning Letter Cost', value: '$20–50M', examples: 'Remediation + lost opportunity' },
      { label: 'CMO Re-qualification', value: '12–18 months', examples: 'Timeline to qualify alternative' },
    ],
  },
  {
    id: 2,
    tag: 'MOST TANGIBLE',
    tagColor: '#FF6D00',
    icon: '📋',
    title: 'Transforming the Annual Audit Planning Cycle',
    subtitle: 'Replace 6 weeks of Excel/email-driven planning with an AI-optimized workflow completed in hours',
    value: '$200K–$400K',
    valueLabel: 'Annual Savings',
    buyer: 'Head of QA / Audit Director',
    buyerQuote: '"I spend 6 weeks building a plan that\'s outdated by March."',
    demoLink: '/audit-plan',
    demoLabel: 'Generate an Audit Plan →',
    manualProcess: [
      { week: 'Week 1', activity: 'Data Collection', pain: 'Email 12 site QA directors. Chase non-responders. Manual data from 5+ systems.', hours: 40 },
      { week: 'Week 2', activity: 'Risk Scoring', pain: 'Manually score 150 AUs in Excel. Subjective judgment. No Cpk data.', hours: 32 },
      { week: 'Week 3', activity: 'Risk Review Meeting', pain: '8 people × 3 hours. No objective prioritization basis. Decision paralysis.', hours: 24 },
      { week: 'Week 4', activity: 'Calendar Building', pain: 'Check auditor availability via email. Scheduling puzzle. No travel optimization.', hours: 40 },
      { week: 'Week 5', activity: 'Team Assignment', pain: 'Manual independence checks. Occasionally wrong — requiring costly re-audits.', hours: 32 },
      { week: 'Week 6', activity: 'Approval Routing', pain: 'Sequential gates: 2–5 days each. VP traveling. Plan finalized late January.', hours: 72 },
    ],
    aiProcess: [
      { step: 'Risk Scores Current', time: '0 min', desc: 'Continuous monitoring — no data collection sprint needed' },
      { step: 'Generate Draft Plan', time: '4 min', desc: 'AI optimizes 150 AUs × 22 auditors × 52 weeks' },
      { step: 'Review AI Output', time: '60 min', desc: 'Review Gantt chart, check AI reasoning, adjust 3 audits' },
      { step: 'Pre-Validation', time: '2 min', desc: '10 automated checks: coverage, independence, workload, budget' },
      { step: 'Approval Workflow', time: '90 min', desc: 'Digital e-signature workflow with full audit trail' },
    ],
    beforeAfter: [
      { metric: 'Planning cycle time', before: '6 weeks', after: '1–3 days' },
      { metric: 'Person-hours consumed', before: '~240 hours', after: '~8 hours' },
      { metric: 'Travel optimization', before: 'None', after: 'Geographic clustering (15–25% savings)' },
      { metric: 'Workload variance', before: '30–40%', after: '<10%' },
      { metric: 'Independence errors', before: '1–2/year', after: 'Zero' },
      { metric: 'Plan adaptability', before: 'Static (annual)', after: 'Dynamic (auto-adjusts)' },
    ],
  },
  {
    id: 3,
    tag: 'EASIEST TO PILOT',
    tagColor: '#43A047',
    icon: '📝',
    title: 'Audit Preparation Acceleration & Quality Standardization',
    subtitle: 'AI generates scope documents, agendas, notifications, and briefing packages in seconds instead of days',
    value: '$93K–$175K',
    valueLabel: 'Annual Savings',
    buyer: 'Lead Auditors',
    buyerQuote: '"I spend more time preparing for audits than conducting them."',
    demoLink: '/audit-preparation',
    demoLabel: 'See AI Preparation →',
    prepActivities: [
      { activity: 'Define Audit Scope', manualHours: '4–8 hrs', aiTime: '15 min review', what: 'Review 30-page prior report, check open CAPAs, decide GMP systems, write scope document' },
      { activity: 'Draft Agenda', manualHours: '2–4 hrs', aiTime: '10 min review', what: 'Day-by-day schedule, coordinate interview slots, balance reviews with walkthroughs' },
      { activity: 'Notify Stakeholders', manualHours: '1–2 hrs', aiTime: '5 min review', what: 'Draft formal notifications, send team assignments, request documents' },
      { activity: 'Compile Briefing Package', manualHours: '4–8 hrs', aiTime: '10 min review', what: 'Pull AU profile, extract risk data, print prior findings, check CAPAs, compile package' },
    ],
    qualityImpact: [
      { dimension: 'Scope coverage', before: 'Varies by auditor', after: 'Systematic: all CAPAs verified, all risk drivers addressed' },
      { dimension: 'Process performance data', before: 'Rarely included', after: 'Always included: Cpk, yield, OOS auto-pulled' },
      { dimension: 'Briefing completeness', before: '40–60% of ideal', after: '95%+ completeness' },
      { dimension: 'Regulatory intelligence', before: 'Ad hoc', after: 'Systematically scanned' },
    ],
    beforeAfter: [
      { metric: 'Prep time per audit', before: '12–22 hours', after: '~45 minutes' },
      { metric: 'Annual prep effort (55 audits)', before: '660–1,210 hours', after: '~42 hours' },
      { metric: 'FTE equivalent', before: '0.3–0.6 FTEs', after: '<0.02 FTEs' },
      { metric: 'Scope completeness', before: '50–80%', after: '>95%' },
      { metric: 'Time to first audit', before: '2–3 weeks', after: '2–3 days' },
    ],
  },
];

function TimelineViz({ timeline }) {
  return (
    <div style={{ position: 'relative', padding: '0 0 0 24px' }}>
      <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 2, background: 'var(--border-color)' }} />
      {timeline.map((t, i) => (
        <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16, position: 'relative' }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
            background: i === timeline.length - 1 ? (t.withTool.startsWith('✅') ? '#43A047' : '#E53935') : 'var(--bg-card)',
            border: `2px solid ${i === timeline.length - 1 ? 'transparent' : 'var(--border-color)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
            position: 'absolute', left: -24, zIndex: 1,
            color: i === timeline.length - 1 ? '#fff' : 'var(--text-muted)',
          }}>
            {i + 1}
          </div>
          <div style={{ flex: 1, marginLeft: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{t.month}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="badge" style={{ background: 'rgba(41,121,255,0.1)', color: '#2979FF', fontSize: 9 }}>{t.system}</span>
                {t.riskDelta !== '—' && (
                  <span className="badge" style={{ background: 'rgba(229,57,53,0.1)', color: '#E53935', fontSize: 9 }}>Risk {t.riskDelta}</span>
                )}
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 8 }}>{t.event}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(67,160,71,0.04)', border: '1px solid rgba(67,160,71,0.12)', fontSize: 11, color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#43A047', marginBottom: 3 }}>✅ WITH AUDITPILOT</div>
                {t.withTool}
              </div>
              <div style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(229,57,53,0.03)', border: '1px solid rgba(229,57,53,0.1)', fontSize: 11, color: 'var(--text-muted)' }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#E53935', marginBottom: 3 }}>❌ WITHOUT</div>
                {t.withoutTool}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function UseCaseCard({ uc, isExpanded, onToggle }) {
  return (
    <div className="card" style={{ overflow: 'hidden', marginBottom: 20 }}>
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          padding: '24px 28px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: isExpanded ? `${uc.tagColor}04` : 'transparent',
          borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none',
          transition: 'all 0.2s',
        }}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flex: 1 }}>
          <div style={{ fontSize: 36 }}>{uc.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span className="badge" style={{ background: `${uc.tagColor}15`, color: uc.tagColor, fontSize: 9, fontWeight: 700, letterSpacing: '0.5px' }}>{uc.tag}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Use Case {uc.id}</span>
            </div>
            <h3 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700 }}>{uc.title}</h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{uc.subtitle}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: uc.tagColor }}>{uc.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{uc.valueLabel}</div>
          </div>
          <ChevronRight size={20} style={{ color: 'var(--text-muted)', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ padding: '24px 28px' }} className="stagger-children">
          {/* Buyer context */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, padding: '14px 20px', background: 'var(--bg-primary)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>PRIMARY BUYER</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{uc.buyer}</div>
            </div>
            <div style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--text-secondary)', maxWidth: 400, textAlign: 'right' }}>
              {uc.buyerQuote}
            </div>
          </div>

          {/* Use Case 1: Signal Detection Timeline */}
          {uc.id === 1 && (
            <>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Signal Detection Timeline — Sterile CMO Scenario</h4>
              <TimelineViz timeline={uc.timeline} />

              <h4 style={{ fontSize: 14, fontWeight: 700, margin: '24px 0 12px' }}>Regulatory Enforcement Cost Context</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                {uc.contextStats.map(s => (
                  <div key={s.label} style={{ padding: 16, borderRadius: 10, background: 'rgba(229,57,53,0.03)', border: '1px solid rgba(229,57,53,0.1)', textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#E53935', marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{s.examples}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Use Case 2: Manual Process Breakdown */}
          {uc.id === 2 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#E53935' }}>❌ Current: The 6-Week Marathon</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {uc.manualProcess.map(p => (
                      <div key={p.week} style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(229,57,53,0.03)', border: '1px solid rgba(229,57,53,0.08)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 700 }}>{p.week}: {p.activity}</span>
                          <span style={{ fontSize: 11, color: '#E53935', fontWeight: 600 }}>{p.hours}h</span>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.pain}</div>
                      </div>
                    ))}
                    <div style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(229,57,53,0.08)', textAlign: 'center' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#E53935' }}>Total: ~240 person-hours over 6 weeks</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#43A047' }}>✅ With AuditPilot: 4 Hours</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {uc.aiProcess.map((p, i) => (
                      <div key={i} style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(67,160,71,0.04)', border: '1px solid rgba(67,160,71,0.1)', display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(67,160,71,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#43A047', flexShrink: 0 }}>{i + 1}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, fontWeight: 600 }}>{p.step}</span>
                            <span style={{ fontSize: 11, color: '#43A047', fontWeight: 600 }}>{p.time}</span>
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.desc}</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(67,160,71,0.08)', textAlign: 'center' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#43A047' }}>Total: ~8 person-hours in 1 day</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Use Case 3: Prep Activities */}
          {uc.id === 3 && (
            <>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Preparation Activities: Manual vs. AI-Assisted</h4>
              <div className="card" style={{ overflow: 'hidden', marginBottom: 24 }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th style={{ color: '#E53935' }}>Manual Time</th>
                      <th style={{ color: '#43A047' }}>With AuditPilot</th>
                      <th>What's Involved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uc.prepActivities.map(a => (
                      <tr key={a.activity}>
                        <td style={{ fontWeight: 600, fontSize: 13 }}>{a.activity}</td>
                        <td style={{ color: '#E53935', fontWeight: 600 }}>{a.manualHours}</td>
                        <td style={{ color: '#43A047', fontWeight: 600 }}>{a.aiTime}</td>
                        <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.what}</td>
                      </tr>
                    ))}
                    <tr style={{ background: 'rgba(67,160,71,0.04)' }}>
                      <td style={{ fontWeight: 700 }}>Total per Audit</td>
                      <td style={{ color: '#E53935', fontWeight: 700 }}>12–22 hours</td>
                      <td style={{ color: '#43A047', fontWeight: 700 }}>~45 minutes</td>
                      <td style={{ fontWeight: 600, color: '#43A047' }}>95% reduction</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Quality Standardization Impact</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
                {uc.qualityImpact.map(q => (
                  <div key={q.dimension} style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{q.dimension}</div>
                    <div style={{ display: 'flex', gap: 4, fontSize: 11 }}>
                      <span style={{ color: '#E53935' }}>❌ {q.before}</span>
                      <span style={{ color: 'var(--text-muted)' }}>→</span>
                      <span style={{ color: '#43A047' }}>✅ {q.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Before/After Table — all use cases */}
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Impact Summary</h4>
          <div className="card" style={{ overflow: 'hidden', marginBottom: 20 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th style={{ color: '#E53935' }}>Without AuditPilot</th>
                  <th style={{ color: '#43A047' }}>With AuditPilot</th>
                </tr>
              </thead>
              <tbody>
                {uc.beforeAfter.map(b => (
                  <tr key={b.metric}>
                    <td style={{ fontWeight: 500 }}>{b.metric}</td>
                    <td style={{ background: 'rgba(229,57,53,0.03)', color: '#E53935' }}>{b.before}</td>
                    <td style={{ background: 'rgba(67,160,71,0.03)', color: '#43A047', fontWeight: 600 }}>{b.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href={uc.demoLink} className="btn btn-ai" style={{ textDecoration: 'none' }}>
              <Sparkles size={14} /> {uc.demoLabel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BusinessCasesPage() {
  const [expanded, setExpanded] = useState(1);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="badge" style={{ background: 'rgba(124,77,255,0.1)', color: '#7C4DFF', fontSize: 10, fontWeight: 600 }}>CLIENT DEMO</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Business Cases</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, maxWidth: 700 }}>
          Three concrete, quantified use cases demonstrating how AuditPilot transforms pharmaceutical audit planning — from risk detection to execution readiness.
        </p>
      </div>

      {/* Value Summary Banner */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        padding: '20px 24px', marginBottom: 28,
        background: 'linear-gradient(135deg, rgba(27,42,74,0.03), rgba(0,131,143,0.03))',
        border: '1px solid var(--border-color)', borderRadius: 14,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Risk Avoidance</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#E53935' }}>$50M–$500M</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Per enforcement event avoided</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Operational Savings</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#00838F' }}>$293K–$575K</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Annual (Use Cases 2+3)</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Planning Time</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#7C4DFF' }}>6 wks → 1 day</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>97% reduction</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Prep Time per Audit</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#43A047' }}>22h → 45min</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>95% reduction</div>
        </div>
      </div>

      {/* Use Cases */}
      {useCases.map(uc => (
        <UseCaseCard
          key={uc.id}
          uc={uc}
          isExpanded={expanded === uc.id}
          onToggle={() => setExpanded(expanded === uc.id ? null : uc.id)}
        />
      ))}

      {/* ROI Summary */}
      <div className="card" style={{ padding: 24, marginBottom: 20, background: 'linear-gradient(135deg, rgba(124,77,255,0.03), rgba(0,131,143,0.03))', border: '1px solid rgba(124,77,255,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Sparkles size={18} style={{ color: '#7C4DFF' }} />
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>The Asymmetric Business Case</h3>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 16px', maxWidth: 800 }}>
          The operational savings from Use Cases 2 and 3 (<strong>$293K–$575K/year</strong>) alone justify the platform cost at 1–2x ROI. But Use Case 1 — preventing even a <em>single</em> regulatory enforcement action over the platform's lifetime — delivers <strong>100x–1000x return</strong>.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0, maxWidth: 800 }}>
          This is the <strong>"insurance + efficiency"</strong> value proposition: you get measurable operational savings every year, plus protection against catastrophic regulatory failure that could cost hundreds of millions. It's why AI-augmented audit planning is a no-brainer investment for any pharma company operating at scale.
        </p>
      </div>

      {/* Buyer Mapping */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700 }}>Who Buys This and Why</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {[
            { role: 'VP/SVP Quality', priority: 'Regulatory risk mitigation', uc: 'Use Case 1', color: '#E53935' },
            { role: 'Head of QA / Audit Director', priority: 'Operational efficiency', uc: 'Use Case 2', color: '#FF6D00' },
            { role: 'Lead Auditors', priority: 'Prep burden relief', uc: 'Use Case 3', color: '#43A047' },
            { role: 'CFO / Finance', priority: 'Cost optimization', uc: 'Use Cases 2+3', color: '#2979FF' },
            { role: 'Chief Digital Officer', priority: 'AI transformation ROI', uc: 'All three', color: '#7C4DFF' },
          ].map(b => (
            <div key={b.role} style={{ padding: '14px 16px', borderRadius: 10, border: '1px solid var(--border-color)', borderLeft: `3px solid ${b.color}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{b.role}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{b.priority}</div>
              <span className="badge" style={{ background: `${b.color}10`, color: b.color, fontSize: 10 }}>→ {b.uc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
