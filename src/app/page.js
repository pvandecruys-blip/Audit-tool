'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, LineChart, Line
} from 'recharts';
import {
  ShieldAlert, TrendingUp, Calendar, AlertTriangle, CheckCircle2,
  Clock, Activity, ArrowRight, Sparkles, MapPin, Users, Target
} from 'lucide-react';
import { auditableUnits, riskAlerts } from '@/data/auditableUnits';
import { auditPlan2026, planSummary } from '@/data/auditPlan';
import { auditors } from '@/data/auditors';

const riskDistribution = [
  { name: 'High Risk', value: auditableUnits.filter(au => au.riskScore > 60).length, color: '#E53935' },
  { name: 'Medium Risk', value: auditableUnits.filter(au => au.riskScore >= 31 && au.riskScore <= 60).length, color: '#FFB300' },
  { name: 'Low Risk', value: auditableUnits.filter(au => au.riskScore <= 30).length, color: '#43A047' },
];
const socDistribution = [
  { name: 'In Control', value: auditableUnits.filter(au => au.stateOfControl === 'green').length, color: '#43A047', emoji: '🟢' },
  { name: 'Marginal', value: auditableUnits.filter(au => au.stateOfControl === 'yellow').length, color: '#FFB300', emoji: '🟡' },
  { name: 'Out of Control', value: auditableUnits.filter(au => au.stateOfControl === 'red').length, color: '#E53935', emoji: '🔴' },
];
const auditorUtil = auditors.slice(0, 10).map(a => ({
  name: a.name.split(' ')[0], load: a.currentLoad.Q1 + a.currentLoad.Q2 + a.currentLoad.Q3 + a.currentLoad.Q4
}));
const avgRS = Math.round(auditableUnits.reduce((s, a) => s + a.riskScore, 0) / auditableUnits.length);
const upcoming = auditPlan2026.filter(a => new Date(a.startDate) >= new Date('2026-02-16')).slice(0, 5);

function MetricCard({ title, value, subtitle, colorClass, icon: Icon }) {
  return (
    <div className={`metric-card ${colorClass}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
          {subtitle && <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>{subtitle}</div>}
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} style={{ color: 'var(--text-secondary)' }} />
        </div>
      </div>
    </div>
  );
}

function MiniDonut({ data, size = 140 }) {
  return (
    <ResponsiveContainer width={size} height={size}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={size * 0.3} outerRadius={size * 0.44} paddingAngle={3} dataKey="value" stroke="none">
          {data.map((d, i) => <Cell key={i} fill={d.color} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function Dashboard() {
  return (
    <div className="stagger-children">
      {/* Page Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Real-time overview of your audit program • Last updated: Feb 16, 2026, 18:00 CET
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/risk-assessment" className="btn btn-secondary btn-sm" style={{ textDecoration: 'none' }}>
            <ShieldAlert size={14} /> Risk Assessment
          </Link>
          <Link href="/audit-plan" className="btn btn-ai btn-sm" style={{ textDecoration: 'none' }}>
            <Sparkles size={14} /> Generate Audit Plan
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        <MetricCard title="Total AUs" value={auditableUnits.length} subtitle="Auditable Units" colorClass="teal" icon={Target} />
        <MetricCard title="High Risk AUs" value={auditableUnits.filter(a => a.riskScore > 60).length} subtitle="Score > 60" colorClass="red" icon={AlertTriangle} />
        <MetricCard title="Audits Planned" value={auditPlan2026.length} subtitle="2026 Annual Plan" colorClass="blue" icon={Calendar} />
        <MetricCard title="Completed YTD" value="0" subtitle="Starting Q1 2026" colorClass="green" icon={CheckCircle2} />
        <MetricCard title="Overdue" value={auditableUnits.filter(a => new Date(a.nextAuditDue) < new Date('2026-02-16')).length} subtitle="Past due date" colorClass="orange" icon={Clock} />
        <MetricCard title="Avg Risk Score" value={avgRS} subtitle="Across all AUs" colorClass="amber" icon={Activity} />
        <MetricCard title="Out of Control" value={auditableUnits.filter(a => a.stateOfControl === 'red').length} subtitle="Cpk < 1.0" colorClass="red" icon={ShieldAlert} />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 16, marginBottom: 24 }}>
        {/* Risk Distribution */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            Risk Distribution
            <span className="ai-badge" style={{ fontSize: 9, padding: '1px 6px' }}>✨ Live</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}><MiniDonut data={riskDistribution} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
            {riskDistribution.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
                </div>
                <span style={{ fontWeight: 600 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* State of Control */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>State of Control</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}><MiniDonut data={socDistribution} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
            {socDistribution.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{d.emoji}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
                </div>
                <span style={{ fontWeight: 600 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Audits */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Upcoming Audits
            <Link href="/audit-plan" style={{ fontSize: 12, color: 'var(--teal)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {upcoming.map(audit => (
              <div key={audit.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', background: 'var(--bg-primary)', borderRadius: 10,
                border: '1px solid var(--border-color)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: audit.riskScore > 60 ? '#E53935' : audit.riskScore > 30 ? '#FFB300' : '#43A047'
                  }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{audit.auName}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{audit.auType} • {audit.auditType}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{audit.startDate}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{audit.quarter}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* AI Alerts */}
        <div className="card" style={{ padding: 20, maxHeight: 420, overflow: 'auto' }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={14} style={{ color: 'var(--ai-purple)' }} />
            AI Risk Alerts
            <span style={{ background: '#E53935', color: '#fff', padding: '1px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600 }}>
              {riskAlerts.length}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {riskAlerts.map(alert => (
              <div key={alert.id} style={{
                padding: '12px 14px', borderRadius: 10,
                background: alert.severity === 'critical' ? 'rgba(229,57,53,0.05)' : alert.severity === 'high' ? 'rgba(255,179,0,0.05)' : 'var(--bg-primary)',
                border: `1px solid ${alert.severity === 'critical' ? 'rgba(229,57,53,0.15)' : 'var(--border-color)'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{alert.icon}</span>
                  <div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--text-primary)' }}>{alert.message}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                      {new Date(alert.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auditor Utilization */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Auditor Utilization (2026)
            <Link href="/auditor-pool" style={{ fontSize: 12, color: 'var(--teal)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={auditorUtil} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="load" fill="#00838F" radius={[4, 4, 0, 0]} name="Audits Assigned" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
            Workload variance: <span style={{ color: 'var(--risk-green)', fontWeight: 600 }}>8%</span> (optimized from 40%)
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }}>
        <Link href="/risk-assessment" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          <ShieldAlert size={16} /> View Risk Assessment
        </Link>
        <Link href="/audit-plan" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          <Calendar size={16} /> Open Audit Plan
        </Link>
        <Link href="/global-map" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          <MapPin size={16} /> Global Map
        </Link>
      </div>

      {/* Compliance Footer */}
      <div style={{
        marginTop: 32, padding: '16px 20px', background: 'var(--bg-card)',
        border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 11, color: 'var(--text-muted)',
      }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>🔒 21 CFR Part 11 Compliant</span>
          <span>📋 EU Annex 11 Compliant</span>
          <span>✅ Audit Trail Active</span>
          <span>🛡️ Electronic Signatures Enabled</span>
        </div>
        <div>AuditPilot v2.0 • © 2026</div>
      </div>
    </div>
  );
}
