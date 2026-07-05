# ELI5 Pattern Library

A reference collection of reusable before/after patterns for simplifying technical documentation.

---

## Purpose

This library provides:
- **Reusable patterns** for common simplification scenarios
- **Jargon → Plain English** translations
- **Before/after examples** demonstrating transformations
- **Quick reference** for writers and AI agents

---

## CRITICAL: Conservative Enhancement Pattern

**All patterns below demonstrate minimal, integrated enhancements (1.5-2x growth)**

When applying these patterns:
- ✅ Add inline, not as separate major sections
- ✅ Integrate with existing content flow
- ✅ Keep examples brief (5-15 lines each, max 1-2 examples)
- ✅ Preserve original structure
- ❌ Don't create extensive new sections
- ❌ Don't annotate diagrams
- ❌ Don't add multiple examples (1-2 max)

**Pattern interpretation guide:**

When a pattern shows "Add [section]" → Interpret as "add brief inline content" not "create major new section"

**Example:**
- Pattern says: "Add use case example"
- **Correct:** Add 5-10 line example inline with concept
- **Incorrect:** Create separate "Use Case Examples" section with 4 detailed scenarios

**Target:** Original + minimal helpful context = 1.5-2x length

---

## Jargon → Plain English Dictionary

Common technical terms and their accessible alternatives:

| Technical Term | Plain English | Context Example |
|----------------|---------------|-----------------|
| **Implement** | Set up, turn on, use | "Set up two-factor authentication" not "Implement 2FA" |
| **Utilize** | Use | "Use the API" not "Utilize the API" |
| **Leverage** | Use, take advantage of | "Take advantage of caching" not "Leverage caching capabilities" |
| **Execute** | Run | "Run the command" not "Execute the command" |
| **Instantiate** | Create | "Create a new Worker" not "Instantiate a Worker" |
| **Terminate** | Stop, end | "Stop the process" not "Terminate the process" |
| **Subsequently** | Then, next | "Then, configure the settings" not "Subsequently, configure" |
| **Optimal** | Best | "Best performance" not "Optimal performance" |
| **Facilitate** | Help, enable | "This helps you deploy faster" not "Facilitates rapid deployment" |
| **Invoke** | Call, trigger | "Call the function" not "Invoke the function" |
| **Provision** | Set up, create | "Set up your server" not "Provision infrastructure" |
| **Egress** | Outgoing data | "Data leaving your network" not "Egress traffic" |
| **Ingress** | Incoming data | "Data entering your network" not "Ingress traffic" |
| **Anycast** | Routing to nearest server | "Automatically routes to the nearest location" not "Anycast routing" |
| **Propagation** | Spreading, updating | "Changes spread globally" not "Configuration propagates" |

---

## Pattern 0: Conservative Inline Enhancement (NEW - Use This Pattern)

**This pattern demonstrates the CORRECT minimal enhancement approach**

### Example: Internal DNS Documentation

**Before (Original - 15 lines):**
```markdown
# Internal DNS

Manage DNS records for your private network.

Internal DNS zones pair with Gateway resolver policies.

## Create a Zone

Use the dashboard or API to create an internal zone.

### Dashboard
1. Navigate to Internal DNS
2. Click Create Zone
3. Enter zone name
4. Click Save
```

**After (Enhanced - 26 lines, 1.73x growth):**
```markdown
# Internal DNS

Manage DNS records for your private network without running your own DNS 
servers. This simplifies operations and integrates with Cloudflare Gateway.

Internal DNS zones pair with Gateway resolver policies to control DNS 
responses based on source IP, user identity, or domain.

**Example use case:** A multi-region company creates views for London and SF. 
Users query api.company.internal but get different IPs based on location 
(London users → 10.0.1.100, SF users → 10.0.2.100).

## Create a Zone

Create an internal zone that will contain your DNS records. Zones are only 
accessible via Gateway (not public DNS).

### Dashboard
1. Navigate to Internal DNS → Zones
2. Click **Create Zone**
3. Enter zone name (e.g., company.internal)
4. Click **Save** - Zone receives unique ID

**Verify:** Zone appears in zone list with type "internal"
```

