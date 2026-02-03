---
name: cloudflare
description: Comprehensive Cloudflare platform skill covering Workers, Pages, storage (KV, D1, R2), AI (Workers AI, Vectorize, Agents SDK), networking (Tunnel, Spectrum), security (WAF, DDoS), and infrastructure-as-code (Terraform, Pulumi). Use for any Cloudflare development task.
references:
  - workers
  - pages
  - d1
  - durable-objects
  - workers-ai
---

# Cloudflare Platform Skill

Consolidated skill for building on the Cloudflare platform. Use decision trees below to find the right product, then load detailed references.

## How to Use This Skill

### Reference File Structure

Each product in `./references/<product>/` contains a `README.md` as the entry point, which may be structured in one of two ways:

**Multi-file format (5 files):**
| File | Purpose | When to Read |
|------|---------|--------------|
| `README.md` | Overview, when to use, getting started | **Always read first** |
| `api.md` | Runtime API, types, method signatures | Writing code |
| `configuration.md` | wrangler.toml, bindings, setup | Configuring a project |
| `patterns.md` | Common patterns, best practices | Implementation guidance |
| `gotchas.md` | Pitfalls, limitations, edge cases | Debugging, avoiding mistakes |

**Single-file format:** All information consolidated in `README.md`.

### Reading Order

1. Start with `README.md`
2. Then read additional files relevant to your task (if multi-file format):
   - Building feature → `api.md` + `patterns.md`
   - Setting up project → `configuration.md`
   - Troubleshooting → `gotchas.md`

### Example Paths

```
./references/workflows/README.md         # Start here for Workflows
./references/workflows/api.md            # Workflow class, step methods
./references/durable-objects/gotchas.md  # DO limitations
./references/workers-ai/README.md        # Single-file - all Workers AI docs
```

## Quick Decision Trees

### "I need to run code"

```
Need to run code?
├─ Serverless functions at the edge → workers/
├─ Full-stack web app with Git deploys → pages/
├─ Stateful coordination/real-time → durable-objects/
├─ Long-running multi-step jobs → workflows/
├─ Run containers → containers/
├─ Multi-tenant (customers deploy code) → workers-for-platforms/
└─ Scheduled tasks (cron) → cron-triggers/
```

### "I need to store data"

```
Need storage?
├─ Key-value (config, sessions, cache) → kv/
├─ Relational SQL → d1/ (SQLite) or hyperdrive/ (existing Postgres/MySQL)
├─ Object/file storage (S3-compatible) → r2/
├─ Message queue (async processing) → queues/
├─ Vector embeddings (AI/semantic search) → vectorize/
├─ Strongly-consistent per-entity state → durable-objects/ (DO storage)
├─ Secrets management → secrets-store/
└─ Streaming ETL to R2 → pipelines/
```

### "I need AI/ML"

```
Need AI?
├─ Run inference (LLMs, embeddings, images) → workers-ai/
├─ Vector database for RAG/search → vectorize/
├─ Build stateful AI agents → agents-sdk/
├─ Gateway for any AI provider (caching, routing) → ai-gateway/
└─ AI-powered search widget → ai-search/
```

### "I need networking/connectivity"

```
Need networking?
├─ Expose local service to internet → tunnel/
├─ TCP/UDP proxy (non-HTTP) → spectrum/
├─ WebRTC TURN server → turn/
├─ Private network connectivity → network-interconnect/
├─ Optimize routing → argo-smart-routing/
└─ Real-time video/audio → realtimekit/ or realtime-sfu/
```

### "I need security"

```
Need security?
├─ Web Application Firewall → waf/
├─ DDoS protection → ddos/
├─ Bot detection/management → bot-management/
├─ API protection → api-shield/
├─ CAPTCHA alternative → turnstile/
└─ Credential leak detection → waf/ (managed ruleset)
```

### "I need media/content"

```
Need media?
├─ Image optimization/transformation → images/
├─ Video streaming/encoding → stream/
├─ Browser automation/screenshots → browser-rendering/
└─ Third-party script management → zaraz/
```

### "I need infrastructure-as-code"

