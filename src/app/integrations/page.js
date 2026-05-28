'use client';
import { useState, useEffect } from 'react';
import {
  Database, CheckCircle2, AlertTriangle, RefreshCw, Plus, X,
  Sparkles, ArrowRight, Clock, Zap, Shield, Activity, ExternalLink,
  ChevronRight, Server, Cloud, Lock, Wifi, WifiOff
} from 'lucide-react';

const connectedSystems = [
  {
    id: 'veeva-qms',
    name: 'Veeva Vault QMS',
    type: 'Quality Management System',
    icon: '🔵',
    status: 'connected',
    lastSync: '2 min ago',
    nextSync: 'Continuous (webhook)',
    syncFrequency: 'Real-time',
    dataPoints: '14,832',
    recordsToday: 47,
    version: 'Vault 24R1',
    environment: 'Production',
    endpoint: 'https://pharma-corp.veevavault.com/api/v24.1/',
    auth: 'OAuth 2.0 + SAML SSO',
    dataTypes: [
      { name: 'Deviations', count: '3,241', synced: true },
      { name: 'CAPAs', count: '1,876', synced: true },
      { name: 'Change Controls', count: '2,103', synced: true },
      { name: 'Complaints', count: '4,512', synced: true },
      { name: 'Audit Reports', count: '892', synced: true },
      { name: 'Quality Events', count: '2,208', synced: true },
    ],
    health: 99.7,
    latency: '45ms',
  },
  {
    id: 'labware-lims',
    name: 'LabWare LIMS',
    type: 'Laboratory Information Management',
    icon: '🟢',
    status: 'connected',
    lastSync: '15 min ago',
    nextSync: 'Every 15 minutes',
    syncFrequency: 'Near real-time',
    dataPoints: '28,451',
    recordsToday: 186,
    version: 'LabWare 8.1',
    environment: 'Production',
    endpoint: 'https://lims.pharma-corp.com/api/rest/v2/',
    auth: 'API Key + IP Whitelist',
    dataTypes: [
      { name: 'OOS Results', count: '342', synced: true },
      { name: 'OOT Results', count: '1,205', synced: true },
      { name: 'EM Data', count: '18,932', synced: true },
      { name: 'Stability Data', count: '5,441', synced: true },
      { name: 'Method Validations', count: '891', synced: true },
      { name: 'Instrument Calibrations', count: '1,640', synced: true },
    ],
    health: 99.2,
    latency: '120ms',
  },
  {
    id: 'osisoft-pi',
    name: 'OSIsoft PI (AVEVA)',
    type: 'Manufacturing Execution / Historian',
    icon: '🟠',
    status: 'connected',
    lastSync: '1 min ago',
    nextSync: 'Continuous (streaming)',
    syncFrequency: 'Real-time',
    dataPoints: '1,240,000+',
    recordsToday: 12840,
    version: 'PI Server 2025',
    environment: 'Production',
    endpoint: 'opc.tcp://mes-pi.pharma-corp.com:48010',
    auth: 'Certificate-based + Kerberos',
    dataTypes: [
      { name: 'Cpk Values', count: '45,200', synced: true },
      { name: 'Batch Yield Data', count: '8,932', synced: true },
      { name: 'Process Parameters', count: '890,000+', synced: true },
      { name: 'Equipment Alarms', count: '23,451', synced: true },
      { name: 'Cycle Times', count: '67,200', synced: true },
      { name: 'Environmental Controls', count: '205,000+', synced: true },
    ],
    health: 99.9,
    latency: '8ms',
  },
  {
    id: 'sap-erp',
    name: 'SAP S/4HANA',
    type: 'Enterprise Resource Planning',
    icon: '🔷',
    status: 'connected',
    lastSync: '1 hour ago',
    nextSync: 'Every 4 hours',
    syncFrequency: 'Batch (4x daily)',
    dataPoints: '9,120',
    recordsToday: 23,
    version: 'S/4HANA 2024',
    environment: 'Production',
    endpoint: 'https://sap-gw.pharma-corp.com/sap/opu/odata/',
    auth: 'SAP RFC + OAuth 2.0',
    dataTypes: [
      { name: 'Supplier Qualifications', count: '1,240', synced: true },
      { name: 'Production Volumes', count: '3,891', synced: true },
      { name: 'Material Traceability', count: '2,450', synced: true },
      { name: 'Batch Genealogy', count: '1,539', synced: true },
    ],
    health: 99.5,
    latency: '230ms',
  },
  {
    id: 'regulatory-intel',
    name: 'Cortellis Regulatory Intelligence',
    type: 'Regulatory Intelligence',
    icon: '🟣',
    status: 'connected',
    lastSync: '6 hours ago',
    nextSync: 'Daily at 06:00 UTC',
    syncFrequency: 'Daily batch',
    dataPoints: '4,567',
    recordsToday: 12,
    version: 'API v3.2',
    environment: 'Production',
    endpoint: 'https://api.cortellis.com/api-ws/rest/v3/',
    auth: 'API Key + TLS 1.3',
    dataTypes: [
      { name: 'FDA 483 Observations', count: '1,892', synced: true },
      { name: 'Warning Letters', count: '456', synced: true },
      { name: 'Import Alerts', count: '1,203', synced: true },
      { name: 'EU Non-Compliance', count: '1,016', synced: true },
    ],
    health: 98.8,
    latency: '340ms',
  },
  {
    id: 'dms',
    name: 'Veeva Vault QualityDocs',
    type: 'Document Management System',
    icon: '📄',
    status: 'connected',
    lastSync: '30 min ago',
    nextSync: 'Every 30 minutes',
    syncFrequency: 'Near real-time',
    dataPoints: '6,234',
    recordsToday: 8,
    version: 'Vault 24R1',
    environment: 'Production',
    endpoint: 'https://pharma-corp.veevavault.com/api/v24.1/objects/',
    auth: 'OAuth 2.0 (shared tenant)',
    dataTypes: [
      { name: 'SOP Status', count: '2,891', synced: true },
      { name: 'Training Records', count: '1,456', synced: true },
      { name: 'Periodic Reviews', count: '887', synced: true },
      { name: 'Change History', count: '1,000', synced: true },
    ],
    health: 99.4,
    latency: '65ms',
  },
  {
    id: 'hr-training',
    name: 'SuccessFactors',
    type: 'HR & Training Management',
    icon: '👥',
    status: 'connected',
    lastSync: '12 hours ago',
    nextSync: 'Daily at 02:00 UTC',
    syncFrequency: 'Daily batch',
    dataPoints: '2,340',
    recordsToday: 0,
    version: 'HCM Suite 2H 2025',
    environment: 'Production',
    endpoint: 'https://api.successfactors.com/odata/v2/',
    auth: 'OAuth 2.0 + SAML SSO',
    dataTypes: [
      { name: 'Personnel Turnover', count: '340', synced: true },
      { name: 'Training Compliance', count: '1,200', synced: true },
      { name: 'Certifications', count: '450', synced: true },
      { name: 'Auditor Qualifications', count: '350', synced: true },
    ],
    health: 99.1,
    latency: '180ms',
  },
];

