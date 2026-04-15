# ELI5 Skill

An agent skill that simplifies dense, jargon-heavy technical documentation into accessible explanations. It analyzes content for clarity issues, adds inline definitions, and produces before/after comparisons — all while maintaining technical accuracy.

## When to use this skill

Use ELI5 on documentation that serves a broad or mixed audience — pages where readers may not share the same domain expertise.

**Good candidates:**

- Security and networking docs (DDoS, WAF, Zero Trust, Browser Isolation, Tunnel)
- Getting started and overview pages
- Concept pages aimed at non-developers
- Cross-product docs that span multiple domains

**Skip for:**

- Developer API and SDK references (Workers, D1, R2, KV)
- Code-heavy tutorials where readers self-select
- Configuration references where jargon is the content

## How it works

The skill runs a multi-step workflow:

1. **Read and parse** — Detects content type (overview, concept, how-to, reference, tutorial) and analyzes structure
2. **Identify issues** — Flags undefined jargon, unstated assumptions, missing "why," and unclear logic
3. **Simplify** — Adds inline definitions, context, and use cases. Targets 1.5-2x expansion, not a full rewrite
4. **Terminology index** — Compiles all terms that need glossary definitions or cross-links
5. **Adversarial review** — A separate subagent verifies every net-new claim against the source docs in this repository
6. **Fix flagged issues** — Corrects any unsourced, misleading, or mechanistically wrong claims before output

The adversarial review is a required step. It catches simplified explanations that describe the wrong mechanism — which is worse than the original jargon.

## How to invoke

The skill is loaded automatically when a task matches its description. You can also invoke it explicitly:

```
Run ELI5 on /path/to/docs/folder/
```

The skill will ask which pages and sections to process before starting.

## Project structure

```
eli5/
├── README.md                              # This file
├── SKILL.md                               # Skill definition — workflow, constraints, output format
├── references/
│   ├── content-type-guide.md              # Content type detection criteria and strategies
│   ├── EXAMPLES_REFERENCE.md              # Full before/after examples for each content type
│   └── pattern-library.md                 # Before/after transformation patterns
└── recommendations/
    └── internal-dns/
        └── index.eli5.mdx                 # Example ELI5 output for Internal DNS docs
```

### SKILL.md

The executable specification. Contains the full workflow, content analysis framework, simplification constraints, adversarial review protocol, output format, quality checklist, and anti-patterns. This is the file the agent loads when the skill is invoked.

### references/

Supporting material referenced by SKILL.md:

- **content-type-guide.md** — Detection signals and simplification strategies for each content type (overview, concept, how-to, reference, tutorial)
- **EXAMPLES_REFERENCE.md** — Detailed before/after examples and output format templates
- **pattern-library.md** — Reusable transformation patterns for common clarity issues

### recommendations/

Stores completed ELI5 outputs as `.eli5.mdx` files. These serve as examples and can be used as reference for future runs.

## Key principles

1. **Context before details** — Explain why something matters before how it works
2. **Accuracy is non-negotiable** — Simplify language, not facts. Every net-new claim must be sourced
3. **Preserve what works** — Do not rewrite correct prose for tone. Only edit when there is a real clarity problem
4. **Respect reader intelligence** — Readers lack context, not intelligence. Define terms by what they do, not by stacking synonyms
5. **Content-type awareness** — Overviews need problem/solution framing, concepts need analogies, references need use-case organization
6. **Cloudflare-specific verification** — Do not assume industry-standard behavior applies to Cloudflare products. Verify against the docs in this repository
