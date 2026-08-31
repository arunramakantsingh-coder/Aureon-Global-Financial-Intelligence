import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, BarChart3, Bell, BrainCircuit, ChevronRight, CircleDollarSign, Globe2, LayoutDashboard, LineChart, Network, Newspaper, Search, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import './styles.css';

const forecasts = [
  { asset: 'USD / INR', type: 'Currency', price: '₹88.42', forecast: '₹89.10 – ₹90.30', probability: '72%', signal: 'Bullish', confidence: 'Medium' },
  { asset: 'Gold', type: 'Commodity', price: '$3,421', forecast: '$3,510 – $3,590', probability: '68%', signal: 'Bullish', confidence: 'Medium' },
  { asset: 'NIFTY 50', type: 'Index', price: '24,612', forecast: '24,900 – 25,450', probability: '61%', signal: 'Bullish', confidence: 'Medium' },
  { asset: 'Brent Crude', type: 'Commodity', price: '$72.80', forecast: '$68.40 – $75.20', probability: '54%', signal: 'Neutral', confidence: 'Low' },
];

const events = [
  ['RBI policy expectations', 'Macro', 'High', 'INR · Banks · Bonds'],
  ['Oil supply risk', 'Geopolitics', 'High', 'Crude · INR · Inflation'],
  ['US rate path repricing', 'Rates', 'Medium', 'USD · Gold · Equities'],
  ['Semiconductor capex cycle', 'Corporate', 'Medium', 'AI · Semis · Tech'],
];

function App() {
  const [active, setActive] = useState('Overview');
  const nav = [
    ['Overview', LayoutDashboard], ['Market Monitor', Activity], ['World Events', Globe2],
    ['Forecasts', TrendingUp], ['Research', Search], ['Knowledge Graph', Network],
    ['Risk Engine', ShieldCheck], ['Prediction Ledger', LineChart]
  ];

  return <div className="app">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">A</div><div><strong>AUREON</strong><span>GLOBAL INTELLIGENCE</span></div></div>
      <div className="section-label">INTELLIGENCE</div>
      <nav>{nav.map(([label, Icon]) => <button key={label} className={active === label ? 'nav active' : 'nav'} onClick={() => setActive(label)}><Icon size={17}/><span>{label}</span>{active === label && <ChevronRight className="chevron" size={15}/>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="system"><span className="dot"/> Intelligence core online</div><div className="version">Aureon v0.1 · M1 Data Foundation</div></div>
    </aside>

    <main className="main">
      <header className="topbar"><div><div className="eyebrow">GLOBAL MARKET INTELLIGENCE</div><h1>{active}</h1></div><div className="top-actions"><div className="search"><Search size={16}/><span>Search markets, companies, events...</span><kbd>⌘ K</kbd></div><button className="icon-btn"><Bell size={18}/></button><div className="avatar">AS</div></div></header>

      <div className="content">
        <div className="hero"><div><div className="hero-kicker"><Sparkles size={15}/> AUREON INTELLIGENCE CORE</div><h2>See the world. Understand the impact.<br/><em>Forecast what comes next.</em></h2><p>Continuous monitoring of markets, companies, macroeconomics and global events — connected through evidence, history and probabilistic models.</p></div><div className="hero-status"><span className="dot"/> LIVE MONITORING<div className="scan-line"/></div></div>

        <section className="metrics">
          {[['Markets monitored','12,486','+2.4% today', Activity],['Active world events','1,284','37 high impact', Globe2],['Forecasts active','3,762','91 updating', TrendingUp],['Risk regime','MODERATE','Confidence 78%', ShieldCheck]].map(([title,value,sub,Icon]) => <div className="metric" key={title}><div className="metric-head"><span>{title}</span><Icon size={17}/></div><div className="metric-value">{value}</div><div className="metric-sub">{sub}</div></div>)}
        </section>

        <div className="grid-two">
          <section className="panel"><div className="panel-head"><div><div className="panel-title">Forecast Radar</div><div className="panel-sub">30-day probabilistic outlook · illustrative M0 data</div></div><button className="text-btn">View all <ChevronRight size={14}/></button></div><div className="forecast-list">{forecasts.map(f => <div className="forecast" key={f.asset}><div className="asset"><div className="asset-icon"><BarChart3 size={16}/></div><div><strong>{f.asset}</strong><span>{f.type} · {f.price}</span></div></div><div className="range"><span>{f.forecast}</span><small>expected range</small></div><div className="prob"><strong>{f.probability}</strong><span>prob. positive</span></div><div className={'signal ' + f.signal.toLowerCase()}>{f.signal}</div></div>)}</div></section>

          <section className="panel"><div className="panel-head"><div><div className="panel-title">World Event Feed</div><div className="panel-sub">Events with potential market impact</div></div><button className="text-btn">Open feed <ChevronRight size={14}/></button></div><div className="event-list">{events.map(([event,type,impact,assets]) => <div className="event" key={event}><div className="event-icon"><Newspaper size={15}/></div><div className="event-main"><strong>{event}</strong><span>{type} · {assets}</span></div><span className={'impact ' + impact.toLowerCase()}>{impact}</span></div>)}</div></section>
        </div>

        <section className="panel intelligence"><div className="panel-head"><div><div className="panel-title">Impact Chain</div><div className="panel-sub">How Aureon connects a world event to financial outcomes</div></div><div className="demo-tag">DEMO / M0</div></div><div className="chain"><div className="node source"><Globe2/><b>Oil supply shock</b><span>WORLD EVENT</span></div><ChevronRight/><div className="node"><CircleDollarSign/><b>Crude ↑</b><span>COMMODITY</span></div><ChevronRight/><div className="node"><Activity/><b>Inflation ↑</b><span>MACRO</span></div><ChevronRight/><div className="node"><TrendingUp/><b>USD / INR ↑</b><span>CURRENCY</span></div><ChevronRight/><div className="node outcome"><BrainCircuit/><b>Portfolio impact</b><span>FORECAST</span></div></div></section>

        <div className="footer-note"><ShieldCheck size={15}/><span><strong>Research mode:</strong> No live trading or investment execution is enabled. Forecasts shown in this interface are illustrative until the data, historical and model-validation layers are implemented.</span></div>
      </div>
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<App />);