**What was added:**
- 1 sentence explaining "why" (without running own servers) - 1 line
- Brief context for resolver policies (source IP, user identity) - 1 line  
- 1 concrete example (3 lines)
- Brief zone explanation (2 lines)
- Inline step context (1 line each for 2 steps) - 2 lines
- Brief verification (1 line)
- **Total added: 11 lines to 15 original = 26 lines (1.73x)** ✅

**What was NOT added:**
- No "What Problem Does Internal DNS Solve?" section
- No "How It Works (Conceptual)" section before content
- No diagram annotations
- No extensive troubleshooting
- No comprehensive testing section
- No "Best Practices" section
- No separate "Understanding Zones" section

**Why this works:**
- Preserves original structure completely
- Adds context inline where readers need it
- Provides 1 concrete example for grounding
- Brief verification helps readers confirm success
- Stays focused and scannable

**Use this pattern as your template for all enhancements**

---

## Pattern 1: Technical-First → Benefit-First

### Overview Pages

**Before (Technical-first):**
```markdown
## Product X

Product X is a distributed edge computing platform utilizing V8 isolates 
for low-latency serverless code execution with sub-millisecond cold start 
performance and global anycast deployment.
```

**After (Benefit-first):**
```markdown
## Product X

Run code worldwide without managing servers. Deploy in seconds, scale 
automatically, and pay only for what you use.

**What problem it solves:** Maintaining global infrastructure is expensive 
and complex. Product X runs your code in 300+ cities automatically.

**Perfect for:**
- Applications needing fast global performance
- Teams wanting to skip server management  
- Projects with variable traffic

[Get started →]
```

**Why this works:**
- Opens with clear user value
- Problem framing creates relevance
- "Perfect for" helps self-identification
- Technical details separated

---

## Pattern 2: Abstract Concept → Concrete Analogy

### Concept Pages

**Before (Abstract):**
```markdown
## Caching

Caching stores frequently accessed data in high-speed storage layers to 
reduce origin server load and improve response times through data locality 
optimization.
```

**After (Concrete):**
```markdown
## Caching

**Think of it like:** A library's reserve desk. Popular books stay at the 
front desk for quick access instead of requiring trips to the distant stacks.

**What it is:** Caching keeps copies of your frequently accessed files 
(images, CSS, JavaScript) close to users, so they load instantly instead of 
being fetched from your origin server every time.

**Why it matters:**
- Pages load 10x faster (50ms vs 500ms)
- Reduces server costs (fewer origin requests)
- Handles traffic spikes (serves from cache, not origin)

**When to use:** Any content that doesn't change constantly—images, stylesheets, 
blog posts, product pages.
```

**Why this works:**
- Analogy creates immediate mental model
- Plain language explanation builds understanding
- Benefits are concrete and measurable
- Use cases make it actionable

---

## Pattern 3: Steps-Only → Contextual Multi-Path

### How To Pages

**Before (Steps-only):**
```markdown
## Enable Feature X

1. Go to Settings
2. Click Security
3. Toggle Feature X to On
4. Save
```

**After (Contextual multi-path):**
```markdown
## Enable Feature X

**What this does:** Protects your site from [specific threat] by [mechanism].

**Time:** ~2 minutes  
**Prerequisites:** Admin access

### Via Dashboard

1. Log into your dashboard at dash.example.com
2. Select your site from the list
3. Click **Security** in the left sidebar
4. Find **Feature X** and toggle it **On**
5. Click **Save Changes** at the bottom

💡 **Note:** Changes take effect immediately. Check Analytics in 5 minutes 
to see it working.

### Via API

<details>
<summary>Show API example</summary>

```bash
curl -X PATCH "https://api.example.com/v1/settings" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"feature_x_enabled": true}'
```

**Response:**
```json
{
  "success": true,
  "result": {"feature_x_enabled": true}
}
```

</details>

## Verify It Worked

1. Visit your site in a new tab
2. Check browser DevTools → Network tab
3. Look for [specific indicator]
4. You should see [expected result]
```

