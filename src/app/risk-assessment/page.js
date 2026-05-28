'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid
} from 'recharts';
import {
  Search, Filter, ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight,
  ArrowRight as ArrowRightIcon, Minus, Sparkles, AlertTriangle, Edit3,
  Check, X, TrendingDown, TrendingUp, Activity, Shield
} from 'lucide-react';
import { auditableUnits, riskWeights, riskAlerts } from '@/data/auditableUnits';

const typeColors = {
  'Manufacturing Site': '#00838F', 'CMO': '#7C4DFF', 'Contract Lab': '#2979FF',
  'Clinical Site': '#FF6D00', 'API Supplier': '#E53935', 'Distribution Center': '#43A047',
  'IT System': '#8E24AA'
};

function TrendIcon({ trend }) {
  if (trend === 'up') return <ArrowUpRight size={14} style={{ color: '#E53935' }} />;
  if (trend === 'down') return <ArrowDownRight size={14} style={{ color: '#43A047' }} />;
  return <Minus size={14} style={{ color: '#FFB300' }} />;
}

function SOCBadge({ soc }) {
  const map = { green: { emoji: '🟢', label: 'In Control' }, yellow: { emoji: '🟡', label: 'Marginal' }, red: { emoji: '🔴', label: 'Out of Control' } };
  const d = map[soc] || map.green;
  return <span style={{ fontSize: 12 }}>{d.emoji} {d.label}</span>;
}

