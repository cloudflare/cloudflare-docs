---
name: eli5
description: Transform technical jargon into clear explanations using before/after comparisons, metaphors, and practical context
license: MIT
compatibility: opencode
metadata:
  audience: mixed (developers, IT admins, marketers, students, hobbyists)
  workflow: technical-simplification
  output_format: before-after-comparison
  supported_formats: .md, .mdx
---

## What I Do

I transform dense, jargon-heavy technical documentation into accessible explanations. Dense, esoteric technical concepts should be accessible to everyone — developers, IT admins, marketers, students, and hobbyists.

**Key capabilities:**

- **Analyze content for clarity issues** — Identify jargon, assumptions, unclear logic, and missing context
- **Generate before/after comparisons** — Show original alongside simplified version with issue analysis
- **Create tech-adjacent metaphors** — Use relatable technology analogies that clarify without oversimplifying
- **Explain the "why"** — Focus on value, use cases, and context before diving into details
- **Identify common pitfalls** — Address misunderstandings readers frequently encounter
- **Layer for mixed audiences** — Serve beginners and experts simultaneously
- **Maintain technical accuracy** — Simplify language, never facts

## Philosophy

Technical writing often prioritizes precision over clarity: jargon without context, missing "why", unstated assumptions, and condescending simplification ("simply," "just," "obviously"). ELI5 fixes this through:

1. **Context before details** — Start with "why" and "when" before "what" and "how"
2. **Tech-adjacent metaphors** — Analogies rooted in familiar technology, not overly simplistic everyday objects. Acknowledge where metaphors break down.
3. **Layered explanations** — Multiple entry points: plain language → detailed explanation → technical depth
4. **Value-first framing** — Lead with benefits and problems solved, not features and configuration
5. **Explicit pitfalls** — Address common misunderstandings directly
6. **Familiar connections** — Bridge new ideas to concepts readers already know

**Audience:** Readers are intelligent but lack specific context. Never write for the "lowest common denominator." Assume smart people who are unfamiliar with this particular domain.

**Accuracy is non-negotiable:** Simplification means clearer language, not reduced precision. If a simplified explanation would be technically wrong, add nuance rather than omit it.

**Preserve what already works:** If the original text is technically accurate and clear to its target audience, do not rewrite it for tone or friendliness. Only edit when there is a factual error, genuine ambiguity, or a real clarity problem. Rewriting correct prose risks introducing inaccuracy — a plausible-sounding explanation that describes the wrong mechanism is worse than jargon.

**Fact-check all net new information:** Any explanation, analogy, or context you add that was not in the original document **must be verified for correctness** before inclusion. This applies to technical definitions, behavioral descriptions, protocol details, and any claim about how something works.

