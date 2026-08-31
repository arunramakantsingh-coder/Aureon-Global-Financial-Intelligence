# M0 — Foundation

## Objective

Establish the repository as a controlled engineering project before implementing financial data ingestion or forecasting logic.

## Deliverables

- Project charter
- System architecture
- Domain boundaries
- Data provenance principles
- Prediction-ledger design principle
- Initial repository conventions

## Next milestone: M1 — Data Foundation

M1 will establish the canonical data model and ingestion interfaces for:

1. Instruments and asset identity
2. OHLCV / market observations
3. Economic indicators
4. Corporate entities and events
5. News and source documents
6. Geopolitical/global events
7. Provenance and timestamps

## M1 acceptance criteria

- Every observation has a source and timestamp.
- Instrument identity is canonical and stable.
- Historical and real-time observations share compatible schemas.
- Raw source payloads can be traced to normalized records.
- Data quality checks are explicit and testable.
- No forecasting model is introduced until the data foundation is testable.

## Guardrails

- No live-money execution.
- No leverage.
- No claims of guaranteed returns.
- No training/evaluation leakage from future information.
- No production forecast without provenance.
