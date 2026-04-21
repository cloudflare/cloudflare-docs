# Cloudflare Use Cases

Structured decision trees that help agents route customers to the right Cloudflare products and implementation steps.

## When to use

- A user describes a problem, goal, or scenario (e.g., "protect my site from DDoS", "replace our VPN", "reduce AI inference costs")
- You need to recommend Cloudflare products and configuration steps
- You need to walk a user through qualifying questions to narrow down the right approach

## How it works

1. **Start with `index.json`** — scan by name, description, aliases, and category to find matching use cases
2. **Fetch the YAML file** for the matched use case (e.g., `sec-001.yaml`)
3. **Interactive agents**: walk the `qualifying_questions` to accumulate context tags, then match the best `path` by its `condition`
4. **Non-interactive agents**: go directly to the `default_path` and follow its steps

## Schema

Each YAML file contains:

| Field | Description |
|-------|-------------|
| `id` | Unique identifier (e.g., `sec-001`, `zt-003`) |
| `name` | Plain-language description of the customer goal |
| `category` | One of 12 categories (see below) |
| `description` | Concise summary of what this use case solves |
| `aliases` | Alternate names, jargon, and search keywords for discoverability |
| `products` | Cloudflare products involved |
| `qualifying_questions` | Questions with options that accumulate context tags |
| `default_path` | ID of the recommended path for non-interactive agents |
| `paths` | Implementation plans with conditions and ordered steps |
| `related_use_cases` | Cross-references to related use case IDs |

## Categories

1. Network & Application Security (`network-application-security`)
2. AI Security (`ai-security`)
3. Zero Trust & Secure Access (`zero-trust-secure-access`)
4. Network Connectivity & WAN (`network-connectivity-wan`)
5. Application Performance & Delivery (`application-performance-delivery`)
6. Developer Platform — Build (`developer-platform-build`)
7. Developer Platform — Operate (`developer-platform-operate`)
8. Compliance & Data Governance (`compliance-data-governance`)
9. Observability & Analytics (`observability-analytics`)
10. Multi-Vendor & Architecture (`multi-vendor-architecture`)
11. Industry Verticals (`industry-verticals`)
12. Getting Started (`getting-started`)

## Files

- `index.json` — Summary index with id, name, category, description, default_path, products, aliases
- `schema.yaml` — Full schema definition
- `*.yaml` — Individual use case files (20 in this release)