const availableSystems = [
  { name: 'TrackWise (Honeywell)', type: 'QMS', desc: 'Alternative QMS connector' },
  { name: 'MasterControl', type: 'QMS/DMS', desc: 'Quality & document management' },
  { name: 'STARLIMS (Abbott)', type: 'LIMS', desc: 'Laboratory information system' },
  { name: 'Empower (Waters)', type: 'CDS', desc: 'Chromatography data system' },
  { name: 'Emerson DeltaV', type: 'DCS/MES', desc: 'Distributed control system' },
  { name: 'Oracle EBS', type: 'ERP', desc: 'Enterprise resource planning' },
  { name: 'Documentum (OpenText)', type: 'DMS', desc: 'Document management' },
  { name: 'Cornerstone OnDemand', type: 'LMS', desc: 'Learning management' },
];

function PulsingDot({ color = '#43A047' }) {
  return (
    <div style={{ position: 'relative', width: 10, height: 10, display: 'inline-block' }}>
      <div style={{ position: 'absolute', width: 10, height: 10, borderRadius: '50%', background: color }} />
      <div style={{ position: 'absolute', width: 10, height: 10, borderRadius: '50%', background: color, animation: 'pulse-glow 2s ease-in-out infinite', opacity: 0.5 }} />
    </div>
  );
}