**Why this works:**
- Context explains purpose before steps
- Prerequisites prevent confusion
- Both UI and API paths serve different users
- Verification builds confidence

---

## Pattern 4: Alphabetical Specs → Use-Case Organization

### Reference Pages

**Before (Alphabetical):**
```markdown
## Headers

**Cache-Control:** Controls caching behavior. Values: public, private, no-cache

**Content-Type:** MIME type. Examples: text/html, application/json

**Expires:** Cache expiration date. Format: HTTP-date
```

**After (Use-case organized):**
```markdown
## Headers by Purpose

### Controlling Cache Behavior

**When to use:** Make your site faster by controlling what gets cached and 
for how long.

#### Long-Term Caching (Static Assets)

**`Cache-Control: public, max-age=31536000`**

**What it does:** Caches content for 1 year

**When to use:** Files that never change, like `logo-v2.png` or 
`style.abc123.css` with version hash in filename

**Example:**
```http
Cache-Control: public, max-age=31536000, immutable
```

**Result:** First visitor downloads. Next year, everyone gets the cached 
version instantly.

---

#### Fresh Content (Blog Posts)

**`Cache-Control: public, max-age=3600`**

**What it does:** Caches for 1 hour

**When to use:** Content that updates occasionally—blog posts, product pages

**Example:**
```http
Cache-Control: public, max-age=3600
```

**Result:** Cached for 1 hour. After that, we check for updates.

---

### Setting Content Type

**When to use:** Tell browsers what type of content they're receiving.

[Continue pattern...]
```

**Why this works:**
- Organized by task, not alphabet
- Plain English + technical specs (two-tier)
- Real examples with expected results
- "When to use" provides decision guidance

---

## Pattern 5: Code Dump → Explained Progression

### Tutorial Pages

**Before (Code dump):**
```markdown
## Build X

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  return new Response('Hello')
}
```
```

**After (Explained progression):**
```markdown
## Build X

### What You'll Build

A working [specific thing] that [specific capability].

**Example:** `short.example.com/abc` → `github.com/cloudflare`

### Who This Is For

Developers comfortable with JavaScript. No prior experience needed with 
[platform], but you should understand HTTP requests and JSON.

### Time: 30 minutes

---

## Step 1: Minimal Working Version

Let's start with the absolute minimum—proof the concept works:

```javascript
// Entry point: listens for incoming HTTP requests
addEventListener('fetch', event => {
  // Send request to our handler function
  event.respondWith(handleRequest(event.request))
})

// Handler: processes each request
async function handleRequest(request) {
  return new Response('Hello! It works!', {
    headers: { 'content-type': 'text/plain' }
  })
}
```

**What this code does:**
- **Line 2:** Listens for HTTP requests to your Worker
- **Line 4:** Calls `handleRequest` to process each request  
- **Line 8-12:** Returns a simple text response

**Test it:**
1. Deploy this code
2. Visit your Worker's URL
3. You should see: "Hello! It works!"

Great! Your Worker is running. Now let's add real functionality...

## Step 2: Parse URLs

[Continue building progressively with explanations...]
```

**Why this works:**
- Sets clear expectations upfront
- Explains every code block
- Builds progressively (minimal → full)
- Includes testing at each step

---

## Common Transformations

### Transform 1: Feature List → Problem/Solution

**Before:**
```markdown
Features:
- Global anycast network
- Automatic scaling
- Pay-per-request pricing
```

**After:**
```markdown
**What you get:**
- **Fast everywhere:** Code runs in 300+ cities, close to every user
- **Auto-scaling:** Handles 10 requests or 10 million without configuration
- **Cost-efficient:** Pay only when code runs, not for idle servers
```

### Transform 2: Jargon Explanation → Layered Understanding

**Before:**
```markdown
DDoS mitigation employs anycast architecture to distribute volumetric attacks 
across our edge network, utilizing L3/L4 packet inspection and L7 behavioral 
analysis.
```

**After:**
```markdown
**In plain language:** Stops attackers from overwhelming your site with fake traffic.

