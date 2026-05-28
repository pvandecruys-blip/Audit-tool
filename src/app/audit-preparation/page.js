'use client';
import { useState } from 'react';
import {
  Sparkles, FileText, Clock, Mail, Package, Check, X, Edit3,
  ChevronDown, Users, AlertTriangle, Calendar, MapPin, Phone, Send
} from 'lucide-react';
import { auditPlan2026 } from '@/data/auditPlan';
import { auditableUnits } from '@/data/auditableUnits';
import { auditors } from '@/data/auditors';

const scopeData = {
  "AP-003": {
    narrative: "This for-cause GMP audit of Indianapolis Parenteral Plant will focus on sterile manufacturing operations, aseptic processing controls, environmental monitoring trending, and CAPA effectiveness related to 3 critical open observations from the September 2024 audit. Additional focus on the primary sterile filling line where Cpk has deteriorated to 0.87 (below 1.0 threshold). Process performance review triggered: State of Control is 🔴 Out of Control. The audit will also assess readiness for anticipated FDA re-inspection in Q3 2026.",
    systems: [
      { name: "Aseptic Processing", coverage: "This audit", priority: "Critical", focus: "Media fill results, gowning qualification, interventions management" },
      { name: "Environmental Monitoring", coverage: "This audit", priority: "Critical", focus: "Grade A/B trending, alert/action limits, excursion investigations" },
      { name: "Quality Control", coverage: "This audit", priority: "High", focus: "OOS investigation process, laboratory data integrity, method validation" },
      { name: "CAPA Management", coverage: "This audit", priority: "High", focus: "Effectiveness checks on 3 open CAPAs, root cause analysis adequacy" },
      { name: "Production", coverage: "Covered last audit", priority: "Follow-up", focus: "Lyophilization cycle parameter deviation follow-up" },
      { name: "Documentation", coverage: "This audit", priority: "Medium", focus: "Batch record review, SOPs currency, electronic records integrity" },
      { name: "Facilities & Equipment", coverage: "This audit", priority: "Medium", focus: "Equipment qualification status, calibration, preventive maintenance" },
    ],
    processPerformanceFocus: [
      "Sterile filling line Cpk analysis — root cause for decline from 1.15 to 0.87",
      "Batch success rate trending (91.2% vs 95% target) — failure mode analysis",
      "Environmental monitoring excursion frequency — correlation with filling operations",
      "OOS rate analysis (2.8%) — investigation adequacy and trending"
    ],
    openItems: [
      "F-001: Inadequate environmental monitoring trending for Grade A zones (Critical — Open)",
      "F-002: Incomplete audit trail for batch record amendments (Major — CAPA In Progress)",
      "F-003: Recurring deviation in lyophilization cycle parameters (Major — verify closure effectiveness)"
    ],
    regulatoryCommitments: [
      "FDA Form 483 Response — verify implementation of committed corrective actions",
      "Pre-inspection readiness assessment for anticipated Q3 2026 FDA re-inspection"
    ]
  }
};

