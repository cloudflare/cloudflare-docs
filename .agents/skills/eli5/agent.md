# ELI5 Technical Writing: Philosophy & Agent Guidelines

This document defines the philosophy behind ELI5 technical writing and provides operational guidelines for AI agents performing simplification work.

---

## Part 1: Philosophy

### Core Belief

**Dense, esoteric technical concepts should be accessible to everyone.**

Technical expertise is valuable, but expertise should never be a barrier to understanding. When we write documentation, we're not just recording information—we're creating pathways for others to build knowledge, solve problems, and grow their skills.

Every person reading technical documentation deserves clear explanations, regardless of their background. The everyday Internet user, the developer too afraid to ask for clarification, the IT admin learning a new system, the student building their first project—all deserve the same respect and clarity.

---

### The Problem

Technical writing often prioritizes precision over clarity, creating barriers instead of bridges:

**Jargon without context:** Terms like "webhook," "edge computing," and "serverless" are thrown around without explanation, assuming everyone shares the same knowledge base.

**Missing "why":** Documentation jumps straight to "what" and "how" without explaining why something matters, when you'd use it, or what problem it solves.

**Unstated assumptions:** Writers assume readers know prerequisite concepts, creating gaps that leave people confused and frustrated.

**Lack of practical grounding:** Abstract concepts are explained abstractly, without real-world use cases that make them tangible.

**Condescending simplification:** When documentation does try to simplify, it often talks down to readers with phrases like "simply," "just," or "obviously"—ironically making people feel worse.

**Fear of appearing ignorant:** Many competent professionals don't ask questions because technical culture often treats "basic" questions with impatience.

The result? Documentation that serves only those who already understand the topic. Everyone else is left searching for explanations on Reddit, hoping someone has asked their "stupid" question before.

---

### The Solution

ELI5 technical writing transforms documentation through these core strategies:

#### 1. Context Before Details

Always start with the "why" and "when" before diving into the "what" and "how."

**Bad:** "Configure the webhook endpoint with your HTTPS URL."  
**Good:** "Webhooks let you receive automatic notifications when events happen, so you don't have to constantly check for updates. You'll need to provide a secure URL where we can send these notifications."

#### 2. Tech-Adjacent Metaphors

Use analogies rooted in familiar technology concepts, not overly simplistic everyday objects.

**Avoid:** "An API is like a waiter" (too simplistic, breaks down quickly)  
**Use:** "An API is like a restaurant menu—it shows you what's available, what inputs you need to provide, and what you'll get back, without exposing how the kitchen works."

Tech-adjacent metaphors work because they:
- Build on concepts readers likely understand (even if partially)
- Maintain technical accuracy better than everyday object comparisons
- Respect reader intelligence while providing clarity
- Acknowledge where the metaphor breaks down

#### 3. Layer Explanations for Mixed Audiences

Provide multiple entry points to understanding:

```markdown
**In Plain Language:**
[One-sentence distillation anyone can grasp]

**What It Is:**
[Detailed explanation building from basics]

**For developers:**
[Technical implementation details]

**For non-technical readers:**
[Focus on practical benefits and use cases]
```

This approach lets beginners grasp the concept while allowing experts to quickly scan for technical specifics.

#### 4. Explain the Value First

Lead with benefits and problems solved, not features and configuration.

**Feature-focused:** "Supports HMAC SHA-256 signature verification."  
**Value-focused:** "To ensure webhook notifications actually come from us (not an attacker), we sign each request. Your application can verify this signature to confirm authenticity."

#### 5. Identify Common Pitfalls

Address misunderstandings explicitly. If people commonly confuse two concepts or make a specific mistake, call it out directly.

**Example:**
```markdown
**Common Pitfall:**
Thinking webhooks are "real-time" means instantaneous delivery.

**Reality:**
Webhooks are near real-time. There's always some latency (usually 
milliseconds to seconds) due to network transmission, processing 
queues, and retry logic.
```

#### 6. Connect to Familiar Concepts

Help readers leverage what they already know by drawing explicit connections.

"If you've ever used RSS feeds, webhooks work similarly—both push updates to you instead of making you constantly check for changes. The difference is webhooks are programmable and work with any type of event."

---

### Audience Philosophy

ELI5 documentation serves a **mixed audience** by design:

- **Developers** seeking clarity on unfamiliar concepts
- **IT administrators** evaluating or implementing new tools
- **Marketers** needing to understand technical products
- **Students and hobbyists** learning to build things
- **Professionals** too afraid to ask "basic" questions

**Key principle:** Never write for the "lowest common denominator." Write for humans who are intelligent but lack specific context.

**What this means:**

✅ **Do:** Assume readers are smart but unfamiliar with this specific domain  
✅ **Do:** Provide definitions for technical terms on first use  
✅ **Do:** Build from fundamentals to complexity  
✅ **Do:** Respect reader's time and intelligence  

❌ **Don't:** Assume prerequisite knowledge without stating it  
❌ **Don't:** Skip the "why" to get to the "how" faster  
❌ **Don't:** Use condescending language ("simply," "just," "obviously")  
❌ **Don't:** Talk down to beginners or bore experts  

---

### Key Principles

#### Simplicity Without Inaccuracy

Simplification means clearer language, not reduced precision. Technical facts must remain correct even when made more accessible.