**How it protects you:** We have 300+ data centers. When an attack hits, we 
spread it across all locations—like opening thousands of doors instead of one. 
We also identify and block fake visitors before they reach your site.

**What happens:** Your real visitors get through normally while attack traffic 
is filtered out automatically.

<details>
<summary>For technical users</summary>

Anycast distributes L3/L4 volumetric attacks across the network. L7 protection 
uses JS challenges and behavioral fingerprinting. [Architecture details →]

</details>
```

### Transform 3: Assumed Knowledge → Explicit Prerequisites

**Before:**
```markdown
Configure your A record to point to the anycast IP.
```

**After:**
```markdown
Update your DNS A record to point to Cloudflare's IP address.

**What's an A record?** It's the DNS entry that tells the internet where your 
website lives (like an address in a phone book).

**Where to find it:** In your domain registrar's DNS settings (GoDaddy, Namecheap, 
etc.). Look for "DNS Management" or "DNS Settings."

**What to enter:** 
- Type: A
- Name: @ (means your root domain)
- Value: 192.0.2.1 (our IP address)
```

---

## Metaphor Templates

### Template: API Explanation
```markdown
**Think of it like:** [Familiar interface concept]

An API is like a restaurant menu. It shows you:
- What's available to order (endpoints)
- What details you need to provide (parameters: "no onions, extra cheese")
- What you'll get back (response: your meal)
- Pricing (rate limits, quotas)

You don't need to know how the kitchen works. Just order from the menu.

**Where this breaks down:** Unlike restaurants where you wait, API responses 
are usually instant. Also, APIs can return errors if your "order" is invalid.
```

### Template: Security Feature Explanation
```markdown
**The threat:** [What attackers do]

Attackers try to [specific attack method] which could [consequence] to your site.

**How [Feature] protects you:** [Protection mechanism in plain language]

Think of it like [security analogy]:
[Concrete comparison that shows the protection model]

**What happens automatically:**
- [Protection 1]
- [Protection 2]

**What you control:**
- [Setting 1]
- [Setting 2]
```

### Template: Infrastructure Concept
```markdown
**What it is:** [One-sentence plain English definition]

**Real-world comparison:** 
[Physical/familiar tech analog that maps 1:1 to key concepts]

**Why it matters:**
- [Benefit 1 with measurable impact]
- [Benefit 2 with measurable impact]

**Common use case:**
[Specific realistic scenario showing it in action]

**Technical details:** [In collapsible section or bottom]
```

---

## Quick Patterns Reference

### When You See → Do This

| **Original** | **Transform To** |
|--------------|------------------|
| Technical architecture first | Problem → Solution → Benefit |
| Abstract concept | Analogy → Plain explanation → Technical |
| Steps without context | Context → Prerequisites → Multi-path steps |
| Alphabetical reference | Use-case groups → Two-tier descriptions |
| Unexplained code | What you'll build → Progressive steps → Explained blocks |
| Feature list | Problem/solution pairs with benefits |
| Jargon without definition | Define inline or use plain alternative |
| Missing "why" | Add value proposition upfront |
| No use cases | Add 3-5 realistic scenarios |
| Assumes knowledge | State prerequisites explicitly |

---

## Best Practices Summary

### Do:
✅ Lead with benefits and problems solved  
✅ Use tech-adjacent metaphors with stated limitations  
✅ Provide both Dashboard and API paths  
✅ Organize by use case, not alphabetically  
✅ Explain every code block  
✅ State prerequisites before steps  
✅ Include verification/testing sections  
✅ Add "For technical users" collapsible sections  

### Don't:
❌ Start with technical architecture  
❌ Use condescending language ("simply," "just," "obviously")  
❌ Assume prior knowledge without stating it  
❌ Provide only one interface path (Dashboard OR API)  
❌ Organize specs alphabetically without context  
❌ Drop code without explanation  
❌ Skip the "why" to get to "how" faster  
❌ Sacrifice accuracy for brevity  

---

**Document Version:** 1.0  
**Last Updated:** February 2026  
**License:** MIT
