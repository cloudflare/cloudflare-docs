# ELI5 Technical Writing

A technical writing simplification tool and philosophy that transforms dense, jargon-heavy technical content into accessible explanations for everyone—from developers and IT admins to marketers, students, and hobbyists.

## What is ELI5?

ELI5 (Explain Like I'm 5) is an approach to technical documentation that prioritizes clarity and understanding without sacrificing accuracy. It's built on the belief that technical concepts should be accessible to everyone, regardless of their background.

This project provides:

- **A philosophy** - Principles for making technical content approachable
- **An OpenCode skill** - Automated tool for simplifying technical documentation
- **Working examples** - Before/after demonstrations of the approach

## Philosophy Overview

Technical writing often prioritizes precision over clarity, leaving readers confused by jargon, unstated assumptions, and missing context. ELI5 addresses this by:

- **Explaining the "why"** before the "what" and "how"
- **Using tech-adjacent metaphors** that clarify without oversimplifying
- **Identifying common pitfalls** readers encounter
- **Providing practical use cases** to ground abstract concepts
- **Layering explanations** so beginners and experts both benefit
- **Maintaining technical accuracy** while improving accessibility

Read the full philosophy in [agent.md](./agent.md).

## Quick Start

### Using the OpenCode Skill

**Prerequisites:**
- OpenCode CLI installed
- This skill installed in `~/.config/opencode/skills/eli5/`

**Installation:**
```bash
# Option 1: Copy to OpenCode skills directory
cp -r /Users/caley/eli5 ~/.config/opencode/skills/eli5

# Option 2: Symlink for development
ln -s /Users/caley/eli5 ~/.config/opencode/skills/eli5
```

**Usage:**
```bash
# Simplify a documentation file
/eli5 path/to/your-docs.md

# Follow the interactive prompts:
# 1. Choose which sections to simplify
# 2. Review the generated .eli5.md comparison file
# 3. Decide next steps (integrate, refine, or keep as reference)
```

**Output:**
The skill creates a `.eli5.md` file with:
- Side-by-side before/after comparison
- Analysis of what made the original confusing
- Plain-language summaries
- Tech-adjacent metaphors
- Use cases and practical context
- Common pitfalls and related concepts

### Example

**Before (`api-docs.md`):**
```markdown
## POST /webhooks

Creates a webhook subscription for edge events.

### Parameters
- `endpoint` (string, required): HTTPS URL
- `events` (array, required): Event types
```

**After (`api-docs.eli5.md`):**
```markdown
### ✨ Simplified Version

**In Plain Language:**
A webhook lets your application receive automatic notifications when 
specific events happen, without constantly checking for updates.

**Think of It Like:**
A webhook is like a doorbell notification. Instead of constantly 
checking your front door to see if someone arrived (polling), the 
doorbell alerts you the moment someone presses it (push notification).

**When You'd Use This:**
- Getting notified when a deployment completes
- Triggering actions when content is published
- Syncing data between systems in real-time
```

See full examples in the [examples/](./examples/) directory.

## Project Structure

```
eli5/
├── README.md                          # This file
├── agent.md                           # Technical writing philosophy + AI guidelines
├── SKILL.md                           # OpenCode skill definition (streamlined)
├── EXAMPLES_REFERENCE.md              # Detailed patterns and examples
├── TESTING_GUIDE.md                   # Comprehensive testing instructions
├── QUICKSTART_TEST.md                 # Quick test verification (start here!)
├── CONSERVATIVE_UPDATES.md            # Change log for conservative approach
├── SKILL_REORGANIZATION.md            # Change log for file restructuring
├── resources/
│   ├── content-type-guide.md          # Content type-specific patterns
│   ├── pattern-library.md             # Before/after transformation patterns
│   └── ...
└── examples/
    ├── api-docs-example.md            # Technical API documentation (original)
    ├── api-docs-example.eli5.md       # Simplified version with analysis
    ├── architecture-example.md        # Technical architecture doc (original)
    ├── architecture-example.eli5.md   # Simplified version with analysis
    └── ...
```

## File Descriptions

### [agent.md](./agent.md)
The heart of the ELI5 philosophy. Contains:
- **Part 1: Philosophy** - Core beliefs about technical writing
- **Part 2: Agent Guidelines** - How AI agents should operate when simplifying content

Essential reading for understanding the "why" behind ELI5.

### [SKILL.md](./SKILL.md)
The OpenCode skill definition. Includes:
- Complete workflow description
- Content analysis framework
- Simplification principles
- Output format specifications
- Quality guidelines
- Example usage

**Streamlined for fast loading** (535 lines) - references detailed patterns in other files.

This is the executable specification that powers the `/eli5` command.

### [EXAMPLES_REFERENCE.md](./EXAMPLES_REFERENCE.md)
Extended examples and detailed patterns. Contains:
- **Content Type-Specific Patterns** - Full before/after examples for each type
- **Simplification Principles** - Detailed writing guidelines
- **Output Format Templates** - Structure and formatting examples
- **Suggestions for Enhancement** - Line-specific recommendation patterns

**Referenced by SKILL.md** when detailed examples are needed. Contains the verbose patterns that would make SKILL.md too large (1,834 lines of detailed examples).

### [TESTING_GUIDE.md](./TESTING_GUIDE.md)
Comprehensive testing instructions for the conservative enhancement approach:
- Step-by-step test procedures
- Expected results and success criteria
- Detailed verification checklists
- Common issues and fixes
- Test results template

Use this to verify the skill produces 1.5-2x enhancements (not 5-10x).

### [QUICKSTART_TEST.md](./QUICKSTART_TEST.md)
Quick reference for testing the conservative approach:
- One-line test command
- Success criteria table
- Pass/fail quick check
- Where to go for details

**Start here** for rapid verification.

### [CONSERVATIVE_UPDATES.md](./CONSERVATIVE_UPDATES.md)
Change log documenting the shift from verbose (5-10x) to conservative (1.5-2x) enhancements:
- What changed in each file
- Before/after behavior comparison
- Rationale for changes

### [SKILL_REORGANIZATION.md](./SKILL_REORGANIZATION.md)
Change log documenting the reorganization of SKILL.md (2,261 → 535 lines):
- What was extracted to EXAMPLES_REFERENCE.md
- File size comparison
- Benefits of streamlined structure

### [examples/](./examples/)
Real-world demonstrations showing:
- Typical technical documentation (before)
- Full ELI5 transformation (after)
- Applied principles in action

Use these as templates for your own simplification work.

## Content Types Supported

The ELI5 skill automatically detects and applies specialized patterns for different documentation types:

### Overview Pages
**What:** Product landing pages with features/benefits  
**Pattern:** Problem → Solution → Benefit framing  
**Focus:** Lead with value, help users self-identify if they need this  
**Example:** `cloudflare-docs/overview.md` → Product intro with "Perfect for" section

### Concept Pages
**What:** Explanatory documentation about features/concepts  
**Pattern:** Analogy → Plain Explanation → Technical Details  
**Focus:** Build understanding with layered explanations  
**Example:** `examples/architecture-example.md` → Edge computing concepts

### How To Guides
**What:** Step-by-step procedural instructions  
**Pattern:** Multi-path approach (Dashboard + API)  
**Focus:** Context before steps, serve UI users and developers  
**Example:** Configuration guides with both UI and code paths

### Reference Pages
**What:** Technical specifications and parameters  
**Pattern:** Use-case organization + Two-tier descriptions  
**Focus:** Organize by purpose, provide plain + technical descriptions  
**Example:** `examples/reference-example.md` → Cache headers reference

### Tutorials
**What:** Guided projects teaching through application  
**Pattern:** Progressive complexity (Build → Enhance → Polish)  
**Focus:** Clear expectations, explain code, build confidence  
**Example:** `examples/tutorial-example.md` → Build a URL shortener

### How It Works

1. **Automatic Detection:** Skill analyzes document structure to identify content type
2. **Validation:** Asks you to confirm or correct the detected type
3. **Type-Specific Patterns:** Applies optimized simplification for that content type
4. **Enhanced Output:** Generates `.eli5.md` with appropriate structure

Each content type uses specific analysis criteria and simplification approaches documented in [SKILL.md](./SKILL.md).

## Key Principles

### 1. Context Before Details
Always explain why something matters before diving into how it works.

### 2. Tech-Adjacent Metaphors
Use analogies rooted in familiar technology concepts, not overly simplistic comparisons.

### 3. Respect Reader Intelligence
Readers lack context, not intelligence. Never condescend with phrases like "simply" or "just."

### 4. Layer Explanations
Start with the simplest explanation, then add technical depth. Provide multiple entry points.

### 5. Accuracy is Non-Negotiable
Simplify language, not facts. Technical precision must be maintained.

### 6. Focus on Use Cases
Abstract concepts become clear when grounded in practical, realistic scenarios.

### 7. Identify Common Pitfalls
Help readers avoid misunderstandings by explicitly addressing common mistakes.

### 8. Content-Type Awareness
Recognize different documentation types and apply appropriate patterns—overviews need benefit-first framing, concepts need analogies, how-tos need multi-path instructions.

### 9. Multi-Path Documentation
Provide both Dashboard (UI) and API/CLI paths where applicable, serving beginners and technical users simultaneously.

## Who This Is For

### Writers
- Technical writers seeking clarity principles
- Developer advocates creating accessible documentation
- Product managers writing user-facing content
- Anyone documenting complex systems

### Readers
- Developers who want jargon-free explanations
- IT admins learning new technologies
- Students and hobbyists building skills
- Marketers understanding technical products
- Anyone who's ever thought "I wish someone would explain this simply"

## Tone & Style

ELI5 documentation is:

✅ **Clear and professional** - Straightforward, no fluff  
✅ **Respectful** - Assumes readers are intelligent  
✅ **Practical** - Grounded in real use cases  
✅ **Accurate** - Technically correct  

ELI5 documentation is not:

❌ **Condescending** - No "simply," "just," or "obviously"  
❌ **Oversimplified** - Accuracy isn't sacrificed for brevity  
❌ **Playful** - Professional tone maintained  
❌ **Action-focused** - Understanding comes before steps  

## Future Enhancements

Planned features (documented, not yet implemented):

- **Inline code comment reading** - Simplify code documentation and comments
- **Multi-format support** - HTML, PDF, API specs (OpenAPI)
- **Automated complexity scoring** - Jargon density metrics, readability analysis
- **Interactive mode** - Iterative refinement with real-time feedback

## Contributing

This is a personal project, but contributions are welcome:

1. Follow the philosophy in [agent.md](./agent.md)
2. Use examples as templates
3. Maintain clear, professional tone
4. Ensure technical accuracy
5. Test simplifications with diverse audiences

## License

MIT License - See individual files for details

## Questions?

Read [agent.md](./agent.md) for the complete philosophy and guidelines, or explore the [examples/](./examples/) directory to see ELI5 in action.

---

**Remember:** The goal isn't to "dumb down" technical content. It's to make expertise accessible while respecting both the subject matter and the reader.
