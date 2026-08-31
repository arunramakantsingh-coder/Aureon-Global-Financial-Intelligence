import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, BarChart3, Bell, BrainCircuit, ChevronRight, CircleDollarSign, Database, Globe2, LayoutDashboard, LineChart, Network, Newspaper, Search, ServerCog, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import './styles.css';

const forecasts = [
  { asset: 'USD / INR', type: 'Currency', price: '₹88.42', forecast: '₹89.10 – ₹90.30', probability: '72%', signal: 'Bullish' },
  { asset: 'Gold', type: 'Commodity', price: '$3,421', forecast: '$3,510 – $3,590', probability: '68%', signal: 'Bullish' },
  { asset: 'NIFTY 50', type: 'Index', price: '24,612', forecast: '24,900 – 25,450', probability: '61%', signal: 'Bullish' },
  { asset: 'Brent Crude', type: 'Commodity', price: '$72.80', forecast: '$68.40 – $75.20', probability: '54%', signal: 'Neutral' },
];

const events = [
  ['RBI policy expectations', 'Macro', 'High', 'INR · Banks · Bonds'],
  ['Oil supply risk', 'Geopolitics', 'High', 'Crude · INR · Inflation'],
  ['US rate path repricing', 'Rates', 'Medium', 'USD · Gold · Equities'],
  ['Semiconductor capex cycle', 'Corporate', 'Medium', 'AI · Semis · Tech'],
];

const fallbackSources = [
  { id:'market', name:'Market Data', domain:'prices/ohlcv', status:'foundation', records:0, freshness:'not connected' },
  { id:'macro', name:'Macro Data', domain:'rates/inflation/gdp', status:'foundation', records:0, freshness:'not connected' },
  { id:'corporate', name:'Corporate Data', domain:'fundamentals/events', status:'foundation', records:0, freshness:'not connected' },
  { id:'news', name:'News & Events', domain:'global intelligence', status:'foundation', records:0, freshness:'not connected' },
];
const fallbackEntities = [
  ['Instrument','Tradable or observable financial instrument','AAPL, NIFTY 50, USD/INR, Brent'],
  ['Organization','Company, institution, government or other organization','Apple, RBI, OPEC'],
  ['Market','Exchange, venue or economic market','NSE, NASDAQ, FX'],
  ['Country','Country or economic jurisdiction','India, United States'],
  ['Event','Observed world, macro, corporate or geopolitical event','Rate decision, earnings, sanctions'],
  ['Observation','Timestamped measured value with provenance','OHLCV, CPI, yield'],
].map(([name,description,examples])=>({name,description,examples}));

