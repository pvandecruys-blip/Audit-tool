'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { auditableUnits } from '@/data/auditableUnits';
import { MapPin, X } from 'lucide-react';

function MapContent() {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [L, setLeaflet] = useState(null);
  const [MapComps, setMapComps] = useState(null);

  useEffect(() => {
    Promise.all([
      import('leaflet'),
      import('react-leaflet'),
    ]).then(([leaflet, rl]) => {
      setLeaflet(leaflet.default);
      setMapComps(rl);
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);

  if (!mounted || !L || !MapComps) {
    return <div style={{ height: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading map...</div>;
  }

  const { MapContainer, TileLayer, CircleMarker, Popup, Tooltip: MapTooltip } = MapComps;

  const getColor = (score) => score > 60 ? '#E53935' : score > 30 ? '#FFB300' : '#43A047';
  const getSize = (score) => score > 60 ? 12 : score > 30 ? 9 : 7;

  return (
    <>
      <MapContainer center={[30, 10]} zoom={2} style={{ height: 'calc(100vh - 160px)', borderRadius: 12, border: '1px solid var(--border-color)' }} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; OpenStreetMap' />
        {auditableUnits.filter(a => a.location.lat).map(au => (
          <CircleMarker
            key={au.id}
            center={[au.location.lat, au.location.lng]}
            radius={getSize(au.riskScore)}
            pathOptions={{ color: getColor(au.riskScore), fillColor: getColor(au.riskScore), fillOpacity: 0.7, weight: 2 }}
            eventHandlers={{ click: () => setSelected(au) }}
          >
            <MapTooltip>
              <div style={{ fontSize: 12 }}>
                <strong>{au.name}</strong><br />
                Risk: {au.riskScore} | {au.stateOfControl === 'red' ? '🔴' : au.stateOfControl === 'yellow' ? '🟡' : '🟢'}
              </div>
            </MapTooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {selected && (
        <div style={{ position: 'absolute', top: 80, right: 24, width: 360, background: 'var(--bg-card)', borderRadius: 16, boxShadow: '0 8px 30px rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', zIndex: 100, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `${getColor(selected.riskScore)}10` }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{selected.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{selected.type} • {selected.location.city}</div>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={16} /></button>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div><div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>RISK SCORE</div><div style={{ fontSize: 20, fontWeight: 700, color: getColor(selected.riskScore) }}>{selected.riskScore}</div></div>
              <div><div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>STATE OF CONTROL</div><div style={{ fontSize: 14, marginTop: 4 }}>{selected.stateOfControl === 'red' ? '🔴 Out of Control' : selected.stateOfControl === 'yellow' ? '🟡 Marginal' : '🟢 In Control'}</div></div>
              <div><div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>LAST AUDIT</div><div style={{ fontSize: 13 }}>{selected.lastAuditDate}</div></div>
              <div><div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>RECOMMENDED</div><div style={{ fontSize: 13 }}>{selected.recommendedAuditType} ({selected.recommendedQuarter})</div></div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Open deviations: {selected.deviations.open} ({selected.deviations.critical} critical)<br />
              Open CAPAs: {selected.capas.open} ({selected.capas.overdue} overdue)
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{ position: 'absolute', bottom: 24, left: 24, background: 'var(--bg-card)', padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 100 }}>
        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Risk Level</div>
        {[
          { color: '#E53935', label: 'High Risk (61-100)' },
          { color: '#FFB300', label: 'Medium Risk (31-60)' },
          { color: '#43A047', label: 'Low Risk (0-30)' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, marginBottom: 3 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />{l.label}
          </div>
        ))}
      </div>
    </>
  );
}

export default function GlobalMapPage() {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Global Map</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            {auditableUnits.length} auditable units across {[...new Set(auditableUnits.map(a => a.location.country))].length} countries
          </p>
        </div>
      </div>
      <MapContent />
    </div>
  );
}
