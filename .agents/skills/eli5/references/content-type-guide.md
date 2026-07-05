# Content Type Guide

Operational guide for detecting and simplifying different documentation types.

---

## Purpose

This guide provides:
- **Detection criteria** for identifying content types
- **Required elements** checklist for each type
- **Simplification patterns** specific to each type
- **Quick reference** for operational use

---

## CRITICAL: Conservative Enhancement Guidelines

**Target expansion: 1.5-2x original content length**

For each content type below, the enhancement patterns are designed to ADD MINIMAL CONTEXT AND EXAMPLES, not restructure or massively expand.

**Universal constraints:**
- Maximum 1-2 examples per major concept
- Each example: 5-15 lines
- Inline "why" explanations: 1-2 sentences
- No diagram annotations
- Preserve all original structure
- No separate conceptual sections before content
- Brief troubleshooting only (1-2 issues for tutorials)
- Minimal testing guidance (3-5 commands for tutorials)

**When patterns below suggest "Add [section]":**
- Interpret as "enhance inline" not "create separate major section"
- Keep additions brief and integrated
- Target 1.5-2x expansion, not 5-10x

---

## Content Type Overview

| Type | Purpose | Key Pattern | Example |
|------|---------|-------------|---------|
| **Overview** | Help users decide if they need this | Problem → Solution → Benefit | Product landing pages |
| **Concept** | Build understanding of "why" | Analogy → Plain → Technical | "What is rate limiting?" |
| **How To** | Enable task completion | Context → Multi-path steps | "Enable HTTPS" |
| **Reference** | Provide comprehensive specs | Use-case organization | API parameters, headers |
| **Tutorial** | Teach through application | Build → Enhance → Polish | "Build a URL shortener" |

---

## 1. Overview Pages

### Detection Criteria

**Look for:**
- Product/feature name in title or H1
- Feature lists or capability descriptions
- "What is [Product]" sections
- Benefit statements or value propositions
- "Get started" or call-to-action links
- Lack of step-by-step instructions

**Confidence signals:**
- Multiple features described briefly
- High-level product description
- Links to detailed documentation
- "Perfect for" or use case sections
- Pricing or plan information

**Example titles:**
- "Cloudflare Workers"
- "Introduction to Gateway"
- "What is Workers KV?"

### Required Elements Checklist

- [ ] Opening benefit statement (what problem solved)
- [ ] Problem/Solution/Benefit structure
- [ ] "Perfect for" self-identification section  
- [ ] Clear call-to-action ("Get started" link)
- [ ] Feature descriptions with benefits (not just specs)
- [ ] Technical architecture separated/collapsed

### Simplification Pattern (Conservative)

**Target: 1.5-2x original length**

**Minimal additions:**
1. **Add 2-4 sentence problem statement** (if completely missing) at document start
2. **Add 1-2 use case examples inline** (5-10 lines each) showing who benefits
3. **Add inline "why"** (1 sentence) when introducing features
4. **Define jargon on first use** (brief inline definition)

**Structure to preserve:**
- Keep original opening and headings
- Don't reorganize sections
- Don't move architecture (just add brief intro if it leads)

**Example enhancement:**

Original (8 lines):
```markdown
# Internal DNS

Manage DNS records for your private network.

Internal DNS zones pair with Gateway resolver policies to control 
DNS query responses.

## Features
- Create internal zones
- Configure views
- Link to Gateway
```

Enhanced (15 lines - 1.9x):
```markdown
# Internal DNS

Manage DNS records for your private network without running your own DNS 
servers. This simplifies operations and integrates with Cloudflare Gateway.

Internal DNS zones pair with Gateway resolver policies to control DNS query 
responses based on context (source IP, user identity, domain).

**Example use case:** A multi-region company creates separate views for London 
and SF offices. Users query the same hostname (api.company.internal) but get 
different IP addresses based on location.

## Features
- Create internal zones - Private namespaces accessible only via Gateway
- Configure views - Logical groupings that route different users to different resources
- Link to Gateway - Resolver policies determine which view to use
```

What was added:
- 1 sentence "why" (without running own servers)
- Brief context for zones (source IP, user identity)
- 1 example (3 lines)
- Inline definitions for features (1 sentence each)
- Total: 7 lines added to 8 original = 15 lines (1.9x) ✅

### Common Issues to Fix (Conservative Approach)

