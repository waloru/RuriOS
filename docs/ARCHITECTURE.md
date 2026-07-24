# Architecture

RuriOS sits between a person and Robinhood Chain. The design goal is a single
conversation that moves from information to decision to execution, with the
signature always left to the user.

```
            ┌────────────────────────────┐
            │        You (operator)       │
            │   natural-language object   │
            └──────────────┬─────────────┘
                           │
                    ┌──────▼──────┐
                    │   Ruri core │
                    │  adapter +  │
                    │  tool layer │
                    └──────┬──────┘
        ┌──────────┬───────┼────────┬──────────┐
    ┌───▼───┐  ┌───▼───┐ ┌─▼────┐ ┌─▼────────┐
    │Research│  │ Risk  │ │Plan  │ │Execution │
    └───┬───┘  └───┬───┘ └─┬────┘ └─┬────────┘
        └──────────┴───────┼────────┘
                    ┌──────▼──────────┐
                    │ Robinhood Chain │
                    │  data + RPC     │
                    └─────────────────┘
```

## Layers

### 1. Operator layer
You interact in natural language. Examples: "analyze this wallet",
"find launches under 10M cap with positive holder growth", "build a low-risk
allocation", "watch new launches and alert only on real liquidity".

### 2. Core
The core normalizes the objective and exposes a small, audited set of tools to
the faculties. It never holds custody. It prepares, it does not perform.

### 3. Faculties
Research, Risk, Planning and Execution are responsibilities, not autonomous
agents left to run on their own. Each produces a bounded, inspectable result
that rolls up into a single answer with a confidence score.

### 4. Chain
Reads come from Robinhood Chain data sources and public RPC. Writes are only
ever prepared. The transaction is handed back to the operator to sign.

## Grounding

Every claim RuriOS surfaces is tied to a source: a pool, a transaction, a
holder snapshot. Outputs carry the evidence so a decision is never taken on an
unbacked assertion.