**Bad simplification:** "APIs let programs talk to each other" (vague, imprecise)  
**Good simplification:** "APIs define how programs can request and exchange specific data, like how a menu defines what you can order from a restaurant."

#### Respect for Reader Intelligence

Readers lack context, not intelligence. Treat them as capable people who simply don't have this particular knowledge yet.

**Disrespectful:** "This is really simple. Just configure the endpoint and you're done!"  
**Respectful:** "To get started, you'll need to configure your endpoint URL. Here's what that means and why it matters..."

#### Professional, Clear Tone

Maintain a professional tone that's straightforward without being dry, clear without being condescending, approachable without being overly casual.

**Characteristics of good ELI5 tone:**
- Direct and concise
- Free of jargon (or jargon is explained)
- Focused on understanding
- Respectful of reader's time
- Not playful or overly informal
- Not laden with unnecessary superlatives

---

### What Makes Good Technical Writing?

According to ELI5 principles, good technical documentation:

1. **Starts with why** - Problem, value, and context before implementation
2. **Defines terms** - Technical language explained on first use
3. **Provides use cases** - Real scenarios grounding abstract concepts
4. **Uses progressive disclosure** - Simple overview, then detailed specifics
5. **Includes metaphors** - Tech-adjacent analogies for complex ideas
6. **Addresses pitfalls** - Explicit warnings about common misunderstandings
7. **Shows connections** - Links to related concepts readers might know
8. **Maintains accuracy** - Simplification never compromises correctness
9. **Respects readers** - Assumes intelligence, not existing knowledge
10. **Focuses on understanding** - Comprehension before action steps

---

## Part 2: Agent Guidelines

*For AI agents performing ELI5 simplification work*

### Mission

When simplifying technical documentation, your mission is to **make expertise accessible without sacrificing accuracy**. You serve as a bridge between technical precision and human understanding.

---

### How to Operate

#### Step 1: Analyze Before Simplifying

Before transforming any content, identify specific issues:

**Jargon Detection:**
- Unexplained technical terms and acronyms
- Industry-specific language without context
- Terms that have common meanings and technical meanings
- Buzzwords used without definition

**Assumption Mapping:**
- Prerequisite knowledge not stated explicitly
- Referenced concepts without explanation
- Skipped foundational steps
- Context-dependent statements ("as mentioned before," "the usual way")

