# Aureon Project Charter

## 1. Mission

Build a continuously operating financial intelligence system that transforms global information into measurable, explainable, probabilistic market forecasts and risk-aware portfolio decisions.

## 2. Problem

Financial markets react to interacting forces rather than isolated price signals. News, geopolitics, monetary policy, commodities, company events, capital flows, macroeconomic conditions, and market structure can influence one another across different time horizons.

Aureon aims to maintain a structured representation of these interactions and continuously test whether they contain useful predictive information.

## 3. Primary output

For any supported asset and forecast horizon, Aureon should eventually be able to produce:

- expected return
- forecast distribution / range
- directional probabilities
- confidence / calibration metrics
- major contributing factors
- historical analogues
- scenario sensitivities
- invalidating conditions
- model and data provenance
- subsequent realized outcome

Example concept:

```text
Asset: USD/INR
Horizon: 30 days
Expected return: +2.1%
80% forecast interval: -0.8% to +5.4%
P(up): 67%
Confidence: medium
Top drivers: crude oil, US yields, foreign flows
Historical analogue set: 31 observations
Invalidation: material change in monetary-policy regime
```

The values above are illustrative only.

## 4. Non-goals for the early system

- Guaranteed or fixed investment returns
- Unsupervised live trading
- Leveraged execution
- Treating an LLM response as a trading signal by itself
- Claiming causal relationships from correlation alone
- Hiding model uncertainty

## 5. Product surfaces

### Intelligence
Global event feed, market context, company intelligence, macro dashboard, and relationship explorer.

### Research
Historical event studies, asset research, analogue search, factor studies, and backtests.

### Forecasting
Asset forecasts, forecast distributions, scenario analysis, confidence/calibration, and explanations.

### Risk
Portfolio exposure, stress testing, drawdown monitoring, concentration, correlation, and tail-risk indicators.

### Portfolio
Holdings, allocation recommendations, virtual portfolio, attribution, and cash-flow planning.

### Evaluation
Prediction ledger, forecast accuracy, calibration, realized returns, model drift, and benchmark comparison.

## 6. Engineering doctrine

Aureon should be built as a measurable scientific system, not as a collection of prompts.

Every material pipeline should answer:

1. What data did we observe?
2. When was it available?
3. How was it transformed?
4. Which model/version used it?
5. What did the model predict?
6. How confident was it?
7. What actually happened?
8. How did the result affect future model evaluation?

## 7. Success criteria

Aureon is successful only if it demonstrates out-of-sample predictive value and useful risk control relative to appropriate benchmarks, after realistic costs and data limitations are considered.

A visually impressive dashboard is not evidence of predictive capability.
