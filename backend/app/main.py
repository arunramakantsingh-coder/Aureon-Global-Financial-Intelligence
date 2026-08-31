from datetime import datetime, timezone
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, select, text
from sqlalchemy.orm import Session
from .db import Base, engine, get_db
from .models import Country, DataSource, Event, Instrument, Observation, Organization
from .seed import seed

app = FastAPI(title="Aureon Intelligence API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    seed()


@app.get("/api/v1/health")
def health(db: Session = Depends(get_db)):
    database = "healthy"
    try:
        db.execute(text("SELECT 1"))
    except Exception:
        database = "unavailable"
    return {
        "status": "healthy" if database == "healthy" else "degraded",
        "service": "aureon-api",
        "milestone": "M1.2 PostgreSQL Data Foundation",
        "api_port": 8010,
        "database": database,
        "time": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/api/v1/data/summary")
def data_summary(db: Session = Depends(get_db)):
    return {
        "mode": "database",
        "sources": db.scalar(select(func.count()).select_from(DataSource)) or 0,
        "connected_sources": db.scalar(select(func.count()).select_from(DataSource).where(DataSource.is_enabled.is_(True))) or 0,
        "instruments": db.scalar(select(func.count()).select_from(Instrument)) or 0,
        "observations": db.scalar(select(func.count()).select_from(Observation)) or 0,
        "events": db.scalar(select(func.count()).select_from(Event)) or 0,
        "organizations": db.scalar(select(func.count()).select_from(Organization)) or 0,
        "countries": db.scalar(select(func.count()).select_from(Country)) or 0,
        "provenance_coverage": "100% required",
        "message": "Counts are read from PostgreSQL. External providers remain disabled until connector validation is complete.",
    }


@app.get("/api/v1/data/sources")
def data_sources(db: Session = Depends(get_db)):
    rows = db.scalars(select(DataSource).order_by(DataSource.id)).all()
    return [
        {
            "id": row.id,
            "name": row.name,
            "domain": row.domain,
            "status": "connected" if row.is_enabled else "foundation",
            "records": 0,
            "freshness": "not connected" if not row.is_enabled else "pending",
        }
        for row in rows
    ]


@app.get("/api/v1/data/instruments")
def instruments(db: Session = Depends(get_db)):
    rows = db.scalars(select(Instrument).order_by(Instrument.symbol)).all()
    return [
        {
            "id": row.id,
            "symbol": row.symbol,
            "name": row.name,
            "asset_class": row.asset_class,
            "currency": row.currency,
            "market_id": row.market_id,
            "is_active": row.is_active,
        }
        for row in rows
    ]


@app.get("/api/v1/data/entities")
def entities():
    return [
        {"name": "Instrument", "description": "Tradable or observable financial instrument", "examples": "AAPL, NIFTY 50, USD/INR, Brent"},
        {"name": "Organization", "description": "Company, institution, government or other organization", "examples": "Apple, RBI, OPEC"},
        {"name": "Market", "description": "Exchange, venue or economic market", "examples": "NSE, NASDAQ, FX"},
        {"name": "Country", "description": "Country or economic jurisdiction", "examples": "India, United States"},
        {"name": "Event", "description": "Observed world, macro, corporate or geopolitical event", "examples": "Rate decision, earnings, sanctions"},
        {"name": "Observation", "description": "Timestamped measured value with provenance", "examples": "OHLCV, CPI, yield"},
    ]