const agendaData = [
  {
    day: "Day 1 — March 2, 2026",
    items: [
      { time: "08:30 - 09:00", title: "Opening Meeting", duration: "30 min", type: "meeting", description: "Introductions, scope review, logistics" },
      { time: "09:00 - 10:30", title: "Facility Tour — Sterile Manufacturing", duration: "90 min", type: "walkthrough", description: "Aseptic filling area, Grade A/B cleanrooms, gowning areas" },
      { time: "10:30 - 10:45", title: "Break", duration: "15 min", type: "break", description: "" },
      { time: "10:45 - 12:45", title: "Document Review — Aseptic Processing", duration: "120 min", type: "review", description: "Media fill records, environmental monitoring data, intervention logs" },
      { time: "12:45 - 13:30", title: "Lunch", duration: "45 min", type: "break", description: "" },
      { time: "13:30 - 14:30", title: "Interview — QA Director", duration: "60 min", type: "interview", description: "Quality system overview, risk management, state of control assessment" },
      { time: "14:30 - 16:30", title: "Environmental Monitoring Deep Dive", duration: "120 min", type: "review", description: "EM trending data, excursion investigations, alert/action limit reviews" },
      { time: "16:30 - 17:00", title: "Day 1 Team Debrief", duration: "30 min", type: "meeting", description: "Preliminary observations, Day 2 planning adjustments" },
    ]
  },
  {
    day: "Day 2 — March 3, 2026",
    items: [
      { time: "08:30 - 10:30", title: "Process Performance Review", duration: "120 min", type: "review", description: "Cpk analysis, batch success rates, yield trending, OOS investigation review" },
      { time: "10:30 - 10:45", title: "Break", duration: "15 min", type: "break", description: "" },
      { time: "10:45 - 12:15", title: "CAPA Effectiveness Verification", duration: "90 min", type: "review", description: "Review 3 open CAPAs, root cause analysis, corrective action implementation" },
      { time: "12:15 - 13:00", title: "Lunch", duration: "45 min", type: "break", description: "" },
      { time: "13:00 - 14:30", title: "Interview — Production Manager", duration: "90 min", type: "interview", description: "Filling line operations, deviation management, process improvements" },
      { time: "14:30 - 16:00", title: "Data Integrity Assessment", duration: "90 min", type: "review", description: "Electronic batch records, audit trails, HPLC data review, backup/archive" },
      { time: "16:00 - 17:00", title: "Day 2 Team Debrief", duration: "60 min", type: "meeting", description: "Observation consolidation, evidence review" },
    ]
  },
  {
    day: "Day 3 — March 4, 2026",
    items: [
      { time: "08:30 - 10:00", title: "Equipment & Facilities Review", duration: "90 min", type: "walkthrough", description: "Equipment qualification, calibration records, preventive maintenance" },
      { time: "10:00 - 11:00", title: "Interview — QC Lab Manager", duration: "60 min", type: "interview", description: "Laboratory controls, OOS handling, analyst competency" },
      { time: "11:00 - 12:00", title: "FDA 483 Response Verification", duration: "60 min", type: "review", description: "Verify implementation of committed corrections from 2025 inspection" },
      { time: "12:00 - 12:45", title: "Lunch", duration: "45 min", type: "break", description: "" },
      { time: "12:45 - 14:15", title: "Observation Report Drafting", duration: "90 min", type: "meeting", description: "Compile and draft preliminary audit observations" },
      { time: "14:15 - 15:00", title: "Closing Meeting", duration: "45 min", type: "meeting", description: "Present preliminary observations, discuss next steps, agree on timelines" },
    ]
  }
];

const notifications = [
  {
    to: "Site Quality Director — Indianapolis Parenteral Plant",
    subject: "Audit Notification: For-Cause GMP Audit — March 2-6, 2026",
    preview: "Dear Dr. Williams,\n\nThis notification serves to inform you that a for-cause GMP audit of the Indianapolis Parenteral Plant has been scheduled for March 2-6, 2026. The audit team will comprise 4 auditors led by Dr. Anna Kowalski.\n\nPlease arrange the following:\n• Dedicated audit room with network access\n• Access to Grade A/B cleanroom areas\n• Environmental monitoring trending data (last 12 months)\n• Media fill records (last 6 runs)\n• CAPA effectiveness evidence for F-001, F-002, F-003\n• FDA 483 response implementation evidence\n\nConfidentiality agreements are attached for co-signature..."
  },
  {
    to: "Audit Team — Dr. Anna Kowalski, Sarah Chen, Marie Dubois, Elena Rodriguez",
    subject: "Audit Assignment: Indianapolis Parenteral Plant — March 2-6, 2026",
    preview: "Dear Team,\n\nYou have been assigned to the for-cause GMP audit of the Indianapolis Parenteral Plant. Please review the attached briefing package and confirm your availability.\n\nKey Focus Areas:\n• Aseptic processing controls & environmental monitoring\n• Process performance (Cpk 0.87 — below threshold)\n• CAPA effectiveness for 3 critical/major observations\n• Data integrity assessment\n\nTravel arrangements will be coordinated separately..."
  },
  {
    to: "Qualified Person — Indianapolis Operations",
    subject: "Audit Notification: QP Awareness — Indianapolis For-Cause Audit",
    preview: "Dear Dr. Patterson,\n\nAs Qualified Person for Indianapolis operations, we wish to inform you that a for-cause GMP audit has been scheduled for March 2-6, 2026, focusing on sterile manufacturing operations and process performance concerns..."
  }
];

