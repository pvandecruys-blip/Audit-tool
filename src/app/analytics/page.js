'use client';
import { useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { Sparkles, ArrowRight, TrendingUp, TrendingDown, Clock, Zap } from 'lucide-react';
import { auditableUnits } from '@/data/auditableUnits';
import { auditPlan2026, planSummary } from '@/data/auditPlan';

const riskTrend = [
  { month: 'Sep 25', avg: 43, high: 4, outOfControl: 1 },
  { month: 'Oct 25', avg: 44, high: 4, outOfControl: 1 },
  { month: 'Nov 25', avg: 45, high: 4, outOfControl: 2 },
  { month: 'Dec 25', avg: 46, high: 5, outOfControl: 2 },
  { month: 'Jan 26', avg: 47, high: 5, outOfControl: 3 },
  { month: 'Feb 26', avg: 48, high: 5, outOfControl: 3 },
];
const auditsByType = [
  { name: 'Manufacturing', value: 5 }, { name: 'CMO', value: 5 },
  { name: 'Clinical', value: 3 }, { name: 'API Supplier', value: 2 },
  { name: 'Contract Lab', value: 2 }, { name: 'Distribution', value: 2 },
  { name: 'IT System', value: 2 }
];
const typeColors = ['#00838F', '#7C4DFF', '#FF6D00', '#E53935', '#2979FF', '#43A047', '#8E24AA'];
const transformData = [
  { metric: 'Planning Duration', current: 'Weeks', future: 'Hours', improvement: '95%' },
  { metric: 'Risk Assessment Cycle', current: 'Annual (Static)', future: 'Continuous (Real-time)', improvement: '∞' },
  { metric: 'Risk Scoring', current: 'Subjective / Manual', future: 'ML-Calibrated', improvement: '100%' },
  { metric: 'Approval Gates', current: '7 sequential gates', future: '4 streamlined gates', improvement: '43%' },
  { metric: 'Data Sources', current: '5+ disconnected', future: '1 unified platform', improvement: '80%' },
  { metric: 'Team Assignment', current: 'Manual / email', future: 'AI-optimized matching', improvement: '90%' },
  { metric: 'Scope Determination', current: 'Days of manual review', future: 'AI-generated in seconds', improvement: '99%' },
  { metric: 'Process Visibility', current: 'No Cpk monitoring', future: 'Real-time State of Control', improvement: '∞' },
];

export default function AnalyticsPage() {
  const [view, setView] = useState('kpis');
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Analytics & Insights</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>AI performance metrics, trends, and transformation impact</p>
      </div>
      <div className="tab-list">
        {['kpis', 'trends', 'transformation'].map(v => (
          <div key={v} className={`tab-item ${view === v ? 'active' : ''}`} onClick={() => setView(v)}>
            {v === 'kpis' ? '📊 KPIs' : v === 'trends' ? '📈 Trends' : '🚀 Transformation'}
          </div>
        ))}
      </div>

      {view === 'kpis' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'AI Risk Accuracy', value: '94.2%', sub: 'Validated against expert review', color: 'purple' },
              { label: 'Schedule Efficiency', value: '92%', sub: 'Optimization score', color: 'teal' },
              { label: 'Avg Plan Generation', value: '4.2 min', sub: 'Down from 3+ weeks manual', color: 'green' },
              { label: 'Team Match Quality', value: '89%', sub: 'Average match score', color: 'blue' },
            ].map(m => (
              <div key={m.label} className={`metric-card ${m.color}`}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{m.label}</div>
                <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>{m.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Audits by AU Type (2026)</div>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={auditsByType} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={{ stroke: 'var(--text-muted)', strokeWidth: 1 }}>
                    {auditsByType.map((_, i) => <Cell key={i} fill={typeColors[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Quarterly Workload Distribution</div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={[
                  { quarter: 'Q1', audits: planSummary.q1, days: 15 },
                  { quarter: 'Q2', audits: planSummary.q2, days: 13 },
                  { quarter: 'Q3', audits: planSummary.q3, days: 26 },
                  { quarter: 'Q4', audits: planSummary.q4, days: 28 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="audits" fill="#00838F" radius={[4, 4, 0, 0]} name="Audits" />
                  <Bar dataKey="days" fill="#7C4DFF" radius={[4, 4, 0, 0]} name="Audit Days" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {view === 'trends' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Average Risk Score Trend</div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={riskTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="avg" stroke="#7C4DFF" fill="rgba(124,77,255,0.1)" strokeWidth={2} name="Avg Risk Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>High Risk & Out-of-Control AUs</div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={riskTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="high" stroke="#FFB300" strokeWidth={2} name="High Risk AUs" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="outOfControl" stroke="#E53935" strokeWidth={2} name="Out of Control AUs" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {view === 'transformation' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>🚀 The Transformation</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>
              From weeks of manual effort to AI-powered audit planning in minutes
            </p>
          </div>
          <div className="card" style={{ overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th style={{ color: '#E53935' }}>❌ Current State (Manual)</th>
                  <th style={{ color: '#43A047' }}>✅ Future State (AI-Powered)</th>
                  <th>Improvement</th>
                </tr>
              </thead>
              <tbody>
                {transformData.map(t => (
                  <tr key={t.metric}>
                    <td style={{ fontWeight: 600 }}>{t.metric}</td>
                    <td style={{ color: '#E53935', background: 'rgba(229,57,53,0.03)' }}>{t.current}</td>
                    <td style={{ color: '#43A047', background: 'rgba(67,160,71,0.03)' }}>{t.future}</td>
                    <td>
                      <span className="badge" style={{ background: 'rgba(67,160,71,0.1)', color: '#43A047', fontWeight: 700, fontSize: 13 }}>
                        {t.improvement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 24 }}>
            {[
              { icon: '⏱️', value: 'Weeks → Hours', label: 'Planning Time' },
              { icon: '🎯', value: '94%', label: 'AI Risk Accuracy' },
              { icon: '🔄', value: 'Continuous', label: 'Risk Monitoring' },
              { icon: '🤖', value: '100%', label: 'Scope Auto-Generated' },
            ].map(m => (
              <div key={m.label} className="card" style={{ padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{m.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--teal)', marginBottom: 4 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
