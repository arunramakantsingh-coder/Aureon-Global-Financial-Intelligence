# M1.2 — PostgreSQL Local Setup

Aureon uses PostgreSQL as the persistent system of record for the canonical data foundation.

## Ports

- Aureon frontend: `5173`
- Aureon API: `8010`
- PostgreSQL host port: `5433` (container port `5432`)

Port `8000` is intentionally not used by Aureon.

## Start PostgreSQL

From the repository root:

```powershell
docker compose up -d postgres
```

Check the container:

```powershell
docker compose ps
```

The PostgreSQL service should report `healthy` after its health check passes.

## Start the API

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8010
```

The API creates the M1.2 schema and loads the deterministic reference registry at startup.

## Verify

Open:

- `http://localhost:8010/api/v1/health`
- `http://localhost:8010/api/v1/data/summary`
- `http://localhost:8010/api/v1/data/instruments`
- `http://localhost:8010/docs`

The Data Center UI at `http://localhost:5173/` reads these endpoints and displays PostgreSQL health and persisted registry counts.

## Important

No external market provider is enabled by this milestone. Seeded instruments are reference metadata, not market prices. Aureon remains in research mode and must not be used for live trading decisions at this stage.
