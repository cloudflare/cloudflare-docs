# ELI5 Skill: Extended Examples Reference

Detailed patterns, examples, and templates referenced by SKILL.md.

**Purpose:** This file contains verbose examples and detailed patterns that would make SKILL.md too large. Reference sections below when you need detailed guidance or examples.

---

## Table of Contents

1. [Content Type-Specific Patterns](#1-content-type-specific-patterns) - Full before/after examples for each content type
2. [Simplification Principles](#2-simplification-principles) - Detailed writing guidelines
3. [Output Format Templates](#3-output-format-templates) - Structure and formatting examples
4. [Suggestions for Enhancement Examples](#4-suggestions-for-enhancement) - Line-specific recommendation examples

---

## 1. Content Type-Specific Patterns

## Content Type-Specific Patterns

Once content type is detected and validated, I apply type-specific simplification patterns for optimal results.

### Overview Page Simplification

**Purpose:** Help users quickly understand what a product/feature is and decide if they need it.

**Required Elements:**
- Opening benefit statement (what problem this solves)
- Problem/Solution/Benefit structure
- "Perfect for" self-identification section
- Quick start link
- Technical architecture separated to bottom

**Analysis Focus:**
- Does opening paragraph answer "what" and "why"?
- Are features explained with benefits, not just descriptions?
- Is there a clear call-to-action?
- Are technical terms defined or separated?

**Simplification Approach:**

1. **Lead with benefits** - Convert technical descriptions to value propositions
2. **Problem framing** - Start with the challenge users face
3. **Feature → Benefit conversion** - Transform feature lists to outcome statements
4. **Self-identification** - Add "Perfect for" with user scenarios
5. **Separate technical details** - Move architecture to collapsible sections

**Pattern Example:**

❌ **Before (Technical-first):**
```markdown
## Product X

Product X is a distributed edge computing platform utilizing V8 
isolates for serverless code execution with sub-millisecond cold 
start performance.

Features:
- Global anycast network deployment
- Automatic scaling and load distribution
- Pay-per-request pricing model
```

✅ **After (Benefit-first):**
```markdown
## Product X

Run code worldwide without managing servers. Deploy in seconds, 
scale automatically, pay only for what you use.

**What problem it solves:**
Maintaining global infrastructure is expensive and complex. Product X 
runs your code in 300+ cities automatically, handling all the 
infrastructure for you.

**Perfect for:**
- Applications needing fast global performance
- Teams wanting to skip server management
- Projects with variable traffic (scale from zero to millions)

[Get started in 5 minutes →]

---

**For technical users:** Built on V8 isolates with global anycast 
deployment. [Architecture details →]
```

---

### Concept Page Simplification

**Purpose:** Build understanding of WHY something works the way it does.

**Required Elements:**
- Opening analogy or visual (accessible to all)
- Plain language definition
- "Why it matters" business value
- How it works (simplified explanation)
- Real-world use cases (3-5 specific scenarios)
- Technical details for advanced users (separated)

**Analysis Focus:**
- Is there an analogy early in the content?
- Does it explain WHY before HOW?
- Are use cases concrete and realistic?
- Are technical details clearly separated?

**Simplification Approach:**

1. **Start with analogy** - Tech-adjacent comparison for mental model
2. **Plain English definition** - What it is without jargon
3. **Value first** - Why it matters before how it works
4. **Layered explanation** - Simple → detailed → technical
5. **Concrete examples** - Real scenarios, not abstract concepts

**Pattern Example:**

❌ **Before (Technical-only):**
```markdown
## Rate Limiting

Rate limiting implements token bucket algorithms to control request 
throughput based on configurable parameters including burst size and 
refill rate. Requests exceeding limits receive 429 status codes.
```

✅ **After (Layered explanation):**
```markdown
## Rate Limiting

**Think of it like:** A nightclub with maximum capacity. Even if 
1,000 people want to enter at once, you only let a controlled number 
in at a time to keep things manageable.

**What it is:**
Rate limiting controls how many requests can hit your website in a 
given time period. Without it, a sudden spike—whether from real 
users or attackers—could overwhelm your server.

**Why you need it:**
- Prevents DDoS attacks from taking your site down
- Stops bots from scraping your content
- Ensures fair usage across all users
- Keeps infrastructure costs predictable

**How it works:**
You set a rule like "100 requests per minute per IP address." When 
someone exceeds this limit, we block additional requests until the 
time window resets.

**Real scenarios:**
- E-commerce site during Black Friday preventing bot purchases
- API preventing scraping of product catalog
- Forum preventing spam post flooding

---

**For technical users:** Implements token bucket algorithm with 
configurable burst size and refill rates. Returns 429 status with 
Retry-After header. [Implementation details →]
```

---

### How To Page Simplification

**Purpose:** Help users successfully accomplish specific tasks.

**Required Elements:**
- Context (what this accomplishes, why you'd do it)
- Prerequisites listed upfront
- Expected outcome stated
- Time estimate (if non-trivial)
- Dashboard path (UI-focused, detailed steps)
- API/CLI path (code-focused, in collapsible section)
- Verification steps
- Common issues and troubleshooting

**Analysis Focus:**
- Is context provided before steps?
- Are prerequisites clearly stated?
- Is there both a Dashboard and API path?
- Are verification steps included?
- Are common pitfalls addressed?

**Simplification Approach:**

1. **Add context** - What's accomplished and why
2. **State prerequisites** - What must be true before starting
3. **Multi-path instructions** - Dashboard AND API/CLI options
4. **Annotate steps** - Add notes for confusing points
5. **Include verification** - How to confirm it worked
6. **Address pitfalls** - Common issues encountered

**Pattern Example:**

❌ **Before (Steps-only):**
```markdown
## Enable Feature

1. Navigate to Settings
2. Click Security
3. Toggle feature on
4. Save changes
```

✅ **After (Contextual multi-path):**
```markdown
## Enable Feature

**What this does:** Protects your site from [specific threat] by 
[specific mechanism].

**Time required:** ~2 minutes  
**Prerequisites:** Admin access to your account

**What happens:** After enabling, all incoming requests will be 
[specific behavior]. You'll see results in Analytics within 5 minutes.

### Via Dashboard

1. Log into your dashboard at dash.example.com
2. Select your site from the list
3. In the left sidebar, click **Security**
4. Find **Feature Name** and toggle it **On**
5. Click **Save Changes**

💡 **Note:** Changes take effect immediately, but analytics may take 
5 minutes to update.

### Via API

<details>
<summary>Show API example</summary>

```bash
curl -X PATCH "https://api.example.com/v1/settings" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"feature_enabled": true}'
```

**Response:**
```json
{
  "success": true,
  "result": {
    "feature_enabled": true,
    "updated_at": "2026-02-09T10:30:00Z"
  }
}
```

[Full API documentation →]

</details>

## Verify It's Working

1. Visit your site in a new browser tab
2. Open browser Developer Tools (F12)
3. Check the Network tab for [specific header/behavior]
4. You should see [expected result]

## Troubleshooting

**Problem:** Feature doesn't seem to be active  
**Solution:** Clear your browser cache and wait 5 minutes for 
propagation. Still not working? Check that [prerequisite].
```

---

### Reference Page Simplification

**Purpose:** Provide comprehensive technical details accessibly.

**Required Elements:**
- Opening context ("When you'd use this")
- Common scenarios upfront
- Use-case organization (not alphabetical)
- Two-tier descriptions (plain English + technical spec)
- Practical examples for each item
- Real usage scenarios

**Analysis Focus:**
- Is content organized by use case or alphabetically?
- Are descriptions both plain and technical?
- Are practical examples included?
- Is there context about when to use options?

**Simplification Approach:**

1. **Add opening context** - When you'd reference this section
2. **Reorganize by use case** - Group by purpose, not A-Z
3. **Two-tier descriptions** - Plain explanation + technical spec
4. **Add examples** - Real usage with expected results
5. **Include "when to use"** - Decision guidance

**Pattern Example:**

❌ **Before (Alphabetical specs-only):**
```markdown
## Cache Headers

**Cache-Control:** Controls caching. Values: public, private, 
no-cache, max-age=seconds

**Expires:** HTTP date for expiration

**Pragma:** Legacy directive. Value: no-cache
```

✅ **After (Use-case organized with examples):**
```markdown
## Cache Headers Reference

**When to use:** Control how long content stays cached and who can 
cache it.

### Common Scenarios

**Scenario 1:** Static assets (images, CSS, JS) → Cache for 1 year  
**Scenario 2:** Blog posts → Cache for 1 hour  
**Scenario 3:** User dashboards → Never cache

---

## Headers by Purpose

### Long-Term Caching (Static Assets)

#### `max-age=31536000` (1 year)

**What it does:** Caches content for 1 year before checking for updates

**When to use:** Files that never change, like `logo-v2.png` or 
`style.abc123.css` with version hash in filename

**Technical spec:** Integer, seconds. Range: 0-31536000 (1 year max)

**Example:**
```http
Cache-Control: public, max-age=31536000, immutable
```

**Result:** First visitor downloads the file. For the next year, all 
visitors get the cached version with zero origin requests.

---

#### `immutable`

**What it does:** Tells browsers this file will literally never change

**When to use:** Combine with `max-age` for versioned assets 
(filename includes hash/version number)

**Technical spec:** No value. Presence activates directive.

**Example:**
```http
Cache-Control: public, max-age=31536000, immutable
```

**Result:** Browsers won't revalidate even on refresh. Perfect for 
`style.abc123.css` where hash changes when content changes.

---

### Frequently Updated Content

#### `max-age=3600` (1 hour)

**What it does:** Caches content for 1 hour

**When to use:** Content that updates occasionally but doesn't need 
to be real-time, like blog posts or product pages

**Technical spec:** Integer, seconds

**Example:**
```http
Cache-Control: public, max-age=3600
```

**Result:** Content stays cached for 1 hour. After expiration, next 
request checks origin for updates.

---

#### `no-cache`

**What it does:** Always check with origin before using cached version

**When to use:** Content that changes frequently but can still be 
cached briefly (shopping cart, personalized pages)

**Technical spec:** No value. Presence activates.

**Example:**
```http
Cache-Control: no-cache
```

**Result:** Every request checks origin via If-Modified-Since or 
ETag. If nothing changed, serves cached version (304 response).

---

### Never Cache

#### `private, no-store`

**What it does:** Prevents any caching

**When to use:** Sensitive data (account info, payment details) or 
highly dynamic content (real-time scores, live chat)

**Technical spec:** Combine both directives

**Example:**
```http
Cache-Control: private, no-store
```

**Result:** Every request fetches fresh from origin. Nothing cached 
anywhere.
```

---

### Tutorial Page Simplification

**Purpose:** Teach through real-world application, building confidence progressively.

**Required Elements:**
- "What you'll build" with specific example
- "Who this is for" with prerequisites
- Time estimate
- "What you'll learn" key concepts
- Progressive complexity (minimal → full → polished)
- Code block explanations ("What this does")
- Troubleshooting section
- Optional enhancements clearly marked

**Analysis Focus:**
- Does it start with "What you'll build"?
- Are prerequisites clearly stated?
- Is every code block explained?
- Does complexity build progressively?
- Are common issues addressed?

**Simplification Approach:**

1. **Set expectations** - What, who, time, learning outcomes
2. **Start minimal** - Prove concept with simplest version
3. **Progressive enhancement** - Add features one at a time
4. **Explain every code block** - What it does and why
5. **Troubleshoot** - Common issues students encounter
6. **Mark optional** - Clearly separate enhancements from core

**Pattern Example:**

❌ **Before (Code-dump):**
```markdown
## Build X

```javascript
const handler = async (req) => {
  const url = new URL(req.url)
  return new Response('Hello')
}
addEventListener('fetch', e => e.respondWith(handler(e.request)))
```
```

✅ **After (Explained progression):**
```markdown
## Build a URL Shortener

### What You'll Build

A working URL shortener that redirects short links to long URLs, 
stores mappings, and tracks click analytics.

**Live example:** `short.example.com/github` → `github.com/cloudflare`

### Who This Is For

Developers comfortable with JavaScript. No prior experience with 
Workers needed, but you should understand:
- HTTP requests and responses
- JSON data format
- Basic async/await

### Time Required

30-45 minutes

### What You'll Learn

- How to handle requests at the edge
- Storing data in key-value storage
- Building a simple API
- Deploying code globally in seconds

---

## Step 1: Create Your First Worker

Let's start with the absolute minimum—a Worker that responds to 
requests:

```javascript
// Entry point: runs for every HTTP request
addEventListener('fetch', event => {
  // Pass request to our handler function
  event.respondWith(handleRequest(event.request))
})

// Handler: processes the request and returns a response
async function handleRequest(request) {
  return new Response('Your URL shortener will live here!', {
    headers: { 'content-type': 'text/plain' }
  })
}
```

**What this code does:**

- **Line 2:** Listens for incoming HTTP requests
- **Line 4:** Calls `handleRequest` to process each request
- **Line 8-12:** Returns a simple text response

**Test it:**

1. Deploy this code to Workers
2. Visit your Worker's URL
3. You should see: "Your URL shortener will live here!"

This proves your Worker is running. Now let's add actual functionality...

---

## Step 2: Add URL Parsing

Now let's make it recognize short codes in the URL:

```javascript
async function handleRequest(request) {
  // Extract the pathname from the URL
  // Example: https://short.example.com/github → "/github"
  const url = new URL(request.url)
  const shortCode = url.pathname.slice(1) // Remove leading "/"
  
  // For now, just echo back the short code
  return new Response(`You requested: ${shortCode}`, {
    headers: { 'content-type': 'text/plain' }
  })
}
```

**What changed:**

- **Line 3-4:** Parse the full URL to extract the path
- **Line 5:** Get the short code (everything after the `/`)
- **Line 8:** Echo it back so we can test

**Test it:**

1. Visit `your-worker.dev/test`
2. You should see: "You requested: test"
3. Try `your-worker.dev/abc123` → "You requested: abc123"

Now we can detect what short code someone's requesting...

---

## Step 3: Store URL Mappings

[Continue building progressively...]

---

## Common Issues

**Problem:** "Error: Exceeded CPU limit"

**Cause:** Your Worker is doing too much computation in a single request

**Solution:** Workers have a 50ms CPU time limit. Move heavy processing 
to background tasks or use Durable Objects for longer operations.

**Problem:** "KV data not updating"

**Cause:** KV is eventually consistent and may take 60 seconds to 
propagate globally

**Solution:** For testing, add a cache-busting parameter (`?v=2`) or 
wait 60 seconds between writes and reads.

---

## Optional Enhancements

Want to take this further? Here are some ideas:

**Add Click Analytics** (Medium difficulty)
- Store click count in KV
- Increment on each redirect
- Create stats endpoint

**Custom Short Codes** (Easy)
- Let users choose their short code
- Check if code is already taken
- Return error if unavailable

**Expiring Links** (Medium)
- Store expiration timestamp
- Check before redirecting
- Return 404 if expired
```

---

## Simplification Principles

---

## 2. Simplification Principles

## Simplification Principles

### Plain Language Guidelines

**Sentence Structure:**

✅ **One idea per sentence** when possible
- "Webhooks send notifications. This happens when events occur."
- Not: "Webhooks, which are HTTP callbacks, send notifications containing event data to your specified endpoint when certain events occur on the platform."

✅ **Active voice** over passive
- "The system sends a notification" 
- Not: "A notification is sent by the system"

✅ **Concrete nouns** over abstract
- "Your endpoint receives a POST request"
- Not: "The interface abstraction layer facilitates data transmission"

✅ **Common words** when equally accurate
- "Use" not "utilize"
- "Help" not "facilitate"
- "Start" not "initiate"

✅ **Short paragraphs** (3-4 sentences maximum)
- Easier to scan and digest
- Provides visual breathing room
- Maintains focus on single topic

**Terminology Handling:**

**Always define on first use:**
```markdown
An API (Application Programming Interface) defines how programs 
can request and exchange data...
```

**Expand acronyms:**
```markdown
CDN (Content Delivery Network)
CI/CD (Continuous Integration/Continuous Deployment)
HMAC (Hash-based Message Authentication Code)
```

**Provide context for technical terms:**
```markdown
Not: "Configure the webhook endpoint."
But: "A webhook endpoint is the URL where we'll send notifications. 
Configure it to point to your server."
```

### Metaphor Creation (Tech-Adjacent)

**What makes a good metaphor:**

1. **Rooted in familiar technology** - Build on concepts readers likely know
2. **1:1 concept mapping** - Key aspects align accurately
3. **Clarifies, doesn't confuse** - Simpler than original concept
4. **Acknowledges limitations** - States where metaphor breaks down

**Metaphor Library (Core Examples):**

#### 1. API → Restaurant Menu

```markdown
**Think of It Like:**
An API is like a restaurant menu. The menu shows you what dishes 
are available (endpoints), what customizations you can request 
(parameters like "no onions" or "extra spicy"), and what you'll 
receive (the response - your meal). You don't need to know how the 
kitchen operates or what cooking techniques they use. You just order 
from the menu, and the kitchen handles the rest.

**Where this breaks down:**
Unlike a restaurant where you wait for your food, API responses are 
usually near-instantaneous. Also, APIs can fail (kitchen is out of 
ingredients), requiring error handling.
```

#### 2. Caching → Library Reserve Desk

```markdown
**Think of It Like:**
Caching is like a library's reserve desk. Popular books are kept at 
the front desk for quick access instead of requiring a trip to the 
stacks. The first person requesting a book triggers the librarian to 
fetch it from the stacks, but then it stays at the reserve desk so 
subsequent readers can grab it immediately.

**Where this breaks down:**
Caches expire (books eventually return to the stacks), and cache 
invalidation (deciding when to return books) is more complex than 
the metaphor suggests.
```

#### 3. Load Balancing → Grocery Checkout Lanes

```markdown
**Think of It Like:**
Load balancing is like grocery store checkout lanes. Instead of 
everyone lining up at a single register (which would create a huge 
wait), customers are distributed across multiple lanes. If one lane 
gets too long or a register breaks down, the store can redirect 
people to other lanes.

**Where this breaks down:**
Load balancers are more intelligent than checkout lane selection—they 
know which servers are healthy, how busy they are, and can route 
based on sophisticated algorithms.
```

#### 4. Webhooks → Doorbell Notifications

```markdown
**Think of It Like:**
A webhook is like a doorbell notification. Instead of constantly 
checking your front door to see if someone arrived (polling), the 
doorbell alerts you the moment someone presses it (push notification). 
You only respond when there's actually something to respond to.

**Where this breaks down:**
Doorbells are instantaneous, while webhooks have some latency due to 
network transmission. Also, webhooks can fail if your server is down 
(like a broken doorbell).
```

#### 5. Authentication → Building Security Badge

```markdown
**Think of It Like:**
Authentication is like a building security badge system. You present 
your badge (credentials) when entering. The system verifies you are 
who you claim to be (authentication), then checks what floors you're 
allowed to access (authorization). Different badges have different 
access levels.

**Where this breaks down:**
Digital authentication often uses time-limited tokens (like a badge 
that expires), and can verify identity through multiple methods 
(password + fingerprint), which isn't common with physical badges.
```

#### 6. Rate Limiting → Freeway Metering Lights

```markdown
**Think of It Like:**
Rate limiting is like freeway on-ramp metering lights. Instead of 
letting everyone merge at once (causing congestion), the lights 
control how many cars enter per minute. This keeps traffic flowing 
smoothly on the main freeway. If you arrive too fast, you wait at 
the red light.

**Where this breaks down:**
Rate limits are often user-specific (you get your own limit), not 
shared like a metering light. Also, rate limits reset on schedules 
(every hour, every day), unlike continuous traffic flow.
```

#### 7. Database Indexing → Book Index

```markdown
**Think of It Like:**
A database index is like the index at the back of a textbook. Instead 
of reading every page to find mentions of "webhooks," you check the 
index, which tells you exactly which pages to look at. The index 
takes up extra space, but makes searching dramatically faster.

**Where this breaks down:**
Database indexes need updating when data changes (like keeping a 
book index current as you add pages), and choosing which fields to 
index involves tradeoffs between search speed and write speed.
```

#### 8. CDN → Local Warehouses

```markdown
**Think of It Like:**
A CDN (Content Delivery Network) is like having local warehouses 
instead of shipping everything from one central warehouse. When 
someone in California orders a product, it ships from the California 
warehouse (faster delivery). When someone in New York orders, it 
ships from New York. Same product, closer source.

**Where this breaks down:**
Unlike physical warehouses with unique inventory, CDNs store copies 
of the same content in many locations. Updates need to propagate to 
all locations (cache invalidation), which has no physical warehouse 
equivalent.
```

#### 9. Containers → Shipping Containers

```markdown
**Think of It Like:**
Software containers are like shipping containers. Before shipping 
containers existed, moving goods required different methods for 
different types of cargo. Shipping containers standardized this—put 
anything inside a standard container, and it can go on any ship, 
truck, or train. Software containers work the same way: package your 
application and its dependencies, and it runs anywhere.

**Where this breaks down:**
Shipping containers physically isolate cargo, while software 
containers share the same operating system kernel. Also, you can run 
thousands of software containers on one machine, unlike physical 
containers.
```

#### 10. Environment Variables → Settings Panel

```markdown
**Think of It Like:**
Environment variables are like your application's settings panel—
configuration values that change behavior without modifying code. 
Just like you might set your phone to dark mode or adjust notification 
preferences, environment variables let you configure database URLs, 
API keys, or feature flags without rewriting your application.

**Where this breaks down:**
Environment variables are usually set before the application starts 
(not changed while running), and they're text-based rather than UI 
toggles. They're also specific to each deployment environment (dev, 
staging, production).
```

**Creating New Metaphors:**

When you encounter a concept not in this library, create a new metaphor by:

1. Identifying the core mechanism or purpose
2. Finding a tech-adjacent analog readers likely understand
3. Mapping key concepts 1:1
4. Testing: Does this clarify or create new confusion?
5. Stating where the metaphor breaks down

### Why-Focused Explanations

**Always structure content in this order:**

**1. The Problem (Why)**
```markdown
When building applications, you often need to know when something 
happens on another platform—like when a payment completes, a file 
finishes uploading, or a deployment succeeds. Constantly checking 
for updates (polling) wastes resources and creates delays.
```

**2. The Solution (What)**
```markdown
Webhooks solve this by pushing notifications to you. When an event 
happens, we immediately send a message to your server with the details.
```

**3. The Value (Why It Matters)**
```markdown
This means:
- Your application responds in real-time instead of polling
- You save resources (no constant checking)
- Users get faster updates
- You only process events that actually happened
```

**4. The Use Cases (When)**
```markdown
Common scenarios:
- Triggering workflows when deployments complete
- Updating your database when content changes
- Sending notifications when payments are processed
- Syncing data between systems automatically
```

**5. The Implementation (How)**
```markdown
To set up a webhook:
1. Create an endpoint URL where we'll send notifications
2. Configure which events you want to receive
3. Verify requests are from us (using signatures)
4. Process the event data and take appropriate action
```

This order respects how humans learn: **purpose before mechanism**.

### Multi-Audience Layering

Serve different knowledge levels simultaneously:

**Structure for Mixed Audiences:**

```markdown
**In Plain Language:**
[One sentence anyone can grasp]

**What It Is:**
[2-3 paragraphs building from basics, no jargon assumed]

**Why It Matters:**
[Benefits applicable to all readers]

**When You'd Use This:**
[Scenarios showing practical value]

**Think of It Like:**
[Metaphor for conceptual understanding]

---

**For developers:**
Technical implementation details, API references, code examples

**For non-technical readers:**
Focus on outcomes, when to involve technical help, business impact
```

**Example in Practice:**

```markdown
## Webhook Signature Verification

---

## 3. Output Format Templates

## Output Format & Structure

### Generated File Template

When I simplify documentation, I create a `.eli5.md` file with this structure:

```markdown
# ELI5 Simplified: [Original Doc Name]

**Original:** `[file path]`  
**Simplified on:** [timestamp]  
**Sections simplified:** [list of sections]

---

## 📋 Simplification Overview

**What was confusing:**
- [Pattern 1 - e.g., Heavy acronym use without expansion]
- [Pattern 2 - e.g., Assumed understanding of HTTP protocols]
- [Pattern 3 - e.g., Jumped to implementation without explaining purpose]

**Approach taken:**
- [Strategy 1 - e.g., Added one-sentence summaries for each concept]
- [Strategy 2 - e.g., Expanded all acronyms on first use]
- [Strategy 3 - e.g., Added "Why this matters" to each section]
- [Strategy 4 - e.g., Created tech-adjacent metaphors for abstract ideas]

---

## Section: [Original Heading]

### 📄 Original Content

```
[Exact text from source, formatting preserved]
```

### ⚠️ Issues Identified

**Jargon:**
- `[term]` - [Why problematic, what's assumed]
- `[term]` - [Why problematic, what's assumed]

**Assumptions:**
- [What's assumed - e.g., "Assumes reader understands REST principles"]
- [What's assumed - e.g., "References 'the config file' without showing where"]

**Unclear Logic:**
- [Issue - e.g., "Jumps from concept to code without transition"]
- [Issue - e.g., "No explanation of why this approach was chosen"]

### ✨ Simplified Version

**In Plain Language:**  
[One crisp sentence capturing the essence without jargon]

**What It Is:**  
[2-3 paragraphs building understanding from basics. Define terms. 
Explain concepts. Build progressively. No jargon assumed.]

**Why It Matters:**  
[Value proposition and concrete benefits]

- **Benefit 1:** [Specific, concrete impact]
- **Benefit 2:** [Specific, concrete impact]
- **Benefit 3:** [Specific, concrete impact]

**When You'd Use This:**  

- **Scenario 1:** [Realistic use case with context]
  - Example: "When building a chat application that needs real-time message delivery..."

- **Scenario 2:** [Realistic use case with context]
  - Example: "When synchronizing inventory between your store and warehouse..."

- **Scenario 3:** [Realistic use case with context]
  - Example: "When triggering post-deployment tasks like cache clearing..."

**Think of It Like:**  
[Tech-adjacent metaphor with detailed explanation]

[Full metaphor explanation, making connections explicit]

**Where this metaphor breaks down:**  
[Acknowledge limitations honestly]

**Common Pitfalls:**  

- **Pitfall:** [What people commonly misunderstand]  
  **Reality:** [Correction with explanation]

- **Pitfall:** [Common mistake]  
  **Reality:** [How it actually works]

**Related Concepts:**  
[Connections to things readers might already know]

- "If you've used [familiar concept], this works similarly..."
- "This is the technical equivalent of [known idea]..."
- "Related to [concept], but differs in that..."

---

[Repeat structure for each section]

---

## 📊 Summary & Recommendations

**Key Improvements Made:**

1. **[Improvement category]**
   - [Specific change made]
   - [Impact on clarity]

2. **[Improvement category]**
   - [Specific change made]
   - [Impact on clarity]

3. **[Improvement category]**
   - [Specific change made]
   - [Impact on clarity]

**Patterns Noticed:**

[Meta-analysis of what made this documentation difficult]

- **Jargon overload:** [Details]
- **Assumption patterns:** [Details]
- **Structure issues:** [Details]
- **Missing context:** [Details]

**Recommendations for Future Writing:**

- [Suggestion 1 - e.g., "Define acronyms on first use"]
- [Suggestion 2 - e.g., "Start each section with 'why' before 'how'"]
- [Suggestion 3 - e.g., "Include at least one real-world use case per concept"]
- [Suggestion 4 - e.g., "Add metaphors for abstract concepts"]

---

## ✅ Next Steps

Review complete! What would you like to do next?

1. **Suggest additional improvements** - Identify other sections or refinements
2. **Create a PR** - Integrate these changes into the original documentation
3. **Refine specific sections** - Focus on particular areas that need more work
4. **Apply changes to original** - Update the source file with simplified content
5. **Keep as reference** - Use this comparison for review/learning only

Let me know how you'd like to proceed!
```

### File Naming Convention

**Input:** `path/to/documentation.md`  
**Output:** `path/to/documentation.eli5.md`

**Input:** `api-reference.mdx`  
**Output:** `api-reference.eli5.mdx`

The `.eli5` suffix clearly indicates this is a simplified version while preserving the original format extension.

### Suggestions for Enhancement Section

After the main simplification and summary, I include a **"Suggestions for Enhancement"** section that identifies specific opportunities to improve accessibility further.

**Format:**

Each suggestion includes:
- **Line reference:** Specific location in the original document
- **Section name:** What part of the doc this applies to
- **Current approach:** What's there now
- **Suggested enhancement:** What could be added
- **Why this helps:** Accessibility benefit explained
- **Implementation:** Concrete code/example showing the enhancement

**Example:**

```markdown
---

## 📝 Suggestions for Enhancement

---

## 4. Suggestions for Enhancement

## 📝 Suggestions for Enhancement

These suggestions show where additional patterns could improve accessibility:

### Line 45-52: Add Multi-Path Instructions

**Location:** Section "Enable Always Use HTTPS"  
**Current approach:** Dashboard-only instructions provided

**Suggested enhancement:** Add API path for technical users who prefer code

**Why this helps:**
- Serves both UI users and developers with their preferred method
- Technical users can automate the process via API
- Provides complete coverage for mixed audiences

**Implementation:**
```markdown
### Via API

<details>
<summary>Show API example</summary>

\`\`\`bash
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/always_use_https" \\
  -H "Authorization: Bearer {token}" \\
  -d '{"value":"on"}'
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "result": {
    "id": "always_use_https",
    "value": "on"
  }
}
\`\`\`

</details>
\`\`\`

---

### Line 78-85: Move Technical Details to Collapsible

**Location:** Section "How TLS Encryption Works"  
**Current approach:** Technical cipher suite details inline with main explanation

**Suggested enhancement:** Move advanced technical details to collapsible section

**Why this helps:**
- Beginners get the simple explanation without being overwhelmed
- Experts can expand for full technical depth
- Maintains clear progressive disclosure
- Reduces cognitive load for those learning basics

**Implementation:**
\`\`\`markdown
## How TLS Encryption Works

Your connection is encrypted using industry-standard TLS 1.3 protocol, 
ensuring no one can intercept your data in transit.

<details>
<summary>For technical users: Cipher suite details</summary>

We support TLS 1.3 with modern AEAD cipher suites including:
- TLS_AES_128_GCM_SHA256
- TLS_AES_256_GCM_SHA384
- TLS_CHACHA20_POLY1305_SHA256

Perfect forward secrecy via X25519 key exchange. [Full TLS configuration →]

</details>
\`\`\`

---

### Line 120-122: Add Recommended Default

**Location:** Encryption mode options comparison  
**Current approach:** Lists all options (Off, Flexible, Full, Full Strict) equally

**Suggested enhancement:** Call out recommended default for most users

**Why this helps:**
- Reduces decision paralysis for uncertain users
- Provides a safe starting point
- Guides users toward best security practices
- Acknowledges that not all users can evaluate tradeoffs

**Implementation:**
\`\`\`markdown
### Encryption Modes

**Recommended for most sites:** Full (Strict)

Provides maximum security by validating your origin server's 
certificate. This is the best option if your server has a valid SSL 
certificate installed.

#### Other Options

- **Off:** No encryption (Not recommended - only use for testing)
- **Flexible:** Encrypts visitor-to-Cloudflare only (Use if your 
  server doesn't have SSL)
- **Full:** Encrypts entire path but doesn't validate certificate
- **Full (Strict):** Maximum security with certificate validation ✅
\`\`\`

---

### Line 195-200: Add Concrete Use Case

**Location:** Feature description section  
**Current approach:** Abstract benefit statement without example

**Suggested enhancement:** Add realistic use case showing feature in action

**Why this helps:**
- Makes abstract benefits concrete and relatable
- Helps users visualize how they'd use this
- Provides "aha moment" of recognition
- Increases confidence in feature relevance

**Implementation:**
\`\`\`markdown
**Why you need it:**
Prevents attackers from overwhelming your site with fake traffic.

**Real scenario:**
An e-commerce site during Black Friday gets hit by bots trying to 
buy limited inventory. DDoS protection automatically filters out 
the bot traffic, letting real customers complete their purchases 
while the attack is absorbed across Cloudflare's network.

Without protection, the site would crash within minutes, losing 
thousands in sales.
\`\`\`
```

**When to include suggestions:**

Include this section when:
- Multi-path opportunities exist (Dashboard + API)
- Technical details could be collapsed
- Missing recommended defaults
- Abstract concepts need concrete examples
- Progressive disclosure could be improved
- Common decision points lack guidance

**Placement:**

The Suggestions section appears:
- After the "Summary & Recommendations" section
- Before the "Next Steps" section
- Clearly separated with heading and explanation

This makes suggestions actionable without cluttering the main before/after comparison.

---

## Important Guidelines

### Quality Checklist

Before finalizing any simplified content, verify:

- [ ] **Technical accuracy maintained** - No facts changed or oversimplified
- [ ] **One-sentence summary** captures essence without jargon
- [ ] **Jargon identified** and either explained or replaced
- [ ] **Assumptions stated** explicitly in Issues section
- [ ] **"Why" comes before "what"** in explanations
- [ ] **Use cases are realistic** and practical
- [ ] **Metaphor has 1:1 mapping** of key concepts
- [ ] **Metaphor limitations** acknowledged
- [ ] **Common pitfalls** are genuinely common (not invented)
- [ ] **Tone is professional** and respectful
- [ ] **No condescending language** ("simply," "just," "obviously")
- [ ] **Reader intelligence** respected throughout

### Tone Rules

**Never use these condescending phrases:**

❌ "Simply configure the endpoint..."  
❌ "Just add the webhook URL..."  
❌ "Obviously, you'll need to..."  
❌ "Clearly, this requires..."  
❌ "As everyone knows..."  
❌ "It's easy to..."  
❌ "All you have to do is..."  

**Use these respectful alternatives:**

✅ "To configure the endpoint, you'll need to..."  
✅ "Add the webhook URL by..."  
✅ "This requires..."  
✅ "Here's how this works..."  
✅ "This involves..."  
✅ "The process is..."  

### Accuracy Is Non-Negotiable

**Good simplification:**
```markdown
Webhooks send HTTP POST requests to your endpoint URL whenever 
specified events occur. Think of it as a notification system where 
we call your server instead of you constantly checking ours.
```
*Accurate, clear, uses metaphor effectively*

**Bad simplification:**
```markdown
Webhooks let programs talk to each other.
```
*Too vague, loses important details, not actually helpful*

**When complex accuracy is needed:**

Use progressive disclosure:

```markdown
**Simplified:** Rate limiting controls how many requests you can 
make in a time period, like 100 requests per minute.

**More precisely:** Rate limits apply per API key and reset on a 
sliding window. If you hit the limit, you'll receive a 429 status 
code with a Retry-After header indicating when you can try again.
```

### Handling Different Content Types

#### API Documentation

Focus on:
- What the endpoint does (purpose)
- When you'd use it (scenarios)
- What you send (parameters explained)
- What you get back (response explained)
- Common use cases
- Error handling (what can go wrong)

**Add value through:**
- Explaining parameter purposes, not just types
- Showing realistic request/response examples
- Clarifying common misunderstandings
- Connecting to real-world workflows

#### Architecture Documentation

Focus on:
- Problem being solved
- Why this approach was chosen
- Tradeoffs made (what was gained/lost)
- When this architecture makes sense
- Alternatives considered

**Add value through:**
- Explaining decision rationale
- Making tradeoffs explicit
- Providing context for choices
- Connecting to business requirements

#### Code Documentation

Focus on:
- What the code accomplishes
- Why it's structured this way
- Key concepts or patterns used
- What to watch out for

**Add value through:**
- Plain-language "reading guides"
- Explaining non-obvious choices
- Clarifying complex logic
- Showing how pieces fit together

## Edge Cases & Handling

### Very Long Documents (>1000 lines)

**Strategy:**

1. **Offer processing options:**
   - "This document has 1,500 lines across 25 sections. How would you like to proceed?"
   - Option A: Process all sections
   - Option B: Focus on specific sections (show list)
   - Option C: Auto-detect most complex sections
   - Option D: Process in chunks (1-10, 11-20, etc.)

2. **Auto-detection logic:**
   - Calculate jargon density (technical terms per 100 words)
   - Count assumption indicators ("as you know," references without explanation)
   - Identify sections with no use cases or "why" statements
   - Prioritize sections with highest complexity scores

3. **Chunk processing:**
   - Process 5-10 sections at a time
   - Generate partial `.eli5.md` files
   - Offer to continue with next chunk

### Already-Clear Content

**When content is already well-written:**

```markdown
## 📋 Simplification Overview

**What was done well:**
- Clear section headings with logical flow
- Terms defined on first use
- Good use of examples
- "Why" explained before "how"

**Minor improvements suggested:**
- Could add a tech-adjacent metaphor for [concept]
- Section 3 could benefit from a concrete use case
- Consider adding "common pitfalls" to section 5

**Overall assessment:**
This documentation is already quite accessible. The suggestions above 
are minor enhancements rather than necessary corrections.
```

**Avoid:**
- Adding unnecessary verbosity
- Creating problems that don't exist
- Over-explaining clear content
- Padding just to have something to say

### Highly Technical Content

**Strategy:**

1. **Maintain accuracy first**
   - Never oversimplify to the point of incorrectness
   - Keep technical terms when they're important
   - Preserve necessary complexity

2. **Layer explanations**
   ```markdown
   **High-level:** [What it accomplishes]
   **How it works:** [Simplified mechanism]
   **Technical details:** [Precise specifications]
   ```

3. **Add explanatory prose**
   - Don't change technical specs
   - Add plain-language explanations alongside
   - Provide "reading guides" for complex sections

4. **Use progressive disclosure**
   - Start with simplest useful explanation
   - Build to full technical detail
   - Make it clear which sections are for whom

### Code-Heavy Documentation

**Strategy:**

1. **Don't oversimplify code itself**
   - Code should remain accurate
   - Don't rewrite functional code for simplicity
   - Preserve technical correctness

2. **Add explanatory context**
   ```markdown
   **What this code does:**
   [Plain-language explanation]

   **Why it's structured this way:**
   [Architectural rationale]

   **Key points to understand:**
   - [Important concept 1]
   - [Important concept 2]

   ```python
   [Original code, unchanged]
   ```
   ```

3. **Create "reading guides"**
   - Walk through complex code step-by-step
   - Explain what each section accomplishes
   - Highlight non-obvious choices

### MDX Files with Components

**Strategy:**

1. **Focus on prose content**
   - Simplify documentation text
   - Leave component code unchanged

2. **Explain component purpose**
   ```markdown
   **What this component does:**
   The <CodeBlock> component displays syntax-highlighted code with 
   copy functionality, making it easier for readers to use the examples.
   ```

3. **Don't explain React/framework details**
   - Unless that's specifically what the doc is about
   - Focus on what the component accomplishes for users
   - Avoid diving into implementation unless relevant

## Future Enhancements

*Documented for future implementation*

### Planned Features

**1. Inline Code Comment Reading**

Support for code files with inline documentation:

```python
# Input: analyze.py
def process_webhook(payload, signature):
    """
    Processes incoming webhook notifications.
    
    Verifies signature, parses payload, triggers handlers.
    """
    # Implementation...
```

**Planned behavior:**
- Extract docstrings and comments
- Simplify technical language in comments
- Add explanatory prose for complex logic
- Generate "code walkthrough" guides

**Supported formats:**
- `.js`, `.ts`, `.tsx` (JavaScript/TypeScript)
- `.py` (Python)
- `.go` (Go)
- `.rb` (Ruby)
- `.java` (Java)

**2. Multi-Format Support**

Beyond Markdown:

- **HTML documentation** - Parse and simplify web-based docs
- **PDF technical papers** - Extract and clarify academic/research content
- **Confluence/Wiki pages** - Simplify internal documentation
- **OpenAPI specs** - Make API specifications more accessible

**3. Automated Complexity Scoring**

Quantitative analysis:

- **Jargon density** - Technical terms per 100 words
- **Readability scores** - Flesch-Kincaid, SMOG index
- **Assumption detection** - Flag phrases indicating assumed knowledge
- **Context gap analysis** - Identify missing "why" and "when" statements

**Auto-prioritization:**
- Sort sections by complexity
- Focus on highest-value simplifications
- Generate complexity reports

**4. Interactive Mode**

Iterative refinement:

- Process section-by-section with user feedback
- Real-time refinement based on input
- Iterative improvement cycles
- A/B testing of different metaphors

## Examples

### Example 1: API Documentation

**Before (Original):**

```markdown
## POST /webhooks

Creates a webhook subscription for edge events.

### Parameters

- `endpoint` (string, required): HTTPS URL
- `events` (array, required): Event types
- `secret` (string, optional): HMAC signing key

### Response

Returns a `webhook` object.
```

**After (Simplified):**

```markdown
### ✨ Simplified Version

**In Plain Language:**
Set up automatic notifications that we'll send to your server whenever 
specific events occur.

**What It Is:**
A webhook subscription tells our system to notify your application 
when certain events happen (like a deployment completing or content 
being published). Instead of your application constantly checking for 
updates (polling), we push notifications to you the moment events occur.

**Why It Matters:**
- **Real-time updates** - Your application responds immediately
- **Resource efficiency** - No wasted API calls checking for changes
- **Reliability** - You never miss an event
- **Automation** - Trigger workflows automatically

**When You'd Use This:**
- **Deployment notifications:** Trigger post-deployment tasks when builds complete
- **Content synchronization:** Update your CMS when content changes
- **Monitoring:** Alert your team when errors occur
- **Integration:** Connect multiple systems to respond to events

**Think of It Like:**
A webhook is like setting up a doorbell notification on your phone. 
Instead of constantly checking your front door camera to see if someone 
arrived (polling), the doorbell alerts you the moment someone presses 
it (push notification). You only respond when there's actually something 
to respond to.

**Where this breaks down:**
Doorbells are instantaneous, while webhooks have small delays due to 
network transmission. Also, webhooks can fail if your server is down 
(like a broken doorbell), so you need retry logic.

**Parameters Explained:**

- **`endpoint`** - The URL where we'll send notifications (your server's 
  address that listens for webhook events). Must use HTTPS for security.

- **`events`** - Which events you want to receive (like `deployment.succeeded` 
  or `content.published`). You choose only the events you care about.

- **`secret`** - Optional security key for verifying notifications actually 
  come from us. We use this to create a signature you can verify.

**Common Pitfalls:**

- **Pitfall:** Thinking webhooks are 100% reliable  
  **Reality:** Network issues or server downtime can cause missed notifications. 
  Implement retry logic and consider periodic polling as a backup.

- **Pitfall:** Not verifying signatures  
  **Reality:** Without signature verification, attackers could send fake 
  webhooks to trigger unauthorized actions.

**Related Concepts:**
If you've used RSS feeds, webhooks work similarly—both push updates to 
you. The difference is webhooks are programmable and work with any type 
of event, not just content updates.
```

### Example 2: Architecture Decision

**Before (Original):**

```markdown
## Edge Deployment Architecture

We've implemented a globally distributed edge architecture utilizing 
V8 isolates for multi-tenant execution with microsecond cold starts 
and automatic geographic distribution.
```

**After (Simplified):**

```markdown
### ✨ Simplified Version

**In Plain Language:**
We run your code on servers located around the world, close to your 
users, making responses nearly instant regardless of where users are.

**What It Is:**
Traditional servers run in specific data centers—if your server is in 
Virginia and your user is in Singapore, every request travels across 
the world and back (adding hundreds of milliseconds). Our edge 
architecture runs your code on servers in hundreds of cities worldwide, 
so requests are handled by the nearest server.

**Why It Matters:**
- **Speed:** Users get responses in 10-50ms instead of 200-500ms
- **Reliability:** If one location fails, others continue serving traffic
- **Scale:** Handles traffic spikes automatically across all locations
- **Simplicity:** You deploy once; we handle global distribution

**When You'd Use This:**
- **Global applications:** Users are distributed worldwide
- **API endpoints:** Need fast response times everywhere
- **Dynamic content:** Content that can't be cached must still be fast
- **High availability:** Can't afford regional outages

**Think of It Like:**
Instead of one central warehouse shipping products nationwide (slow 
delivery to distant customers), you have local warehouses in every major 
city. When someone orders, it ships from their nearest warehouse. Same 
product, faster delivery, handled automatically.

**The Technical Approach:**

We use "V8 isolates"—lightweight execution environments that start in 
microseconds (thousandths of a millisecond). Traditional "serverless" 
functions use containers that take 50-500ms to start. Isolates are 
fast enough that we don't need to keep them warm; they start on-demand 
for each request.

**Why this architecture:**
We evaluated three approaches:

1. **Traditional servers:** Fast but requires manual geographic setup
2. **Container-based serverless:** Globally distributed but slow cold starts
3. **Isolate-based edge:** Global + fast (our choice)

**Tradeoff made:**
Isolates have some limitations compared to full containers (no arbitrary 
system libraries, limited execution time). We accepted these constraints 
for the massive speed improvement.

**Common Pitfalls:**
- **Pitfall:** Assuming it works like traditional servers  
  **Reality:** Stateless execution—no persistent local storage, no background jobs

- **Pitfall:** Expecting Node.js compatibility  
  **Reality:** Implements web standards, not full Node.js APIs

**Related Concepts:**
If you've used CDNs (Content Delivery Networks), this is similar but 
for code execution, not just static files. Like a CDN distributes 
content globally, we distribute code execution globally.
```

## Remember

**Your mission:**
- Make technical concepts accessible
- Maintain technical accuracy
- Respect reader intelligence
- Focus on understanding

**Always include:**
- One-sentence plain language summary
- Clear "why" and "when" explanations
- Tech-adjacent metaphor with limitations
- Common pitfalls with corrections
- Use cases grounding abstract concepts

**Quality standards:**
- Technical accuracy is non-negotiable
- Metaphors must clarify, not confuse
- Tone must be professional and respectful
- No condescending language ever

**Process:**
1. Ask which sections to focus on
2. Identify specific issues (jargon, assumptions, logic, context)
3. Generate complete before/after comparison
4. Prompt for next steps

**Output:**
- Create `.eli5.md` file in same directory
- Include all required elements per section
- Provide actionable recommendations
- Offer clear next-step options

**Philosophy:**
Technical expertise should never be a barrier to understanding. Every 
person deserves clear, accurate, respectful documentation.

---

**For full philosophy and detailed agent guidelines, see:** [agent.md](./agent.md)

**For working examples, see:** [examples/](./examples/)

**License:** MIT  
**Version:** 1.0  
**Last Updated:** February 2026

