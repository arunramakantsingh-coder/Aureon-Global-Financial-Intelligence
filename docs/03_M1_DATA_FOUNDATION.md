# M1 — Data Foundation

## Goal
Build the first observable vertical slice of Aureon: canonical data contracts + API + Data Center UI.

## Scope in this slice
- FastAPI service with health and data-foundation endpoints.
- Canonical entity vocabulary: Instrument, Organization, Market, Country, Event, Observation.
- Source registry for market, macro, corporate, and news/event feeds.
- UI Data Center that can read the API when the backend is running and falls back to explicit foundation/demo state when it is not.
- No external provider is connected yet; zero-record counts are intentional and truthful.

## API endpoints
- `GET /api/v1/health`
- `GET /api/v1/data/summary`
- `GET /api/v1/data/sources`
- `GET /api/v1/data/entities`

## Data integrity rules
1. Preserve source/provenance for every observation and event.
2. Preserve event time separately from ingestion time.
3. Never silently substitute estimated values for observed source data.
4. Never label illustrative or seeded data as live.
5. Backtests must only use information available at the simulated decision time.

## Next M1 slice
Add persistent PostgreSQL models, migrations, provider adapters, and the first real public market/macro data connector.
