'use client';
import { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ShieldAlert, ClipboardList, FileEdit,
  Users, Globe, BarChart3, Settings, Moon, Sun, Sparkles,
  ChevronLeft, ChevronRight, Bell, Search, MessageSquare, X,
  Presentation, Database
} from 'lucide-react';
import './globals.css';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard, emoji: '🏠' },
  { href: '/risk-assessment', label: 'Risk Assessment', icon: ShieldAlert, emoji: '📊' },
  { href: '/audit-plan', label: 'Audit Plan', icon: ClipboardList, emoji: '📋' },
  { href: '/audit-preparation', label: 'Audit Preparation', icon: FileEdit, emoji: '📝' },
  { href: '/auditor-pool', label: 'Auditor Pool', icon: Users, emoji: '👥' },
  { href: '/global-map', label: 'Global Map', icon: Globe, emoji: '🌍' },
  { href: '/analytics', label: 'Analytics & Insights', icon: BarChart3, emoji: '📈' },
  { href: '/business-cases', label: 'Business Cases', icon: Presentation, emoji: '💼' },
  { href: '/integrations', label: 'Data Sources', icon: Database, emoji: '🔗' },
  { href: '/settings', label: 'Settings', icon: Settings, emoji: '⚙️' },
];

function Sidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  return (
    <aside style={{
      width: collapsed ? 72 : 260,
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1B2A4A 0%, #162240 50%, #111D33 100%)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s ease',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 50,
      borderRight: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? '20px 12px' : '20px 24px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #00ACC1, #00838F)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, flexShrink: 0,
          boxShadow: '0 2px 12px rgba(0,131,143,0.4)'
        }}>
          🛡️
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ color: '#fff', fontSize: 17, fontWeight: 700, letterSpacing: '-0.3px' }}>AuditPilot</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 500, letterSpacing: '0.5px' }}>AI-POWERED AUDIT PLATFORM</div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: collapsed ? '10px 12px' : '10px 16px',
              borderRadius: 10,
              color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
              fontSize: 13.5, fontWeight: isActive ? 600 : 500,
              transition: 'all 0.15s ease',
              textDecoration: 'none',
              background: isActive ? 'rgba(0,131,143,0.2)' : 'transparent',
              position: 'relative',
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}>
              {isActive && <div style={{ position: 'absolute', left: -12, top: '50%', transform: 'translateY(-50%)', width: 3, height: 24, background: '#00ACC1', borderRadius: '0 3px 3px 0' }} />}
              <Icon size={18} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{
          width: '100%', padding: '8px', borderRadius: 8,
          background: 'rgba(255,255,255,0.05)', border: 'none',
          color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* User */}
      {!collapsed && (
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #00ACC1, #7C4DFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600 }}>JT</div>
          <div>
            <div style={{ color: '#fff', fontSize: 12.5, fontWeight: 600 }}>Dr. Julia Torres</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10.5 }}>VP Quality Audit</div>
          </div>
        </div>
      )}
    </aside>
  );
}

function Header({ theme, setTheme, showCopilot, setShowCopilot }) {
  return (
    <header style={{
      height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky', top: 0, zIndex: 40,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', background: 'var(--bg-primary)',
          borderRadius: 8, border: '1px solid var(--border-color)', minWidth: 280,
        }}>
          <Search size={14} style={{ color: 'var(--text-muted)' }} />
          <input placeholder="Search auditable units, auditors, audits..." style={{
            border: 'none', background: 'transparent', outline: 'none',
            fontSize: 13, color: 'var(--text-primary)', width: '100%',
            fontFamily: 'inherit',
          }} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div className="ai-badge" style={{ marginRight: 8 }}>
          <Sparkles size={12} /> AI Engine Active
        </div>
        <button onClick={() => setShowCopilot(!showCopilot)} style={{
          width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border-color)',
          background: showCopilot ? 'rgba(124,77,255,0.1)' : 'var(--bg-card)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: showCopilot ? 'var(--ai-purple)' : 'var(--text-secondary)',
        }}>
          <MessageSquare size={16} />
        </button>
        <button style={{
          width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border-color)',
          background: 'var(--bg-card)', cursor: 'pointer', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-secondary)',
        }}>
          <Bell size={16} />
          <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#E53935', border: '2px solid var(--bg-card)' }} />
        </button>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={{
          width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border-color)',
          background: 'var(--bg-card)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-secondary)',
        }}>
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </header>
  );
}

