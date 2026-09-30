'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  LoaderCircle,
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
    status: 'Queued',
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
    status: 'Queued',
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
  const statusClass = agent.status === 'Complete' ? 'complete' : agent.status === 'In Progress' ? 'working' : 'queued'
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
        <div className={`agent-status ${statusClass}`}>
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
  const [swarmStep, setSwarmStep] = useState(0)
  const [hazardShifted, setHazardShifted] = useState(false)
  const isRunning = swarmStep > 0 && swarmStep < 4

  useEffect(() => {
    if (!isRunning) return
    const timer = window.setTimeout(() => setSwarmStep((step) => Math.min(step + 1, 4)), 500)
    return () => window.clearTimeout(timer)
  }, [isRunning, swarmStep])

  const liveAgents = useMemo(() => agents.map((agent, index) => {
    const agentStep = swarmStep - index
    const status = agentStep >= 2 ? 'Complete' : agentStep === 1 ? 'In Progress' : 'Queued'
    const steps = agent.steps.map(([label], stepIndex) => [
      label,
      agentStep >= 2 ? 'Complete' : agentStep === 1 && stepIndex === 0 ? 'In progress' : 'Queued',
    ] as [string, string])
    return { ...agent, status, duration: status === 'Queued' ? '—' : status === 'Complete' ? '0.6s' : 'LIVE', steps }
  }), [swarmStep])

  const alertText = useMemo(() => {
    if (priority === 'Critical') return 'CRITICAL FLOOD RESPONSE — 5TH AVENUE'
    if (priority === 'High') return 'HIGH PRIORITY RESPONSE — 5TH AVENUE'
    return 'EMERGENCY RESPONSE — 5TH AVENUE'
  }, [priority])

  function triggerSwarm() {
    if (isRunning) return
    setSwarmStep(1)
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

      <section className="telemetry-grid" aria-label="Real-time swarm telemetry">
        <div className="telemetry-card"><span>DECISION LATENCY</span><strong>12 <small>ms / tick</small></strong><em className="safe">● WITHIN BUDGET</em></div>
        <div className="telemetry-card"><span>COLLISION-FREE MARGIN</span><strong>99.8<small>%</small></strong><em className="safe">● SAFE</em></div>
        <div className="telemetry-card"><span>TRAJECTORY RECALIBRATION</span><strong>0.3<small>s</small></strong><em className="active">● ACTIVE</em></div>
        <div className="telemetry-card"><span>NETWORK DROP RESILIENCE</span><strong>100<small>%</small></strong><em className="stable">● STABLE</em></div>
      </section>

      <section className="control-grid">
        <section className="panel input-panel">
          <div className="panel-heading"><div><span className="panel-kicker">01 / INPUT &amp; TRIGGER</span><h2>Incoming Incident</h2></div><div className="panel-symbol"><Zap size={15} /></div></div>
          <div className="field-label"><span>EMERGENCY MESSAGE</span><span className="field-meta">{message.length} / 500</span></div>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} aria-label="Emergency message" />
          <div className="field-label priority-label"><span>PRIORITY LEVEL</span><span className="required">REQUIRED</span></div>
          <div className="select-wrap"><select value={priority} onChange={(event) => setPriority(event.target.value)} aria-label="Priority level"><option>Critical</option><option>High</option><option>Moderate</option></select><ChevronDown size={15} /></div>
          <button className={`trigger-button ${isRunning ? 'triggered' : ''}`} onClick={triggerSwarm} disabled={isRunning} aria-live="polite">{isRunning ? <LoaderCircle className="spin" size={18} /> : <Sparkles size={18} />}{isRunning ? 'Swarm Processing' : swarmStep === 4 ? 'Swarm Complete — Run Again' : 'Trigger RescueNet AI Swarm'}<span className="button-arrow">→</span></button>
          <div className="secure-note"><Shield size={13} /> SECURE CHANNEL <span /> <span>ENCRYPTED / AES-256</span></div>
        </section>

        <section className="panel stream-panel">
          <div className="panel-heading"><div><span className="panel-kicker">02 / LIVE MULTI-AGENT STREAM</span><h2>Swarm Activity</h2></div><div className="live-label"><StatusDot /> LIVE</div></div>
          <div className="stream-summary"><div><span>ACTIVE AGENTS</span><strong>03</strong></div><div><span>EVENTS PROCESSED</span><strong>12</strong></div><div><span>SWARM LATENCY</span><strong>84<small>ms</small></strong></div></div>
          <div className="agent-list">{liveAgents.map((agent) => <AgentCard key={agent.name} agent={agent} />)}</div>
          <div className="stream-footer"><Activity size={13} /> STREAMING TELEMETRY <span>•••</span></div>
        </section>

        <section className="panel output-panel">
          <div className="panel-heading"><div><span className="panel-kicker">03 / DISPATCH SUMMARY</span><h2>Mission Output</h2></div><div className="panel-symbol ready"><Check size={15} /></div></div>
          <div className="trajectory-card">
            <div className="trajectory-heading"><div><span className="panel-kicker">LIVE SWARM TRAJECTORY</span><h3>Obstacle Avoidance Map</h3></div><span className="latency-badge">Latency: 12ms / tick</span></div>
            <div className={`trajectory-map ${hazardShifted ? 'perturbed' : ''}`}>
              <div className="map-grid-lines" aria-hidden="true" />
              <div className="map-label north">N</div><div className="map-label avenue">5TH AVE // FLOOD ZONE</div>
              <svg className="trajectory-svg" viewBox="0 0 520 210" role="img" aria-label="Animated collision-free paths around hazard zones">
                <path className="route route-scout" d={hazardShifted ? 'M34 174 C 112 164, 145 112, 216 128 S 342 176, 468 42' : 'M34 174 C 110 148, 142 64, 218 90 S 342 152, 468 42'} />
                <path className="route route-allocator" d={hazardShifted ? 'M34 174 C 126 190, 182 178, 254 150 S 356 78, 468 42' : 'M34 174 C 124 192, 175 178, 248 145 S 355 72, 468 42'} />
                <path className="route route-communicator" d={hazardShifted ? 'M34 174 C 120 130, 170 38, 264 64 S 380 116, 468 42' : 'M34 174 C 122 128, 168 44, 260 62 S 376 118, 468 42'} />
              </svg>
              <div className="hazard-zone hazard-one" /><div className="hazard-zone hazard-two" />
              <div className="agent-node scout-node"><span /> <b>SCOUT</b></div><div className="agent-node allocator-node"><span /> <b>ALLOCATOR</b></div><div className="agent-node communicator-node"><span /> <b>COMMUNICATOR</b></div>
              <div className="map-legend"><span><i className="legend-dot green" /> AGENT NODE</span><span><i className="legend-dot red" /> HAZARD ZONE</span></div>
            </div>
            <button className="perturb-button" onClick={() => setHazardShifted((shifted) => !shifted)} aria-pressed={hazardShifted}><Crosshair size={14} /> {hazardShifted ? 'Reset Hazard Field' : 'Simulate Hazard Perturbation'} <span>↗</span></button>
          </div>
          <div className="summary-grid">
            <div className="summary-card priority"><span>PRIORITY LEVEL</span><strong><span className="priority-flag">!</span>{priority.toUpperCase()}</strong><small>IMMEDIATE RESPONSE</small></div>
            <div className="summary-card"><span>ASSIGNED RESCUE TEAM</span><strong><Users size={16} /> WATER RESCUE <small>UNIT 07</small></strong><small>4 PERSONNEL · BOAT 02</small></div>
            <div className="summary-card"><span>ESTIMATED ARRIVAL</span><strong><Clock3 size={16} /> 08:42 <small>MIN</small></strong><small>ETA CONFIDENCE 94%</small></div>
            <div className="summary-card location"><span>INCIDENT LOCATION</span><strong><MapPin size={16} /> 5TH AVENUE</strong><small><LocateFixed size={11} /> 40.7128° N, 74.0060° W</small></div>
          </div>
          <div className="alert-output"><div className="alert-title"><span>READY-TO-SEND EMERGENCY ALERT</span><span className="draft-badge">DRAFT</span></div><div className="alert-copy"><strong>{swarmStep === 4 ? alertText : 'AWAITING SWARM ANALYSIS'}</strong><p>{swarmStep === 4 ? 'Water rescue team dispatched to 5th Avenue. Three civilians reported stranded on rooftop due to severe flooding. Avoid area and follow emergency personnel instructions.' : 'Trigger the RescueNet AI Swarm to generate a verified dispatch alert.'}</p><div className="alert-tags"><span><Radio size={11} /> CITYWIDE</span><span><Send size={11} /> SMS · RADIO · WEB</span></div></div></div>
          <button className="dispatch-button"><Send size={15} /> Review &amp; Dispatch Alert <span>→</span></button>
        </section>
      </section>
      <footer className="status-footer"><span><Cpu size={13} /> POWERED BY RESCUENET SWARM INTELLIGENCE</span><span>BUILD 2.4.0 <i /> LATENCY NOMINAL</span></footer>
    </main>
  )
}