- **Leading with technical architecture** → Add 1-2 sentence benefit intro before it (don't move it)
- **Feature lists without context** → Add brief inline explanations (1 sentence per feature)
- **Missing use case** → Add 1 concrete example inline (5-10 lines)
- **Jargon in opening** → Define on first use (parenthetical or brief clause)
- **No "why"** → Add 1 sentence explaining problem solved

---

## 2. Concept Pages

### Detection Criteria

**Look for:**
- "What is..." or "Understanding..." titles
- Explanatory content (not procedural)
- "How it works" sections
- Conceptual diagrams or explanations
- "Why" explanations
- Analogies or metaphors (sometimes)

**Confidence signals:**
- Explains mechanisms, not steps
- Educational tone
- Links to related concepts
- Theory before practice
- Multiple explanation approaches

**Example titles:**
- "Understanding Rate Limiting"
- "How Caching Works"
- "What is Edge Computing?"

### Required Elements Checklist

- [ ] Opening analogy/visual (accessible to all)
- [ ] Plain language definition
- [ ] "Why it matters" business value
- [ ] How it works (simplified explanation)
- [ ] Real-world use cases (3-5 scenarios)
- [ ] Technical details for advanced users (separated)
- [ ] Related concepts links

### Simplification Pattern

**Structure:**
```markdown
# [Concept Name]

**Think of it like:** [Tech-adjacent analogy]

**What it is:** [Plain English definition without jargon]

**Why you need it:**
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

**How it works:** [Simplified technical explanation]

**Real scenarios:**
- [Use case 1 with context]
- [Use case 2 with context]
- [Use case 3 with context]

---

**For technical users:**
[Technical implementation, architecture, algorithms]
```

### Common Issues to Fix

- **Technical jargon first** → Start with analogy
- **Missing "why"** → Add business value/benefits section
- **Abstract examples** → Use concrete, realistic scenarios
- **No layering** → Add progressive disclosure (simple → technical)
- **Buried technical details** → Separate clearly

---

## 3. How To Pages

### Detection Criteria

**Look for:**
- Action verbs in titles (Configure, Enable, Create, Set up)
- Numbered steps or procedures
- "Prerequisites" sections
- Screenshots or UI guidance
- "Verify" or "Test" sections
- Command examples or code blocks

**Confidence signals:**
- Clear sequential structure
- Specific actionable steps
- Tool/UI references
- Expected outcomes stated
- Troubleshooting sections

**Example titles:**
- "Enable Always Use HTTPS"
- "Configure DNS Settings"
- "Create a Worker"

### Required Elements Checklist

- [ ] Context (what this accomplishes, why)
- [ ] Prerequisites listed upfront
- [ ] Expected outcome stated
- [ ] Time estimate (if > 5 minutes)
- [ ] Dashboard path (UI steps with bold elements)
- [ ] API/CLI path (code examples in collapsible)
- [ ] Verification steps ("How to tell it worked")
- [ ] Troubleshooting common issues

### Simplification Pattern (Conservative)

**Target: 1.5-2x original length**

**For how-to guides, preserve existing steps and add minimal context:**

**Minimal additions:**
1. **Add 1-2 sentence "what this accomplishes"** at top (if missing)
2. **Add inline "why"** (1 sentence) for non-obvious steps
3. **Add 1 example** showing when you'd use this (3-5 lines)
4. **Add brief verification** (2-3 commands) if completely missing
5. **Add 1-2 troubleshooting notes** for critical failures only

**Preserve:**
- Original step numbering and flow
- Existing Dashboard/API paths (don't create new ones)
- All screenshots and UI elements
- Existing structure

**Example enhancement:**

Original (12 lines):
```markdown
# Create a DNS View

## Dashboard

1. Go to Internal DNS
2. Click Create View
3. Enter view name
4. Select zones to include
5. Click Save

## API

Use the create view endpoint with zone IDs.
```

Enhanced (20 lines - 1.67x):
```markdown
# Create a DNS View

Create a logical grouping of zones that determines which DNS records users see. 
Useful for multi-region setups or environment separation.

**Example:** Create "London View" and "SF View" to route users to nearest datacenter.

## Dashboard

1. Go to Internal DNS → Views
2. Click **Create View**
3. Enter descriptive view name (e.g., "London Production View")
4. Select zones to include - Choose which internal zones belong in this view
5. Click **Save** - View receives unique ID for use in Gateway policies

**Verify:** View appears in Views list with selected zones shown.

## API

Use the create view endpoint with zone IDs.

\`\`\`bash
curl -X POST /api/views -d '{"name": "London View", "zone_ids": ["id1", "id2"]}'
\`\`\`

**If view creation fails:** Check zone IDs are valid and not already in another view.
```

What was added:
- 2-sentence purpose statement (2 lines)
- 1 example (1 line)
- Inline context for 2 steps (2 lines)
- Brief verification (1 line)
- API code example (2 lines)
- 1 troubleshooting note (1 line)
- Total: 8 lines added to 12 original = 20 lines (1.67x) ✅

**What was NOT added:**
- Comprehensive troubleshooting section
- Multiple examples
- Separate "Understanding Views" section
- Extensive testing procedures
```

### Common Issues to Fix

- **No context before steps** → Add "What this does" introduction
- **Missing prerequisites** → State upfront what's needed
- **Dashboard-only** → Add API/CLI path in collapsible
- **No verification** → Add "How to tell it worked" section
- **Missing notes** → Annotate confusing steps

---

## 4. Reference Pages

### Detection Criteria

**Look for:**
- Tables of parameters/settings/options
- Alphabetical organization (often)
- Technical specifications
- Data types, valid values, constraints
- API endpoint documentation
- Configuration option lists

**Confidence signals:**
- Dense technical details
- Systematic coverage (all options listed)
- Minimal narrative prose
- Code/parameter examples
- "Reference" or "API" in title

**Example titles:**
- "Cache Control Headers Reference"
- "API Endpoints"
- "Configuration Options"

### Required Elements Checklist

- [ ] Opening context ("When you'd use this reference")
- [ ] Common scenarios upfront (not at end)
- [ ] Use-case organization (not alphabetical)
- [ ] Two-tier descriptions (plain + technical)
- [ ] Practical examples for each item
- [ ] "When to use" decision guidance
- [ ] Real usage scenarios with expected results

### Simplification Pattern

**Structure:**
```markdown
# [Reference Title]

**When to use:** [Context for entire reference]

## Common Scenarios

- [Scenario 1]: Use [option X]
- [Scenario 2]: Use [option Y]

---

## [Category 1: Grouped by Purpose]

### [Option Name]

**What it does:** [Plain English description]

**When to use:** [Specific use case]

**Technical spec:** [Data type, range, constraints]

**Example:**
```[language]
[Realistic usage example]
```

**Result:** [What happens when this is used]

---

### [Next Option]

[Same structure...]
```

### Common Issues to Fix

- **Alphabetical organization** → Reorganize by use case/purpose
- **Specs without context** → Add "When to use" guidance
- **Missing examples** → Add realistic usage for each item
- **No decision help** → Add scenario-based recommendations
- **Plain or technical only** → Provide both descriptions

---

## 5. Tutorial Pages

### Detection Criteria

**Look for:**
- "Build" or "Create" in title
- Progressive code examples
- "What you'll build" sections
- "Prerequisites" with skill requirements
- Time estimates
- Step-by-step code progression
- "Deploy" or "Test" final sections

**Confidence signals:**
- Code builds from simple to complex
- Each step adds functionality
- Testing at milestones
- Troubleshooting sections
- Learning objectives stated
- Complete working example

**Example titles:**
- "Build a URL Shortener"
- "Create a Blog with Pages"
- "Tutorial: Image Resizing API"

### Required Elements Checklist

- [ ] "What you'll build" with specific example
- [ ] "Who this is for" with prerequisites
- [ ] Time estimate
- [ ] "What you'll learn" (key concepts)
- [ ] Step 1: Minimal working version
- [ ] Progressive enhancement (add features incrementally)
- [ ] Code block explanations ("What this does")
- [ ] Testing at each major step
- [ ] Troubleshooting section
- [ ] Optional enhancements (clearly marked)

### Simplification Pattern (Conservative)

**Target: 1.5-2x original length**

**For tutorials, focus on enhancing existing steps, not restructuring:**

**Minimal additions to existing tutorial:**
1. **Add 2-3 sentence goal** at top (if missing) - what they'll build
2. **Add inline code explanations** - Brief comments within code blocks
3. **Add 1 example** showing typical usage scenario (5-10 lines)
4. **Add brief testing** - 3-5 commands with expected output
5. **Add minimal troubleshooting** - 1-2 critical issues only

**DO NOT add if already present:**
- "What you'll build" section (enhance existing instead)
- Progressive steps (keep original structure)
- Code examples (enhance with comments, don't replace)

**Example enhancement:**

Original tutorial step (20 lines):
```markdown
## Step 1: Create the zone

Use the API to create an internal zone.

\`\`\`bash
curl -X POST https://api.cloudflare.com/zones \\
  -d '{"name": "company.internal", "type": "internal"}'
\`\`\`

## Step 2: Add DNS records

Add records to the zone.

\`\`\`bash
curl -X POST https://api.cloudflare.com/zones/ID/dns_records \\
  -d '{"type": "A", "name": "app", "content": "192.168.1.100"}'
\`\`\`
```

Enhanced (35 lines - 1.75x):
```markdown
## Step 1: Create the zone

Create an internal zone that will contain your DNS records. This zone is only 
accessible via Gateway (not public DNS).

\`\`\`bash
curl -X POST https://api.cloudflare.com/zones \\
  -d '{
    "name": "company.internal",  # Your internal domain
    "type": "internal"             # Marks as internal-only
  }'
\`\`\`

**Example use:** A company creates company.internal for all internal apps 
(app.company.internal, api.company.internal, db.company.internal).

## Step 2: Add DNS records

Add records mapping hostnames to private IPs.

\`\`\`bash
curl -X POST https://api.cloudflare.com/zones/ZONE_ID/dns_records \\
  -d '{
    "type": "A",                           # Address record
    "name": "app.company.internal",        # Full hostname
    "content": "192.168.1.100"             # Private IP
  }'
\`\`\`

**Test:** 
\`\`\`bash
nslookup app.company.internal
# Expected: Returns 192.168.1.100
\`\`\`

**If it doesn't resolve:** Device must use Gateway as DNS resolver. Check WARP 
connection or DNS settings.
```

What was added:
- Brief "why" for each step (1 sentence)
- Inline code comments (3-4 comments)
- 1 example showing usage (2 lines)
- Brief testing (3 lines)
- 1 troubleshooting note (2 lines)
- Total: 15 lines added to 20 original = 35 lines (1.75x) ✅

**What was NOT added:**
- Separate "What you'll build" section
- Multiple examples
- Comprehensive troubleshooting section
- Extensive testing procedures

### Common Issues to Fix (Conservative Approach)

- **Code without explanation** → Add inline comments (2-4 per block)
- **No goal stated** → Add 2-3 sentence goal at top
- **Missing testing** → Add 3-5 line verification (not separate section)
- **Zero troubleshooting** → Add 1-2 critical issues inline with steps
- **No examples** → Add 1 realistic example inline (5-10 lines total)

---

## Detection Decision Tree

```
1. Does it have numbered procedural steps?
   YES → Likely HOW TO
   NO → Continue

2. Does it explain "what" and "why" conceptually?
   YES → Likely CONCEPT
   NO → Continue

3. Does it have tables/specs/parameters?
   YES → Likely REFERENCE
   NO → Continue

4. Does it build something progressively with code?
   YES → Likely TUTORIAL
   NO → Likely OVERVIEW

5. Validation questions:
   - Multiple features described? → OVERVIEW
   - Explains mechanisms? → CONCEPT
   - Action-oriented title? → HOW TO
   - Technical specifications? → REFERENCE
   - Complete project? → TUTORIAL
```

---

## Mixed Content Types

Sometimes documentation combines types:

### Overview + How To
**Pattern:** Product intro followed by quick start steps  
**Approach:** Treat first section as Overview, steps as How To  
**Example:** "Workers Overview" with "Deploy Your First Worker" steps

### Concept + Reference
**Pattern:** Conceptual explanation followed by parameter reference  
**Approach:** Layer explanation first, reference at bottom  
**Example:** "Understanding Caching" + "Cache Headers Reference"

### Tutorial + Reference
**Pattern:** Build project + API reference at end  
**Approach:** Keep tutorial progressive, move reference to appendix  
**Example:** "Build URL Shortener" + "Workers API Reference"

**Detection strategy:** Identify the primary purpose (first 50% of content), treat remainder as supporting material with appropriate pattern.

---

## Quick Reference Cards

### Overview Page Card
```
✓ Opens with benefit statement
✓ Problem/Solution structure
✓ "Perfect for" section
✓ CTA link prominent
✓ Technical details at bottom
```

### Concept Page Card
```
✓ Analogy in first paragraph
✓ Plain definition
✓ "Why it matters"
✓ Real use cases (3-5)
✓ Technical section separated
```

### How To Page Card
```
✓ Context before steps
✓ Prerequisites listed
✓ Dashboard path
✓ API path (collapsible)
✓ Verification section
```

### Reference Page Card
```
✓ Opening context
✓ Use-case organized
✓ Plain + technical descriptions
✓ Examples for each item
✓ Decision guidance
```

### Tutorial Page Card
```
✓ "What you'll build"
✓ Prerequisites + time
✓ Minimal first step
✓ Progressive complexity
✓ Every code block explained
✓ Troubleshooting included
```

---

**Document Version:** 1.0  
**Last Updated:** February 2026  
**License:** MIT