function DataCenter(){
  const [apiOnline,setApiOnline]=useState(false);
  const [sources,setSources]=useState(fallbackSources);
  const [entities,setEntities]=useState(fallbackEntities);
  const [summary,setSummary]=useState({sources:4,connected_sources:0,instruments:0,observations:0,events:0,provenance_coverage:'100% required'});

  useEffect(()=>{
    const base='http://localhost:8000/api/v1';
    Promise.all([
      fetch(`${base}/health`).then(r=>r.json()),
      fetch(`${base}/data/summary`).then(r=>r.json()),
      fetch(`${base}/data/sources`).then(r=>r.json()),
      fetch(`${base}/data/entities`).then(r=>r.json())
    ]).then(([health,s,src,e])=>{
      setApiOnline(health.status==='healthy'); setSummary(s); setSources(src); setEntities(e);
    }).catch(()=>setApiOnline(false));
  },[]);

  return <>
    <div className="module-banner">
      <div><div className="hero-kicker"><Database size={15}/> M1 · DATA FOUNDATION</div><h2>Aureon Data Center</h2><p>The control plane for every market, macro, corporate and world-event dataset entering Aureon. Provenance and time integrity are mandatory before intelligence is allowed downstream.</p></div>
      <div className={apiOnline?'api-state online':'api-state'}><span className="dot"/>{apiOnline?'BACKEND API ONLINE':'UI FOUNDATION MODE'}<small>{apiOnline?'localhost:8000':'Start backend to activate API'}</small></div>
    </div>

    <section className="metrics data-metrics">
      {[
        ['Registered sources',summary.sources,'M1 connector registry',Database],
        ['Connected sources',summary.connected_sources,'External feeds intentionally pending',Activity],
        ['Instruments',summary.instruments,'Canonical instrument registry',BarChart3],
        ['Observations',summary.observations,summary.provenance_coverage,ShieldCheck]
      ].map(([title,value,sub,Icon])=><div className="metric" key={title}><div className="metric-head"><span>{title}</span><Icon size={17}/></div><div className="metric-value">{value}</div><div className="metric-sub">{sub}</div></div>)}
    </section>

    <div className="grid-two data-grid">
      <section className="panel"><div className="panel-head"><div><div className="panel-title">Source Registry</div><div className="panel-sub">Truthful connector state · no fake live feeds</div></div><div className="demo-tag">M1.1</div></div>
        <div className="source-table"><div className="source-row source-header"><span>Source</span><span>Domain</span><span>Records</span><span>Status</span></div>{sources.map(s=><div className="source-row" key={s.id}><div><strong>{s.name}</strong><small>{s.freshness}</small></div><span>{s.domain}</span><span className="mono">{Number(s.records).toLocaleString()}</span><span className="foundation-badge">FOUNDATION</span></div>)}</div>
      </section>

      <section className="panel"><div className="panel-head"><div><div className="panel-title">Data Integrity Gate</div><div className="panel-sub">Rules enforced before forecasting</div></div><ShieldCheck size={18}/></div>
        <div className="gate-list">{[
          ['Provenance required','Every observation must retain its source.'],
          ['Event time ≠ ingestion time','Prevents look-ahead contamination.'],
          ['No silent synthetic values','Estimated data must be explicitly labelled.'],
          ['Historical replay safe','Only information available at decision time may be used.']
        ].map(([t,d])=><div className="gate" key={t}><ShieldCheck size={15}/><div><strong>{t}</strong><span>{d}</span></div></div>)}</div>
      </section>
    </div>

    <section className="panel entity-panel"><div className="panel-head"><div><div className="panel-title">Canonical Entity Model</div><div className="panel-sub">The shared language every Aureon module will use</div></div><ServerCog size={18}/></div>
      <div className="entity-grid">{entities.map(e=><div className="entity-card" key={e.name}><div className="entity-name">{e.name}</div><p>{e.description}</p><small>{e.examples}</small></div>)}</div>
    </section>

    <div className="foundation-flow"><span>PROVIDERS</span><ChevronRight/><span>RAW + PROVENANCE</span><ChevronRight/><span>NORMALIZATION</span><ChevronRight/><span>CANONICAL ENTITIES</span><ChevronRight/><span>INTELLIGENCE</span></div>
  </>;
}

