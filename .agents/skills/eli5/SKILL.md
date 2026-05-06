---
name: eli5
description: "Simplify technical Cloudflare documentation for non-expert audiences. Analyzes .md/.mdx files for jargon, generates before/after comparisons with issue analysis, and produces a terminology index. Use when the user asks to simplify, ELI5, explain in plain language, or make docs more accessible."
---

Use when the user asks to simplify documentation, explain content in plain language, ELI5 a page, or make technical docs more accessible to non-expert audiences. Good candidates include security/networking docs, getting-started pages, concept pages for non-developers, and cross-product docs (Zero Trust, SASE). Skip for developer-focused API/SDK references, code-heavy tutorials, and configuration references where jargon is the content.

## Constraints

- **Accuracy over simplification.** Never reduce precision. If a simplified explanation would be wrong, add nuance instead.
- **Preserve what works.** Do not rewrite correct, clear prose for tone. Only edit for factual errors, ambiguity, or real clarity problems.
- **Verify all new information.** Any explanation, analogy, or context not in the original must be fact-checked against `src/content/docs/` before inclusion. Cloudflare implementations often diverge from industry standards — do not assume general knowledge applies.
- **Cite sources.** When adding net-new claims about Cloudflare behavior, reference the specific docs page. Flag uncertainty explicitly.
- **Verify terminology in context.** Cloudflare terms carry specific meaning (e.g., "Full setup" = authoritative nameservers, not sole DNS provider). Confirm terms are used with the correct meaning.
- **Tone:** Clear, direct, professional. Never use "simply," "just," "obviously," "clearly," or "it's easy to."
- **Target 1.5-2x expansion**, not 5-10x. Enhance with context, do not replace.

## Workflow

1. **Accept file path** — `.md` or `.mdx` file
2. **Read and parse** — Detect content type (Overview, Concept, How To, Reference, Tutorial) and confirm with user
3. **Ask which sections** — All, specific sections, auto-detect most complex, or custom range
4. **Analyze** — Identify jargon, assumptions, unclear logic, and context gaps in selected sections
5. **Extract terminology** — Compile terms needing glossary tooltips, cross-links, or inline definitions. Before suggesting a GlossaryTooltip, read the glossary definition in `src/content/glossary/` and verify it is accurate, non-redundant with surrounding text, and stands alone. Flag bad entries instead of linking.
6. **Generate comparison** — Original content, issues identified, and simplified version with: plain-language summary, explanation from basics, why it matters, use cases, tech-adjacent metaphor (with limitations noted), common pitfalls, related concepts
7. **Report** — Summary of improvements, what made the original confusing, terminology index
8. **Adversarial review** — Launch a fresh subagent to verify every factual claim in the output. The subagent checks for unsourced assertions, misleading simplifications, wrong mechanisms, and over-generalizations. Present its findings before prompting the user for next steps.

### Enhancement limits per document

- Problem/value statement: 2-4 sentences inline
- Use case examples: 1-2 per major concept, 5-15 lines each
- Jargon definitions: brief inline on first use
- Troubleshooting: 1-2 critical issues only
- Preserve all existing content, structure, diagrams, code examples, and component usage
- Do not add separate conceptual pre-sections, multiple examples per concept, or new Dashboard/API paths

## Anti-patterns

1. **Rewriting correct prose for friendliness** — Only touch sentences with concrete problems (wrong fact, ambiguity, undefined term)
2. **Consequence chains the reader can infer** — Do not spell out obvious causal chains for the target audience
3. **Synonym glosses** — Do not append "also called X" when the concept is already defined by behavior
4. **Rhetorical questions** — State examples as examples, not questions
5. **Implying mutual exclusivity** — Do not contrast complementary features as replacements
6. **Wrong mechanism with plausible simplification** — Verify the actual mechanism before simplifying (e.g., Custom rules take precedence by evaluation order, not by changing Managed rule actions)
7. **Conflating distinct concepts** — Do not merge separate concepts in ways that imply they are the same (e.g., CNAME flattening vs. proxying, setup type vs. DNS exclusivity)
8. **Casual register** — Use "allow you to" not "let you." Match existing docs voice.

## Output Format

Produce output following this template exactly. All sections are required.

```markdown
# ELI5 Simplified: [Original Doc Name]

**Original:** `[file path]`
**Sections simplified:** [count/list]

---

## Simplification Overview

**What was confusing:**
- [Issue pattern 1]
- [Issue pattern 2]

**Approach taken:**
- [Strategy 1]
- [Strategy 2]

---

## Section: [Original Heading]

### Original Content
[Exact text from source, preserved]

### Issues Identified
**Jargon:** [terms and why problematic]
**Assumptions:** [unstated prerequisites]
**Unclear Logic:** [structural issues]

### Simplified Version
**In Plain Language:** [One-sentence distillation]
**What It Is:** [2-3 paragraphs building from basics]
**Why It Matters:** [Benefits and value]
**When You'd Use This:** [Use cases with context]
**Think of It Like:** [Tech-adjacent metaphor]
**Where this metaphor breaks down:** [Limitations]
**Common Pitfalls:** [Misunderstanding → Correction]
**Related Concepts:** [Connections to familiar ideas]

---

[Repeat for each section]

---

## Terminology Index

| Term | Line | Defined? | Suggested Action |
| ---- | ---- | -------- | ---------------- |
| [term] | [line number] | Yes/No | Add glossary tooltip / Add cross-link to [page] / Add inline definition |

---

## Summary & Recommendations

**Key improvements made:** [list]
**Patterns noticed:** [meta-analysis]

## Suggestions for Enhancement

Line-numbered recommendations for further improvements:

| Line(s) | Current Approach | Suggested Enhancement | Why | Priority |
| ------- | ---------------- | --------------------- | --- | -------- |
| [lines] | [what exists] | [what to change] | [why it improves accessibility] | High/Medium/Low |
```

## References

- **Content type detection criteria:** `references/content-type-guide.md`
- **Before/after pattern templates:** `references/pattern-library.md`
- **Full examples:** `EXAMPLES_REFERENCE.md`