export default function AuditPreparation() {
  const [selectedAuditId, setSelectedAuditId] = useState('AP-003');
  const [tab, setTab] = useState('scope');
  const [editMode, setEditMode] = useState(false);
  const [notifSent, setNotifSent] = useState({});
  const selectedAudit = auditPlan2026.find(a => a.id === selectedAuditId);
  const au = selectedAudit ? auditableUnits.find(a => a.id === selectedAudit.auId) : null;
  const scope = scopeData[selectedAuditId] || scopeData['AP-003'];
  const lead = selectedAudit ? auditors.find(a => a.id === selectedAudit.leadAuditor) : null;
  const typeColors = { meeting: '#00838F', review: '#7C4DFF', interview: '#2979FF', walkthrough: '#FF6D00', break: '#94A3B8' };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Audit Preparation</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>AI-assisted scope, agenda, notifications & briefing</p>
      </div>

      {/* Audit Selector */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 6 }}>SELECT AUDIT</label>
        <select value={selectedAuditId} onChange={e => setSelectedAuditId(e.target.value)} style={{
          padding: '10px 16px', borderRadius: 10, border: '1px solid var(--border-color)', fontSize: 14, fontFamily: 'inherit', cursor: 'pointer',
          background: 'var(--bg-card)', color: 'var(--text-primary)', minWidth: 400
        }}>
          {auditPlan2026.map(a => (
            <option key={a.id} value={a.id}>{a.auName} — {a.quarter} ({a.auditType})</option>
          ))}
        </select>
      </div>

      {selectedAudit && au && (
        <>
          {/* Audit Summary */}
          <div className="card" style={{ padding: 20, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { icon: '📍', label: au.location.city, sub: au.location.country },
                { icon: '📅', label: `${selectedAudit.startDate} to ${selectedAudit.endDate}`, sub: `${selectedAudit.duration} days` },
                { icon: '⚠️', label: `Risk: ${selectedAudit.riskScore}`, sub: selectedAudit.auditType },
                { icon: '👥', label: `Team: ${selectedAudit.teamSize}`, sub: lead?.name || '--' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setEditMode(!editMode)}>
                <Edit3 size={12} /> {editMode ? 'View Mode' : 'Edit'}
              </button>
              <button className="btn btn-primary btn-sm"><Check size={12} /> Approve Preparation</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="tab-list">
            {['scope', 'agenda', 'notifications', 'briefing'].map(t => (
              <div key={t} className={`tab-item ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                {t === 'scope' ? '📋 Scope' : t === 'agenda' ? '📅 Agenda' : t === 'notifications' ? '✉️ Notifications' : '📦 Briefing Package'}
              </div>
            ))}
          </div>

          {/* Scope Tab */}
          {tab === 'scope' && (
            <div className="stagger-children">
              <div className="card" style={{ padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  Audit Scope Narrative
                  <span className="ai-badge">✨ AI Generated</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>{scope.narrative}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>GMP Systems Coverage</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>Systems covered in last audit: Production, QC, QA, Validation • Due this audit: EM, CAPA, Documentation + follow-up</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {scope.systems.map(s => (
                      <div key={s.name} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</span>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <span className="badge" style={{ fontSize: 9, background: s.coverage === 'This audit' ? 'rgba(0,131,143,0.1)' : 'rgba(255,179,0,0.1)', color: s.coverage === 'This audit' ? '#00838F' : '#E6A200' }}>{s.coverage}</span>
                            <span className="badge" style={{ fontSize: 9, background: s.priority === 'Critical' ? 'rgba(229,57,53,0.1)' : s.priority === 'High' ? 'rgba(255,179,0,0.1)' : 'rgba(67,160,71,0.1)', color: s.priority === 'Critical' ? '#E53935' : s.priority === 'High' ? '#E6A200' : '#43A047' }}>{s.priority}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.focus}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="card" style={{ padding: 20, marginBottom: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <AlertTriangle size={14} style={{ color: '#E53935' }} /> Process Performance Focus Areas
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {scope.processPerformanceFocus.map((p, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                          <span style={{ color: '#E53935' }}>•</span> {p}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card" style={{ padding: 20, marginBottom: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Open Items from Previous Audit</div>
                    {scope.openItems.map((item, i) => (
                      <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '6px 0', borderBottom: i < scope.openItems.length - 1 ? '1px solid var(--border-color)' : 'none' }}>{item}</div>
                    ))}
                  </div>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Regulatory Commitments</div>
                    {scope.regulatoryCommitments.map((item, i) => (
                      <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '6px 0', display: 'flex', gap: 6 }}>
                        <span>📋</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Agenda Tab */}
          {tab === 'agenda' && (
            <div className="stagger-children">
              {agendaData.map((day, di) => (
                <div key={di} className="card" style={{ padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Calendar size={16} style={{ color: '#00838F' }} />
                    {day.day}
                    <span className="ai-badge" style={{ fontSize: 9 }}>✨ AI Generated</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {day.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', borderRadius: 8, background: 'var(--bg-primary)', border: '1px solid var(--border-color)', opacity: item.type === 'break' ? 0.6 : 1 }}>
                        <div style={{ width: 4, borderRadius: 2, background: typeColors[item.type] || '#94A3B8', flexShrink: 0 }} />
                        <div style={{ width: 100, flexShrink: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600 }}>{item.time}</div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{item.duration}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>{item.title}</div>
                          {item.description && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{item.description}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Notifications Tab */}
          {tab === 'notifications' && (
            <div className="stagger-children">
              {notifications.map((n, i) => (
                <div key={i} className="card" style={{ padding: 20, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>TO: {n.to}</div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{n.subject}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span className="ai-badge" style={{ fontSize: 9 }}>✨ AI Drafted</span>
                      {notifSent[i] ? (
                        <span className="badge" style={{ background: 'rgba(67,160,71,0.1)', color: '#43A047' }}>✅ Sent</span>
                      ) : (
                        <button className="btn btn-primary btn-sm" onClick={() => setNotifSent({ ...notifSent, [i]: true })}>
                          <Send size={12} /> Send
                        </button>
                      )}
                    </div>
                  </div>
                  <div style={{ padding: 16, background: 'var(--bg-primary)', borderRadius: 10, border: '1px solid var(--border-color)', fontSize: 12, lineHeight: 1.7, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                    {n.preview}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Briefing Tab */}
          {tab === 'briefing' && (
            <div className="stagger-children">
              <div className="card" style={{ padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Package size={16} style={{ color: '#7C4DFF' }} /> Intelligent Briefing Package
                  <span className="ai-badge">✨ AI Compiled</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 16px' }}>Auto-compiled briefing package for the audit team</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 }}>
                  {[
                    { icon: '🏭', title: 'AU Profile', desc: 'Site overview, products, regulatory status, org chart', status: 'Ready' },
                    { icon: '📊', title: 'Risk Assessment Summary', desc: 'AI narrative, spider chart, factor breakdown', status: 'Ready' },
                    { icon: '📈', title: 'Process Performance Summary', desc: 'Cpk trends, batch yield, OOS rate analysis', status: 'Ready' },
                    { icon: '📋', title: 'Previous Audit Report', desc: 'AI-extracted key findings and observations', status: 'Ready' },
                    { icon: '🔄', title: 'Open CAPAs', desc: `${au.capas.open} open, ${au.capas.overdue} overdue`, status: 'Ready' },
                    { icon: '📰', title: 'Regulatory Intelligence', desc: 'Recent FDA/EMA actions for similar sites', status: 'Ready' },
                    { icon: '👤', title: 'Key Contacts', desc: 'QA Director, Production Mgr, QC Lab Mgr', status: 'Ready' },
                    { icon: '✈️', title: 'Logistics', desc: 'Travel, accommodation, site access details', status: 'Pending' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '14px 16px', borderRadius: 10, border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#00838F'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 20 }}>{item.icon}</span>
                        <span className="badge" style={{ background: item.status === 'Ready' ? 'rgba(67,160,71,0.1)' : 'rgba(255,179,0,0.1)', color: item.status === 'Ready' ? '#43A047' : '#E6A200', fontSize: 10 }}>{item.status}</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
