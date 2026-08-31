# Aureon System Architecture

## High-level architecture

```text
                           EXTERNAL WORLD
                                 │
       ┌──────────────┬──────────┼───────────┬──────────────┐
       │              │          │           │              │
   Market Data      News       Macro      Corporate     Geopolitical
       │              │          │           │              │
       └──────────────┴──────────┼───────────┴──────────────┘
                                 ↓
                         DATA INGESTION LAYER
                                 ↓
                    RAW DATA / PROVENANCE STORE
                                 ↓
                    NORMALIZATION & VALIDATION
                                 ↓
                    ENTITY RESOLUTION SERVICE
                                 ↓
                         EVENT INTELLIGENCE
                                 ↓
                       KNOWLEDGE GRAPH / RDF
                                 ↓
                    HISTORICAL RESEARCH ENGINE
                                 ↓
                        FEATURE STORE / VIEWS
                                 ↓
             ┌───────────────────┼────────────────────┐
             ↓                   ↓                    ↓
       TIME-SERIES          NLP / LLM           STATISTICAL
         MODELS              ANALYSIS              MODELS
             └───────────────────┼────────────────────┘
                                 ↓
                       FORECAST ENSEMBLE
                                 ↓
                        SCENARIO ENGINE
                                 ↓
                           RISK ENGINE
                                 ↓
                       PORTFOLIO ENGINE
                                 ↓
                ┌────────────────┴────────────────┐
                ↓                                 ↓
          USER / API / UI                 PAPER EXECUTION
                                                  │
                                                  ↓
                                         OUTCOME CAPTURE
                                                  │
                                                  └────→ EVALUATION
```

## Core bounded contexts

### 1. Ingestion
Owns connectors, scheduling, retries, source metadata, raw payloads, timestamps, and provenance.

### 2. Market
Owns instruments, exchanges, prices, OHLCV, corporate actions, quotes, and market calendars.

### 3. Macro
Owns economic indicators, central-bank decisions, rates, inflation, employment, GDP, liquidity, and releases.

### 4. Corporate
Owns organizations, financial statements, earnings, management, products, launches, investments, M&A, and corporate events.

### 5. Event Intelligence
Transforms unstructured information into canonical events, entities, claims, sentiment/context, affected assets, and evidence.

### 6. Knowledge Graph
Stores typed entities and relationships. Relationships must distinguish observed facts from hypotheses and model-derived associations.

### 7. Historical Research
Provides event studies, analogue retrieval, lead/lag analysis, regime analysis, feature studies, and backtesting.

### 8. Forecasting
Produces probabilistic forecasts and keeps model versions, features, training windows, calibration, and forecast provenance.

### 9. Risk
Evaluates exposure, drawdown, volatility, concentration, correlation, stress scenarios, and policy constraints.

### 10. Portfolio
Represents holdings, targets, cash flows, virtual positions, allocation proposals, and performance attribution.

### 11. Evaluation
Owns the prediction ledger, benchmark comparison, realized outcomes, calibration, model drift, and experiment results.

## Data lifecycle

All data should preserve an event-time and ingestion-time distinction where applicable. Historical backtests must use only information that would have been available at the simulated decision time to prevent look-ahead bias.

## Architecture rule

No forecast may bypass the risk layer to become an execution instruction.
