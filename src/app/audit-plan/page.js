'use client';
import { useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell
} from 'recharts';
import {
  Sparkles, Play, CheckCircle2, AlertTriangle, Users, Calendar, Clock,
  ChevronDown, ChevronRight, Shield, TrendingUp, Award, MapPin, X, Check,
  Loader2, ArrowRight, Zap, Target, Star
} from 'lucide-react';
import { auditPlan2026, planSummary, preValidationChecks } from '@/data/auditPlan';
import { auditableUnits } from '@/data/auditableUnits';
import { auditors } from '@/data/auditors';

const quarterColors = { Q1: '#E53935', Q2: '#FF6D00', Q3: '#2979FF', Q4: '#43A047' };

const generationSteps = [
  "Analyzing risk scores across 20 auditable units...",
  "Evaluating process performance & state of control...",
  "Mapping regulatory commitments & inspection schedules...",
  "Optimizing schedule across Q1–Q4 2026...",
  "Matching audit teams by expertise & availability...",
  "Running independence & conflict checks...",
  "Validating completeness & coverage requirements...",
  "Generating AI reasoning summaries...",
];

function PlanGeneration({ onComplete }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  useState(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= generationSteps.length) {
        clearInterval(interval);
        setTimeout(() => { setDone(true); setTimeout(onComplete, 800); }, 600);
      }
      setStep(i);
    }, 700);
    return () => clearInterval(interval);
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 500, gap: 32 }}>
      <div style={{ width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg, rgba(124,77,255,0.15), rgba(0,131,143,0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {done ? <CheckCircle2 size={40} style={{ color: '#43A047' }} /> : <Sparkles size={40} style={{ color: '#7C4DFF', animation: 'spin-slow 3s linear infinite' }} />}
      </div>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px' }}>{done ? '2026 Audit Plan Generated!' : 'Generating 2026 Audit Plan...'}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>{done ? `${planSummary.totalAudits} audits planned across 4 quarters` : 'AI is analyzing risk data and optimizing the schedule'}</p>
      </div>
      <div style={{ width: '100%', maxWidth: 480 }}>
        {generationSteps.map((s, i) => (
          <div key={i} className="progress-step" style={{ opacity: i <= step ? 1 : 0.4 }}>
            <div className={`step-dot ${i < step ? 'completed' : i === step && !done ? 'active' : done ? 'completed' : 'pending'}`}>
              {i < step || done ? <Check size={12} /> : i === step ? <Loader2 size={12} style={{ animation: 'spin-slow 1s linear infinite' }} /> : <span>{i + 1}</span>}
            </div>
            <span style={{ fontSize: 13, color: i <= step ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
          </div>
        ))}
      </div>
      {!done && (
        <div style={{ width: '100%', maxWidth: 480, height: 4, background: 'var(--bg-primary)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${((step + 1) / generationSteps.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #7C4DFF, #00ACC1)', borderRadius: 2, transition: 'width 0.5s ease' }} />
        </div>
      )}
    </div>
  );
}

function GanttChart({ audits, onSelect }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const getPosition = (date) => {
    const d = new Date(date);
    const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
    return (dayOfYear / 365) * 100;
  };
  const getWidth = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return ((e - s) / (365 * 86400000)) * 100;
  };
  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: 1100 }}>
        {/* Month headers */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: 4 }}>
          <div style={{ width: 260, flexShrink: 0, padding: '8px 12px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>AUDIT</div>
          <div style={{ flex: 1, display: 'flex' }}>
            {months.map((m, i) => (
              <div key={m} style={{ flex: 1, textAlign: 'center', fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', padding: '8px 0', borderLeft: '1px solid var(--border-color)', background: i < 3 ? 'rgba(229,57,53,0.03)' : i < 6 ? 'rgba(255,109,0,0.03)' : i < 9 ? 'rgba(41,121,255,0.03)' : 'rgba(67,160,71,0.03)' }}>
                {m}
              </div>
            ))}
          </div>
        </div>
        {/* Audit rows */}
        {audits.map(audit => (
          <div key={audit.id} onClick={() => onSelect(audit)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,131,143,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ width: 260, flexShrink: 0, padding: '10px 12px' }}>
              <div style={{ fontSize: 12.5, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: audit.riskScore > 60 ? '#E53935' : audit.riskScore > 30 ? '#FFB300' : '#43A047' }} />
                {audit.auName.length > 30 ? audit.auName.slice(0, 28) + '...' : audit.auName}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{audit.auType} • {audit.auditType}</div>
            </div>
            <div style={{ flex: 1, position: 'relative', height: 36 }}>
              <div style={{
                position: 'absolute',
                left: `${getPosition(audit.startDate)}%`,
                width: `${Math.max(getWidth(audit.startDate, audit.endDate), 1.5)}%`,
                top: 8, height: 20, borderRadius: 4,
                background: `linear-gradient(90deg, ${quarterColors[audit.quarter]}CC, ${quarterColors[audit.quarter]}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, color: '#fff', fontWeight: 600,
                boxShadow: `0 1px 4px ${quarterColors[audit.quarter]}44`,
                transition: 'all 0.2s',
              }}>
                {audit.duration}d
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPanel({ audit, onClose }) {
  const lead = auditors.find(a => a.id === audit.leadAuditor);
  const members = audit.teamMembers.map(id => auditors.find(a => a.id === id)).filter(Boolean);
  const allTeam = [{ ...lead, role: 'Lead Auditor', matchScore: 94 }, ...members.map((m, i) => ({ ...m, role: 'Team Member', matchScore: 88 - i * 5 }))];
  const au = auditableUnits.find(a => a.id === audit.auId);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <div className="card animate-slide-up" style={{ width: '90%', maxWidth: 900, maxHeight: '90vh', overflow: 'auto', borderRadius: 16 }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{audit.auName}</h3>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              {audit.auditType} Audit • {audit.startDate} to {audit.endDate} • {audit.quarter}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <div style={{ padding: 28 }}>
          {/* AI Reasoning */}
          <div style={{ padding: 16, background: 'linear-gradient(135deg, rgba(124,77,255,0.04), rgba(0,131,143,0.04))', border: '1px solid rgba(124,77,255,0.12)', borderRadius: 12, marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={14} style={{ color: '#7C4DFF' }} /> AI Scheduling Reasoning
              <span className="ai-badge" style={{ fontSize: 9 }}>✨ AI Generated</span>
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{audit.aiReasoning}</p>
          </div>

          {/* Team */}
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Users size={16} /> AI-Recommended Team
            <span className="ai-badge" style={{ fontSize: 9 }}>✨ Optimized</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380, 1fr))', gap: 12 }}>
            {allTeam.map(person => (
              <div key={person.id} className="card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #00ACC1, #7C4DFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 600 }}>
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{person.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{person.title}</div>
                    </div>
                  </div>
                  <span className="badge" style={{ background: person.role === 'Lead Auditor' ? 'rgba(0,131,143,0.1)' : 'var(--bg-primary)', color: person.role === 'Lead Auditor' ? '#00838F' : 'var(--text-secondary)', fontSize: 10 }}>
                    {person.role}
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                  {person.skills.slice(0, 4).map(s => (
                    <span key={s} className="badge" style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontSize: 10, padding: '2px 6px' }}>{s}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>
                  <span>📅 {person.yearsExperience}y exp</span>
                  <span>📋 {person.totalAudits} audits</span>
                  <span>⭐ {person.avgRating}/5.0</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 11 }}>✅ Independent</span>
                    <span style={{ fontSize: 11 }}>✅ Available</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: person.matchScore >= 90 ? '#43A047' : person.matchScore >= 80 ? '#2979FF' : '#FFB300' }}>
                      Match: {person.matchScore}%
                    </span>
                    <div style={{ width: 40, height: 4, background: 'var(--bg-primary)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${person.matchScore}%`, height: '100%', background: person.matchScore >= 90 ? '#43A047' : '#2979FF', borderRadius: 2 }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-primary"><Check size={14} /> Confirm Team Assignment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuditPlanPage() {
  const [planGenerated, setPlanGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [showValidation, setShowValidation] = useState(false);
  const [approved, setApproved] = useState(false);
  const [view, setView] = useState('gantt');

  const quarterDist = [
    { name: 'Q1', value: planSummary.q1, color: '#E53935' },
    { name: 'Q2', value: planSummary.q2, color: '#FF6D00' },
    { name: 'Q3', value: planSummary.q3, color: '#2979FF' },
    { name: 'Q4', value: planSummary.q4, color: '#43A047' },
  ];

  if (!planGenerated && !generating) {
    return (
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>Audit Plan</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 32px' }}>AI-optimized annual audit plan generation & team assignment</p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 24 }}>
          <div style={{ width: 100, height: 100, borderRadius: 24, background: 'linear-gradient(135deg, rgba(124,77,255,0.1), rgba(0,131,143,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={48} style={{ color: '#7C4DFF' }} />
          </div>
          <div style={{ textAlign: 'center', maxWidth: 500 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>Generate 2026 Annual Audit Plan</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              The AI will analyze risk scores, regulatory commitments, process performance data, and resource capacity to generate an optimized audit plan with team assignments across all 4 quarters.
            </p>
          </div>

          <div className="card" style={{ padding: 20, maxWidth: 500, width: '100%' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12 }}>PLAN PARAMETERS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 13 }}>
              <div>📊 {auditableUnits.length} Auditable Units analyzed</div>
              <div>👥 {auditors.length} Auditors available</div>
              <div>🔴 {auditableUnits.filter(a => a.stateOfControl === 'red').length} AUs Out of Control</div>
              <div>⚠️ {auditableUnits.filter(a => a.riskScore > 60).length} High-Risk AUs</div>
            </div>
          </div>

          <button className="btn btn-ai btn-lg" onClick={() => setGenerating(true)} style={{ fontSize: 16 }}>
            <Sparkles size={20} /> Generate 2026 Audit Plan
          </button>
        </div>
      </div>
    );
  }

  if (generating && !planGenerated) {
    return (
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>Audit Plan</h1>
        <div className="card" style={{ padding: 32 }}>
          <PlanGeneration onComplete={() => { setGenerating(false); setPlanGenerated(true); }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            2026 Annual Audit Plan
            {approved && <span className="badge" style={{ background: 'rgba(67,160,71,0.1)', color: '#43A047', fontSize: 11 }}>✅ Approved</span>}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            AI-generated plan with {planSummary.totalAudits} audits • {planSummary.totalAuditDays} audit days
            <span className="ai-badge" style={{ marginLeft: 8, fontSize: 10 }}>✨ AI Generated</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowValidation(!showValidation)}>
            <Shield size={14} /> Validation
          </button>
          {!approved && (
            <button className="btn btn-primary btn-sm" onClick={() => setApproved(true)}>
              <Check size={14} /> Approve Plan
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total Audits', value: planSummary.totalAudits, color: 'teal' },
          { label: 'For-Cause', value: planSummary.forCause, color: 'red' },
          { label: 'Routine', value: planSummary.routine, color: 'green' },
          { label: 'Audit Days', value: planSummary.totalAuditDays, color: 'blue' },
          { label: 'Auditors', value: planSummary.auditorsUtilized, color: 'purple' },
          { label: 'Avg Risk', value: planSummary.avgRiskScore, color: 'amber' },
        ].map(m => (
          <div key={m.label} className={`metric-card ${m.color}`}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Optimization Banner */}
      <div style={{ padding: '14px 20px', background: 'linear-gradient(135deg, rgba(124,77,255,0.04), rgba(0,131,143,0.04))', border: '1px solid rgba(124,77,255,0.12)', borderRadius: 12, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={16} style={{ color: '#7C4DFF' }} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>
            Schedule optimized: <strong>{planSummary.optimizationMetrics.conflictsResolved} conflicts resolved</strong>,{' '}
            <strong>{planSummary.optimizationMetrics.travelClustersCreated} travel clusters created</strong>,{' '}
            workload variance reduced from <span style={{ color: '#E53935' }}>{planSummary.optimizationMetrics.workloadVarianceBefore}%</span> to{' '}
            <span style={{ color: '#43A047' }}>{planSummary.optimizationMetrics.workloadVarianceAfter}%</span>
          </span>
        </div>
        <span className="ai-badge" style={{ fontSize: 10 }}>✨ AI Optimized</span>
      </div>

      {/* Validation Panel */}
      {showValidation && (
        <div className="card animate-slide-up" style={{ padding: 20, marginBottom: 20, border: '1px solid rgba(67,160,71,0.2)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={16} style={{ color: '#43A047' }} /> AI Pre-Validation Check
            <span style={{ fontSize: 11, color: '#43A047', fontWeight: 500 }}> — All checks passed</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {preValidationChecks.map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: 'rgba(67,160,71,0.04)' }}>
                <CheckCircle2 size={14} style={{ color: '#43A047' }} />
                <span style={{ fontSize: 12 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Toggle */}
      <div className="tab-list">
        {['gantt', 'list', 'quarter'].map(v => (
          <div key={v} className={`tab-item ${view === v ? 'active' : ''}`} onClick={() => setView(v)}>
            {v === 'gantt' ? '📊 Gantt Chart' : v === 'list' ? '📋 List View' : '📅 By Quarter'}
          </div>
        ))}
      </div>

      {/* Gantt View */}
      {view === 'gantt' && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <GanttChart audits={auditPlan2026} onSelect={setSelectedAudit} />
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Audit</th>
                <th>Type</th>
                <th>Quarter</th>
                <th>Dates</th>
                <th>Risk</th>
                <th>SoC</th>
                <th>Team Size</th>
                <th>Lead</th>
              </tr>
            </thead>
            <tbody>
              {auditPlan2026.map(a => {
                const lead = auditors.find(au => au.id === a.leadAuditor);
                return (
                  <tr key={a.id} onClick={() => setSelectedAudit(a)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>{a.auName}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.auType}</div>
                    </td>
                    <td>
                      <span className="badge" style={{ background: a.auditType === 'For-Cause' ? 'rgba(229,57,53,0.1)' : 'rgba(0,131,143,0.1)', color: a.auditType === 'For-Cause' ? '#E53935' : '#00838F' }}>
                        {a.auditType}
                      </span>
                    </td>
                    <td><span style={{ fontWeight: 600, color: quarterColors[a.quarter] }}>{a.quarter}</span></td>
                    <td style={{ fontSize: 12 }}>{a.startDate} — {a.endDate}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: a.riskScore > 60 ? '#E53935' : a.riskScore > 30 ? '#E6A200' : '#43A047' }}>{a.riskScore}</span>
                    </td>
                    <td>{a.stateOfControl === 'red' ? '🔴' : a.stateOfControl === 'yellow' ? '🟡' : '🟢'}</td>
                    <td>{a.teamSize}</td>
                    <td style={{ fontSize: 12 }}>{lead?.name || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Quarter View */}
      {view === 'quarter' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {['Q1', 'Q2', 'Q3', 'Q4'].map(q => {
            const qAudits = auditPlan2026.filter(a => a.quarter === q);
            return (
              <div key={q} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', background: `${quarterColors[q]}10`, borderBottom: `2px solid ${quarterColors[q]}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: quarterColors[q] }}>{q} 2026</span>
                  <span className="badge" style={{ background: `${quarterColors[q]}15`, color: quarterColors[q] }}>{qAudits.length} audits</span>
                </div>
                <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {qAudits.map(a => (
                    <div key={a.id} onClick={() => setSelectedAudit(a)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = quarterColors[q]}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}>
                      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4 }}>{a.auName}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)' }}>
                        <span>{a.auditType}</span>
                        <span>{a.stateOfControl === 'red' ? '🔴' : a.stateOfControl === 'yellow' ? '🟡' : '🟢'} {a.riskScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedAudit && <TeamPanel audit={selectedAudit} onClose={() => setSelectedAudit(null)} />}
    </div>
  );
}
