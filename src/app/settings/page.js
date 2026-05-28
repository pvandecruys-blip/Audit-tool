'use client';
import { useState } from 'react';
import { Save, Shield, Bell, Users, Database, Sparkles, Check } from 'lucide-react';

const riskFactors = [
  { name: 'Regulatory Inspection History', weight: 15 },
  { name: 'Supplier Qualification Score', weight: 12 },
  { name: 'Historical Findings', weight: 14 },
  { name: 'Process Performance', weight: 15 },
  { name: 'Deviation & CAPA Trends', weight: 14 },
  { name: 'Change Control Complexity', weight: 10 },
  { name: 'Product Criticality', weight: 12 },
  { name: 'Environmental / External Risk', weight: 8 },
];

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState('risk');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Settings</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>Configure risk weights, notifications, AI parameters & compliance</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
        </button>
      </div>

      <div className="tab-list">
        {['risk', 'ai', 'notifications', 'compliance'].map(t => (
          <div key={t} className={`tab-item ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'risk' ? '⚖️ Risk Weights' : t === 'ai' ? '🤖 AI Parameters' : t === 'notifications' ? '🔔 Notifications' : '🔒 Compliance'}
          </div>
        ))}
      </div>

      {tab === 'risk' && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Risk Factor Weights</div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 20px' }}>Adjust the relative importance of each risk factor (must total 100%)</p>
          {riskFactors.map(f => (
            <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 260, fontSize: 13 }}>{f.name}</div>
              <input type="range" min={0} max={30} defaultValue={f.weight} style={{ flex: 1, cursor: 'pointer' }} />
              <div style={{ width: 50, textAlign: 'right' }}>
                <input type="number" defaultValue={f.weight} style={{
                  width: 50, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border-color)',
                  fontSize: 13, textAlign: 'center', fontFamily: 'inherit', fontWeight: 600,
                  background: 'var(--bg-primary)', color: 'var(--text-primary)'
                }} />
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 20 }}>%</span>
            </div>
          ))}
          <div style={{ padding: 12, background: 'rgba(0,131,143,0.05)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>
            💡 Changing risk weights will trigger an automatic recalculation of all 20 AU risk scores. Historical scores remain unchanged.
          </div>
        </div>
      )}

      {tab === 'ai' && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>AI Engine Configuration</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Risk Scoring Model</label>
              <select defaultValue="gradient_boost_v3" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, fontFamily: 'inherit', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                <option value="gradient_boost_v3">Gradient Boost v3.2 (Production)</option>
                <option value="random_forest_v2">Random Forest v2.8 (Staging)</option>
                <option value="neural_net_v1">Neural Net v1.0 (Beta)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Confidence Threshold</label>
              <input type="number" defaultValue={75} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, fontFamily: 'inherit', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Scores below this threshold will be flagged for manual review</div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Team Match Algorithm</label>
              <select defaultValue="weighted_multi" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, fontFamily: 'inherit', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                <option value="weighted_multi">Weighted Multi-Factor Optimization</option>
                <option value="skill_first">Skill-Priority Matching</option>
                <option value="load_balance">Load-Balance First</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Schedule Optimization</label>
              <select defaultValue="travel_optimized" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, fontFamily: 'inherit', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                <option value="travel_optimized">Travel-Cluster Optimized</option>
                <option value="risk_priority">Risk-Priority First</option>
                <option value="balanced">Balanced</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {tab === 'notifications' && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>Notification Preferences</div>
          {[
            { label: 'Risk score changes > 10 points', checked: true },
            { label: 'New critical/major deviations', checked: true },
            { label: 'State of Control status changes', checked: true },
            { label: 'Overdue CAPA notifications', checked: true },
            { label: 'Audit schedule conflicts detected', checked: true },
            { label: 'Regulatory inspection announcements', checked: true },
            { label: 'AI model retraining completed', checked: false },
            { label: 'Weekly risk digest summary', checked: true },
          ].map(n => (
            <div key={n.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 13 }}>{n.label}</span>
              <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
                <input type="checkbox" defaultChecked={n.checked} style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{
                  position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                  background: n.checked ? '#00838F' : '#ccc', borderRadius: 12, transition: '0.3s'
                }}>
                  <span style={{ position: 'absolute', height: 18, width: 18, left: n.checked ? 22 : 3, bottom: 3, background: '#fff', borderRadius: '50%', transition: '0.3s' }} />
                </span>
              </label>
            </div>
          ))}
        </div>
      )}

      {tab === 'compliance' && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>Compliance & Audit Trail</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '🔒', title: '21 CFR Part 11', status: 'Compliant', desc: 'Electronic records & signatures validated' },
              { icon: '📋', title: 'EU Annex 11', status: 'Compliant', desc: 'Computerized systems validated per EU GMP' },
              { icon: '✅', title: 'Audit Trail', status: 'Active', desc: 'All changes timestamped with user attribution' },
              { icon: '🛡️', title: 'E-Signatures', status: 'Enabled', desc: 'Two-factor authentication on approval actions' },
              { icon: '💾', title: 'Data Backup', status: 'Configured', desc: 'Hourly incremental, daily full backup' },
              { icon: '🔐', title: 'Access Control', status: 'Role-Based', desc: 'RBAC with SSO integration' },
            ].map(c => (
              <div key={c.title} style={{ padding: 16, borderRadius: 10, border: '1px solid var(--border-color)', display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{c.title}</div>
                  <span className="badge" style={{ background: 'rgba(67,160,71,0.1)', color: '#43A047', fontSize: 10, marginBottom: 6, display: 'inline-block' }}>● {c.status}</span>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
