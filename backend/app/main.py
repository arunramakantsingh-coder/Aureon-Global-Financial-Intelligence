from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Aureon Intelligence API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SOURCES = [
    {"id": "market", "name": "Market Data", "domain": "prices/ohlcv", "status": "foundation", "records": 0, "freshness": "not connected"},
    {"id": "macro", "name": "Macro Data", "domain": "rates/inflation/gdp", "status": "foundation", "records": 0, "freshness": "not connected"},
    {"id": "corporate", "name": "Corporate Data", "domain": "fundamentals/events", "status": "foundation", "records": 0, "freshness": "not connected"},
    {"id": "news", "name": "News & Events", "domain": "global intelligence", "status": "foundation", "records": 0, "freshness": "not connected"},
]

CANONICAL_ENTITIES = [
    {"name": "Instrument", "description": "Tradable or observable financial instrument", "examples": "AAPL, NIFTY 50, USD/INR, Brent"},
    {"name": "Organization", "description": "Company, institution, government or other organization", "examples": "Apple, RBI, OPEC"},
    {"name": "Market", "description": "Exchange, venue or economic market", "examples": "NSE, NASDAQ, FX"},
    {"name": "Country", "description": "Country or economic jurisdiction", "examples": "India, United States"},
    {"name": "Event", "description": "Observed world, macro, corporate or geopolitical event", "examples": "Rate decision, earnings, sanctions"},
    {"name": "Observation", "description": "Timestamped measured value with provenance", "examples": "OHLCV, CPI, yield"},
]

@app.get("/api/v1/health")
def health():
    return {
        "status": "healthy",
        "service": "aureon-api",
        "milestone": "M1 Data Foundation",
        "time": datetime.now(timezone.utc).isoformat(),
    }

@app.get("/api/v1/data/summary")
def data_summary():
    return {
        "mode": "foundation",
        "sources": len(SOURCES),
        "connected_sources": 0,
        "instruments": 0,
        "observations": 0,
        "events": 0,
        "provenance_coverage": "100% required",
        "message": "Canonical contracts are active; external providers are intentionally not connected yet.",
    }

@app.get("/api/v1/data/sources")
def data_sources():
    return SOURCES

@app.get("/api/v1/data/entities")
def entities():
    return CANONICAL_ENTITIES