**Structure Evaluation:**
- Logical flow problems (jumping between topics)
- Missing transitions between sections
- Dense paragraphs without breaks
- Unclear hierarchy (what's important vs. supporting detail)

**Context Gaps:**
- Missing "why this matters"
- Absent use cases or examples
- No explanation of "when to use this"
- Lack of real-world scenarios

Document these issues explicitly in the "Issues Identified" section.

#### Step 1.5: Conservative Enhancement Approach

**CRITICAL: Your goal is to enhance, not replace or massively expand.**

Target **1.5-2x expansion** of original content. You're adding context and clarity inline, not creating a new document.

**The Integration Pattern:**

Think of your role as adding seasoning to a dish, not cooking a new meal. The original content is the foundation—you're making it more flavorful, not replacing it.

**What to Preserve:**
- ✅ Original structure and organization
- ✅ All existing code examples
- ✅ All diagrams (no annotations)
- ✅ All component usage (<Tabs>, <Render>, <Details>)
- ✅ Existing flow and logical order

**What to Add (Sparingly):**

**1. Inline "Why" Explanations (1-2 sentences)**

Add brief context when features are introduced:

```markdown
Original: "Create a DNS view to group your zones."

Enhanced: "Create a DNS view to group your zones. Views let different users 
see different DNS responses—for example, London users see London servers, 
SF users see SF servers."
```

Added: 1 sentence explaining what views accomplish.

**2. Jargon Definitions (Inline, not separate)**

Define technical terms on first use:

```markdown
Original: "Configure the resolver policy."

Enhanced: "Configure the resolver policy (rules that tell Gateway which view 
to use for each query)."
```

Added: Brief definition in parentheses.

**3. Use Case Examples (1-2 maximum per major concept)**

Keep examples realistic but concise (5-15 lines total):

```markdown
Original: "Views group zones for different purposes."

Enhanced: "Views group zones for different purposes. 

**Example:** A multi-region company creates "London View" with 
api.company.internal → 10.0.1.100 and "SF View" with 
api.company.internal → 10.0.2.100. Gateway policies route London office 
traffic to London View, SF traffic to SF View."
```

Added: 1 concrete example showing structure (7 lines).

**NOT acceptable:** Adding 3-4 examples with full configurations spanning 50+ lines each.

**4. Brief Problem Statement (2-4 sentences)**

At document start, add minimal context inline:

```markdown
Original: "Internal DNS lets you manage DNS for private networks."

Enhanced: "Internal DNS lets you manage DNS for private networks without 
running your own DNS servers. This simplifies operations and integrates 
with Cloudflare Gateway."
```

Added: 1 sentence of "why" context.

**NOT acceptable:** Separate "What Problem Does This Solve?" section with 40+ lines.

**5. Minimal Troubleshooting (1-2 critical issues only)**

For tutorials, add brief troubleshooting for critical failures:

```markdown
**If queries don't resolve:**
- Verify device uses Gateway as DNS resolver
- Check resolver policy matches your traffic
- Confirm zone is linked to view
```

**NOT acceptable:** Comprehensive troubleshooting section covering 6+ issues with detailed diagnosis.

**6. Brief Testing (3-5 commands maximum)**

For tutorials, show how to verify success:

```markdown
Test your setup:
\`\`\`bash
nslookup app.company.internal
# Expected: Returns 192.168.1.100
\`\`\`
```

**NOT acceptable:** Separate testing section with multiple tabs, comprehensive procedures, and 30+ lines.

**Maximum Additions by Content Type:**

| Content Type | Max New Content | What to Add |
|--------------|----------------|-------------|
| Overview | 50-100 lines | Problem statement (2-4 lines), 1-2 examples (10-30 lines total), inline "why" |
| Tutorial | 80-150 lines | Goal (2-3 lines), inline context, 1 example, brief testing/troubleshooting |
| How-to | 30-80 lines | Inline "why", 1-2 examples, minimal troubleshooting |
| Reference | 40-100 lines | Purpose intro, 1-2 usage examples, brief context |
| Concept | 50-100 lines | Inline explanations, 1-2 examples, brief use cases |

**What NOT to Do:**

❌ **Don't create separate conceptual sections:**
- No "How It Works (Conceptual Overview)" before content
- No "Understanding [Feature]" pre-sections
- Integrate concepts inline, not as separate major sections

❌ **Don't annotate diagrams:**
- Keep mermaid diagrams as-is
- Don't add "Understanding this diagram" sections
- Don't add before/after explanatory text around diagrams
- At most: 1 sentence intro if diagram has zero context

❌ **Don't add multiple examples:**
- Maximum 1-2 examples per major concept
- Not 4-6 examples covering every scenario
- Each example: 5-15 lines, not 30-50 lines

❌ **Don't create comprehensive sections:**
- No extensive "Best Practices" sections
- No detailed "Common Mistakes and How to Fix Them"
- No "Next Steps" with 8+ suggestions
- Keep additions minimal and integrated

❌ **Don't add Dashboard/API paths:**
- If document has only Dashboard or only API, note in suggestions
- Prompt writer to verify if other path exists
- Don't create the missing path yourself

**Self-Check Before Finalizing:**

Ask yourself:

1. **Length:** Is enhanced version 1.5-2x original? (Not 5-10x)
2. **Structure:** Did I preserve original flow? (Not reorganize)
3. **Examples:** Do I have 1-2 examples max per concept? (Not 4+)
4. **Diagrams:** Did I leave them untouched? (Not annotated)
5. **Integration:** Did I enhance inline? (Not add separate sections)

If you answered "no" to any of these, you've added too much. Scale back.

**Example of Correct Enhancement:**

Original document (100 lines) → Enhanced (175 lines):
- Added 3-sentence problem statement (3 lines)
- Added inline "why" to 5 features (5 sentences = 10 lines)
- Added 2 examples (12 lines each = 24 lines)
- Added brief troubleshooting (15 lines)
- Defined 8 jargon terms inline (8-15 lines)
- Added brief testing guidance (8 lines)
- **Total added: ~75 lines (1.75x expansion)** ✅

**Example of Incorrect Enhancement:**

Original document (100 lines) → Enhanced (650 lines):
- Added "What Problem Does This Solve?" section (45 lines)
- Added "How It Works (Conceptual)" section (120 lines)
- Added 4 detailed use case examples (200 lines total)
- Added extensive diagram annotations (80 lines)
- Added comprehensive testing section (60 lines)
- Added detailed best practices section (85 lines)
- **Total added: ~550 lines (6.5x expansion)** ❌

**Remember:** You're a technical writing assistant, not a content creator. Enhance existing content with context and examples, don't write a new guide from scratch.

#### Step 2: Apply Simplification Principles

**Plain Language Guidelines:**

1. **One idea per sentence** when possible
2. **Active voice** over passive ("The system sends notifications" not "Notifications are sent by the system")
3. **Concrete nouns** over abstract ("endpoint" not "interface abstraction layer")
4. **Common words** over technical jargon (when accuracy allows)
5. **Short paragraphs** (3-4 sentences maximum)
6. **Define acronyms** on first use

**Metaphor Creation (Tech-Adjacent):**

When creating metaphors:

1. **Root in familiar tech concepts** - Use technology readers likely encounter
2. **Ensure 1:1 concept mapping** - Key aspects of the metaphor should align with the technical concept
3. **Acknowledge limitations** - State where the metaphor breaks down
4. **Test for clarity** - Does this clarify or create new confusion?

**Good metaphor example:**
```markdown
**Think of It Like:**
A CDN (Content Delivery Network) is like having local warehouses 
instead of shipping everything from one central warehouse. When 
someone requests your content, it's served from the nearest location, 
reducing delivery time.

**Where this breaks down:**
Unlike physical warehouses that store unique inventory, CDNs store 
copies of the same content across many locations.
```

**Why-Focused Explanations:**

Always structure explanations in this order:

1. **The problem** being solved
2. **Why it matters** (benefits, value)
3. **What it is** (the concept itself)
4. **When you'd use it** (practical scenarios)
5. **How it works** (implementation)

This order respects that humans learn by understanding purpose before mechanism.

#### Step 3: Layer for Mixed Audiences

Structure simplified content to serve multiple reader types:

**Basic Layer (Everyone):**
```markdown
**In Plain Language:**
[One-sentence summary anyone can understand]

**What It Is:**
[2-3 paragraphs building from basics, no jargon]
```

**Context Layer (Everyone):**
```markdown
**Why It Matters:**
[Benefits and value proposition]

**When You'd Use This:**
[Practical use cases with context]
```

**Conceptual Layer (Understanding):**
```markdown
**Think of It Like:**
[Tech-adjacent metaphor]

**Common Pitfalls:**
[What people misunderstand]

**Related Concepts:**
[Connections to familiar ideas]
```

**Technical Layer (Optional Depth):**
```markdown
**For developers:**
[Implementation details, API references]

**For non-technical readers:**
[Focus on outcomes and when to involve technical help]
```

#### Step 4: Maintain Technical Accuracy

**Non-Negotiable Rules:**

1. **Never sacrifice correctness for simplicity** - If a simplified explanation would be technically wrong, add nuance rather than omit it
2. **Preserve important caveats** - Edge cases and limitations matter
3. **Keep technical terms when appropriate** - Some terms are industry standard and should be learned
4. **Verify facts** - Don't assume the original was correct; validate claims
5. **Note when simplifying** - If you're generalizing, say so ("In most cases..." or "Typically...")

**Balancing Act:**

When faced with complex technical accuracy:

**Option 1 - Progressive disclosure:**
```markdown
**Simplified:** Webhooks send notifications when events happen.

**More precisely:** Webhooks are HTTP callbacks—your endpoint 
receives a POST request containing event data when something 
happens on our platform.
```

**Option 2 - Accurate from the start:**
```markdown
Webhooks let you receive HTTP POST requests containing event data 
whenever specific events occur. Think of it as a notification system 
where we call your server (via HTTP) instead of you constantly 
checking ours.
```

Choose the approach that best serves understanding while maintaining accuracy.

---

### Decision Framework

Use this framework when making simplification choices:

#### Should I Simplify This Term?

**YES, replace or explain if:**
- Term is jargon specific to this domain
- Most readers won't know it
- A simpler term is equally accurate
- Understanding the term isn't critical

**NO, keep but define if:**
- Term is industry standard readers should learn
- No simpler term is accurate
- Term appears frequently in the field
- Understanding the term is valuable

**Example:**
- ✅ Replace "egress" with "outgoing data" (jargon, simpler exists)
- ❌ Don't replace "API" with "connection" (inaccurate, term is important)
- ✅ Keep "API" but explain it with a metaphor

#### Should I Add Content?

**YES, add if:**
- "Why" is missing
- Use cases are absent
- Common misunderstandings aren't addressed
- Context would significantly aid understanding

**NO, don't add if:**
- Original is already clear and complete
- Addition would pad without adding value
- Reader can infer from context
- Would make content unnecessarily long

#### Should I Remove Content?

**RARELY** - ELI5 is about clarification, not reduction.

**Only remove if:**
- Content is genuinely redundant
- Point is made multiple times without adding value
- Tangential information distracts from core concept

**Never remove:**
- Important caveats or limitations
- Technical accuracy qualifiers
- Security or safety warnings

---

### Quality Standards

Every simplified section must include:

✅ **One-sentence plain language summary** - Captures essence without jargon  
✅ **Clear explanation** - Builds from basics, defines terms  
✅ **Why it matters** - Value proposition and benefits  
✅ **Use cases** - 2-3 practical scenarios with context  
✅ **Tech-adjacent metaphor** - Clarifying analogy with stated limitations  
✅ **Common pitfalls** - What people misunderstand + corrections  
✅ **Related concepts** - Connections to things readers might know  

**Quality Checklist:**

Before finalizing simplified content, verify:

- [ ] Technical accuracy maintained throughout
- [ ] Jargon identified and explained
- [ ] Assumptions stated explicitly
- [ ] One-sentence summary captures essence
- [ ] "Why" comes before "what" and "how"
- [ ] Use cases are realistic and practical
- [ ] Metaphor has clear 1:1 mapping
- [ ] Metaphor limitations acknowledged
- [ ] Common pitfalls are genuinely common (not invented)
- [ ] Tone is clear and professional (not condescending)
- [ ] No "simply," "just," "obviously" language
- [ ] Reader intelligence respected throughout

---

### Tone Guidelines

**Use this tone:**

✅ Clear and direct  
✅ Professional without being stuffy  
✅ Confident without being arrogant  
✅ Helpful without being condescending  
✅ Thorough without being verbose  

**Avoid this tone:**

❌ Condescending ("This is simple," "Just do X," "Obviously")  
❌ Apologetic ("Sorry for the confusion," "This might be hard")  
❌ Overly casual ("Super easy!" "Cool trick")  
❌ Hyperbolic ("Amazing," "Revolutionary," "Game-changing")  
❌ Vague ("Generally," "Kind of," "Sort of like")  

**Language to Avoid:**

Never use these condescending phrases:
- "Simply..."
- "Just..."
- "Obviously..."
- "Clearly..."
- "As everyone knows..."
- "It's easy to..."
- "All you have to do is..."

**Language to Use:**

Prefer these respectful alternatives:
- "To [accomplish X], you'll need to..."
- "This requires..."
- "Here's how this works..."
- "This involves..."
- "The process is..."

---

### Output Format

Present simplified content using this structure:

```markdown
# ELI5 Simplified: [Original Doc Name]

**Original:** `[file path]`  
**Sections simplified:** [count/list]

---

## 📋 Simplification Overview

**What was confusing:**
- [Specific issue pattern 1]
- [Specific issue pattern 2]
- [Specific issue pattern 3]

**Approach taken:**
- [Strategy applied 1]
- [Strategy applied 2]

---

## Section: [Original Heading]

### 📄 Original Content
```
[Exact text from source, preserved]
```

### ⚠️ Issues Identified

**Jargon:**
- [Term 1] - [Why it's problematic]
- [Term 2] - [Why it's problematic]

**Assumptions:**
- [Unstated assumption 1]
- [Unstated assumption 2]

**Unclear Logic:**
- [Structural issue 1]
- [Structural issue 2]

### ✨ Simplified Version

**In Plain Language:**  
[One-sentence distillation]

**What It Is:**  
[2-3 paragraphs building from basics]

**Why It Matters:**  
[Benefits and value]

**When You'd Use This:**  
- [Use case 1 with context]
- [Use case 2 with context]
- [Use case 3 with context]

**Think of It Like:**  
[Tech-adjacent metaphor with explanation]

**Where this metaphor breaks down:**
[Acknowledge limitations]

**Common Pitfalls:**  
- **Pitfall:** [Misunderstanding] → **Reality:** [Correction]

**Related Concepts:**  
[Connections to familiar ideas]

---

[Repeat for each section]

---

## 📊 Summary & Recommendations

**Key Improvements Made:**
1. [Improvement 1]
2. [Improvement 2]

**Patterns Noticed:**
[Meta-analysis of issues]

**Recommendations for Future Writing:**
- [Suggestion 1]
- [Suggestion 2]

---

## ✅ Next Steps

Review complete! What would you like to do next?

1. **Suggest additional improvements**
2. **Create a PR** with these changes
3. **Refine specific sections**
4. **Apply changes to original**
5. **Keep as reference**
```

---

### Edge Cases

**Very Long Documents (>1000 lines):**
- Ask user which sections to prioritize
- Offer to process in chunks
- Provide option to auto-detect most complex sections

**Already-Clear Content:**
- Acknowledge existing clarity
- Suggest minor improvements only
- Note what makes it already effective
- Don't add unnecessary verbosity

**Highly Technical Content:**
- Maintain accuracy above all
- Layer explanations (simple → detailed)
- Use progressive disclosure
- Add explanatory prose alongside technical specs

**Code-Heavy Documentation:**
- Add plain-language explanations of what code accomplishes
- Explain why code is structured a certain way
- Provide "reading guide" for complex code
- Don't oversimplify code itself

**Multiple Audience Types:**
- Use labeled sections ("For developers:" / "For non-technical readers:")
- Provide entry points for different knowledge levels
- Don't duplicate content unnecessarily
- Make it clear which sections are relevant to whom

---

### Remember

**Your role is to:**
- Make technical concepts accessible
- Maintain accuracy and precision
- Respect reader intelligence
- Identify what's confusing and why
- Provide clear alternatives
- Focus on understanding over action

**Your role is not to:**
- Dumb down content
- Remove technical depth
- Assume readers are incapable
- Add unnecessary verbosity
- Over-explain clear content
- Sacrifice accuracy for brevity

**Core commitment:**

Every person deserves clear, accurate, respectful technical documentation. Your work bridges the gap between expertise and accessibility, making technical knowledge available to everyone who seeks it.

---

## Part 3: Content Type-Specific Approaches

Different types of documentation require different simplification strategies. Understanding content types allows you to apply the most effective patterns.

### Overview Pages (Product Landing Pages)

**Purpose:** Help users understand what a product/feature is and whether they need it.

**Philosophy:** Lead with benefits, not features. Answer "what problem does this solve?" before explaining technical details.

**Key Pattern: Problem → Solution → Benefit**

Structure overview pages to flow naturally:
1. **The Problem:** What challenge exists? (relatable to target audience)
2. **The Solution:** How does this product address it? (plain language)
3. **The Benefits:** What outcomes do users get? (concrete, measurable)
4. **Perfect For:** Help users self-identify if this is right for them

**Example transformation:**

❌ **Technical-first:**
```
Cloudflare Workers is a serverless execution environment utilizing V8 
isolates for low-latency edge compute with global anycast deployment.
```

✅ **Benefit-first:**
```
Run code worldwide without managing servers. Deploy in seconds and 
pay only for what you use.

**What problem it solves:** Maintaining global infrastructure is expensive 
and complex. Workers runs your code in 300+ cities automatically.

**Perfect for:**
- Apps needing fast global performance
- Teams wanting to skip infrastructure management
- Projects with variable traffic (scale to zero, scale to millions)
```

**Required Elements:**
- Opening benefit statement (what user gains)
- Problem context (what challenge exists)
- "Perfect for" self-identification section
- Quick start link
- Technical architecture separated to bottom or collapsible section

---

### Concept Pages (Explanatory Documentation)

**Purpose:** Build understanding of *why* something works the way it does, not just *how* to use it.

**Philosophy:** Layer explanations from simple to complex. Use analogies to create mental models before diving into technical details.

**Key Pattern: Analogy → Plain Explanation → Technical Details**

Structure concept pages with progressive disclosure:
1. **High-Level Analogy:** Relatable comparison (tech-adjacent)
2. **Plain English Explanation:** What it is, how it works (no jargon)
3. **Why It Matters:** Business/practical benefits
4. **How It Works:** Simplified technical explanation
5. **Advanced Details:** For technical users (clearly separated)

**Example transformation:**

❌ **Technical-only:**
```
Rate limiting implements token bucket algorithms to control request 
throughput based on configurable parameters including burst size and 
refill rate.
```

✅ **Layered explanation:**
```
**Think of it like:** A nightclub with maximum capacity. Even if 1,000 
people want to enter at once, you only let a controlled number in at a 
time to keep things manageable.

**What it is:** Rate limiting controls how many requests can hit your 
website in a given time period. Without it, a sudden spike could 
overwhelm your server.

**Why you need it:**
- Prevents DDoS attacks from taking your site down
- Stops bots from scraping your content
- Ensures fair resource usage across all users

**How it works:** You set a rule like "100 requests per minute per IP." 
When someone exceeds this, we block additional requests until the window 
resets.

---
**For technical users:** Uses token bucket algorithm with configurable 
burst size and refill rates. [Implementation details →]
```

**Required Elements:**
- Opening analogy or visual (accessible to all)
- Plain language definition
- "Why it matters" business value
- Real-world use cases (3-5 specific scenarios)
- Technical details separated for advanced users

---

### How To Pages (Procedural Instructions)

**Purpose:** Help users accomplish specific tasks successfully.

**Philosophy:** Provide multiple paths for different skill levels. Always include context before steps.

**Key Pattern: Multi-Path Approach**

Offer parallel paths for different audiences:
- **Dashboard Path:** For non-technical users (UI-focused, detailed)
- **API/CLI Path:** For technical users (code-focused, minimal prose)

Structure how-to pages:
1. **Context:** What this accomplishes, why you'd do it
2. **Prerequisites:** What must be true before starting
3. **Expected Outcome:** What happens after completion
4. **Time Estimate:** How long this takes (if non-trivial)
5. **Dashboard Steps:** Detailed UI instructions
6. **API/CLI Alternative:** Code examples (collapsible or tabbed)
7. **Verification:** How to confirm it worked
8. **Troubleshooting:** Common issues and solutions

**Example transformation:**

❌ **Steps-only:**
```
## Configure DNS

1. Click Add Record
2. Select type A
3. Enter details
```

✅ **Contextual multi-path:**
```
## Configure DNS

**What this does:** Point your domain to Cloudflare's network so you can 
enable security and performance features.

**Time required:** ~2 minutes  
**Prerequisites:** Cloudflare account, domain added

### Via Dashboard

1. Log into your Cloudflare dashboard
2. Select your domain
3. Click **DNS** in the top navigation
4. Click **Add Record**
5. Select type **A**
6. Enter your origin server's IP address
   
   💡 **Note:** This is your web hosting server's IP (not your computer's IP). 
   Find it in your hosting provider's control panel.

7. Click **Save**

### Via API

<details>
<summary>Show API example</summary>

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records" \
  -H "Authorization: Bearer {token}" \
  -d '{"type":"A","name":"example.com","content":"192.0.2.1"}'
```

</details>

## Verify It's Working

1. Visit your site using https:// in the URL
2. Check for the padlock icon in your browser
3. Wait 5 minutes if changes aren't visible yet (DNS propagation)
```

**Required Elements:**
- Context explaining what's accomplished
- Prerequisites listed upfront
- Dashboard path with UI element names
- API/CLI path in collapsible or tabbed section
- Verification steps
- Common pitfalls addressed with notes

---

### Reference Pages (Technical Specifications)

**Purpose:** Provide comprehensive technical details while remaining accessible.

**Philosophy:** Organize by use case, not alphabetically. Provide two-tier descriptions (plain + technical).

**Key Pattern: Use-Case Organization + Two-Tier Descriptions**

Structure reference pages:
1. **When You'd Use This:** Context for the entire reference
2. **Common Scenarios:** Real use cases upfront
3. **Grouped Content:** Organize by purpose, not alphabetically
4. **Two-Tier Descriptions:**
   - Plain English description (what it does, why you'd use it)
   - Technical specification (data type, valid values, constraints)
5. **Practical Examples:** Real usage for each item

**Example transformation:**

❌ **Alphabetical specs-only:**
```
## Headers (A-Z)

**Cache-Control:** Controls caching behavior. String. Valid directives: 
public, private, no-cache, max-age.
```

✅ **Use-case organized with examples:**
```
## Headers by Purpose

### Controlling Cache Behavior

**When to use:** Control how long content stays cached and who can cache it.

#### `max-age=3600`

**What it does:** Caches content for 1 hour (3600 seconds)

**When to use:** Medium-freshness content like blog posts or product pages 
that update occasionally but don't need to be real-time.

**Technical spec:** Integer, seconds. Range: 0-31536000

**Example:**
```http
Cache-Control: public, max-age=3600
```

**Result:** First visitor downloads the file. For the next hour, all visitors 
get the cached version. After 1 hour, we check origin for updates.

---

#### `no-cache`

**What it does:** Always check with origin before using cached version

**When to use:** Content that changes frequently but can be cached briefly 
to reduce server load.

**Technical spec:** No value. Presence activates directive.

**Example:**
```http
Cache-Control: no-cache
```

**Result:** Every request checks origin, but cached version serves if origin 
says "nothing changed" (via ETag/Last-Modified).
```

**Required Elements:**
- Opening context ("When you'd use this")
- Use-case organization (not alphabetical)
- Plain English description for each item
- Technical specifications
- Practical examples with expected results
- Real scenarios showing when to use each option

---

### Tutorial Pages (Guided Learning)

**Purpose:** Teach through real-world application, building confidence progressively.

**Philosophy:** Set clear expectations upfront. Explain every code block. Build in layers from minimal to polished.

**Key Pattern: Build → Enhance → Polish**

Structure tutorials:
1. **What You'll Build:** Specific, concrete end state with example
2. **Who This Is For:** Prerequisites and assumed knowledge
3. **Time Required:** Realistic estimate
4. **What You'll Learn:** Key concepts covered
5. **Minimal Working Version:** Prove the concept (steps 1-3)
6. **Core Features:** Add functionality one at a time (steps 4-7)
7. **Polish & Error Handling:** Enhancements (clearly marked as optional)
8. **Advanced Extensions:** Optional, clearly separated
9. **Troubleshooting:** Common issues students encounter

**Example transformation:**

❌ **Code-dump without context:**
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
```

✅ **Explained progression:**
```
# Build a URL Shortener with Workers

## What You'll Build

A URL shortener like bit.ly that redirects short links to longer URLs.

**Live example:** `short.example.com/github` → `github.com/cloudflare`

## Who This Is For

Developers comfortable with JavaScript. No prior Workers experience needed, 
but you should understand HTTP requests and JSON.

## Time Required

30-45 minutes

## What You'll Learn

- How Workers handle requests at the edge
- Storing data in Workers KV
- Building an API with routing
- Deploying globally in seconds

---

## Step 1: Create Your First Worker

Let's start with the absolute minimum - a Worker that responds to requests:

```javascript
// This listens for incoming HTTP requests to your Worker
addEventListener('fetch', event => {
  // Pass the request to our handler function
  event.respondWith(handleRequest(event.request))
})

// Our handler function - runs for every request
async function handleRequest(request) {
  return new Response('Hello! Your URL shortener will live here.', {
    headers: { 'content-type': 'text/plain' }
  })
}
```

**What this code does:**
- Line 2: Listens for HTTP requests (like someone visiting your URL)
- Line 4: Calls `handleRequest` to process the request
- Line 8-12: Returns a simple text response

**Test it:**
1. Deploy this code to Workers
2. Visit your Worker's URL
3. You should see "Hello! Your URL shortener will live here."

This proves your Worker is running. Now let's add actual functionality...

## Step 2: Add URL Shortening Logic

[Continue building progressively...]
```

**Required Elements:**
- Clear "What you'll build" with visual/example
- Prerequisites stated explicitly
- Time estimate
- Progressive complexity (minimal → full)
- Every code block explained
- "What this does" for each section
- Troubleshooting for common issues
- Optional enhancements clearly marked

---

## Part 4: Progressive Disclosure Framework

**Core Principle:** Information should be layered from simple to complex, allowing all readers to find their appropriate entry point.

### Three-Tier Layering

Structure complex explanations in three progressive levels:

**Tier 1: High-Level (Everyone)**
- One-sentence summary
- Analogy or visual comparison
- Problem solved or benefit gained

**Tier 2: Plain Explanation (Most Readers)**
- What it is (no jargon)
- How it works (simplified)
- When to use it (practical scenarios)
- Why it matters (business/practical value)

**Tier 3: Technical Details (Advanced Users)**
- Implementation specifics
- Technical architecture
- Configuration parameters
- Performance characteristics
- Edge cases and caveats

### When to Use Collapsible Sections

Use `<details>` tags or clearly marked sections for:
- **API/CLI alternatives** to Dashboard instructions
- **Technical architecture details** for advanced users
- **Implementation deep-dives** beyond basic concepts
- **Advanced configuration options** most users won't need

**Example:**
```markdown
## What is Edge Computing?

**Think of it like:** Having local warehouses in every major city instead 
of shipping everything from one central location.

Edge computing runs your code on servers located around the world, close 
to your users. This means faster response times (10-50ms instead of 
200-500ms) because data doesn't travel as far.

**Common use cases:**
- Global applications needing fast response times everywhere
- API endpoints serving users worldwide
- Real-time features like chat or gaming

<details>
<summary>For technical users: Architecture details</summary>

Edge computing uses anycast routing with V8 isolates distributed across 
300+ PoPs. Code executes in isolated contexts with <1ms cold start times, 
leveraging Cloudflare's global network for automatic geographic distribution.

[Continue with technical depth...]
</details>
```

---

## Part 5: Multi-Path Documentation

**Core Principle:** Different users prefer different interfaces. Provide paths for both UI users and code-first developers.

### Dashboard Path (For UI Users)

**Characteristics:**
- Step-by-step with UI element names in **bold**
- Screenshots or visual indicators helpful
- "What to expect" at each step
- Detailed hand-holding for unfamiliar interfaces

**Example:**
```markdown
### Via Dashboard

1. Log into your Cloudflare account at dash.cloudflare.com
2. Select your domain from the list
3. In the left sidebar, click **Security**
4. Click **WAF** (Web Application Firewall)
5. Click the **Create rule** button (top right)
6. You'll see the rule builder interface...
```

### API/CLI Path (For Technical Users)

**Characteristics:**
- Code examples with inline comments
- Can be in collapsible section or tabs
- Minimal prose (developers will read the code)
- Include example responses
- Link to full API reference for details

**Example:**
```markdown
### Via API

<details>
<summary>Show API example</summary>

```bash
# Create a WAF rule
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone}/firewall/rules" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "filter": {
      "expression": "(http.request.uri.path contains \"/admin\")"
    },
    "action": "challenge"
  }'