function AICopilot({ show, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your AuditPilot AI assistant. I can help you with risk assessments, audit planning, and team assignments. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const presets = [
    "Why is Indianapolis Parenteral Plant scored as high risk?",
    "Which AUs are currently out of control?",
    "Who else could lead the Teva API audit?",
    "Show me key findings from the last Patheon audit",
  ];
  const aiResponses = {
    "Why is Indianapolis Parenteral Plant scored as high risk?": "Indianapolis Parenteral Plant has a risk score of **78/100** (HIGH) driven by several factors:\n\n• **Cpk 0.87** — below 1.0 threshold (State of Control: 🔴)\n• **3 critical open deviations** in aseptic processing\n• **FDA VAI** with 3 Form 483 observations (June 2025)\n• **2 overdue CAPAs**\n• Environmental monitoring trends showing upward particulate counts in Grade A zones\n\nA for-cause audit has been recommended for Q1 2026.",
    "Which AUs are currently out of control?": "Three Auditable Units are currently in 🔴 **Out of Control** status:\n\n1. **Indianapolis Parenteral Plant** — Cpk 0.87\n2. **Patheon (Thermo Fisher) — Greenville** — Cpk 0.92\n3. **Teva API — Goa, India** — Cpk 0.78\n\nAll three have been prioritized for Q1 for-cause audits in the 2026 plan.",
    "Who else could lead the Teva API audit?": "Current assignment: **Priya Sharma** (Match: 94%)\n\nAlternative Lead Auditor candidates:\n1. **Dr. Fatima Al-Rashid** — 11 years experience, Analytical & Chemistry skills, available Q1 (Match: 82%)\n2. **Dr. Anna Kowalski** — 16 years experience, QA & Regulatory expertise, available Q1 (Match: 76%)\n\nPriya Sharma remains the strongest match due to her API synthesis specialization and APAC regional experience.",
    "Show me key findings from the last Patheon audit": "Last audit: **June 10, 2024** — 3 findings documented:\n\n🔴 **Critical**: Media fill failure rate exceeding acceptance criteria (Status: CAPA In Progress)\n🔴 **Critical**: Inadequate deviation investigation root cause analysis (Status: Open)\n🟡 **Major**: Audit trail review not performed for electronic batch records (Status: CAPA In Progress)\n\nThe FDA subsequently issued OAI classification in August 2025 with 5 Form 483 observations."
  };
  const mockReply = (q) => aiResponses[q] || "I've analyzed the data and here's what I found: Based on the current risk assessments and audit history, I'd recommend reviewing the detailed risk profile for the specific AU you're interested in. You can navigate to the Risk Assessment page for comprehensive analysis.";

  const handleSend = async (text) => {
    const q = text || input;
    if (!q.trim() || loading) return;
    const userMsg = { role: 'user', text: q };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({
            role: m.role === 'ai' ? 'assistant' : 'user',
            content: m.text,
          })),
        }),
      });
      if (!res.ok) throw new Error('chat unavailable');
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch {
      // GenAI not configured / unreachable → fall back to built-in answers.
      setMessages(prev => [...prev, { role: 'ai', text: mockReply(q) }]);
    } finally {
      setLoading(false);
    }
  };
  if (!show) return null;
  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, bottom: 0,
      width: 380, background: 'var(--bg-card)',
      borderLeft: '1px solid var(--border-color)',
      zIndex: 100, display: 'flex', flexDirection: 'column',
      boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={18} style={{ color: 'var(--ai-purple)' }} />
          <span style={{ fontWeight: 600, fontSize: 14 }}>AI Copilot</span>
          <span className="ai-badge" style={{ fontSize: 10 }}>✨ Powered by AI</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}><X size={16} /></button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '90%', padding: '10px 14px',
            borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
            background: m.role === 'user' ? 'linear-gradient(135deg, var(--teal), var(--teal-dark))' : 'var(--bg-primary)',
            color: m.role === 'user' ? '#fff' : 'var(--text-primary)',
            fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-wrap',
            border: m.role === 'ai' ? '1px solid var(--border-color)' : 'none',
          }}>
            {m.text}
          </div>
        ))}
        {loading && (
          <div style={{
            alignSelf: 'flex-start', maxWidth: '90%', padding: '10px 14px',
            borderRadius: '14px 14px 14px 4px', background: 'var(--bg-primary)',
            color: 'var(--text-muted)', fontSize: 13, fontStyle: 'italic',
            border: '1px solid var(--border-color)',
          }}>
            Thinking…
          </div>
        )}
      </div>
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {presets.map((p, i) => (
            <button key={i} onClick={() => handleSend(p)} style={{
              padding: '5px 10px', fontSize: 11, borderRadius: 6,
              background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
              cursor: 'pointer', color: 'var(--text-secondary)',
              fontFamily: 'inherit', transition: 'all 0.15s',
            }}>{p.slice(0, 35)}...</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={loading}
            placeholder="Ask about risk, audits, teams..."
            style={{
              flex: 1, padding: '8px 12px', borderRadius: 8,
              border: '1px solid var(--border-color)', background: 'var(--bg-primary)',
              outline: 'none', fontSize: 13, fontFamily: 'inherit',
              color: 'var(--text-primary)',
            }}
          />
          <button onClick={() => handleSend()} disabled={loading} className="btn btn-ai btn-sm">{loading ? '…' : 'Send'}</button>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <title>AuditPilot — AI-Augmented Audit Planning Platform</title>
        <meta name="description" content="AI-Augmented Intelligent Audit Planning Platform for pharmaceutical GxP compliance" />
      </head>
      <body>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
            <div style={{
              flex: 1, marginLeft: sidebarCollapsed ? 72 : 260,
              transition: 'margin-left 0.3s ease',
              marginRight: showCopilot ? 380 : 0,
            }}>
              <Header theme={theme} setTheme={setTheme} showCopilot={showCopilot} setShowCopilot={setShowCopilot} />
              <main style={{ padding: '24px 28px', minHeight: 'calc(100vh - 56px)' }}>
                {children}
              </main>
            </div>
            <AICopilot show={showCopilot} onClose={() => setShowCopilot(false)} />
          </div>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
