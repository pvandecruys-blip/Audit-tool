'use client';
import { useState } from 'react';
import { Search, Filter, MapPin, Award, Calendar, Star } from 'lucide-react';
import { auditors } from '@/data/auditors';

export default function AuditorPoolPage() {
  const [search, setSearch] = useState('');
  const [filterSkill, setFilterSkill] = useState('all');
  const allSkills = [...new Set(auditors.flatMap(a => a.skills))].sort();

  const filtered = auditors.filter(a => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterSkill !== 'all' && !a.skills.includes(filterSkill)) return false;
    return true;
  });

  const totalLoad = (a) => a.currentLoad.Q1 + a.currentLoad.Q2 + a.currentLoad.Q3 + a.currentLoad.Q4;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Auditor Pool</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>{auditors.length} auditors • Skills, certifications & availability management</p>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'var(--bg-card)', borderRadius: 8, border: '1px solid var(--border-color)', minWidth: 240 }}>
          <Search size={14} style={{ color: 'var(--text-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search auditors..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, fontFamily: 'inherit', color: 'var(--text-primary)' }} />
        </div>
        <select value={filterSkill} onChange={e => setFilterSkill(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
          <option value="all">All Skills</option>
          {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {filtered.map(a => (
          <div key={a.id} className="card card-interactive" style={{ padding: 20 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #00ACC1, #7C4DFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 600, flexShrink: 0 }}>
                {a.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{a.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                  <MapPin size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> {a.region} • {a.yearsExperience} years
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
              {a.skills.map(s => (
                <span key={s} className="badge" style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontSize: 10, padding: '2px 8px' }}>{s}</span>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
              {a.certifications.map(c => (
                <span key={c} className="badge" style={{ background: 'rgba(124,77,255,0.08)', color: '#7C4DFF', fontSize: 10, padding: '2px 8px' }}>
                  <Award size={9} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />{c}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
              <span>📋 {a.totalAudits} audits</span>
              <span>⭐ {a.avgRating}/5.0</span>
              <span>📧 {a.email}</span>
            </div>

            {/* Availability */}
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>2026 AVAILABILITY</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Q1', 'Q2', 'Q3', 'Q4'].map(q => (
                <div key={q} style={{
                  flex: 1, textAlign: 'center', padding: '6px 0', borderRadius: 6,
                  background: a.availability[q] ? 'rgba(67,160,71,0.1)' : 'rgba(229,57,53,0.1)',
                  color: a.availability[q] ? '#43A047' : '#E53935',
                  fontSize: 10, fontWeight: 600,
                }}>
                  {q}: {a.availability[q] ? '✅' : '❌'} ({a.currentLoad[q]})
                </div>
              ))}
            </div>

            <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)', textAlign: 'right' }}>
              Total 2026 load: <strong>{totalLoad(a)} audits</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