function Overview(){return <>
  <div className="hero"><div><div className="hero-kicker"><Sparkles size={15}/> AUREON INTELLIGENCE CORE</div><h2>See the world. Understand the impact.<br/><em>Forecast what comes next.</em></h2><p>Continuous monitoring of markets, companies, macroeconomics and global events — connected through evidence, history and probabilistic models.</p></div><div className="hero-status"><span className="dot"/> RESEARCH MODE<div className="scan-line"/></div></div>
  <section className="metrics">{[['Markets monitored','—','providers pending',Activity],['Active world events','—','event feed pending',Globe2],['Forecasts active','0','models not enabled',TrendingUp],['Risk regime','N/A','requires real data',ShieldCheck]].map(([title,value,sub,Icon])=><div className="metric" key={title}><div className="metric-head"><span>{title}</span><Icon size={17}/></div><div className="metric-value">{value}</div><div className="metric-sub">{sub}</div></div>)}</section>
  <div className="grid-two"><section className="panel"><div className="panel-head"><div><div className="panel-title">Forecast Radar</div><div className="panel-sub">Illustrative UI only · models not active</div></div></div><div className="forecast-list">{forecasts.map(f=><div className="forecast" key={f.asset}><div className="asset"><div className="asset-icon"><BarChart3 size={16}/></div><div><strong>{f.asset}</strong><span>{f.type} · {f.price}</span></div></div><div className="range"><span>{f.forecast}</span><small>illustrative range</small></div><div className="prob"><strong>{f.probability}</strong><span>demo probability</span></div><div className={'signal '+f.signal.toLowerCase()}>{f.signal}</div></div>)}</div></section>
  <section className="panel"><div className="panel-head"><div><div className="panel-title">World Event Feed</div><div className="panel-sub">Illustrative event categories</div></div></div><div className="event-list">{events.map(([event,type,impact,assets])=><div className="event" key={event}><div className="event-icon"><Newspaper size={15}/></div><div className="event-main"><strong>{event}</strong><span>{type} · {assets}</span></div><span className={'impact '+impact.toLowerCase()}>{impact}</span></div>)}</div></section></div>
  <section className="panel intelligence"><div className="panel-head"><div><div className="panel-title">Impact Chain</div><div className="panel-sub">Target reasoning path — implementation arrives in later milestones</div></div><div className="demo-tag">CONCEPT</div></div><div className="chain"><div className="node source"><Globe2/><b>Oil supply shock</b><span>WORLD EVENT</span></div><ChevronRight/><div className="node"><CircleDollarSign/><b>Crude ↑</b><span>COMMODITY</span></div><ChevronRight/><div className="node"><Activity/><b>Inflation ↑</b><span>MACRO</span></div><ChevronRight/><div className="node"><TrendingUp/><b>USD / INR ↑</b><span>CURRENCY</span></div><ChevronRight/><div className="node outcome"><BrainCircuit/><b>Portfolio impact</b><span>FORECAST</span></div></div></section>
</>}

function App(){
  const [active,setActive]=useState('Overview');
  const nav=[['Overview',LayoutDashboard],['Data Center',Database],['Market Monitor',Activity],['World Events',Globe2],['Forecasts',TrendingUp],['Research',Search],['Knowledge Graph',Network],['Risk Engine',ShieldCheck],['Prediction Ledger',LineChart]];
  return <div className="app"><aside className="sidebar"><div className="brand"><div className="brand-mark">A</div><div><strong>AUREON</strong><span>GLOBAL INTELLIGENCE</span></div></div><div className="section-label">INTELLIGENCE</div><nav>{nav.map(([label,Icon])=><button key={label} className={active===label?'nav active':'nav'} onClick={()=>setActive(label)}><Icon size={17}/><span>{label}</span>{active===label&&<ChevronRight className="chevron" size={15}/>}</button>)}</nav><div className="sidebar-bottom"><div className="system"><span className="dot"/> M1 foundation active</div><div className="version">Aureon v0.1 · M1 Data Foundation</div></div></aside>
  <main className="main"><header className="topbar"><div><div className="eyebrow">GLOBAL MARKET INTELLIGENCE</div><h1>{active}</h1></div><div className="top-actions"><div className="search"><Search size={16}/><span>Search markets, companies, events...</span><kbd>⌘ K</kbd></div><button className="icon-btn"><Bell size={18}/></button><div className="avatar">AS</div></div></header><div className="content">{active==='Data Center'?<DataCenter/>:<Overview/>}<div className="footer-note"><ShieldCheck size={15}/><span><strong>Research mode:</strong> No live trading or investment execution is enabled. Any illustrative market values remain clearly separated from data-backed modules.</span></div></div></main></div>
}

createRoot(document.getElementById('root')).render(<App/>);