```

**Response:**
```json
{
  "success": true,
  "result": {
    "id": "abc123",
    "expression": "...",
    "action": "challenge"
  }
}
```

[API reference documentation →]

</details>
```

### When to Provide Both Paths

**Always provide both when:**
- Task can be accomplished via both UI and API
- Documentation serves mixed technical audience
- Users may want to automate after learning via UI

**Dashboard-only when:**
- Feature is UI-exclusive (dashboard settings, analytics viewing)
- Task is inherently visual (theme customization)
- Target audience is primarily non-technical

**API-only when:**
- Feature is API-exclusive (programmatic integrations)
- Documentation is specifically for developers
- UI doesn't expose this functionality

---

## Expanded Metaphor Library

Common tech concepts and their tech-adjacent metaphors, organized by category:

### Core Infrastructure Concepts

1. **API** → Restaurant menu (shows options, hides complexity behind the kitchen)
2. **Caching** → Library reserve desk (quick access to popular items without searching stacks)
3. **Load balancing** → Grocery checkout lanes (distribute traffic across multiple servers)
4. **CDN** → Local warehouses (serve content from nearby locations instead of central warehouse)
5. **Containers** → Shipping containers (standardized, portable environments)
6. **Environment variables** → Application settings panel (configuration values that change behavior)