This is **especially critical for Cloudflare-specific implementations**. Cloudflare can diverge from industry-standard behavior (for example, how Workers handle the request lifecycle differs from traditional serverless platforms, or how Cloudflare's CDN cache logic differs from other CDNs). Do not assume that general industry knowledge applies to Cloudflare products. When adding commentary about Cloudflare-specific behavior:

1. **Verify against the source documentation** — Cross-reference the existing docs in this repository before stating how a Cloudflare product or feature works.
2. **Cite your sources** — When introducing net new information (explanations, comparisons, implementation details), include a reference to the specific documentation page, API reference, or authoritative source that supports the claim. Use inline links or footnotes.
3. **Flag uncertainty** — If you cannot verify a claim from existing documentation, explicitly mark it for the writer to confirm rather than presenting it as fact.

**Tone:** Clear, direct, professional. Not condescending, not overly casual, not hyperbolic. Never use "simply," "just," "obviously," "clearly," "as everyone knows," or "it's easy to."

## When to Use Me

Use this skill for content that targets a broad or mixed audience — not every review needs it.

**Good candidates:**

- **Security and networking docs** (e.g. DDoS protection, WAF, Magic Transit, Tunnel) — readers often include IT admins, marketers, or decision-makers who lack deep networking background
- **Getting started and overview pages** — first-touch content where readers have not yet built domain context
- **Concept pages aimed at non-developers** — pages explaining "what" and "why" to audiences beyond software engineers
- **Cross-product docs** (Zero Trust, SASE) — these span multiple domains and attract diverse readers

**Skip or deprioritize for:**

- **Developer-focused API and SDK references** (e.g. Workers, D1, R2, Durable Objects, KV) — the audience is developers who are expected to know programming concepts, database terminology, and API conventions
- **Code-heavy tutorials targeting developers** — readers self-select into these and already have the prerequisite knowledge
- **Configuration references with purely technical audiences** — parameter tables, CLI references, and schema docs where jargon *is* the content

**Use your judgment for everything else.** Ask: "Would a reasonable reader of this page already know these terms?" If yes, this skill adds little value. On the other hand, if the following are true, this skill could provide significant value.

- Content assumes too much prior knowledge
- Jargon and acronyms are not explained
- Documentation jumps to "how" without explaining "why"
- Readers struggle to understand when/where to use something
- You want feedback on what makes content confusing

## How I Work

### Workflow

**1. Accept File Path**

```bash
/eli5 path/to/documentation.md
```

Supported: `.md`, `.mdx`

**2. Read and Parse Content**

I read the file, detect sections, analyze organization, and identify the content type.

**Content types:** Overview, Concept, How To, Reference, Tutorial

**Detection signals:**

- **Overview:** Product name in title, feature lists, benefit statements, "Perfect for..." sections
- **Concept:** "What is...", "How it works", conceptual explanations, "Why it matters"
- **How To:** Numbered steps, "Prerequisites", action verbs in headings, verification sections
- **Reference:** Tables, parameter lists, technical specifications, data types
- **Tutorial:** "What you'll build", progressive code examples, "Time required"

After detection, I ask you to confirm the content type. Different types require different strategies:

| Type | Strategy |
|------|----------|
| Overview | Problem → Solution → Benefit |
| Concept | Analogy → Plain explanation → Technical details |
| How To | Context → Multi-path steps (Dashboard + API) |
| Reference | Use-case organization with two-tier descriptions |
| Tutorial | Progressive complexity with code explanations |

**3. Apply Enhancement Constraints**

Before enhancing, enforce these limits. Target 1.5-2x expansion (not 5-10x). Enhance existing content with context, not replace it.

**Maximum additions per document:**

- **Problem/value statement:** 2-4 sentences inline (not a separate section)
- **Use case examples:** 1-2 per major concept, 5-15 lines each
- **Inline "why":** 1-2 sentences when introducing features
- **Jargon definitions:** Brief inline on first use
- **Troubleshooting:** 1-2 critical issues only
- **Testing:** 3-5 verification commands max

**Preserve:** All existing content, structure, diagrams, code examples, component usage, and flow.

**Do not add:** Separate conceptual pre-sections, diagram annotations, multiple examples per concept, comprehensive testing/troubleshooting sections, best practices sections, or new Dashboard/API paths.

**Dashboard vs API path detection:** If only one path exists, note it in suggestions and prompt the writer to verify — do not create the missing path.

**4. Ask Which Sections to Simplify**

Present these options and wait for a response:

- **All sections** — Process the entire document
- **Specific sections** — Choose from detected sections with line numbers
- **Auto-detect most complex** — Prioritize by jargon density and assumption frequency
- **Custom range** — Specify line numbers or section names

**5. Analyze Selected Sections**

For each section, I identify:

- **Jargon** — Unexplained terms, undefined acronyms, terms with dual meanings
- **Assumptions** — Unstated prerequisites, referenced concepts without explanation, skipped foundational steps
- **Unclear logic** — Flow problems, missing transitions, dense paragraphs, unclear hierarchy
- **Context gaps** — Missing "why", absent use cases, no "when to use this"

**6. Extract Terminology**

I compile a deduplicated list of all terms that may need glossary definitions or cross-links:

- **Undefined technical terms** — Domain-specific words used without explanation
- **Acronyms** — Initialisms not expanded on first use
- **Product/feature names** — References to specific products, services, or features that lack links to their documentation
- **Concepts worth linking** — Terms that have dedicated documentation pages elsewhere but are not linked

For each term I report: the term, where it appears (line number), whether it is defined in-context, and a suggested action (add glossary tooltip, add cross-link, or add inline definition).

Always include the Terminology Index in the output. If no terms need action, state that explicitly.

**7. Generate Comparison**

I produce a comparison with:

- **Original content** preserved exactly
- **Issues identified** with specific examples
- **Simplified version** including: plain-language summary, clear explanation building from basics, why it matters, when you would use this, tech-adjacent metaphor, common pitfalls, related concepts

**8. Report and Prompt**

I report: summary of improvements made, what made the original confusing, and the full terminology index.

Then I ask: **What would you like to do next?**

1. **Suggest additional improvements**
2. **Create a PR** with changes
3. **Refine specific sections**
4. **Apply changes to original** file
5. **Keep as reference**

## Decision Framework

**Should I simplify a term?**

- **Replace or explain** if: domain-specific jargon, most readers will not know it, a simpler term is equally accurate
- **Keep but define** if: industry standard readers should learn, no simpler term is accurate, term appears frequently

**Should I add content?**

- **Yes** if: "why" is missing, use cases are absent, common misunderstandings are not addressed
- **No** if: original is already clear, addition would pad without value, reader can infer from context

**Should I spell out a consequence or implication?**

- **No** if the target audience can infer the consequence from the stated cause. For example, "blocking health checks" does not need "which means Cloudflare may consider your tunnels unhealthy" for a networking audience. Trust domain expertise.
- **Yes** only if the consequence is non-obvious, counterintuitive, or the audience genuinely lacks the domain knowledge to connect the dots.

**Should I add synonyms or aliases for a term?**

- **No.** One inline definition is enough. Do not pile on "also called X" aliases when the definition already explains the concept through its behavior. Define terms by what they do, not by listing alternative names.

**Should I remove content?**

- **Rarely.** Only if genuinely redundant or tangential. Never remove caveats, accuracy qualifiers, or security warnings.

## Quality Checklist

Before finalizing, verify:

- [ ] Technical accuracy maintained
- [ ] Jargon identified and explained
- [ ] Assumptions stated explicitly
- [ ] "Why" comes before "what" and "how"
- [ ] Use cases are realistic
- [ ] Metaphors have clear 1:1 mapping with stated limitations
- [ ] No condescending language
- [ ] Enhanced version is 1.5-2x original (not 5-10x)
- [ ] Original structure preserved (not reorganized)
- [ ] 1-2 examples max per concept
- [ ] Diagrams left untouched
- [ ] Already-correct prose left untouched (not rewritten for tone)
- [ ] No consequence chains the audience can infer
- [ ] No synonym glosses when behavior-based definitions exist
- [ ] No rhetorical questions (examples stated as examples)
- [ ] Every simplification describes the correct mechanism
- [ ] Register matches the existing documentation voice

## Anti-patterns to avoid

These are patterns that feel like improvements but consistently make documentation worse. They were identified from human review of AI-generated edits.

**1. Rewriting correct prose for "friendliness"**

If the original sentence is factually accurate and structurally sound, do not rewrite it to sound warmer or simpler. Rewrites introduce risk of mechanical inaccuracy. Only touch sentences that have a concrete problem (wrong fact, ambiguous referent, undefined term, broken logic).

**2. Adding consequence chains the reader can infer**

Do not spell out "If X happens, then Y, which causes Z" when the audience already understands the causal chain. Example: telling a network engineer that blocked health checks cause tunnels to go unhealthy is stating the obvious. Ask: "Would a reasonable reader of this page already know this consequence?" If yes, omit it.

**3. Adding synonym glosses ("also called X")**

Do not append "also called 'default deny'" or similar aliases when the concept is already defined by its behavior in the same sentence. One definition is enough. Synonym stacking clutters without adding understanding.

**4. Using rhetorical questions in documentation**

Do not convert example lists into questions ("do you run VPN, NTP, or database services?"). State examples as examples. Documentation is not a conversation.

**5. Implying mutual exclusivity between complementary features**

Do not add phrases like "rather than writing rules from scratch" that imply one feature replaces another when both are used together. When two features complement each other, cross-reference them instead of contrasting them.

**6. Describing the wrong mechanism with a plausible simplification**

When simplifying how a system works, verify the simplification describes the actual mechanism. For example, saying "a Custom rule can change a Managed rule's action" is wrong if Custom rules actually take precedence due to evaluation order. A plausible-sounding but mechanically incorrect explanation is worse than the original jargon.

**7. Over-specifying precision the audience already has**

Do not explain that `==` means "equals" to an audience writing Wireshark-syntax filter expressions. Calibrate the level of inline definition to the actual audience of the page, not to a hypothetical beginner.

**8. Using casual register in formal docs**

"Let you" is too casual for Cloudflare docs. Use "allow you to" or state the action directly. Match the existing voice of the documentation, not a conversational ideal.

## Edge Cases

- **Very long documents (>1000 lines):** Ask which sections to prioritize, offer to process in chunks
- **Already-clear content:** Acknowledge clarity, suggest minor improvements only
- **Highly technical content:** Maintain accuracy above all, use progressive disclosure
- **Code-heavy docs:** Add plain-language explanations of what code accomplishes and why it is structured that way
- **Multiple audience types:** Use labeled sections ("For developers:" / "For non-technical readers:")

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
