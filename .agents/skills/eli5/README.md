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

The skill runs a 9-step workflow defined in SKILL.md:

1. **Accept file path** — Takes one or more `.md` or `.mdx` files
2. **Read and parse** — Detects content type (overview, concept, how-to, reference, tutorial) and asks the user to confirm
3. **Apply enhancement constraints** — Targets 1.5-2x expansion, not a full rewrite. Preserves all existing content, structure, diagrams, and components
4. **Ask which sections to simplify** — Offers all sections, specific sections, auto-detect most complex, or custom range
5. **Analyze selected sections** — Flags undefined jargon, unstated assumptions, missing "why," unclear logic, and context gaps
6. **Extract terminology** — Compiles a deduplicated list of terms that need glossary definitions or cross-links, with line numbers and suggested actions
7. **Generate comparison** — Produces a before/after report with original content preserved, issues identified, and simplified versions including plain-language summaries, metaphors, use cases, and pitfalls
8. **Report** — Presents a summary of improvements, what made the original confusing, and the full terminology index
9. **Adversarial review** — Launches a fresh subagent to verify every net-new claim against the source docs in this repository. The subagent has no access to the ELI5 skill instructions to eliminate confirmation bias

The adversarial review is a required step that cannot be skipped. It catches simplified explanations that describe the wrong mechanism — which is worse than the original jargon.

All output is presented inline in the conversation. The skill does not write output files.

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
├── SKILL.md                               # Skill definition — full 9-step workflow, constraints, adversarial
│                                          #   review protocol, output format, quality checklist, anti-patterns
├── references/
│   ├── content-type-guide.md              # Detection signals and strategies per content type (687 lines)
│   ├── EXAMPLES_REFERENCE.md              # Detailed before/after examples and output templates (1,834 lines)
│   └── pattern-library.md                 # Reusable transformation patterns for common clarity issues (634 lines)
└── recommendations/
    └── internal-dns/
        └── index.eli5.mdx                 # Example: proposed page replacement for Internal DNS overview
```

### SKILL.md

The executable specification (439 lines). Contains:

- The full 9-step workflow from file input through adversarial review
- Content type detection signals and per-type simplification strategies
- Enhancement constraints (what to add, what not to add, maximum additions per document)
- The adversarial review prompt template passed to the subagent
- Decision framework (when to simplify, add content, spell out consequences, or leave alone)
- Quality checklist (18 items)
- 8 anti-patterns identified from human review of AI-generated edits
- Output format template

### references/

Supporting material referenced by SKILL.md when detailed examples are needed:

- **content-type-guide.md** — Operational guide for detecting and simplifying different documentation types (overview, concept, how-to, reference, tutorial). Includes detection criteria, simplification strategies, and content-type-specific patterns.
- **EXAMPLES_REFERENCE.md** — Extended before/after examples, detailed writing patterns, and output format templates. Contains the verbose examples that would make SKILL.md too large.
- **pattern-library.md** — Reusable before/after patterns for common simplification scenarios (jargon replacement, context addition, metaphor construction).

### recommendations/

Contains example ELI5 outputs from prior runs. The `internal-dns/index.eli5.mdx` file is a proposed page replacement for the Internal DNS overview page, showing what a full ELI5 application looks like when edits are applied directly to a page.

## Key principles

1. **Context before details** — Explain why something matters before how it works
2. **Accuracy is non-negotiable** — Simplify language, not facts. Every net-new claim must be sourced
3. **Preserve what works** — Do not rewrite correct prose for tone. Only edit when there is a real clarity problem
4. **Respect reader intelligence** — Readers lack context, not intelligence. Define terms by what they do, not by stacking synonyms
5. **Content-type awareness** — Overviews need problem/solution framing, concepts need analogies, references need use-case organization
6. **Cloudflare-specific verification** — Do not assume industry-standard behavior applies to Cloudflare products. Verify against the docs in this repository