function RiskScoreBadge({ score }) {
  const bg = score > 60 ? 'rgba(229,57,53,0.1)' : score > 30 ? 'rgba(255,179,0,0.1)' : 'rgba(67,160,71,0.1)';
  const color = score > 60 ? '#E53935' : score > 30 ? '#E6A200' : '#43A047';
  const label = score > 60 ? 'HIGH' : score > 30 ? 'MEDIUM' : 'LOW';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 42, height: 42, borderRadius: '50%', background: bg, border: `2px solid ${color}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color, lineHeight: 1 }}>{score}</span>
      </div>
      <span className="badge" style={{ background: bg, color, fontSize: 10, padding: '2px 8px', borderRadius: 4 }}>{label}</span>
    </div>
  );
}

function SpiderChart({ riskFactors }) {
  const data = Object.entries(riskWeights).map(([key, w]) => ({
    factor: w.label.length > 20 ? w.label.slice(0, 18) + '...' : w.label,
    value: riskFactors[key] || 0, fullMark: 100
  }));
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} cx="50%" cy="50%">
        <PolarGrid stroke="var(--border-color)" />
        <PolarAngleAxis dataKey="factor" tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
        <Radar name="Risk" dataKey="value" stroke="#7C4DFF" fill="#7C4DFF" fillOpacity={0.2} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

function AUDetailPanel({ au, onClose }) {
  const [tab, setTab] = useState('overview');
  const [showOverride, setShowOverride] = useState(false);
  const cpkHistory = [
    { month: 'Jul', cpk: au.cpk ? au.cpk + 0.3 : null }, { month: 'Aug', cpk: au.cpk ? au.cpk + 0.25 : null },
    { month: 'Sep', cpk: au.cpk ? au.cpk + 0.2 : null }, { month: 'Oct', cpk: au.cpk ? au.cpk + 0.15 : null },
    { month: 'Nov', cpk: au.cpk ? au.cpk + 0.08 : null }, { month: 'Dec', cpk: au.cpk ? au.cpk + 0.03 : null },
    { month: 'Jan', cpk: au.cpk }, { month: 'Feb', cpk: au.cpk ? au.cpk - 0.02 : null },
  ];
  const tabs = ['overview', 'risk', 'process', 'history'];
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 16, width: '90%', maxWidth: 1000, maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} className="animate-slide-up">
        {/* Header */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 1, borderRadius: '16px 16px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: au.stateOfControl === 'red' ? '#E53935' : au.stateOfControl === 'yellow' ? '#FFB300' : '#43A047' }} />
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{au.name}</h2>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{au.id} • {au.type} — {au.subType} • {au.location.city}, {au.location.country}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RiskScoreBadge score={au.riskScore} />
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 8 }}><X size={20} /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-list" style={{ padding: '0 28px' }}>
          {tabs.map(t => (
            <div key={t} className={`tab-item ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t === 'overview' ? 'Overview' : t === 'risk' ? 'Risk Details' : t === 'process' ? 'Process Performance' : 'Audit History'}
            </div>
          ))}
        </div>

        <div style={{ padding: '0 28px 28px' }}>
          {tab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <div className="card" style={{ padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Sparkles size={14} style={{ color: 'var(--ai-purple)' }} /> AI Risk Intelligence Summary
                    <span className="ai-badge" style={{ fontSize: 9 }}>✨ AI Generated</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>{au.aiNarrative}</p>
                </div>
                <div className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Key Information</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      ['Last Audit', au.lastAuditDate], ['Next Due', au.nextAuditDue],
                      ['Recommended', au.recommendedAuditType], ['Quarter', au.recommendedQuarter],
                      ['Deviations (Open)', au.deviations.open], ['CAPAs (Open)', au.capas.open],
                      ['Complaints', au.complaints], ['AI Confidence', au.aiConfidence + '%'],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                        <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Risk Profile (8-Axis)</div>
                  <SpiderChart riskFactors={au.riskFactors} />
                </div>
              </div>
            </div>
          )}

          {tab === 'risk' && (
            <div>
              <div className="card" style={{ padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                  Risk Factor Breakdown
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowOverride(!showOverride)}>
                    <Edit3 size={12} /> Override Score
                  </button>
                </div>
                {Object.entries(riskWeights).map(([key, w]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 200, fontSize: 12, color: 'var(--text-secondary)' }}>{w.label}</div>
                    <div style={{ flex: 1, height: 8, background: 'var(--bg-primary)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${au.riskFactors[key]}%`, height: '100%', background: w.color, borderRadius: 4, transition: 'width 0.5s ease' }} />
                    </div>
                    <div style={{ width: 40, textAlign: 'right', fontSize: 13, fontWeight: 600 }}>{au.riskFactors[key]}</div>
                    <div style={{ width: 50, textAlign: 'right', fontSize: 11, color: 'var(--text-muted)' }}>({w.weight}%)</div>
                  </div>
                ))}
              </div>
              {showOverride && (
                <div className="card" style={{ padding: 20, border: '1px solid rgba(255,179,0,0.3)', background: 'rgba(255,179,0,0.03)' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    📝 Manual Override — Justification Required
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>ADJUSTED SCORE</label>
                      <input type="number" defaultValue={au.riskScore} style={{ width: 80, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 14, fontFamily: 'inherit', fontWeight: 600 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>JUSTIFICATION</label>
                      <textarea placeholder="Provide rationale for overriding the AI risk score..." rows={2} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, resize: 'none', fontFamily: 'inherit' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setShowOverride(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm"><Check size={12} /> Submit Override</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'process' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Process Capability (Cpk) Trend</div>
                {au.cpk ? (
                  <>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={cpkHistory} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                        <YAxis domain={[0.5, 2]} tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 12 }} />
                        <Line type="monotone" dataKey="cpk" stroke="#7C4DFF" strokeWidth={2} dot={{ fill: '#7C4DFF', r: 3 }} />
                        {/* Reference lines */}
                      </LineChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8, fontSize: 11 }}>
                      <span style={{ color: '#43A047' }}>▬ Cpk ≥ 1.33: In Control</span>
                      <span style={{ color: '#FFB300' }}>▬ 1.0-1.33: Marginal</span>
                      <span style={{ color: '#E53935' }}>▬ {'<'} 1.0: Out of Control</span>
                    </div>
                  </>
                ) : <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>N/A — Not applicable for this AU type</div>}
              </div>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Manufacturing KPIs</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { label: 'Process Capability (Cpk)', value: au.cpk, target: '≥ 1.33', status: au.cpk >= 1.33 ? 'green' : au.cpk >= 1.0 ? 'yellow' : 'red' },
                    { label: 'Batch Success Rate', value: au.batchSuccessRate ? au.batchSuccessRate + '%' : 'N/A', target: '≥ 95%', status: au.batchSuccessRate >= 95 ? 'green' : au.batchSuccessRate >= 90 ? 'yellow' : 'red' },
                    { label: 'Yield Average', value: au.yieldAvg ? au.yieldAvg + '%' : 'N/A', target: '≥ 95%', status: au.yieldAvg >= 95 ? 'green' : au.yieldAvg >= 90 ? 'yellow' : 'red' },
                    { label: 'OOS Rate', value: au.oosRate ? au.oosRate + '%' : 'N/A', target: '< 1%', status: au.oosRate <= 1 ? 'green' : au.oosRate <= 2 ? 'yellow' : 'red' },
                  ].map(kpi => (
                    <div key={kpi.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-primary)', borderRadius: 10 }}>
                      <div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{kpi.label}</div>
                        <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{kpi.value || 'N/A'}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Target: {kpi.target}</div>
                        <SOCBadge soc={kpi.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'history' && (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Historical Audit Findings</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {au.historicalFindings.map(f => (
                  <div key={f.id} style={{
                    padding: '14px 16px', borderRadius: 10,
                    background: f.severity === 'Critical' ? 'rgba(229,57,53,0.04)' : 'var(--bg-primary)',
                    border: `1px solid ${f.severity === 'Critical' ? 'rgba(229,57,53,0.15)' : 'var(--border-color)'}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span className="badge" style={{
                          background: f.severity === 'Critical' ? 'rgba(229,57,53,0.1)' : f.severity === 'Major' ? 'rgba(255,179,0,0.1)' : 'rgba(67,160,71,0.1)',
                          color: f.severity === 'Critical' ? '#E53935' : f.severity === 'Major' ? '#E6A200' : '#43A047',
                        }}>{f.severity}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{f.category}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{f.date}</span>
                        <span className="badge" style={{
                          background: f.status === 'Closed' ? 'rgba(67,160,71,0.1)' : f.status === 'Open' ? 'rgba(229,57,53,0.1)' : 'rgba(255,179,0,0.1)',
                          color: f.status === 'Closed' ? '#43A047' : f.status === 'Open' ? '#E53935' : '#E6A200',
                          fontSize: 10,
                        }}>{f.status}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{f.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accept Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-primary"><Check size={14} /> Validate Risk Score</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RiskAssessment() {
  const [selectedAU, setSelectedAU] = useState(null);
  const [sortField, setSortField] = useState('riskScore');
  const [sortDir, setSortDir] = useState('desc');
  const [filterType, setFilterType] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterSOC, setFilterSOC] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedAUs = useMemo(() => {
    let filtered = [...auditableUnits];
    if (filterType !== 'all') filtered = filtered.filter(a => a.type === filterType);
    if (filterRisk !== 'all') {
      if (filterRisk === 'high') filtered = filtered.filter(a => a.riskScore > 60);
      else if (filterRisk === 'medium') filtered = filtered.filter(a => a.riskScore >= 31 && a.riskScore <= 60);
      else filtered = filtered.filter(a => a.riskScore <= 30);
    }
    if (filterSOC !== 'all') filtered = filtered.filter(a => a.stateOfControl === filterSOC);
    if (searchTerm) filtered = filtered.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.location.country.toLowerCase().includes(searchTerm.toLowerCase()));
    filtered.sort((a, b) => sortDir === 'desc' ? b[sortField] - a[sortField] : a[sortField] - b[sortField]);
    return filtered;
  }, [sortField, sortDir, filterType, filterRisk, filterSOC, searchTerm]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  const types = [...new Set(auditableUnits.map(a => a.type))];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Risk Assessment</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>
          AI-powered continuous risk monitoring across {auditableUnits.length} auditable units
          <span className="ai-badge" style={{ marginLeft: 8, fontSize: 10 }}>✨ ML-Calibrated Scores</span>
        </p>
      </div>

      {/* Alert Banner */}
      {riskAlerts.filter(a => a.severity === 'critical').length > 0 && (
        <div style={{ padding: '12px 16px', background: 'rgba(229,57,53,0.06)', border: '1px solid rgba(229,57,53,0.15)', borderRadius: 10, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <AlertTriangle size={16} style={{ color: '#E53935' }} />
          <span style={{ fontSize: 13 }}>
            <strong>{riskAlerts.filter(a => a.severity === 'critical').length} critical alerts</strong> require attention — {riskAlerts.filter(a => a.severity === 'critical')[0]?.message.slice(0, 80)}...
          </span>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'var(--bg-card)', borderRadius: 8, border: '1px solid var(--border-color)', minWidth: 240 }}>
          <Search size={14} style={{ color: 'var(--text-muted)' }} />
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search AUs..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, fontFamily: 'inherit', color: 'var(--text-primary)' }} />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
          <option value="all">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterRisk} onChange={e => setFilterRisk(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
          <option value="all">All Risk Levels</option>
          <option value="high">High Risk (61-100)</option>
          <option value="medium">Medium Risk (31-60)</option>
          <option value="low">Low Risk (0-30)</option>
        </select>
        <select value={filterSOC} onChange={e => setFilterSOC(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
          <option value="all">All States</option>
          <option value="green">🟢 In Control</option>
          <option value="yellow">🟡 Marginal</option>
          <option value="red">🔴 Out of Control</option>
        </select>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>
          Showing {sortedAUs.length} of {auditableUnits.length} AUs
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('name')}>AU Name</th>
                <th>Type</th>
                <th>Location</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('riskScore')}>
                  Risk Score {sortField === 'riskScore' && (sortDir === 'desc' ? <ChevronDown size={12} style={{ display: 'inline' }} /> : <ChevronUp size={12} style={{ display: 'inline' }} />)}
                </th>
                <th>Trend</th>
                <th>State of Control</th>
                <th>Last Audit</th>
                <th>Recommended</th>
                <th>Quarter</th>
                <th>AI Conf.</th>
              </tr>
            </thead>
            <tbody>
              {sortedAUs.map(au => (
                <tr key={au.id} onClick={() => setSelectedAU(au)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{au.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{au.id}</div>
                  </td>
                  <td>
                    <span className="badge" style={{ background: `${typeColors[au.type]}15`, color: typeColors[au.type] }}>{au.type}</span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{au.location.city}, {au.location.country}</td>
                  <td><RiskScoreBadge score={au.riskScore} /></td>
                  <td><TrendIcon trend={au.riskTrend} /></td>
                  <td><SOCBadge soc={au.stateOfControl} /></td>
                  <td style={{ fontSize: 12 }}>{au.lastAuditDate}</td>
                  <td>
                    <span className="badge" style={{
                      background: au.recommendedAuditType === 'For-Cause' ? 'rgba(229,57,53,0.1)' : 'rgba(0,131,143,0.1)',
                      color: au.recommendedAuditType === 'For-Cause' ? '#E53935' : '#00838F',
                    }}>{au.recommendedAuditType}</span>
                  </td>
                  <td style={{ fontSize: 12, fontWeight: 500 }}>{au.recommendedQuarter}</td>
                  <td style={{ fontSize: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 40, height: 4, background: 'var(--bg-primary)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ width: `${au.aiConfidence}%`, height: '100%', background: au.aiConfidence > 85 ? '#43A047' : '#FFB300', borderRadius: 2 }} />
                      </div>
                      <span>{au.aiConfidence}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedAU && <AUDetailPanel au={selectedAU} onClose={() => setSelectedAU(null)} />}
    </div>
  );
}
