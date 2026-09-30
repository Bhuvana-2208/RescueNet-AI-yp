'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  BellRing,
  Check,
  ChevronDown,
  Clock3,
  Crosshair,
  Cpu,
  LocateFixed,
  MapPin,
  Radio,
  Route,
  Send,
  Shield,
  Siren,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'

const agents = [
  {
    name: 'Scout Agent',
    role: 'SITUATION AWARENESS',
    icon: Crosshair,
    color: 'cyan',
    status: 'Complete',
    duration: '1.2s',
    steps: [
      ['Message ingestion', 'Complete'],
      ['Priority classification', 'Complete'],
      ['Geolocation extraction', 'Complete'],
    ],
  },
  {
    name: 'Allocator Agent',
    role: 'RESOURCE COORDINATION',
    icon: Route,
    color: 'amber',
    status: 'Routing',
    duration: '2.4s',
    steps: [
      ['Resource pathfinding', 'Complete'],
      ['Optimal dispatch routing', 'In progress'],
      ['Team availability check', 'Queued'],
    ],
  },
  {
    name: 'Communicator Agent',
    role: 'PUBLIC INFORMATION',
    icon: Radio,
    color: 'violet',
    status: 'Queued',
    duration: '—',
    steps: [
      ['Emergency broadcast generation', 'Queued'],
      ['Channel selection', 'Queued'],
      ['Alert review', 'Queued'],
    ],
  },
]

function StatusDot({ tone = 'cyan' }: { tone?: string }) {
  return <span className={`status-dot ${tone}`} aria-hidden="true" />
}

function AgentCard({ agent }: { agent: (typeof agents)[number] }) {
  const Icon = agent.icon
  return (
    <article className={`agent-card ${agent.color}`}>
      <div className="agent-head">
        <div className="agent-identity">
          <div className={`agent-icon ${agent.color}`}><Icon size={17} /></div>
          <div>
            <h3>{agent.name}</h3>
            <p>{agent.role}</p>
          </div>
        </div>
        <div className={`agent-status ${agent.status === 'Complete' ? 'complete' : agent.status === 'Routing' ? 'working' : 'queued'}`}>
          <StatusDot tone={agent.color} /> {agent.status}
        </div>
      </div>
      <div className="agent-steps">
        {agent.steps.map(([label, state], index) => (
          <div className="agent-step" key={label}>
            <div className={`step-marker ${state === 'Complete' ? 'done' : state === 'In progress' ? 'active' : ''}`}>
              {state === 'Complete' ? <Check size={12} /> : state === 'In progress' ? <span /> : index + 1}
            </div>
            <span className={state === 'Queued' ? 'muted' : ''}>{label}</span>
            <span className={`step-state ${state === 'Complete' ? 'done-text' : state === 'In progress' ? 'active-text' : ''}`}>{state}</span>
          </div>
        ))}
      </div>
      <div className="agent-foot"><span><Clock3 size={12} /> {agent.duration}</span><span>LIVE TRACE</span></div>
    </article>
  )
}