function DataFlowBar() {
  const [flows, setFlows] = useState([]);
  useEffect(() => {
    const systems = ['Veeva QMS', 'LabWare LIMS', 'OSIsoft PI', 'SAP S/4HANA', 'Cortellis'];
    const types = ['deviation record', 'OOS result', 'Cpk value update', 'batch record', 'FDA 483 observation', 'CAPA status change', 'EM reading', 'process parameter snapshot'];
    const add = () => {
      const sys = systems[Math.floor(Math.random() * systems.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      setFlows(prev => [...prev.slice(-4), { id: Date.now(), sys, type, time: new Date().toLocaleTimeString() }]);
    };
    add();
    const i = setInterval(add, 3000);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{ padding: '12px 16px', background: 'rgba(0,131,143,0.03)', border: '1px solid rgba(0,131,143,0.1)', borderRadius: 10, marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Activity size={14} style={{ color: '#00838F' }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Live Data Ingestion Feed</span>
        <PulsingDot color="#00838F" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {flows.map(f => (
          <div key={f.id} style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', gap: 8, alignItems: 'center', animation: 'fade-in 0.3s ease' }}>
            <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: 10 }}>{f.time}</span>
            <span style={{ color: '#00838F', fontWeight: 500 }}>{f.sys}</span>
            <span>→</span>
            <span>Ingested new {f.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConnectWizard({ onClose }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => { setConnecting(false); setConnected(true); setStep(3); }, 2500);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 560, maxHeight: '85vh', overflow: 'auto', background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Connect Data Source</h3>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-muted)' }}>Step {step} of 3</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}><X size={18} /></button>
        </div>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 4, padding: '0 24px', marginTop: 16 }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? '#00838F' : 'var(--border-color)', transition: 'background 0.3s' }} />
          ))}
        </div>
        {/* Content */}
        <div style={{ padding: '20px 24px' }}>
          {step === 1 && (
            <>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Select System Type</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {availableSystems.map(s => (
                  <div key={s.name} onClick={() => setSelected(s)}
                    style={{
                      padding: '12px 14px', borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s',
                      border: `1px solid ${selected?.name === s.name ? '#00838F' : 'var(--border-color)'}`,
                      background: selected?.name === s.name ? 'rgba(0,131,143,0.04)' : 'transparent',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.type} — {s.desc}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Connection Configuration — {selected?.name}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Endpoint URL', placeholder: `https://${selected?.name.toLowerCase().replace(/[^a-z]/g, '')}.pharma-corp.com/api/`, type: 'url' },
                  { label: 'Authentication Method', placeholder: 'OAuth 2.0', type: 'select' },
                  { label: 'Client ID', placeholder: 'auditpilot-prod-xxxx', type: 'text' },
                  { label: 'Client Secret', placeholder: '••••••••••••••••', type: 'password' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</label>
                    {f.type === 'select' ? (
                      <select defaultValue="oauth2" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, fontFamily: 'inherit', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                        <option value="oauth2">OAuth 2.0</option>
                        <option value="apikey">API Key</option>
                        <option value="saml">SAML SSO</option>
                        <option value="cert">Certificate-based</option>
                      </select>
                    ) : (
                      <input type={f.type} defaultValue={f.placeholder} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, fontFamily: 'inherit', background: 'var(--bg-primary)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
                    )}
                  </div>
                ))}
                <div style={{ padding: '10px 14px', background: 'rgba(0,131,143,0.04)', borderRadius: 8, border: '1px solid rgba(0,131,143,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                    <Lock size={12} style={{ color: '#00838F' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>All credentials encrypted at rest (AES-256) and in transit (TLS 1.3)</span>
                  </div>
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              {connecting ? (
                <>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid var(--border-color)', borderTopColor: '#00838F', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Establishing Connection...</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Validating credentials and testing data access</div>
                </>
              ) : (
                <>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(67,160,71,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle2 size={28} style={{ color: '#43A047' }} />
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: '#43A047' }}>Connection Successful!</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>{selected?.name} is now connected to AuditPilot</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    {[
                      { label: 'Endpoint', value: 'Verified' },
                      { label: 'Authentication', value: 'Validated' },
                      { label: 'Data Access', value: 'Confirmed' },
                    ].map(c => (
                      <div key={c.label} style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>{c.label}</div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: '#43A047' }}>{c.value} ✅</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={step === 3 || step === 1 ? onClose : () => setStep(step - 1)} className="btn btn-secondary btn-sm">
            {step === 3 ? 'Done' : step === 1 ? 'Cancel' : 'Back'}
          </button>
          {step < 3 && (
            <button
              onClick={step === 2 ? handleConnect : () => setStep(2)}
              className="btn btn-primary btn-sm"
              disabled={step === 1 && !selected}
              style={{ opacity: step === 1 && !selected ? 0.5 : 1 }}
            >
              {step === 2 ? 'Test & Connect' : 'Next'} <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  const [expandedSystem, setExpandedSystem] = useState('veeva-qms');
  const [showWizard, setShowWizard] = useState(false);
  const [syncing, setSyncing] = useState(null);

  const handleSync = (id) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000);
  };

  const totalRecords = connectedSystems.reduce((s, sys) => s + parseInt(sys.dataPoints.replace(/[^0-9]/g, '')), 0);

  return (
    <div>
      <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Data Sources & Integrations</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            {connectedSystems.length} systems connected • {totalRecords.toLocaleString()}+ data points ingested
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowWizard(true)}>
          <Plus size={14} /> Connect New Source
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, margin: '20px 0' }}>
        {[
          { label: 'Connected Systems', value: connectedSystems.length, sub: 'All healthy', icon: '🔗', color: '#43A047' },
          { label: 'Data Points', value: `${Math.round(totalRecords / 1000)}K+`, sub: 'Total ingested records', icon: '📊', color: '#00838F' },
          { label: 'Avg Uptime', value: '99.5%', sub: 'Last 30 days', icon: '⚡', color: '#7C4DFF' },
          { label: 'Records Today', value: connectedSystems.reduce((s, sys) => s + sys.recordsToday, 0).toLocaleString(), sub: 'Ingested since midnight', icon: '📥', color: '#FF6D00' },
        ].map(m => (
          <div key={m.label} className="metric-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{m.label}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{m.sub}</div>
              </div>
              <span style={{ fontSize: 24 }}>{m.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Data Feed */}
      <DataFlowBar />

      {/* Connected Systems */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {connectedSystems.map(sys => (
          <div key={sys.id} className="card" style={{ overflow: 'hidden' }}>
            {/* System Header */}
            <div
              onClick={() => setExpandedSystem(expandedSystem === sys.id ? null : sys.id)}
              style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.15s' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ fontSize: 24 }}>{sys.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{sys.name}</span>
                    <PulsingDot color="#43A047" />
                    <span style={{ fontSize: 10, color: '#43A047', fontWeight: 600 }}>CONNECTED</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sys.type} • {sys.syncFrequency} • Last sync: {sys.lastSync}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{sys.dataPoints}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>records</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleSync(sys.id); }}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '4px 10px' }}
                >
                  <RefreshCw size={12} style={{ animation: syncing === sys.id ? 'spin 0.8s linear infinite' : 'none' }} />
                  {syncing === sys.id ? 'Syncing...' : 'Sync'}
                </button>
                <ChevronRight size={16} style={{
                  color: 'var(--text-muted)',
                  transform: expandedSystem === sys.id ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }} />
              </div>
            </div>

            {/* Expanded Detail */}
            {expandedSystem === sys.id && (
              <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                  {/* Connection Info */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Connection Details</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        { label: 'Endpoint', value: sys.endpoint },
                        { label: 'Authentication', value: sys.auth },
                        { label: 'Version', value: sys.version },
                        { label: 'Environment', value: sys.environment },
                        { label: 'Avg Latency', value: sys.latency },
                        { label: 'Uptime (30d)', value: `${sys.health}%` },
                      ].map(d => (
                        <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                          <span style={{ color: 'var(--text-muted)' }}>{d.label}</span>
                          <span style={{ fontWeight: 500, fontFamily: d.label === 'Endpoint' ? 'monospace' : 'inherit', fontSize: d.label === 'Endpoint' ? 10 : 12, maxWidth: 240, textAlign: 'right', wordBreak: 'break-all' }}>{d.value}</span>
                        </div>
                      ))}
                    </div>
                    {/* Health Bar */}
                    <div style={{ marginTop: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                        <span style={{ color: 'var(--text-muted)' }}>System Health</span>
                        <span style={{ color: '#43A047', fontWeight: 600 }}>{sys.health}%</span>
                      </div>
                      <div style={{ height: 6, background: 'var(--border-color)', borderRadius: 3 }}>
                        <div style={{ height: '100%', width: `${sys.health}%`, background: '#43A047', borderRadius: 3, transition: 'width 0.5s' }} />
                      </div>
                    </div>
                  </div>

                  {/* Data Types */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Synced Data Types</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {sys.dataTypes.map(dt => (
                        <div key={dt.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: 6, background: 'var(--bg-primary)', fontSize: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <CheckCircle2 size={12} style={{ color: '#43A047' }} />
                            <span>{dt.name}</span>
                          </div>
                          <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{dt.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Compliance Note */}
      <div style={{ marginTop: 20, padding: '14px 20px', background: 'rgba(0,131,143,0.03)', border: '1px solid rgba(0,131,143,0.1)', borderRadius: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
          <Shield size={14} style={{ color: '#00838F' }} />
          <span><strong>Data Governance:</strong> All integrations comply with 21 CFR Part 11, EU Annex 11, and GAMP 5. Data transfers are encrypted (TLS 1.3), audit-trailed, and validated per CSV lifecycle. No PHI/PII is ingested. All connection credentials are stored in an HSM-backed vault.</span>
        </div>
      </div>

      {showWizard && <ConnectWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
}