```
Need IaC?
├─ Pulumi → pulumi/
├─ Terraform → terraform/
└─ Direct API → api/
```

## Product Index

### Compute & Runtime
| Product | Entry File |
|---------|------------|
| Workers | `./references/workers/README.md` |
| Pages | `./references/pages/README.md` |
| Pages Functions | `./references/pages-functions/README.md` |
| Durable Objects | `./references/durable-objects/README.md` |
| Workflows | `./references/workflows/README.md` |
| Containers | `./references/containers/README.md` |
| Workers for Platforms | `./references/workers-for-platforms/README.md` |
| Cron Triggers | `./references/cron-triggers/README.md` |
| Tail Workers | `./references/tail-workers/README.md` |
| Snippets | `./references/snippets/README.md` |
| Smart Placement | `./references/smart-placement/README.md` |

### Storage & Data
| Product | Entry File |
|---------|------------|
| KV | `./references/kv/README.md` |
| D1 | `./references/d1/README.md` |
| R2 | `./references/r2/README.md` |
| Queues | `./references/queues/README.md` |
| Hyperdrive | `./references/hyperdrive/README.md` |
| DO Storage | `./references/do-storage/README.md` |
| Secrets Store | `./references/secrets-store/README.md` |
| Pipelines | `./references/pipelines/README.md` |
| R2 Data Catalog | `./references/r2-data-catalog/README.md` |
| R2 SQL | `./references/r2-sql/README.md` |

### AI & Machine Learning
| Product | Entry File |
|---------|------------|
| Workers AI | `./references/workers-ai/README.md` |
| Vectorize | `./references/vectorize/README.md` |
| Agents SDK | `./references/agents-sdk/README.md` |
| AI Gateway | `./references/ai-gateway/README.md` |
| AI Search | `./references/ai-search/README.md` |

### Networking & Connectivity
| Product | Entry File |
|---------|------------|
| Tunnel | `./references/tunnel/README.md` |
| Spectrum | `./references/spectrum/README.md` |
| TURN | `./references/turn/README.md` |
| Network Interconnect | `./references/network-interconnect/README.md` |
| Argo Smart Routing | `./references/argo-smart-routing/README.md` |
| Workers VPC | `./references/workers-vpc/README.md` |

### Security
| Product | Entry File |
|---------|------------|
| WAF | `./references/waf/README.md` |
| DDoS Protection | `./references/ddos/README.md` |
| Bot Management | `./references/bot-management/README.md` |
| API Shield | `./references/api-shield/README.md` |
| Turnstile | `./references/turnstile/README.md` |

### Media & Content
| Product | Entry File |
|---------|------------|
| Images | `./references/images/README.md` |
| Stream | `./references/stream/README.md` |
| Browser Rendering | `./references/browser-rendering/README.md` |
| Zaraz | `./references/zaraz/README.md` |

### Real-Time Communication
| Product | Entry File |
|---------|------------|
| RealtimeKit | `./references/realtimekit/README.md` |
| Realtime SFU | `./references/realtime-sfu/README.md` |

### Developer Tools
| Product | Entry File |
|---------|------------|
| Wrangler | `./references/wrangler/README.md` |
| Miniflare | `./references/miniflare/README.md` |
| C3 | `./references/c3/README.md` |
| Observability | `./references/observability/README.md` |
| Analytics Engine | `./references/analytics-engine/README.md` |
| Web Analytics | `./references/web-analytics/README.md` |
| Sandbox | `./references/sandbox/README.md` |
| Workerd | `./references/workerd/README.md` |
| Workers Playground | `./references/workers-playground/README.md` |

### Infrastructure as Code
| Product | Entry File |
|---------|------------|
| Pulumi | `./references/pulumi/README.md` |
| Terraform | `./references/terraform/README.md` |
| API | `./references/api/README.md` |

### Other Services
| Product | Entry File |
|---------|------------|
| Email Routing | `./references/email-routing/README.md` |
| Email Workers | `./references/email-workers/README.md` |
| Static Assets | `./references/static-assets/README.md` |
| Bindings | `./references/bindings/README.md` |
| Cache Reserve | `./references/cache-reserve/README.md` |