export default function Page() {
  const [message, setMessage] = useState('Severe flooding on 5th Avenue, 3 people stuck on roof')
  const [priority, setPriority] = useState('Critical')
  const [triggered, setTriggered] = useState(false)

  const alertText = useMemo(() => {
    if (priority === 'Critical') return 'CRITICAL FLOOD RESPONSE — 5TH AVENUE'
    if (priority === 'High') return 'HIGH PRIORITY RESPONSE — 5TH AVENUE'
    return 'EMERGENCY RESPONSE — 5TH AVENUE'
  }, [priority])

  function triggerSwarm() {
    setTriggered(true)
    window.setTimeout(() => setTriggered(false), 3500)
  }

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark"><Siren size={20} /></div>
          <div><div className="brand-name">RescueNet <span>AI</span></div><div className="brand-subtitle">EMERGENCY RESPONSE CONTROL</div></div>
        </div>
        <div className="system-state"><StatusDot /><span>ALL SYSTEMS OPERATIONAL</span><span className="divider" /><span className="utc">UTC 14:32:08</span></div>
        <div className="top-actions"><button className="icon-button" aria-label="Notifications"><BellRing size={17} /><i /></button><div className="operator"><div className="operator-avatar">OP</div><span>OPERATOR 01</span><ChevronDown size={14} /></div></div>
      </header>

      <section className="page-intro">
        <div><div className="eyebrow"><span className="pulse-ring" /> INCIDENT COMMAND / LIVE MISSION</div><h1>Emergency Response <em>Control Center</em></h1><p>Coordinate autonomous agents to assess, allocate, and respond to incidents in real time.</p></div>
        <div className="mission-id"><span>MISSION ID</span><strong>RN-2048-<b>FLOOD</b></strong></div>
      </section>

      <section className="control-grid">
        <section className="panel input-panel">
          <div className="panel-heading"><div><span className="panel-kicker">01 / INPUT &amp; TRIGGER</span><h2>Incoming Incident</h2></div><div className="panel-symbol"><Zap size={15} /></div></div>
          <div className="field-label"><span>EMERGENCY MESSAGE</span><span className="field-meta">{message.length} / 500</span></div>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} aria-label="Emergency message" />
          <div className="field-label priority-label"><span>PRIORITY LEVEL</span><span className="required">REQUIRED</span></div>
          <div className="select-wrap"><select value={priority} onChange={(event) => setPriority(event.target.value)} aria-label="Priority level"><option>Critical</option><option>High</option><option>Moderate</option></select><ChevronDown size={15} /></div>
          <button className={`trigger-button ${triggered ? 'triggered' : ''}`} onClick={triggerSwarm}><Sparkles size={18} />{triggered ? 'Swarm Activated' : 'Trigger RescueNet AI Swarm'}<span className="button-arrow">→</span></button>
          <div className="secure-note"><Shield size={13} /> SECURE CHANNEL <span /> <span>ENCRYPTED / AES-256</span></div>
        </section>

        <section className="panel stream-panel">
          <div className="panel-heading"><div><span className="panel-kicker">02 / LIVE MULTI-AGENT STREAM</span><h2>Swarm Activity</h2></div><div className="live-label"><StatusDot /> LIVE</div></div>
          <div className="stream-summary"><div><span>ACTIVE AGENTS</span><strong>03</strong></div><div><span>EVENTS PROCESSED</span><strong>12</strong></div><div><span>SWARM LATENCY</span><strong>84<small>ms</small></strong></div></div>
          <div className="agent-list">{agents.map((agent) => <AgentCard key={agent.name} agent={agent} />)}</div>
          <div className="stream-footer"><Activity size={13} /> STREAMING TELEMETRY <span>•••</span></div>
        </section>

        <section className="panel output-panel">
          <div className="panel-heading"><div><span className="panel-kicker">03 / DISPATCH SUMMARY</span><h2>Mission Output</h2></div><div className="panel-symbol ready"><Check size={15} /></div></div>
          <div className="summary-grid">
            <div className="summary-card priority"><span>PRIORITY LEVEL</span><strong><span className="priority-flag">!</span>{priority.toUpperCase()}</strong><small>IMMEDIATE RESPONSE</small></div>
            <div className="summary-card"><span>ASSIGNED RESCUE TEAM</span><strong><Users size={16} /> WATER RESCUE <small>UNIT 07</small></strong><small>4 PERSONNEL · BOAT 02</small></div>
            <div className="summary-card"><span>ESTIMATED ARRIVAL</span><strong><Clock3 size={16} /> 08:42 <small>MIN</small></strong><small>ETA CONFIDENCE 94%</small></div>
            <div className="summary-card location"><span>INCIDENT LOCATION</span><strong><MapPin size={16} /> 5TH AVENUE</strong><small><LocateFixed size={11} /> 40.7128° N, 74.0060° W</small></div>
          </div>
          <div className="alert-output"><div className="alert-title"><span>READY-TO-SEND EMERGENCY ALERT</span><span className="draft-badge">DRAFT</span></div><div className="alert-copy"><strong>{alertText}</strong><p>Water rescue team dispatched to <b>5th Avenue</b>. Three civilians reported stranded on rooftop due to severe flooding. Avoid area and follow emergency personnel instructions.</p><div className="alert-tags"><span><Radio size={11} /> CITYWIDE</span><span><Send size={11} /> SMS · RADIO · WEB</span></div></div></div>
          <button className="dispatch-button"><Send size={15} /> Review &amp; Dispatch Alert <span>→</span></button>
        </section>
      </section>
      <footer className="status-footer"><span><Cpu size={13} /> POWERED BY RESCUENET SWARM INTELLIGENCE</span><span>BUILD 2.4.0 <i /> LATENCY NOMINAL</span></footer>
    </main>
  )
}