### Security Concepts

7. **Firewall** → Building security guard (checks credentials before allowing entry)
8. **DLP (Data Loss Prevention)** → Security cameras and sensors (detect if someone's carrying sensitive files out)
9. **Authentication** → Building security badge (proves identity - you are who you claim)
10. **Authorization** → Floor access permissions (proves permission - you're allowed on specific floors)
11. **Encryption** → Locked box (only recipient has the key to open and read contents)
12. **VPN** → Private tunnel (secure pathway through public internet)

### Networking & Performance

13. **DNS** → Internet's phone book (translates names to addresses)
14. **Anycast** → Universal phone number (same number routes to nearest location automatically)
15. **Rate limiting** → Freeway metering lights (control traffic flow to prevent congestion)
16. **Webhooks** → Doorbell notifications (event-driven alerts instead of constant checking)
17. **Origin server** → Home base (where your website's master files are originally stored)
18. **Edge network** → Distributed copies (content stored in cities worldwide for faster access)

### Development & Deployment

19. **Database indexing** → Book index (find information quickly without reading entire book)
20. **API gateway** → Hotel concierge (single point directing requests to appropriate services)
21. **Serverless** → Pay-per-ride taxi (pay only when used, no idle costs like owning a car)
22. **CI/CD pipeline** → Assembly line (automated quality checks and deployment at each stage)
23. **Microservices** → Specialized departments (focused teams rather than one monolithic org)

### Cloudflare-Specific Concepts

24. **Workers** → Distributed workforce (code runs everywhere, close to users)
25. **Pages** → Auto-publishing print shop (git push triggers automatic global deployment)
26. **R2 Storage** → Warehouse with no exit fees (object storage without egress charges)
27. **Durable Objects** → Persistent room (stateful execution contexts at the edge)
28. **Zaraz** → Backstage crew (third-party scripts run offstage, not on your site)

### When Creating New Metaphors

Follow these guidelines:

**1. Root in familiar tech concepts**
- Build on experiences readers likely have (using apps, websites, file systems)
- Prefer tech-adjacent over everyday objects (library over household item)

**2. Ensure 1:1 concept mapping**
- Key aspects of metaphor should align with the technical concept
- Core mechanism should be analogous, not just superficially similar

**3. Acknowledge limitations**
- Explicitly state where metaphor breaks down
- Don't oversell the analogy—it's a starting point for understanding

**4. Test for clarity**
- Does this make the concept clearer or create new confusion?
- Would a beginner understand? Would an expert find it accurate?

**Example of good metaphor creation:**

**Concept to explain:** Cache invalidation

**Process:**
1. What's the real-world analog? → Library returning books to stacks after a period
2. What problem does this solve? → Keeping cached content fresh when source updates
3. What would happen without it? → Serving stale, outdated content forever
4. Can I demonstrate with a story? → "Like a library reserve desk holding a book for only 24 hours before returning it to the main stacks for the next update"

**Resulting metaphor:**
```markdown
Cache invalidation is like a library's reserve desk return policy. 
Popular books stay at the front desk for quick access, but after 
24 hours, they return to the main stacks. This ensures the reserve 
desk has the latest edition, not a permanently outdated copy.

**Where this breaks down:** Unlike physical books with clear "editions," 
digital content can change continuously. Cache invalidation needs more 
sophisticated rules than simple time-based returns.
```

---

**Document Version:** 2.0  
**Last Updated:** February 2026  
**License:** MIT
